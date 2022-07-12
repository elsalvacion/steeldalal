const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsAppClient = require("twilio")(accountSid, authToken);

const sendMessage = (details, res) => {
  whatsAppClient.messages
    .create({
      from: process.env.WHATSAPP_PROVIDER_NUMBER,
      body: details.message,
      to: `whatsapp:${details.to}`,
    })
    .then((message) => {
      console.log(message.sid);
      res.json({ msg: "message sent" });
    })
    .catch((err) => {
      console.log(err);
      res.status.json({ msg: "Could not end message" });
    });
};

const sendJustMessage = (details) => {
  whatsAppClient.messages
    .create({
      from: process.env.WHATSAPP_PROVIDER_NUMBER,
      body: details.message,
      to: `whatsapp:${details.to}`,
    })
    .then((message) => {
      console.log(message.sid);
    })
    .catch((err) => console.log(err));
};
module.exports = {
  sendMessage,
  sendJustMessage,
};
