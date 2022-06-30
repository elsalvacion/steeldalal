const connection = require("../config/db");
const router = require("express").Router();

router.post("/", (req, res) => {
  try {
    const { image, title } = req.body;
    const sql = `
        insert into category (title, image) values (? , ?);
        `;
    connection.query(
      sql,
      [title, image],
      (insertCategoryErr, insertCategoryRes) => {
        if (insertCategoryErr) {
          console.log(insertCategoryErr);
          res.status(400).json({ msg: "Error while creating category..." });
        } else res.json({ msg: "Category added..." });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/", (req, res) => {
  try {
    let sql = `select * from category`;

    if (req.query.limit) {
      sql += ` limit ${req.query.limit}`;
    }

    connection.query(sql, (fetchCategoryErr, fetchCategoryRes) => {
      if (fetchCategoryErr) {
        console.log(fetchCategoryErr);
        res.status(400).json({ msg: "Error while fetching categories..." });
      } else {
        res.json({
          msg: fetchCategoryRes,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const sql = `select * from category where title = ?`;

    connection.query(
      sql,
      [req.params.id],
      (fetchCategoryErr, fetchCategoryRes) => {
        if (fetchCategoryErr) {
          console.log(fetchCategoryErr);
          res.status(400).json({ msg: "Error while fetching category..." });
        } else {
          res.json({
            msg: fetchCategoryRes[0],
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { title, image } = req.body;
    const sql = `update category set title = ? , image = ? where id = ?`;

    connection.query(
      sql,
      [title, image, req.params.id],
      (updateCategoryErr, updateCategoryRes) => {
        if (updateCategoryErr) {
          console.log(updateCategoryErr);
          res.status(400).json({ msg: "Error while updating category..." });
        } else {
          res.json({
            msg: "Category updated",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const sql = `delete from category where id = ?`;

    connection.query(
      sql,
      [req.params.id],
      (deleteCategoryErr, deleteCategoryRes) => {
        if (deleteCategoryErr) {
          console.log(deleteCategoryErr);
          res.status(400).json({ msg: "Error while deleting category..." });
        } else {
          res.json({
            msg: "Category deleted",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
