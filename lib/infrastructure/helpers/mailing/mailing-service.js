import nodemailer from 'nodemailer';
import config from '../../config/env';
import ejs from 'ejs';

const emailCodeCave = 'nahuelsalto.71@gmail.com';

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: emailCodeCave,
      pass: 'wydxobxjgyyrbonn'
  }
});

export function sendValidateAccountEmail(email, name, hash) {
  const url = `${config.URL}/verify-account/${hash}`;
  ejs.renderFile(__dirname + '/templates/verify-account.template.ejs',
    {name: name, url: url},
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const mainOptions = {
          from: emailCodeCave,
          to: email,
          subject: 'Confirma tu cuenta - Store',
          html: data
        };
        transporter.sendMail(mainOptions,
          function (error, info) {
            console.log(info);
            console.log(error);
          });
      }
    });
}

export function sendRecoverPasswordEmail(email, hash) {
  const url = `${config.URL}/recover-password/${hash}`;
  ejs.renderFile(__dirname + '/templates/recover-password.template.ejs',
    {url: url},
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const mainOptions = {
          from: emailCodeCave,
          to: email,
          subject: 'Recuperación de contraseña - Store',
          html: data
        };
        transporter.sendMail(mainOptions,
          function (error, info) {
            console.log(info);
            console.log(error);
          });
      }
    });
}

export function sendContactDataEmail(contactData) {
  ejs.renderFile(__dirname + '/templates/contact-data.template.ejs',
    {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.telephone,
      message: contactData.message
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const mainOptions = {
          from: emailCodeCave,
          to: emailCodeCave,
          subject: 'Nueva Solicitud de Contacto - Store',
          html: data
        };
        transporter.sendMail(mainOptions,
          function (error, info) {
            console.log(info);
            console.log(error);
          });
      }
    });
}
