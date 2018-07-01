import { timingSafeEqual } from 'crypto';

const nodemailer = require('nodemailer');
const fs = require("fs");
const handlebars = require("handlebars");



// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

function sendMailFromTemplate(recipient, title, plainText, path, replacements, attachment) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            var template = handlebars.compile(html);
            var htmlToSend = template(replacements);
            sendMail(recipient, title, plainText, htmlToSend, attachment);
        }
    });
}

function sendMail(recipient, title, mailBodyPlainText, mailBody, attachment) {
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER, // generated ethereal user
                pass: process.env.MAIL_PWD  // generated ethereal password
            }
        });

        console.log(recipient)
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Focus Cursinho " <focus@associacaopaideia.org.br>', // sender address
            to: '"' + recipient + '"', // list of receiver
            subject: title, // Subject line
            text: mailBodyPlainText, // plain text body
            html:  mailBody,// html body
            attachments: attachment
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

}

export default {
    sendActivationMail: function(userMail, token){
        var mailTitle = "Ativação da conta";
        var htmlPath = __dirname + "/cadastro.html";
        var replacements = {
            url: "https://www.associacaopaideia.org.br/#/ativacao?token="+token
        }
        var plainText = "Olá! Confirmação de cadastro. O seu link de ativação da conta é o seguinte: https://www.associacaopaideia.org.br/ativacao?token=" + token
        sendMailFromTemplate(userMail, mailTitle, plainText, htmlPath, replacements);
    },
    sendConfirmationMail: function(userMail, name , matricula) {
        var mailtitle = "Confirmação de matrícula"
        var htmlPath = __dirname + "/confirmacao.html";
        var replacements = {
            name: name,
            matricula: matricula
        }

        var plainText = "Olá! Inscrição feita com sucesso. Seu número de matrícula é o seguinte: " + matricula
        var attachments = [
            {
                path: __dirname + "/termo_responsabilidade.pdf"
            }
        ]
        sendMailFromTemplate(userMail, mailtitle, plainText, htmlPath, replacements, attachments)
    },
    sendMail: function(recipient, title, mailBody) {
        sendMail(recipient, title, mailBody);
    }
}