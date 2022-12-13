const baseRouter = require('express').Router()

const { admin, product, category, order, user } = require('../config/baseUrl')
const adminRoutes = require('../module/admin/routes/adminRoutes')
const productRoutes = require('../module/admin/routes/productRoutes')
const categoryRoutes = require('../module/admin/routes/categoryRoutes')
const orderRoutes = require("../module/admin/routes/orderRoutes")
const userRoutes = require('../module/user/routes/userRoutes')

const basePath = "/admin";


baseRouter.use(admin, adminRoutes);
baseRouter.use(product, productRoutes)
baseRouter.use(category, categoryRoutes)
baseRouter.use(order, orderRoutes)
baseRouter.use(user, userRoutes)


module.exports = { baseRouter, basePath };