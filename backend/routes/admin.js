const connection = require("../config/db");
const router = require("express").Router();
const { userProtect, adminProtect } = require("../middlewares/protect");

router.get("/orders", userProtect, adminProtect, (req, res) => {
  try {
    let sql = `
    select * from orders order by id desc LIMIT ? OFFSET ? ;
    select count(id) from orders;
    `;
    const { limit, page } = req.query;

    connection.query(
      sql,
      [parseInt(limit), (parseInt(page) - 1) * limit],
      (fetchOrdersErr, fetchOrdersRes) => {
        if (fetchOrdersErr) {
          console.log(fetchOrdersErr);
          res.status(400).json({ msg: "Error while fetching orders" });
        } else {
          const total = parseInt(fetchOrdersRes[1][0]["count(id)"]);
          const pagination = {};
          if (parseInt(page) * limit < total) {
            pagination.next = {
              page: parseInt(page) + 1,
              limit: parseInt(limit),
            };
          }

          if ((parseInt(page) - 1) * limit > 0) {
            pagination.prev = {
              page: page - 1,
              limit: parseInt(limit),
            };
          }
          res.json({
            msg: {
              orders: fetchOrdersRes[0],
              total,
              ...pagination,
            },
          });
        }
      }
    );
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
          const isPaid = isNaN(req.body.isPaid)
            ? order.isPaid
            : req.body.isPaid;
          connection.query(
            `update orders set isDelivered = ? , isPaid = ? where id = ?`,
            [isDelivered, isPaid, req.params.id],
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/user/:id", userProtect, adminProtect, (req, res) => {
  try {
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
