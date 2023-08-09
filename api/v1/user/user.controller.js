// "use strict";;
const User = require('../../../models').users;
const config = require("../../../config/environment");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { Op } = require("sequelize");
const controller = require('./../sentEmails/sentEmails.controller');
var fs = require("fs");

const validationError = (res, err) => {
  return res.status(422).json({
    status: 422,
    message: err.message,
  });
};

const handle404 = (res, err) => {
  const response = {
    status: 404,
    message: "Sorry! Not found.",
  };

  return res.status(404).send(response);
};

/**
 * user sign-up
 */
exports.create = (req, res) => {
  const newUser = req.body;
  newUser.password_hash=req.body.password;
  newUser.role = req.body.primary_role;
  User.findOne({
    where:{[Op.or]: [
      { email: req.body.email },
    ],
    isDeleted: false,
  }
  }).then((user) => {
    if (user === null) {
      User.create(newUser)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
    } else {
      res.status(422).json({ message: "1" });
    }
  });
};

/**
 * admin register user
 */
exports.registerUser = (req, res) => {
  const newUser = new User(req.body);
  newUser.password_hash=hash;
  newUser.role = req.body.primary_role;
    newUser.save((err, user) => {
    if (err) return validationError(res, err);
    const token = jwt.sign({ _id: user._id }, config.secrets.session, {
      expiresIn: 1 * 60 * 60,
    });
    const emails = [req.body.email];
    fs.readFile("./static/Emailtemplate/email.html", function (error, html) {
      if (error) {
        throw error;
      }
      SentEmail.sendEmail(emails, html, "HTML", "Sign Up");
    });
    res.json({
      access_token: token,
      expires_in: 1 * 60 * 60,
    });
  });
};

/**
 * Get list of users
 * restriction: 'manager', 'admin'
 */
exports.index = (req, res) => {
  User.findAll({
    where:{ isDeleted: false }
  })
  .then(users => res.status(200).send(users))
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
};

exports.listSellers = (req, res) => {
  // const newUser = req.body;
  User.findAll({
    where:{isDeleted:false, primary_role:"seller"}
  })
      .then(products => res.status(200).send(products))
      .catch(error => {
        console.log(error);
        res.status(400).send(error)
      });
}

/**
 * Get a single user
 * restriction: 'manager', 'admin'
 */
exports.show = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) return next(err);
    if (!user) handle404();
    res.status(200).json(user.profile);
  });
};

/**
 * Get user by Id
 */

exports.byId = (request, res) => {
  const userId = request.params.id;
  User.findOne({where :{id:userId}})
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
};
/*
 * update a single user
 * restriction: 'manager', 'admin'
 */
exports.updateUser = (req, res) => {
  const id=req.params.id;
  const userObj = req.body;
  User.
  findOne({where :{id:id}})
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return user.update(userObj)
            .then(() => res.status(200).send(user))  // Send back the updated todo.
            .catch((error) => { console.log("Error",error);
              res.status(400).send(error)});
      })
      .catch((error) =>{console.log("Error",error); res.status(400).send(error)});
}

/**
 * Change a single user's password
 * restriction: 'manager', 'admin'
 */
