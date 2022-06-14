const router = require("express").Router();
const connection = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userProtect } = require("../middlewares/protect");
const verifier = require("email-verify");

router.post("/register", (req, res) => {
  try {
    const { email, name } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    verifier.verify(details.email, async function (emailVerifyErr, info) {
      if (emailVerifyErr) {
        console.log(emailVerifyErr);
        res.status(400).json({ msg: "Invalid email" });
      } else {
        if (info.success) {
          // find if user exist
          connection.query(
            `select email from users where email = ?`,
            [email],
            (existCheckErr, existCheckRes) => {
              if (existCheckErr) {
                console.log(existCheckErr);
                res.status(400).json({
                  msg: "Error while checking if user exist",
                });
              } else if (existCheckRes.length > 0) {
                res.status(400).json({ msg: "email already exist" });
              } else {
                connection.query(
                  `
                insert into users(name, email, password) values(?, ?, ?);
                `,
                  [name, email, password],
                  (createUserErr, createUserRes) => {
                    if (createUserErr) {
                      console.log(createUserErr);
                      res
                        .status(400)
                        .json({ msg: "Error while creating user" });
                    } else {
                      connection.query(
                        `select * from users where id = ?`,
                        [createUserRes.insertId],
                        (selectUserErr, selectUserRes) => {
                          if (selectUserErr) {
                            console.log(selectUserErr);
                          } else {
                            res.json({
                              ...selectUserRes[0],
                              token: jwt.sign(
                                { id: createUserRes.insertId },
                                process.env.JWT_SECRET,
                                {
                                  expiresIn: "30d",
                                }
                              ),
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          res.status(400).json({ msg: "Invalid email" });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // find if user exist
    connection.query(
      `select * from users where email = ?`,
      [email],
      (existCheckErr, existCheckRes) => {
        if (existCheckErr) {
          console.log(existCheckErr);
          res.status(400).json({
            msg: "Error while checking if user exist",
          });
        } else if (existCheckRes.length === 0) {
          res.status(400).json({ msg: "Email do not exist. Try registering." });
        } else {
          const { name, id, password: hashedPass } = existCheckRes[0];

          if (!bcrypt.compareSync(password, hashedPass)) {
            res.status(400).json({
              msg: "Incorrect password",
            });
          } else {
            res.json({
              ...existCheckRes[0],
              token: jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: "30d",
              }),
            });
          }
        }
      }
    );
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
