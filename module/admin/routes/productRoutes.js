const productRoutes = require("express").Router();
const {jwtVerifyAdmin}= require('../../../helper/authHandler')
const {
  addProduct,
  getProductDetails,
  deleteProduct,
  editProduct
} = require("../controller/productHandler");

/************************************************************************************************************
 *                                             [ Product Routes ]
 ************************************************************************************************************/

productRoutes.post("/addproduct", jwtVerifyAdmin, addProduct);
productRoutes.get("/getproduct",jwtVerifyAdmin,getProductDetails);
productRoutes.delete("/deleteproduct/:productId",jwtVerifyAdmin,deleteProduct);
productRoutes.put("/editproduct/:productId",jwtVerifyAdmin,editProduct)

module.exports = productRoutes;
