const nodemailer = require('nodemailer');
const mailerConfig = require('../magma').mailer

let transporter = nodemailer.createTransport({
    host: mailerConfig.host,
    port: mailerConfig.port,
    secure: mailerConfig.ssl,
    auth: {
        user: mailerConfig.auth.user,
        pass: mailerConfig.auth.pass
    }
});

//Example sendInfo parameter
// let sendInfo = {
//     from: 'sendFrom@email.com',
//     to: 'target@email.com',
//     subject: 'subject',
//     text: 'plain text in mail notify',
//     html: 'email body'
// };

module.exports = {
    send: (sendInfo) => {
        console.log(transporter)
        transporter.sendMail(sendInfo, (error, info) => {
            if (error) {
                return console.log(error);
            } else {
                return console.log('E-mail send');
            }
        });
    }
};