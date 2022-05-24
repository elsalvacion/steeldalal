const connection = require("../config/db");
const path = require("path");
const { nanoid } = require("nanoid");
const router = require("express").Router();

router.post("/", (req, res) => {
  try {
    const {
      title,
      discount,
      price,
      rating,
      details,
      qty,
      category,
      type,
      brand,
    } = req.body;

    connection.query(
      `insert into products(title, discount, price, rating, details, qty, category, type, brand) values(?,?,?,?,?,?,?,?,?)`,
      [title, discount, price, rating, details, qty, category, type, brand],
      (createProductErr, createProductRes) => {
        if (createProductErr) {
          res.status(400).json({ msg: "Error while creating product" });
        } else {
          res.json({ msg: "Product created" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post("/upload", (req, res) => {
  try {
    const file = req.files.file;
    file.name = `${nanoid()}${path.parse(file.name).ext}`;
    if (!req.files) {
      res.status(400).json({ msg: `Please upload a file` });
    } else if (file.size > process.env.FILE_SIZE) {
      res.status(400).json({ msg: `File size greater than 5MB` });
    } else {
      file.mv(`${process.env.FILE_PATH}/${file.name}`, async (err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Error while uploading file" });
        } else res.json({ msg: `${process.env.FILE_PATH}/${file.name}` });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/", (req, res) => {
  try {
    connection.query(
      `select * from products order by createdAt desc`,
      (fetchProductsErr, fetchProductsRes) => {
        if (fetchProductsErr) {
          res.status(400).json({ msg: "Error while fetching products" });
        } else {
          res.json({ msg: fetchProductsRes });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    connection.query(
      `select * from products where id = ?`,
      [req.params.id],
      (fetchProductErr, fetchProductRes) => {
        if (fetchProductErr) {
          res.status(400).json({ msg: "Error while fetching product" });
        } else {
          res.json({ msg: fetchProductRes[0] });
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
    const {
      title,
      discount,
      price,
      rating,
      details,
      qty,
      category,
      type,
      brand,
    } = req.body;

    connection.query(
      `update products set title = ?, discount = ?, price = ?, rating = ?, details = ?, qty = ?, category = ? , type = ? , brand = ?  where id = ?`,
      [
        title,
        discount,
        price,
        rating,
        details,
        qty,
        category,
        type,
        brand,
        req.params.id,
      ],
      (updateProductErr, updateProductRes) => {
        if (updateProductErr) {
          res.status(400).json({ msg: "Error while updating product" });
        } else {
          res.json({ msg: "Product updated" });
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
    connection.query(
      `delete from products where id = ?`,
      [req.params.id],
      (deleteProductErr, deleteProductRes) => {
        if (deleteProductErr) {
          res.status(400).json({ msg: "Error while deleting product" });
        } else {
          res.json({ msg: deleteProductRes[0] });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
