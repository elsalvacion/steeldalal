const nodemailer = require("nodemailer");
const smtpPassword = require("aws-smtp-credentials");

const sendContactEmail = (details, res) => {
  const mailOptions = {
    from: details.email,
    to: "alieukeita201@gmail.com",
    text: details.message,
    subject: details.subject,
  };
  function callback(error, info) {
    if (error) {
      console.log(error);
      res.status(400).json({ msg: "Could not send email" });
    } else {
      console.log("Message sent: " + info.response);
      res.json({ msg: "Email sent" });
    }
  }

  // Send e-mail using SMTP
  const smtpTransporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_ENDPOINT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: smtpPassword(process.env.SMTP_PASSWORD),
    },
    debug: true,
  });
  smtpTransporter.sendMail(mailOptions, callback);
};

module.exports = {
  sendContactEmail,
};
