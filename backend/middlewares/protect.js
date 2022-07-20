const jwt = require("jsonwebtoken");
const connection = require("../config/db");

const userProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({
          msg: "Not Authorized: No Token",
        });
      }

      const { id, type } = jwt.verify(token, process.env.JWT_SECRET);
      let sql;
      if (type.toLowerCase() === "email") {
        sql = `select * from users where id=?`;
      } else if (type.toLowerCase() === "facebook") {
        sql = `select * from facebook where id=?`;
      } else {
        sql = `select * from google where id=?`;
      }
      connection.query(sql, [id], function (err, result) {
        if (err) {
          throw err;
        }
        const data = result[0];

        if (!data) {
          res.status(401).json({
            msg: "Not Authorized: No Token",
          });
        } else {
          req.user = {
            ...data,
            type,
          };

          next();
        }
      });
    } catch (error) {
      res.status(401).json({
        msg: "Not Authorized: Invalid User",
      });
    }
  } else {
    res.status(401).json({
      msg: "Not Authorized: No Token",
    });
  }
};

const sellerProtect = (req, res, next) => {
  try {
    if (req.user && req.user.isSeller) {
      next();
    } else {
      res.status(401).json({
        msg: "Not authorized as seller",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: "Not authorized as seller",
    });
  }
};

const adminProtect = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin === 1) {
      next();
    } else {
      res.status(401).json({
        msg: "Not authorized as admin",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: "Not authorized as admin",
    });
  }
};

module.exports = {
  userProtect,
  adminProtect,
  sellerProtect,
};