exports.changePassword = (req, res, next) => {
  const userId = req.params.id;
  const oldPass = String(req.body.currentPassword);
  const newPass = String(req.body.newPassword);
  console.log(userId+" "+oldPass+" "+newPass);
  User.findOne({where: {id: userId}}).then(user => {
    if (user.password_hash == oldPass) {
      console.log("Ok");
      user.password_hash = newPass;
      user.save((err) => {
        if (err){
          res.status(422).json({
            status: 422,
            message: "Error updating password",
          });
        }
        res.status(200).send({message:'Password has been updated'});
      });
    } else {
      console.log("Not ok");
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
  }).catch(err => {
    res.status(403).json({
      status: 500,
      message: err,
    });
  })
};

exports.forgotPassword = (req, res, next) => {
  User.findOne({where: {email: req.body.email}}).then(user => {
    if (!user) {
      return res.status(404).send({
        message: 'Todo Not Found',
      });
    }
    const password=Math.random().toString(36).slice(2);
    controller.SendForgotPasswordEmail(user.email,'Forgot Password','Your temporary password is :'+password)
    return user.update({password_hash:password})
        .then(() => {
          res.status(200).send(user)
        })  // Send back the updated todo.
        .catch((error) => { console.log("Error",error);
          res.status(400).send(error)});
  }).catch(err => {
    res.status(403).json({
      status: 500,
      message: err,
    });
  })
};

/**
 * Deletes a user (soft delete)
 */
exports.destroy = (request, response) => {
  User.update({isDeleted: true}, {where: {id: request.params.id}})
      .then((user) => response.status(200).send(user))  // Send back the updated todo.
      .catch((error) => {
        console.log("Error", error);
        response.status(400).send(error)
      });
}
/**
 * Get my info
 */
exports.me = (req, res, next) => {
  const userId = req.user._id;
  User.findOne(
    {
      _id: userId,
    },
    "-salt -hashedPassword",
    (err, user) => {
      // don't ever give out the password or salt
      if (err) return next(err);
      if (!user) return handle404();

      res.status(200).json(user);
    }
  );
};

/*
 * update a user
 */
exports.updateMyProfile = (req, res, next) => {
  const userId = req.user._id;
  User.updateOne(
    { _id: userId },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
    }
  ).then((Obj) => {
    res.status(200).json(Obj);
  });
};

exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  User.findById(userId, (err, user) => {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save((err) => {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
  });
};

/**
 * Change a user's password
 */
exports.changeMyPassword = (req, res, next) => {
  const userId = req.params.id;
  const oldPass = String(req.body.currentPassword);
  const newPass = String(req.body.newPassword);
  User.findById(userId, (err, user) => {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save((err) => {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    }
  });
};

exports.resetPassword = (req, res, next) => {
  const email = String(req.body.email);
  const password = String(req.body.password);

  User.findOne({ email: email }, (err, user) => {
    if (user.authenticate(password)) {
      res.status(403).json({
        status: 403,
        message: "Forbidden",
      });
    } else {
      user.password = password;
      user.save((err) => {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    }
  });
};

/**
 * Authentication callback
 */
exports.authCallback = (req, res, next) => {
  res.redirect("/");
};
/** Send Email */

exports.sendEmail = (req, res, next) => {
  // User.findOne({
  //   email: req.body.email,
  // }).then((user) => {
  //   if (user === null) {
  //     res.status(403).send("email not in db");
  //   } else {
  //     const token = crypto.randomBytes(20).toString("hex");
  //     const emailText =
  //       "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
  //       "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
  //       `https://zoorganized.azurewebsites.net/resetPassword/${token}\n\n` +
  //       "If you did not request this, please ignore this email and your password will remain unchanged.\n";

  //     User.updateOne(
  //       { email: req.body.email },
  //       {
  //         resetPasswordToken: token,
  //         resetPasswordExpires: Date.now() + 3600000,
  //       }
  //     ).then((Obj) => {
  //       const emails = [req.body.email];
  //       SentEmail.sendEmail(
  //         emails,
  //         emailText,
  //         "Text",
  //         "Link To Reset Password"
  //       );
  //       res.status(200).json("recovery email sent");
  //     });
  //   }
  // });
};

/**Match Token */
exports.reset = (req, res) => {
  // User.findOne({
  //   resetPasswordToken: req.query.resetPasswordToken,
  //   resetPasswordExpires: { $gte: Date.now() },
  // }).then((user) => {
  //   if (user == null) {
  //     res.status(403).send("password reset link is invalid or has expired");
  //   } else {
  //     res.status(200).send({
  //       email: user.email,
  //       message: "password reset link a-ok",
  //     });
  //   }
  // });
};
