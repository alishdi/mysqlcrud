const connection = require("../DB/shopDB");

const orderRoutes = require("express").Router();

orderRoutes.post("/add", (req, res, next) => {
  try {
    const body = req.body;
    const date = new Date().toLocaleDateString("fa-IR").toString();
    const hour = new Date().getHours().toString();
    const addQuery = `INSERT INTO Orders VALUES (NULL,"${body.userID}","${body.productID}","${date}","${hour}","${body.price}","${body.off}","${body.sale}","${body.popularity}","${body.count}","${body.isActive}")`;
    connection.query(addQuery, (err, results) => {
      if (err) {
        console.log("err => ", err);
        res.send(null);
      } else {
        res.send(results);
      }
    });
  } catch (err) {
    next(err);
  }
});

orderRoutes.get("/list", (req, res, next) => {
  try {
    let getAll = `SELECT Orders.id , Orders.date, Orders.hour,Orders.price,Orders.off,Orders.sale,Orders.popularity,Orders.count,Orders.sale,Orders.isActive, Users.first_name as userID , Products.title as productID FROM Orders INNER JOIN Users ON Users.id = Orders.userID INNER JOIN Products ON Products.id = Orders.productID;`;
    connection.query(getAll, (err, results) => {
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

orderRoutes.delete("/:orderID", (req, res, next) => {
  try {
    const orderID = req.params.orderID;
    let deleteQuery = `DELETE FROM Orders WHERE id =${orderID}`;
    connection.query(deleteQuery, (err, results) => {
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

orderRoutes.put("/active-order/:orderID/:isActive", (req, res, next) => {
  try {
    let orderID = req.params.orderID;
    let isActive = req.params.isActive;
    let updateQuery = `UPDATE Orders SET isActive=${isActive} WHERE id=${orderID}`;
    connection.query(updateQuery, (err, results) => {
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

module.exports = orderRoutes;
