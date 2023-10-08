const connection = require("../DB/shopDB");
const ListOfImagesForRequest = require("../utils/funcs");
const { uploadFile } = require("../utils/multer");
const productRoutes = require("express").Router();

productRoutes.post("/add", uploadFile.single("img"), (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const img = ListOfImagesForRequest(req?.files || [], body.fileUploadPath);
    const addQuery = `INSERT INTO Products VALUES (NULL,"${body.title}","${body.price}","${+body.count}","${img}","${body.popularity}","${body.sale}","${body.colors}","${body.description}","${body.url}","${body.categoryID}")`;
    connection.query(addQuery, (err, results) => {
      if (err) {
        res.send(null);
        console.log(err);
      } else {
        res.send(results);
      }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.get("/list", (req, res, next) => {
  try {
    let selectAllProductQuery = `SELECT * FROM Products`;
    connection.query(selectAllProductQuery, (err, results) => {
      if (err) {
        res.send(null);
      } else {
        res.send(results);
      }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.delete("/:productID", (req, res, next) => {
  try {
    let productID = req.params.productID;
    let deleteProductQuery = `DELETE FROM Products WHERE id ="${productID}"`;
    connection.query(deleteProductQuery, (err, results) => {
      if (err) {
        res.send(null);
      } else {
        res.send(results);
      }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.put("/:productID", (req, res, next) => {
  try {
    const body = req.body;
    const productID = req.params.productID;
    let updateProductQuery = `UPDATE Products SET title="${body.title}",price=${body.price},count=${body.count},img="${body.img}",popularity=${body.popularity},sale=${body.sale},colors= ${body.colors} WHERE id="${productID}"`;
    connection.query(updateProductQuery, (err, results) => {
      if (err) {
        res.send(null);
      } else {
        res.send(results);
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = productRoutes;
