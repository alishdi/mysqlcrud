const connection = require("../DB/shopDB");
const commentRoutes = require("express").Router();

commentRoutes.post("/add", (req, res, next) => {
  try {
    const body = req.body;
    const date = new Date().toLocaleDateString("fa-IR").toString();
    const hour = new Date().getHours().toString();
    const addUpdateQuery = `INSERT INTO Comments VALUES (NULL,"${body.title}","${body.body}","${date}","${hour}","${body.userID}","${body.productID}")`;
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

commentRoutes.get("/list", (req, res, next) => {
  try {
    let getAllComments = `SELECT Comments.id, Comments.body, Comments.date, Comments.hour, Users.first_name as userID , Products.title as productID FROM Comments INNER JOIN Users ON Users.id = Comments.userID INNER JOIN Products ON Products.id = Comments.productID`;
    connection.query(getAllComments, (err, results) => {
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

commentRoutes.delete("/:commentID", (req, res, next) => {
  try {
    const commentID = req.params.commentID;
    let deleteCommentQuery = `DELETE FROM Comments WHERE id =${commentID}`;
    connection.query(deleteCommentQuery, (err, results) => {
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

commentRoutes.put("/:commentID", (req, res, next) => {
  try {
    const body = req.body;
    const commentID = req.params.commentID;
    let updateCommentQuery = `UPDATE Comments SET body = "${body.body}" WHERE id =${commentID}`;
    connection.query(updateCommentQuery, (err, results) => {
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

module.exports = commentRoutes;
