var ses = require("node-ses"),
  client = ses.createClient({
    key: "AKIA5E377A3C5U2QWFEO",
    secret: "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",
  });

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

module.exports = {
  sendContactEmail,
};
