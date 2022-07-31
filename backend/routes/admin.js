const connection = require("../config/db");
const router = require("express").Router();
const { userProtect, adminProtect } = require("../middlewares/protect");
const { sendMessage } = require("../utils/sendEmail");

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
                      if (fetchOrderSpecRes[0][0])
                        products.push({
                          ...fetchOrderSpecRes[0][0],
                          specs: fetchOrderSpecRes[1],
                        });
                      else
                        products.push({
                          id: fetchOrderSpecRes[1][0].product,
                          title: fetchOrderSpecRes[1][0].productTitle,
                          image: fetchOrderSpecRes[1][0].productImage,
                          brand: fetchOrderSpecRes[1][0].productBrand,
                          grade: fetchOrderSpecRes[1][0].productGrade,
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
                if (req.body.isConfirmed && req.body.isConfirmed === 1) {
                  connection.query(
                    `
                  select * from users where id = ?;
                  select * from facebook where id = ? ;
                  select * from google where id = ?;
                  `,
                    [order.userId, order.userId, order.userId],
                    (fetchSellerErr, fetchSellerRes) => {
                      if (fetchSellerErr) {
                        console.log(fetchSellerErr);
                        res.status(400).json({ msg: "Could not fetch seller" });
                      } else {
                        const user =
                          fetchSellerRes[0][0] ||
                          fetchSellerRes[1][0] ||
                          fetchSellerRes[2][0];
                        sendMessage(
                          {
                            to: user.phone,
                            message: `
Order Payment Confirmed

The payment is made and confirmed for an order. Please visit steeldalal.com/#/order/seller/${order.id} for specification and more details about the order to proceed with packaging of the products for pickup. 
                      `,
                          },
                          res
                        );
                      }
                    }
                  );
                } else if (req.body.isDelivered && req.body.isDelivered === 1) {
                  sendMessage(
                    {
                      to: order.phone,
                      message: `
Order Marked As Delivered

Your order is marked as delivered. If this is an error or you have any other complain that you might want to lunch. Please contact us at steeldalal.com
                  `,
                    },
                    res
                  );
                } else {
                  res.json({ msg: "Updated" });
                }
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
    select * from users order by updatedAt desc;
    select * from google order by updatedAt desc;
    select * from facebook order by updatedAt desc;
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
          if (user) {
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
          } else {
            res.status(400).json({ msg: "User not available" });
          }
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
    const sql = `
    select * from users where id = ? ;
    select * from google where id  = ?;
    select * from facebook where id = ? 
    `;
    const { id } = req.params;
    connection.query(sql, [id, id, id], (fetchUsersErr, fetchUserRes) => {
      if (fetchUsersErr) {
        console.log(fetchUsersErr);
        res.status(400).json({ msg: "Fetch user error" });
      } else {
        const user =
          fetchUserRes[0][0] || fetchUserRes[1][0] || fetchUserRes[2][0];
        if (user) {
          const isAdmin = isNaN(req.body.isAdmin)
            ? user.isAdmin
            : req.body.isAdmin;
          const isPremium = isNaN(req.body.isPremium)
            ? user.isPremium
            : req.body.isPremium;

          if (req.body.yourBiz && !isNaN(req.body.yourBiz.isVerified)) {
            const isSeller = req.body.yourBiz.isVerified === 0 ? 0 : 1;
            connection.query(
              `
              update yourBiz set isVerified = ? where user  = ?;
              update users set isSeller = ${isSeller} where id  = ?;
              update facebook set isSeller = ${isSeller} where id  = ?;  
              update google set isSeller = ${isSeller} where id  = ?;  
              `,
              [req.body.yourBiz.isVerified, id, id, id, id],
              (updateBizErr, updateBizRes) => {
                if (updateBizErr) {
                  console.log(updateBizErr);
                  res.status(400).json({ msg: "update biz error" });
                } else {
                  res.json({ msg: "biz updated" });
                }
              }
            );
          } else {
            let query;
            if (fetchUserRes[1][0]) {
              query = `update google set isAdmin = ? , isPremium = ? where id = ?`;
            } else if (fetchUserRes[2][0]) {
              query = `update facebook set isAdmin = ? , isPremium = ? where id = ?`;
            } else {
              query = `update users set isAdmin = ? , isPremium = ? where id = ?`;
            }

            connection.query(
              query,
              [isAdmin, isPremium, id],
              (updateUserErr, updateUserRes) => {
                if (updateUserErr) {
                  console.log(updateUserErr);
                  res.status(400).json({ msg: "Could not update user" });
                } else {
                  res.json({ msg: "user updated" });
                }
              }
            );
          }
        } else {
          res.status(400).json({ msg: "User not available" });
        }
      }
    });
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
    connection.query(
      `select * from products order by createdAt desc`,
      (fetchProductsErr, fetchProductsRes) => {
        if (fetchProductsErr) {
          res.status(400).json({ msg: "Error while fetching products" });
        } else {
          res.json({
            msg: {
              products: fetchProductsRes,
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

router.put("/product/:id", userProtect, adminProtect, (req, res) => {
  try {
    connection.query(
      `update products set isBlocked = ?  where id = ?`,
      [req.body.isBlocked, req.params.id],
      (updateProductErr, updateProductRes) => {
        if (updateProductErr) {
          console.log(updateProductErr);
          res.status(400).json({ msg: "update product error" });
        } else {
          const { id } = req.params;
          connection.query(
            `
          select phone from users where products.user = users.id and products.id = ?;
          select phone from facebook where products.user = users.id and products.id = ?;
          select phone from google where products.user = users.id and products.id = ?;
          `,
            [id, id, id],
            (fetchPhoneErr, fetchPhoneRes) => {
              if (fetchPhoneErr) {
                console.log(fetchPhoneErr);
                res.status(400).json({ msg: "Fetch phone no. error" });
              } else {
                console.log(fetchPhoneRes);
                sendMessage(
                  {
                    to: process.env.ADMIN_NUMBER,
                    message: `
Product Blocked

A product you put on sell at steeldalal.com has been blocked. Visit steeldalal.com/#/profile to manage your product catalog.
              `,
                  },
                  res
                );
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

module.exports = router;
