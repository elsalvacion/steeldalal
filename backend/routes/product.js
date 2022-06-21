const connection = require("../config/db");
const path = require("path");
const { nanoid } = require("nanoid");
const { userProtect } = require("../middlewares/protect");
const router = require("express").Router();

router.post("/", userProtect, (req, res) => {
  try {
    const {
      title,
      discount,
      price,
      qty,
      category,
      type,
      brand,
      details,
      images,
      specs,
    } = req.body;

    const sql = `insert into products(title, discount, price, rating, qty, category, type, brand, details,detailsText, image, user) values(?,?,?,?,?,?,?,?,?, ?, ?, ?); `;

    connection.query(
      sql,
      [
        title,
        discount,
        price,
        0,
        qty,
        category,
        type,
        brand,
        details.html,
        details.text,
        images[0].image,
        req.user.id,
      ],
      (createProductErr, createProductRes) => {
        if (createProductErr) {
          console.log(createProductErr);
          res.status(400).json({ msg: "Error while creating product" });
        } else {
          const productId = createProductRes.insertId;
          let imagesQuery = "insert into images (product, image) values ";
          let specsQuery =
            "insert into  productSpecs (thickness, t_uom, width, w_uom, height, h_uom, product, qty, price) values";
          images.forEach((image, i) => {
            if (i !== images.length - 1) {
              imagesQuery += ` (${productId}, "${image.image}"), `;
            } else {
              imagesQuery += ` (${productId}, "${image.image}");`;
            }
          });
          specs.forEach((spec, i) => {
            if (i !== specs.length - 1) {
              specsQuery += ` (${spec.thickness}, "${spec.t_uom}", ${spec.width}, "${spec.w_uom}", ${spec.height}, "${spec.h_uom}", ${productId}, ${spec.qty},${spec.price}), `;
            } else {
              specsQuery += ` (${spec.thickness}, "${spec.t_uom}", ${spec.width}, "${spec.w_uom}", ${spec.height}, "${spec.h_uom}", ${productId}, ${spec.qty},${spec.price});`;
              imagesQuery += specsQuery;
            }
          });
          connection.query(imagesQuery, (insertImagesErr, insertImagesRes) => {
            if (insertImagesErr) {
              console.log(insertImagesErr);
              res.status(400).json({ msg: "Error while inserting images" });
            } else {
              res.json({ msg: "Product created" });
            }
          });
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

router.get("/your-products", userProtect, (req, res) => {
  try {
    let sql = `select * from products where user = ? order by createdAt desc`;

    if (req.query.limit) {
      sql += ` limit ${req.query.limit}`;
    }
    connection.query(
      sql,
      [req.user.id],
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
      `select * from products where id = ? ;
      select image from images where product = ? ;
      select * from productSpecs where product = ?
      `,
      [req.params.id, req.params.id, req.params.id],
      (fetchProductErr, fetchProductRes) => {
        if (fetchProductErr) {
          console.log(fetchProductErr);
          res.status(400).json({ msg: "Error while fetching product" });
        } else {
          const images = [];
          if (fetchProductRes[1].length > 1) {
            fetchProductRes[1].forEach((product) => images.push(product.image));
          } else images.push(fetchProductRes[0][0].image);

          connection.query(
            `select * from users where id = ? `,
            [fetchProductRes[0][0].user],
            (fetchUserErr, fetchUserRes) => {
              if (fetchProductErr) {
                console.log(fetchUserErr);
              } else {
                res.json({
                  msg: {
                    ...fetchProductRes[0][0],
                    images,
                    specs: fetchProductRes[2],
                    seller: fetchUserRes[0],
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
      specs,
    } = req.body;
    let sql = `update products set title = ?, discount = ?, price = ?, rating = ?, details = ?, detailsText = ?, qty = ?, category = ? , type = ? , brand = ?  where id = ?;`;

    specs.forEach((spec) => {
      if (spec.id) {
        sql += `update productSpecs set thickness = ${spec.thickness}, t_uom = "${spec.t_uom}", width = ${spec.width}, w_uom = "${spec.w_uom}", height = ${spec.height}, h_uom = "${spec.h_uom}", product = ${spec.product} , qty = ${spec.qty}, price = ${spec.price} where id = ${spec.id}; `;
      } else {
        sql += `
           insert into  productSpecs (thickness, t_uom, width, w_uom, height, h_uom, product, qty, price) values (${spec.thickness}, "${spec.t_uom}", ${spec.width}, "${spec.w_uom}", ${spec.height}, "${spec.h_uom}", ${req.params.id}, ${spec.qty},${spec.price});
           `;
      }
    });

    connection.query(
      sql,
      [
        title,
        discount,
        price,
        rating,
        details.html,
        details.text,
        qty,
        category,
        type,
        brand,
        req.params.id,
      ],
      (updateProductErr, updateProductRes) => {
        if (updateProductErr) {
          console.log(updateProductErr);
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
          console.log(deleteProductErr);
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
