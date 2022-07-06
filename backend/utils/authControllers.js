const connection = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifier = require("email-verify");
const { nanoid } = require("nanoid");
const emailLogin = (req, res) => {
  const { email, password } = req.body;

  // find if user exist
  connection.query(
    `select * from users where email = ?;
    `,
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

        connection.query(
          `select * from yourBiz where user = ?`,
          [id],
          (fetchYourBizErr, fetchYourBizRes) => {
            if (fetchYourBizErr) {
              console.log(fetchYourBizErr);
              res.status(400).json({ msg: "Fetch Biz Error" });
            } else {
              if (!bcrypt.compareSync(password, hashedPass)) {
                res.status(400).json({
                  msg: "Incorrect password",
                });
              } else {
                res.json({
                  ...existCheckRes[0],
                  token: jwt.sign(
                    { id, type: "email" },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "30d",
                    }
                  ),
                  yourBiz: fetchYourBizRes[0] ? fetchYourBizRes[0] : null,
                });
              }
            }
          }
        );
      }
    }
  );
};

const facebookLogin = (req, res) => {
  const { id } = req.body;
  // find if user exist
  connection.query(
    `select * from facebook where id = ?;
    select * from yourBiz where user = ?;
    `,
    [id, id],
    (existCheckErr, existCheckRes) => {
      if (existCheckErr) {
        console.log(existCheckErr);
        res.status(400).json({
          msg: "Error while checking if user exist",
        });
      } else if (existCheckRes[0].length === 0) {
        res.status(400).json({ msg: "You do not exist, Register." });
      } else {
        res.json({
          ...existCheckRes[0][0],
          token: jwt.sign({ id, type: "facebook" }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          }),
          yourBiz: existCheckRes[1][0] ? existCheckRes[1][0] : null,
        });
      }
    }
  );
};

const googleLogin = (req, res) => {
  const { email } = req.body;
  // find if user exist
  connection.query(
    `select * from google where email = ?;
   `,
    [email],
    (existCheckErr, existCheckRes) => {
      if (existCheckErr) {
        console.log(existCheckErr);
        res.status(400).json({
          msg: "Error while checking if user exist",
        });
      } else if (existCheckRes.length === 0) {
        res.status(400).json({ msg: "You do not exist, Register." });
      } else {
        connection.query(
          ` select * from yourBiz where user = ?;`,
          [existCheckRes[0].id],
          (fetchYourBizErr, fetchYourBizRes) => {
            if (fetchYourBizErr) {
              console.log(fetchYourBizErr);
              res.status(400).json({ msg: "Fetch Biz Error" });
            } else {
              res.json({
                ...existCheckRes[0],
                token: jwt.sign(
                  { id: existCheckRes[0].id, type: "google" },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "30d",
                  }
                ),
                yourBiz: fetchYourBizRes[0] ? fetchYourBizRes[0] : null,
              });
            }
          }
        );
      }
    }
  );
};

const emailRegister = (req, res) => {
  const { email, name } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt);

  const id = nanoid(6);
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
                insert into users(id, name, email, password) values(?,?, ?, ?);
                `,
          [id, name, email, password],
          (createUserErr, createUserRes) => {
            if (createUserErr) {
              console.log(createUserErr);
              res.status(400).json({ msg: "Error while creating user" });
            } else {
              connection.query(
                `select * from users where id = ?`,
                [id],
                (selectUserErr, selectUserRes) => {
                  if (selectUserErr) {
                    console.log(selectUserErr);
                  } else {
                    res.json({
                      ...selectUserRes[0],
                      token: jwt.sign(
                        { id, type: "email" },
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
};

const facebookRegister = (req, res) => {
  const sql = `insert into facebook(id, name, email) values (? , ? , ?)`;
  const { email, name, id } = req.body;

  connection.query(
    `select * from facebook where id = ?`,
    [id],
    (checkExistErr, checkExistRes) => {
      if (checkExistErr) {
        console.log(checkExistErr);
        res.status(400).json({
          msg: "Error while checking if user exist",
        });
      } else if (checkExistRes.length > 0) {
        res.status(400).json({ msg: "user already exist." });
      } else {
        connection.query(
          sql,
          [id, name, email],
          (createUserErr, createUserRes) => {
            if (createUserErr) {
              console.log(createUserErr);
              res.status(400).json({ msg: "Error while creating user" });
            } else {
              connection.query(
                `select * from facebook where id = ?`,
                [id],
                (selectUserErr, selectUserRes) => {
                  if (selectUserErr) {
                    console.log(selectUserErr);
                  } else {
                    res.json({
                      ...selectUserRes[0],
                      token: jwt.sign(
                        { id, type: "facebook" },
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
};

const googleRegister = (req, res) => {
  const id = nanoid(9);
  const sql = `insert into google(id, name, email) values ( ? , ?, ?)`;
  const { email, name } = req.body;
  connection.query(
    `select * from facebook where email = ?`,
    [email],
    (checkExistErr, checkExistRes) => {
      if (checkExistErr) {
        console.log(checkExistErr);
        res.status(400).json({
          msg: "Error while checking if user exist",
        });
      } else if (checkExistRes.length > 0) {
        res.status(400).json({ msg: "user already exist." });
      } else {
        connection.query(
          sql,
          [id, name, email],
          (createUserErr, createUserRes) => {
            if (createUserErr) {
              console.log(createUserErr);
              res.status(400).json({ msg: "Error while creating user" });
            } else {
              connection.query(
                `select * from google where email = ?`,
                [email],
                (selectUserErr, selectUserRes) => {
                  if (selectUserErr) {
                    console.log(selectUserErr);
                  } else {
                    res.json({
                      ...selectUserRes[0],
                      token: jwt.sign(
                        { id: selectUserRes[0].id, type: "google" },
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
};

module.exports = {
  googleLogin,
  facebookLogin,
  emailLogin,
  emailRegister,
  facebookRegister,
  googleRegister,
};
