const router = require("express").Router();
const connection = require("../config/db");
const { userProtect } = require("../middlewares/protect");
const { sendJustMessage } = require("../utils/sendEmail");
const RazorPay = require("razorpay");
const razorPayInstance = new RazorPay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

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
    let sql = `select * from orders where id = ?;
      select * from orders, products where orders.id = ? and products.user = ? 
    `;
    connection.query(
      sql,
      [req.params.id, req.params.id, req.user.id],
      (fetchOrderErr, fetchOrderRes) => {
        if (fetchOrderErr) {
          console.log(fetchOrderErr);
          res.status(400).json({ msg: "Error while fetching order" });
        } else {
          const order = fetchOrderRes[0][0];
          const user = fetchOrderRes[1][0];

          if (!user) res.status(400).json({ msg: "Not Authorized" });
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
router.put("/instock", userProtect, (req, res) => {
  try {
    const { status, order } = req.body;
    const sql = `update orders set inStock = ? where id = ?`;
    connection.query(
      sql,
      [status, order.id],
      (updateOrderErr, updateOrderRes) => {
        if (updateOrderErr) {
          console.log(updateOrderErr);
          res.status(400).json({ msg: "update order error" });
        } else {
          if (status === 1) {
            sendJustMessage({
              to: order.phone,
              message: `
*Order Confirmed by Seller*
  
The seller has confirmed that the items you ordered are in stock. Please do your payment to authorize logistics. Vist steeldalal.com/#/order/${order.id} to pay.
  
  `,
            });
          } else {
            sendJustMessage({
              to: order.phone,
              message: `
*Order Out of Stock*
  
We are sorry to break to you that the items you ordered are out of stock. Please try other sellers, vist steeldalal.com/#/products
  
  `,
            });
          }
          res.json({ msg: "updated" });
        }
      }
    );
  } catch (err) {
    console.log(err);
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
          Object.keys(bag).forEach((bagKey, bagIndex) => {
            Object.keys(bag[bagKey].specs).forEach((specKey, specIndex) => {
              connection.query(
                `
              insert into orderSpecs (thickness,t_uom,width,w_uom,height,h_uom,orderId,product, qty) values(?, ?, ?, ?, ?, ?, ?,?, ?)
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
                  bag[bagKey].specs[specKey].yourQty,
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
                      console.log(bag[bagIndex]);
                      sendJustMessage({
                        to: bag[bagKey].seller.phone,
                        message: `
*New Order*

A new order is placed for your product(s) on sale at steeldalal.com

For more details visit steeldalal.com/#/seller/order/${createOrderRes.insertId} to verify the order specifications.
                        `,
                      });
                      sendJustMessage({
                        to: req.user.phone,
                        message: `
*Order placed*

Your order is placed. For more details visit steeldalal.com/#/order/${createOrderRes.insertId}

Once your order specifications are verified by the seller your will receive payment link.
                        `,
                      });
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

router.post("/pay/:id", userProtect, (req, res) => {
  try {
    const details = req.body;
    if (req.user.id !== details.userId)
      res.status(400).json({
        msg: "Not Authorized",
      });
    else {
      const options = {
        amount: details.totalPrice,
        currency: "INR",
        receipt: `receipt_${details.id}`,
        notes: {
          id: details.id,
          name: details.name,
          address: details.address,
          city: details.city,
          state: details.state,
        },
      };
      razorPayInstance.orders.create(options, function (err, order) {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: err.error.description });
        } else {
          res.json({
            msg: order,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post(`/save-payment/:id`, userProtect, (req, res) => {
  try {
    const details = req.body;
    if (req.user.id !== details.userId)
      res.status(400).json({
        msg: "Not Authorized",
      });
    else {
      let body = details.razorpay_order_id + "|" + details.razorpay_payment_id;

      const crypto = require("crypto");
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZOR_PAY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === details.razorpay_signature) {
        connection.query(
          `update orders set isPaid = 1, payment_id = ? , payment_order_id = ? , payment_signature = ? where id = ?`,
          [
            details.razorpay_payment_id,
            details.razorpay_order_id,
            details.razorpay_signature,
            req.params.id,
          ],
          (savePaymentErr, savePaymentRes) => {
            if (savePaymentErr) {
              console.log(savePaymentErr);
              res.status(400).json({ msg: "Payment not verified" });
            } else {
              res.json({ msg: true });
            }
          }
        );
      } else {
        res.status(400).json({ msg: "Payment not verified" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});
module.exports = router;
