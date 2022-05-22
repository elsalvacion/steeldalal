const verifier = require("email-verify");

export const verifyEmail = (email) => {
  verifier.verify(email, function (err, info) {
    if (err)
      res.status(400).json({
        msg: "cannot verify email at the moment. Try google or facebook login.",
      });
    else {
      if (info.success) {
        res.json({ msg: "Your email is verified" });
      } else {
        res.status(400).json({ msg: "Invalid email. Check and try again." });
      }
    }
  });
};
