const nodemailer = require("nodemailer");
const verifier = require("email-verify");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASS,
  },
});

const sendContactEmail = (details, res) => {
  try {
    const html = `
    <div style="width: 90%; margin: 10px auto; padding: 10px 15px; border: 1px solid #1565c0; box-shadow: 2px 2px 5px #f3f3f3">
    <p style="margin-bottom: 20px; text-transform: capitalize;  font-size: 22px;"><b>Contact Message From ${details.name}</b></p>
    <p style="font-size: 17px;">${details.message}</p>
    </div>
  `;
    const mailOptions = {
      from: `Steeldalal.com Help <${details.email}>`,
      to: process.env.HELP_EMAIL,
      subject: details.subject,
      html,
    };
    verifier.verify(details.email, async function (emailVerifyErr, info) {
      if (emailVerifyErr) {
        console.log(emailVerifyErr);
        res.status(400).json({ msg: "Invalid email" });
      } else {
        if (info.success) {
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.status(400).json({
                msg: "Could not send email",
              });
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).json({ msg: "Message sent" });
            }
          });
        } else {
          res.status(400).json({ msg: "Invalid email" });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error: Try other methods." });
  }
};

module.exports = {
  sendContactEmail,
};
