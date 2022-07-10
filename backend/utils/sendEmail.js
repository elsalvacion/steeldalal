var ses = require("node-ses"),
  client = ses.createClient({
    key: "AKIA5E377A3C5U2QWFEO",
    secret: "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",
  });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsAppClient = require("twilio")(accountSid, authToken);

const sendContactEmail = (details, res) => {
  client.sendEmail(
    {
      to: details.email,
      from: "alieukeita201@gmail.com",
      subject: details.subject,
      message: details.message,
      altText: "plain text",
    },
    function (err, data) {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Error while sending" });
      } else {
        console.log(data);
        res.json({ msg: "sent" });
      }
    }
  );
};

const sendMessage = (details, res) => {
  whatsAppClient.messages
    .create({
      from: "whatsapp:+14155238886",
      body: details.message,
      to: `whatsapp:${details.to}`,
    })
    .then((message) => {
      res.json({ msg: "message sent" });
    })
    .catch((err) => res.status.json({ msg: "Could not end message" }));
};

const sendJustMessage = (details) => {
  whatsAppClient.messages
    .create({
      from: "whatsapp:+14155238886",
      body: details.message,
      to: `whatsapp:${details.to}`,
    })
    .then((message) => {
      console.log(message.sid);
    });
};
module.exports = {
  sendContactEmail,
  sendMessage,
  sendJustMessage,
};
