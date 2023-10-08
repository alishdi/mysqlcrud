const connection = require("../DB/shopDB");

const userRoutes = require("express").Router();

userRoutes.post("/add", (req, res, next) => {
  try {
    const body = req.body;
    const addUpdateQuery = `INSERT INTO Users VALUES (NULL,"${body.first_name}","${body.last_name}","${body.username}","${body.password}",${body.phone},"${body.city}","${body.email}","${body.address}",${body.score})`;
    connection.query(addUpdateQuery, (err, results) => {
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

userRoutes.get("/list", (req, res, next) => {
  try {
    let getAllUsers = `SELECT * FROM Users`;
    connection.query(getAllUsers, (err, results) => {
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

userRoutes.delete("/:userID", (req, res, next) => {
  try {
    const userID = req.params.userID;
    let deleteUserQuery = `DELETE FROM Users WHERE id =${userID}`;
    connection.query(deleteUserQuery, (err, results) => {
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

userRoutes.put("/:userID", (req, res, next) => {
  try {
    const body = req.body;
    let userID = req.params.userID;
    let updateQuery = `UPDATE Users SET first_name="${body.first_name}",last_name="${body.last_name}",username="${body.username}",password="${body.password}",phone="${body.phone}",city="${body.city}",email="${body.email}",address="${body.address}",score=${body.score} WHERE id=${userID}`;
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

module.exports = userRoutes;
