const router = require("express").Router();
const connection = require("../config/db");
const { userProtect } = require("../middlewares/protect");
const { sendJustMessage } = require("../utils/sendEmail");

router.get("/", userProtect, (req, res) => {
  try {
    let sql = `select * from orders where userId = ? order by id desc`;
    if (req.query.limit) {
      sql += ` limit ${req.query.limit}`;
    }

    connection.query(sql, [req.user.id], (fetchOrdersErr, fetchOrdersRes) => {
      if (fetchOrdersErr) {
        console.log(fetchOrdersErr);
        res.status(400).json({ msg: "Error while fetching orders" });
      } else {
        res.json({ msg: fetchOrdersRes });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/seller", userProtect, (req, res) => {
  try {
    let sql = `select * from orders where userId = ? order by id desc`;
    if (req.query.limit) {
      sql += ` limit ${req.query.limit}`;
    }

    connection.query(sql, [req.user.id], (fetchOrdersErr, fetchOrdersRes) => {
      if (fetchOrdersErr) {
        console.log(fetchOrdersErr);
        res.status(400).json({ msg: "Error while fetching orders" });
      } else {
        res.json({ msg: fetchOrdersRes });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:id", userProtect, (req, res) => {
  try {
    let sql = `select * from orders where userId = ? and id = ?`;

    connection.query(
      sql,
      [req.user.id, req.params.id],
      (fetchOrderErr, fetchOrderRes) => {
        if (fetchOrderErr) {
          console.log(fetchOrderErr);
          res.status(400).json({ msg: "Error while fetching order" });
        } else {
          const order = fetchOrderRes[0];
          const products = [];
          connection.query(
            `select distinct product from orderSpecs where orderId = ? `,
            [order.id],
            (fetchOrderProductErr, fetchOrderProductRes) => {
              if (fetchOrderProductErr) {
                console.log(fetchOrderProductErr);
                res.status(400).json({ msg: "Fetching order products error" });
              } else {
                fetchOrderProductRes.forEach(({ product }, productIdx) => {
                  connection.query(
                    `select * from products where id = ?;
                  select * from orderSpecs where product = ?  and orderId = ? 
                  `,
                    [product, product, order.id],
                    (fetchOrderSpecsErr, fetchOrderSpecRes) => {
                      if (fetchOrderSpecsErr) {
                        console.log(fetchOrderSpecsErr);
                        res
                          .status(400)
                          .json({ msg: "Error while fetching specs" });
                      } else {
                        products.push({
                          ...fetchOrderSpecRes[0][0],
                          specs: fetchOrderSpecRes[1],
                        });

                        if (productIdx === fetchOrderProductRes.length - 1) {
                          res.json({
                            msg: {
                              ...order,
                              products,
                            },
                          });
                        }
                      }
                    }
                  );
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/seller/:id", userProtect, (req, res) => {
  try {
    let sql = `select * from orders, products where products.id = ? and products.user = ?`;

    connection.query(
      sql,
      [req.params.id, req.user.id],
      (fetchOrderErr, fetchOrderRes) => {
        if (fetchOrderErr) {
          console.log(fetchOrderErr);
          res.status(400).json({ msg: "Error while fetching order" });
        } else {
          const order = fetchOrderRes[0];
          if (!order) res.status(400).json({ msg: "Not Authorized" });
          else {
            const products = [];
            connection.query(
              `select distinct product from orderSpecs where orderId = ?  `,
              [order.id],
              (fetchOrderProductErr, fetchOrderProductRes) => {
                if (fetchOrderProductErr) {
                  console.log(fetchOrderProductErr);
                  res
                    .status(400)
                    .json({ msg: "Fetching order products error" });
                } else {
                  fetchOrderProductRes.forEach(({ product }, productIdx) => {
                    connection.query(
                      `select * from products where id = ?;
                  select * from orderSpecs where product = ?  and orderId = ? 
                  `,
                      [product, product, order.id],
                      (fetchOrderSpecsErr, fetchOrderSpecRes) => {
                        if (fetchOrderSpecsErr) {
                          console.log(fetchOrderSpecsErr);
                          res
                            .status(400)
                            .json({ msg: "Error while fetching specs" });
                        } else {
                          products.push({
                            ...fetchOrderSpecRes[0][0],
                            specs: fetchOrderSpecRes[1],
                          });

                          if (productIdx === fetchOrderProductRes.length - 1) {
                            res.json({
                              msg: {
                                ...order,
                                products,
                              },
                            });
                          }
                        }
                      }
                    );
                  });
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

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
          const bagKey = Object.keys(bag).forEach((bagKey, bagIndex) => {
            sellers[bag[bagKey].seller.phone] = bag[bagKey].seller.phone;
            Object.keys(bag[bagKey].specs).forEach((specKey, specIndex) => {
              const { thickness, t_uom, width, w_uom, height, h_uom, yourQty } =
                bag[bagKey].specs[specKey];
              connection.query(
                `
              insert into orderSpecs (thickness,t_uom,width,w_uom,height,h_uom,orderId,product, qty) values(?, ?, ?, ?, ?, ?, ?, ?, ?)
              `,
                [
                  thickness,
                  t_uom,
                  width,
                  w_uom,
                  height,
                  h_uom,
                  createOrderRes.insertId,
                  bag[bagKey].id,
                  yourQty,
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
                      Object.keys(sellers).forEach((seller, sellerIdx) => {
                        if (Object.keys(sellers).length - 1 === sellerIdx) {
                          res.json({
                            msg: {
                              id: createOrderRes.insertId,
                            },
                          });
                        }
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
