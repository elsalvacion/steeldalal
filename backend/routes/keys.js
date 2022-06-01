const router = require("express").Router();

router.get("/google-location", (req, res) => {
  try {
    res.json({ msg: process.env.GOOGLE_MAP });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/google-login", (req, res) => {
  try {
    res.json({ msg: process.env.GOOGLE_LOGIN });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/facebook-login", (req, res) => {
  try {
    res.json({ msg: process.env.FACEBOOK_LOGIN });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
