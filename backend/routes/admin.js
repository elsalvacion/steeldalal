const connection = require("../config/db");
const router = require("express").Router();
const { userProtect, adminProtect } = require("../middlewares/protect");

router.get("/orders", userProtect, adminProtect, (req, res) => {
  try {
    let sql = `
    select * from orders order by id desc;
    select count(id) from orders;
    `;

    connection.query(sql, (fetchOrdersErr, fetchOrdersRes) => {
      if (fetchOrdersErr) {
        console.log(fetchOrdersErr);
        res.status(400).json({ msg: "Error while fetching orders" });
      } else {
        const total = parseInt(fetchOrdersRes[1][0]["count(id)"]);

        res.json({
          msg: {
            orders: fetchOrdersRes[0],
            total,
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/order/:id", userProtect, adminProtect, (req, res) => {
  try {
    let sql = `select * from orders where  id = ?`;

    connection.query(sql, [req.params.id], (fetchOrderErr, fetchOrderRes) => {
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/order/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from orders where id = ?`,
      [req.params.id],
      (fetchOrderErr, fetchOrderRes) => {
        if (fetchOrderErr) {
          console.log(fetchOrderErr);
          res.status(400).json({ msg: "Could not fetch order" });
        } else {
          const order = fetchOrderRes[0];
          const isDelivered = isNaN(req.body.isDelivered)
            ? order.isDelivered
            : req.body.isDelivered;
          const isConfirmed = isNaN(req.body.isConfirmed)
            ? order.isConfirmed
            : req.body.isConfirmed;
          const isPaid = isNaN(req.body.isPaid)
            ? order.isPaid
            : req.body.isPaid;
          connection.query(
            `update orders set isDelivered = ? , isPaid = ?, isConfirmed = ? where id = ?`,
            [isDelivered, isPaid, isConfirmed, req.params.id],
            (updateOrderErr, updateOrderRes) => {
              if (updateOrderErr) {
                console.log(updateOrderErr);
                res.status(400).json({ msg: "Could not update order" });
              } else {
                res.json({ msg: "order updated" });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.delete("/order/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `delete from orders where id = ?`,
      [req.params.id],
      (deleteOrderErr, deleteOrderRes) => {
        if (deleteOrderErr) {
          console.log(deleteOrderErr);
          res.status(400).json({ msg: "Delete order error" });
        } else {
          res.json({ msg: "Order deleted" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/users", userProtect, adminProtect, (req, res) => {
  try {
    const sql = `
    select * from users;
    select * from google;
    select * from facebook;
    `;
    connection.query(sql, (fetchUsersErr, fetchUsersRes) => {
      if (fetchUsersErr) {
        console.log(fetchUsersErr);
        res.status(400).json({ msg: "Fetch users error" });
      } else {
        res.json({
          msg: {
            users: [
              ...fetchUsersRes[0],
              ...fetchUsersRes[1],
              ...fetchUsersRes[2],
            ],
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/user/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `select * from users where id = ?;
      select * from facebook where id = ?;
      select * from google where id = ?;
      `,
      [req.params.id, req.params.id, req.params.id],
      (existCheckErr, existCheckRes) => {
        if (existCheckErr) {
          console.log(existCheckErr);
          res.status(400).json({
            msg: "fetching user error",
          });
        } else {
          const user =
            existCheckRes[0][0] || existCheckRes[1][0] || existCheckRes[2][0];

          connection.query(
            `select * from yourBiz where user = ?`,
            [req.params.id],
            (fetchYourBizErr, fetchYourBizRes) => {
              if (fetchYourBizErr) {
                console.log(fetchYourBizErr);
                res.status(400).json({ msg: "Fetch Biz Error" });
              } else {
                res.json({
                  msg: {
                    ...user,
                    yourBiz: fetchYourBizRes[0] ? fetchYourBizRes[0] : null,
                  },
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/user/:id", userProtect, adminProtect, (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.delete("/user/:id", userProtect, adminProtect, (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/products", userProtect, adminProtect, (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/product/:id", userProtect, adminProtect, (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
