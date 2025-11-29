const Handlebars = require("handlebars");
const nodemailer = require('nodemailer')
const mailTemplates = require("../libs/emailTemplates")
const constant = require("./constant");

exports.sendMail = async (payload, res) =>{
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASS
        }
      })

    const mailoption = {
        from: `'BAZZAR.com' ${'bazzar@gmail.com'}`,
        to: payload.email_id,
        subject: payload.emailSubject,
        text: 'Greeting,',
        html: ``
    }

    switch(payload.emailType){
        case constant.emailType.WELCOME_EMAIL:
          mailoption.html = renderMessageFromTemplateAndVariable(mailTemplates.welcomeEmail, payload);
          break;

        case constant.emailType.FORGOT_PASSWORD_EMAIL:
          mailoption.html = renderMessageFromTemplateAndVariable(mailTemplates.forgotPasswordEmail, payload);
          break;

        default:
          return;
    }

    const sendMailNow = await transport.sendMail(mailoption, function (err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info)
        }
      })
      console.log(sendMailNow)
}


function renderMessageFromTemplateAndVariable(templateData, variablesData) {
    return Handlebars.compile(templateData)(variablesData);
}
  