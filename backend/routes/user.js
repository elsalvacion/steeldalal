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
const { sendMessage } = require("../utils/sendEmail");

// verify phone
router.post("/verify-phone", userProtect, (req, res) => {
  try {
    const verifyNumber = Math.floor(1000 + Math.random() * 9000);
    const { type } = req.user;
    let updateSql;
    if (type.toLowerCase() === "facebook") {
      updateSql = `update facebook set verifyNumber = ? , phone = ? where id = ?`;
    } else if (type.toLowerCase() === "email") {
      updateSql = `update users set verifyNumber = ? , phone = ? where id = ?`;
    } else {
      updateSql = `update google set verifyNumber = ? , phone = ? where id = ?`;
    }

    connection.query(
      updateSql,
      [verifyNumber, req.body.phone, req.user.id],
      (updateUserErr, updateUserRes) => {
        if (updateUserErr) {
          console.log(updateUserErr);
          res.status(400).json({ msg: "Verify phone error" });
        } else {
          sendMessage(
            {
              to: req.body.phone,
              message: `
Your one-time OTP

Here is your 4 digit verification: ${verifyNumber}

From: steeldalal.com
            `,
            },
            res
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// check otp
router.post("/check-otp", userProtect, (req, res) => {
  try {
    const verifyNumber = req.body.phone;
    const { id, type } = req.user;
    let fetchSql;
    if (type.toLowerCase() === "facebook") {
      fetchSql = `select verifyNumber from facebook where verifyNumber =  ? and id = ?`;
    } else if (type.toLowerCase() === "email") {
      fetchSql = `select verifyNumber from users where verifyNumber =  ? and id = ?`;
    } else {
      fetchSql = `select verifyNumber from google where verifyNumber =  ? and id = ?`;
    }
    connection.query(
      fetchSql,
      [verifyNumber, req.user.id],
      (verifyCheckErr, verifyCheckRes) => {
        if (verifyCheckErr) {
          console.log(verifyCheckErr);
          res.status(400).json({ msg: "could not verify otp" });
        } else {
          if (verifyCheckRes.length === 0) {
            res.status(400).json({ msg: "Invalid OTP" });
          } else {
            let updateSql;
            if (type.toLowerCase() === "facebook") {
              updateSql = `update facebook set isVerified = 1 where id = ?`;
            } else if (type.toLowerCase() === "email") {
              updateSql = `update users set isVerified = 1 where id = ?`;
            } else {
              updateSql = `update google set isVerified = 1 where id = ?`;
            }
            connection.query(
              updateSql,
              [req.user.id],
              (updateUserErr, updateUserRes) => {
                if (updateUserErr) {
                  console.log(updateUserErr);
                  res.status(400).json({ msg: "Error while verifying" });
                } else {
                  res.json({ msg: "Valid" });
                }
              }
            );
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

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
            const sql = `insert into yourBiz( gstCertificate, panCard, aadharCard, cancelledCheque, user) values( ? , ? , ? , ?, ?) `;

            connection.query(
              sql,
              [
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

router.put("/edit-biz", userProtect, (req, res) => {
  try {
    const uploadPath = path.join(path.resolve(), "public", "uploads");
    const data = {
      ...req.body,
    };
    const fileKeys = [];
    if (req.files.gstCertificate) fileKeys.push("gstCertificate");
    if (req.files.panCard) fileKeys.push("panCard");
    if (req.files.aadharCard) fileKeys.push("aadharCard");
    if (req.files.cancelledCheque) fileKeys.push("cancelledCheque");
    console.log(fileKeys);
    fileKeys.forEach((fileKey, i) => {
      const user = data.user;
      const file = req.files[fileKey];

      file.name = `${fileKey}-${user}${path.parse(file.name).ext}`;

      file.mv(`${uploadPath}/${file.name}`, (err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Error while uploading file" });
        } else {
          data[fileKey] = `uploads/${file.name}`;

          if (i === fileKeys.length - 1) {
            const sql = `update yourBiz set  gstCertificate = ?, panCard = ?, aadharCard = ?, cancelledCheque = ?  where user = ?`;

            connection.query(
              sql,
              [
                data.gstCertificate,
                data.panCard,
                data.aadharCard,
                data.cancelledCheque,
                data.user,
              ],
              (updateBizErr, updateBiz) => {
                if (updateBizErr) {
                  console.log(updateBizErr);
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

module.exports = router;
