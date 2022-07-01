const router = require("express").Router();
const connection = require("../config/db");
const { userProtect } = require("../middlewares/protect");
router.post("/", userProtect, (req, res) => {
  try {
    const {
      totalPrice,
      shippingPrice,
      state,
      city,
      address,
      name,
      phone,
      email,
      bag,
    } = req.body;

    const sql = `
  insert into orders (name, email, phone, state, city, address, totalPrice, shippingPrice, userId) values (?, ?, ?, ? , ? , ?, ? , ? , ?);
  `;

    connection.query(
      sql,
      [
        name,
        email,
        phone,
        state,
        city,
        address,
        totalPrice,
        shippingPrice,
        req.user.id,
      ],
      (createOrderErr, createOrderRes) => {
        if (createOrderErr) {
          console.log(createOrderErr);
          res.status(400).json({ msg: "Error while creating order" });
        } else {
          Object.keys(bag).forEach((bagKey, bagIndex) => {
            Object.keys(bag[bagKey].specs).forEach((specKey, specIndex) => {
              connection.query(
                `
              insert into orderSpecs (thickness,t_uom,width,w_uom,height,h_uom,orderId,product) values(?, ?, ?, ?, ?, ?, ?, ?)
              `,
                [
                  bag[bagKey].specs[specKey].thickness,
                  bag[bagKey].specs[specKey].t_uom,
                  bag[bagKey].specs[specKey].width,
                  bag[bagKey].specs[specKey].w_uom,
                  bag[bagKey].specs[specKey].height,
                  bag[bagKey].specs[specKey].h_uom,
                  createOrderRes.insertId,
                  bag[bagKey].id,
                ],
                (createOrderSpecErr, createOrderSpecRes) => {
                  if (createOrderSpecErr) {
                    console.log(createOrderSpecErr);
                    res.status(400).json({ msg: "Create Order Specs error" });
                  } else {
                    if (
                      bagIndex === Object.keys(bag).length - 1 &&
                      specIndex === Object.keys(bag[bagKey].specs).length - 1
                    ) {
                      res.json({
                        msg: {
                          id: createOrderRes.insertId,
                        },
                      });
                    }
                  }
                }
              );
            });
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
