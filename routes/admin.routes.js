const connection = require("../DB/shopDB");
const adminRoutes = require("express").Router();

adminRoutes.get("/list", (req, res, next) => {
  try {
    const adminToken = req.headers.authorization;
    const selectMainAdminQuery = `SELECT * FROM Admins WHERE token = '${adminToken}'`;
    connection.query(selectMainAdminQuery, (err, results) => {
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

module.exports = adminRoutes;
