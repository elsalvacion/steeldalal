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
      grade,
      images,
      specs,
    } = req.body;

    const sql = `insert into products(title, discount, price, rating, qty, category, type, brand,grade, details,detailsText, image, user) values(?,?,?,?,?,?,?,?,?,?, ?,?, ?); `;

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
        grade,
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
          let imagesQuery = "";
          let specsQuery = "";
          if (category.toLowerCase().includes("sheet")) {
            specs.forEach(
              ({
                thickness,
                t_uom,
                length,
                l_uom,
                width,
                w_uom,
                qty,
                price,
                moq,
              }) => {
                specsQuery += `
            insert into  productSpecs (thickness, t_uom, width, w_uom, length, l_uom, product, qty, price, moq) values(${thickness}, "${t_uom}", ${width}, "${w_uom}", ${length}, "${l_uom}", ${productId} , ${qty}, ${price}, ${moq});
            `;
              }
            );
          } else if (category.toLowerCase().includes("coil")) {
            specs.forEach(
              ({ thickness, t_uom, width, w_uom, qty, price, moq }) => {
                specsQuery += `
            insert into  productSpecs (thickness, t_uom, width, w_uom, product, qty, price, moq) values(${thickness}, "${t_uom}", ${width}, "${w_uom}", ${productId} , ${qty}, ${price}, ${moq});
            `;
              }
            );
          } else {
            specs.forEach(({ thickness, t_uom, qty, price, moq }) => {
              specsQuery += `
            insert into  productSpecs (thickness, t_uom, product, qty, price, moq) values(${thickness}, "${t_uom}", ${productId} , ${qty}, ${price}, ${moq});
            `;
            });
          }

          images.forEach((image) => {
            imagesQuery += `insert into images (product, image) values (${productId}, "${image.image}");`;
          });
          imagesQuery += specsQuery;
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
      `select * from products order by id desc where isBlocked = 0`,
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
    let sql = `select * from products where user = ? order by id desc`;

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
    select * from products where category = ? and isBlocked = 0 order by id desc limit 10;
    select * from products where category = ? and isBlocked = 0 order by id desc limit 10;
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
    select * from products where category = ? and isBlocked = 0 order by id desc limit 25  ;
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
        // console.log(fetchProductRes);
        if (fetchProductErr) {
          console.log(fetchProductErr);
          res.status(400).json({ msg: "Error while fetching product" });
        } else {
          const images = [];
          if (fetchProductRes[1].length > 0) {
            fetchProductRes[1].forEach((product) => images.push(product.image));
          } else images.push(fetchProductRes[0][0].image);

          connection.query(
            `select name, city, state, phone, isPremium from users where id = ?;
            select name, city, state, phone, isPremium from google where id = ?;
            select name, city, state, phone, isPremium from facebook where id = ?;
            `,
            [
              fetchProductRes[0][0].user,
              fetchProductRes[0][0].user,
              fetchProductRes[0][0].user,
            ],
            (fetchUserErr, fetchUserRes) => {
              if (fetchProductErr) {
                console.log(fetchUserErr);
              } else {
                res.json({
                  msg: {
                    ...fetchProductRes[0][0],
                    images,
                    specs: fetchProductRes[2],
                    seller: {
                      ...fetchUserRes[0][0],
                      ...fetchUserRes[1][0],
                      ...fetchUserRes[2][0],
                    },
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
    const { title, details, qty, category, type, brand, specs, grade } =
      req.body;
    let sql = `update products set title = ?, details = ?, detailsText = ?, qty = ?, category = ? , type = ? , brand = ?, grade = ?  where id = ?;`;
    let specsQuery = "";
    if (category.toLowerCase().includes("sheet")) {
      specs.forEach(
        ({
          thickness,
          t_uom,
          length,
          l_uom,
          width,
          w_uom,
          qty,
          price,
          moq,
          id,
        }) => {
          if (id)
            specsQuery += `
      update productSpecs set thickness = ${thickness}, t_uom = "${t_uom}",  width = ${width}, w_uom = "${w_uom}", length = ${length}, l_uom = "${l_uom}", qty =  ${qty}, price = ${price}, moq = ${moq} where id = ${id};
      `;
          else
            specsQuery += `
            insert into  productSpecs (thickness, t_uom, width, w_uom, length, l_uom, product, qty, price, moq) values(${thickness}, "${t_uom}", ${width}, "${w_uom}", ${length}, "${l_uom}", ${req.params.id} , ${qty}, ${price}, ${moq});
            `;
        }
      );
    } else if (category.toLowerCase().includes("coil")) {
      specs.forEach(
        ({ thickness, t_uom, width, w_uom, qty, price, moq, id }) => {
          if (id)
            specsQuery += `
          update productSpecs set thickness = ${thickness}, t_uom = "${t_uom}",  width = ${width}, w_uom = "${w_uom}",  qty =  ${qty}, price = ${price}, moq = ${moq} where id = ${id};
          `;
          else
            specsQuery += `
            insert into  productSpecs (thickness, t_uom, width, w_uom, product, qty, price, moq) values(${thickness}, "${t_uom}", ${width}, "${w_uom}",  ${req.params.id} , ${qty}, ${price}, ${moq});
            `;
        }
      );
    } else {
      specs.forEach(({ thickness, t_uom, qty, price, moq, id }) => {
        if (id)
          specsQuery += `
      update productSpecs set thickness = ${thickness}, t_uom = "${t_uom}",  qty =  ${qty}, price = ${price}, moq = ${moq} where id = ${id};
      `;
        else
          specsQuery += `
            insert into  productSpecs (thickness, t_uom, product, qty, price, moq) values(${thickness}, "${t_uom}",  ${req.params.id} , ${qty}, ${price}, ${moq});
            `;
      });
    }

    sql += specsQuery;

    connection.query(
      sql,
      [
        title,
        details.html,
        details.text,
        qty,
        category,
        type,
        brand,
        grade,
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

router.post("/search", (req, res) => {
  const { keyword } = req.body;
  const sql = `select * from products where title like '%${keyword}%' or brand like '%${keyword}%' or type like '%${keyword}%' or  category like '%${keyword}%' order by createdAt desc`;
  connection.query(sql, (searchErr, searchRes) => {
    if (searchErr) {
      console.log(searchErr);
      res.status(400).json({ msg: "search engine error" });
    } else {
      res.json({ msg: searchRes });
    }
  });
});

module.exports = router;
