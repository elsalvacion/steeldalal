const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendMessage = (details, res) => {
  try {
    client.messages
      .create({
        body: details.message,
        messagingServiceSid: process.env.TWILIO_MSG_SID,
        to: details.to,
      })
      .then((message) => {
        console.log(message.sid);
        res.json({ msg: "OTP sent" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ msg: "Cannot send message at the moment" });
      })
      .done();
  } catch (err) {
    console.log(err);
    res.status.json({ msg: "Could not end message" });
  }
};

const sendJustMessage = (details) => {
  client.messages;
  client.messages
    .create({
      body: details.message,
      messagingServiceSid: process.env.TWILIO_MSG_SID,
      to: details.to,
    })
    .then((message) => console.log(message.sid))

    .done();
};
module.exports = {
  sendMessage,
  sendJustMessage,
};
