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
      qty,
      category,
      type,
      brand,
      details,
      image,
    } = req.body;

    const sql = `insert into products(title, discount, price, rating, qty, category, type, brand, details, image) values(?,?,?,?,?,?,?,?, ?, ?)`;

    connection.query(
      sql,
      [
        title,
        discount,
        price,
        rating,
        qty,
        category,
        type,
        brand,
        details,
        image,
      ],
      (createProductErr, createProductRes) => {
        if (createProductErr) {
          console.log(createProductErr);
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
    const files = req.files;
    const fileKeys = Object.keys(req.files);
    const images = [];
    const uploadPath = path.join(path.resolve(), "public", "uploads");
    if (!req.files) {
      res.status(400).json({ msg: `Please upload a files` });
    }

    fileKeys.forEach((fileKey, i) => {
      const file = files[fileKey];
      const id = nanoid();
      file.name = `${id}${path.parse(file.name).ext}`;

      file.mv(`${uploadPath}/${file.name}`, async (err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Error while uploading file" });
        } else {
          images.push({
            id,
            image: `uploads/${file.name}`,
          });
          if (i === fileKeys.length - 1) res.json({ msg: images });
        }
      });
    });
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

router.post("/latest", (req, res) => {
  try {
    const sql = `
    select * from products where category = ? order by createdAt desc limit 10;
    select * from products where category = ? order by createdAt desc limit 10
    `;
    connection.query(
      sql,
      [req.body.category.first, req.body.category.second],
      (fetchProductsErr, fetchProductsRes) => {
        if (fetchProductsErr) {
          console.log(fetchProductsErr);
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

router.post("/category", (req, res) => {
  try {
    const sql = `
    select * from products where category = ? order by createdAt desc limit 25;
    `;
    connection.query(
      sql,
      [req.body.category],
      (fetchProductsErr, fetchProductsRes) => {
        if (fetchProductsErr) {
          console.log(fetchProductsErr);
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
