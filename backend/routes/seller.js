const router = require("express").Router();
const connection = require("../config/db");

router.get("/", (req, res) => {
  try {
    const sql = `select distinct name, id, state, city, address from users, yourBiz where users.id = yourBiz.user group by id, state, city, address`;
    connection.query(sql, (fetchBizErr, fetchBizRes) => {
      if (fetchBizErr) {
        console.log(fetchBizErr);
        res.status(400).json({ msg: "fetch biz error" });
      } else {
        const sellers = [];
        fetchBizRes.forEach((biz, i) => {
          connection.query(
            `select distinct category from products where user = ?`,
            [biz.id],
            (fetchCategoryErr, fetchCategoryRes) => {
              if (fetchBizErr) {
                console.log(fetchBizErr);
                res.status(400).json({ msg: "fetch biz categories error" });
              } else {
                sellers.push({
                  ...biz,
                  categories: fetchCategoryRes,
                });
                if (i === fetchBizRes.length - 1) res.json({ msg: sellers });
              }
            }
          );
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const sql = `select distinct name, id, state, city, address from users, yourBiz where users.id = ? and yourBiz.user = ? group by id, state, city, address `;
    connection.query(sql, [id, id], (fetchBizErr, fetchBizRes) => {
      if (fetchBizErr) {
        console.log(fetchBizErr);
        res.status(400).json({ msg: "fetch biz error" });
      } else {
        const biz = fetchBizRes[0];
        connection.query(
          `select distinct category from products where user = ?;
             select * from products where user = ? order by id desc 
            `,
          [id, id],
          (fetchCategoryErr, fetchCategoryRes) => {
            if (fetchBizErr) {
              console.log(fetchBizErr);
              res.status(400).json({ msg: "fetch biz categories error" });
            } else {
              res.json({
                msg: {
                  ...biz,
                  categories: fetchCategoryRes[0],
                  products: fetchCategoryRes[1],
                },
              });
            }
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
