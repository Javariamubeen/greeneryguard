const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {Op} = require("sequelize");
exports.setup = (User, Role, config) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password" // this is the virtual field on the model
            },

            (email, password, done) => {
                User.findOne(
                    {
                        where: {
                            [Op.or]: [
                                {email: email},
                            ],
                            isDeleted: false,
                        }
                    }).then(
                    (user) => {
                        if (!user) {
                            return done(null, false, {
                                message: "This email is not registered."
                            });
                        }
            if (user.password_hash!=password) {
                            return done(null, false, {
                                message: "This password is not correct."
                            });
                        }
                        Role.findOne(
                            {
                                where: {
                                    name: user.primary_role
                                }
                            }).then(
                            (role) => {
                                if (!role) {
                                    return done(null, false, {
                                        message: "This role does not exist."
                                    });
                                }
                                var permissions = role.permissions.split(',');
                                user.permissions = permissions;
                                return done(null, user);
                            }
                        );
                    }
        );
            }
        )
    );
};