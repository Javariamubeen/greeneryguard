const nodemailer = require("nodemailer");

exports.sendEmail = (emails, text, type, Subject, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'muhammadmueen9692@gmail.com',
            pass: 'ASDF/1234',
        },
    });
    const mailOptions = {
        from: 'muhammadmueen9692@gmail.com',
        to: emails,
        subject: Subject,
        text: type == 'Text' ? text : null,
        html: type == 'HTML' ? text : null,
    };
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('there was an error: ', err);
        } else {
            emails.map(item => {
                var email = {
                    senderEmail: item,
                    emailMessage: text,
                    token: token,
                };
            });
        }
    });
}

exports.contactUs = (req, res) => {
    const {email, subject,message} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'muhammadmueen9692@gmail.com',
            pass: 'ASDF/1234',
        },
    });
    const mailOptions = {
        from: email,
        to: 'Nnmama22@gmail.com',
        subject: subject,
        text: message,
    };
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('there was an error: ', err);
        } else {
            res.status(200).send({message:'Email has been sent'})
        }
    });
}

exports.SendForgotPasswordEmail = (email,subject,message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'muhammadmueen9692@gmail.com',
            pass: 'ASDF/1234',
        },
    });
    const mailOptions = {
        from: 'muhammadmueen9692@gmail.com',
        to: email,
        subject: subject,
        text: message,
    };
    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('there was an error: ', err);
        } else {
            return {message:'Email has been sent'};
        }
    });
}

