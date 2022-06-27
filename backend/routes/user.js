const router = require("express").Router();
const path = require("path");
const connection = require("../config/db");
const { userProtect } = require("../middlewares/protect");
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

router.post("/create-biz", userProtect, (req, res) => {
  try {
    const uploadPath = path.join(path.resolve(), "public", "uploads");
    const data = {};
    data.name = req.body.name;
    data.user = req.body.user;
    if (!req.files) {
      res.status(400).json({ msg: `Please upload a files` });
    }
    const fileKeys = [
      "gstCertificate",
      "panCard",
      "aadharCard",
      "cancelledCheque",
    ];
    fileKeys.forEach((fileKey, i) => {
      const file = req.files[fileKey];
      const user = data.user;
      file.name = `${fileKey}-${user}${path.parse(file.name).ext}`;

      file.mv(`${uploadPath}/${file.name}`, async (err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Error while uploading file" });
        } else {
          data[fileKey] = `uploads/${file.name}`;
          if (i === fileKeys.length - 1) {
            const sql = `insert into yourBiz(name, gstCertificate, panCard, aadharCard, cancelledCheque, user) values(?, ? , ? , ? , ?, ?) `;

            connection.query(
              sql,
              [
                data.name,
                data.gstCertificate,
                data.panCard,
                data.aadharCard,
                data.cancelledCheque,
                data.user,
              ],
              (createBizErr, createBiz) => {
                if (createBizErr) {
                  console.log(createBizErr);
                  res.status(400).json({ msg: "update biz error" });
                } else {
                  res.json({ msg: data });
                }
              }
            );
          }
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/update-biz", userProtect, (req, res) => {
  try {
    const { name, gstCertificate, panCard, aadharCard, cancelledCheque, user } =
      req.body;

    const sql = `update yourBiz set name = ? , gstCertificate = ?, panCard = ? , aadharCard = ? , cancelledCheque = ?, address = ? where user  = ? `;

    connection.query(
      sql,
      [name, gstCertificate, panCard, aadharCard, cancelledCheque, user],
      (updateBizErr, updateBizRes) => {
        if (updateBizErr) {
          console.log(updateBizErr);
          res.status(400).json({ msg: "update biz error" });
        } else {
          res.json({ msg: "Biz updated" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
