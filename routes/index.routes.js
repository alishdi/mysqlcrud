const { Router } = require('express');
const productRoutes = require('./product.routes');
const commentRoutes = require('./comment.routes');
const offRoutes = require('./off.routes');
const userRoutes = require('./user.routes');
const orderRoutes = require('./orders.routes');
const adminRoutes = require('./admin.routes');
const indexpage = require('.');
const indexRoutes = Router()

indexRoutes.use('/', indexpage);
indexRoutes.use("/api/products", productRoutes);
indexRoutes.use("/api/comments", commentRoutes);
indexRoutes.use("/api/offs", offRoutes);
indexRoutes.use("/api/users", userRoutes);
indexRoutes.use("/api/orders", orderRoutes);
indexRoutes.use("/api/admins", adminRoutes);


module.exports = {
    indexRoutes
}