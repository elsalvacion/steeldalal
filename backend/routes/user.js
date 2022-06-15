const router = require("express").Router();
const connection = require("../config/db");
const { userProtect } = require("../middlewares/protect");
const verifier = require("email-verify");
const {
  emailRegister,
  facebookRegister,
  googleRegister,
  emailLogin,
  facebookLogin,
  googleLogin,
} = require("../utils/authControllers");

// register user
router.post("/register", (req, res) => {
  try {
    const type = req.body.type;
    if (type.toLowerCase() === "email") {
      emailRegister(req, res);
    } else if (type.toLowerCase() === "facebook") {
      facebookRegister(req, res);
    } else {
      googleRegister(req, res);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post("/login", (req, res) => {
  try {
    const type = req.body.type;
    if (type.toLowerCase() === "email") {
      emailLogin(req, res);
    } else if (type.toLowerCase() === "facebook") {
      facebookLogin(req, res);
    } else {
      googleLogin(req, res);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/", userProtect, (req, res) => {
  try {
    const { name, email, state, phone, city, address } = req.body;

    const sql = `update users set name = ? , email = ?, state = ? , phone = ? , city = ?, address = ? where id  = ? `;

    connection.query(
      sql,
      [name, email, state, phone, city, address, req.user.id],
      (updateUserErr, updateUserRes) => {
        if (updateUserErr) {
          console.log(updateUserErr);
          res.status(400).json({ msg: "update user error" });
        } else {
          res.json({ msg: "User updated" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
