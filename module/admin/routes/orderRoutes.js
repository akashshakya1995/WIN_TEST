const orderRoutes = require("express").Router();
const { jwtVerifyAdmin } = require("../../../helper/authHandler");
const {
  getOrders,
  getOrderDetails,
  updateOrderStatus
} = require("../controller/orderHandler");


orderRoutes.get("/getorder", jwtVerifyAdmin, getOrders);
orderRoutes.get("/details/:orderId", jwtVerifyAdmin, getOrderDetails);
orderRoutes.put("/updatestatus/:orderId", jwtVerifyAdmin, updateOrderStatus);

module.exports = orderRoutes;
