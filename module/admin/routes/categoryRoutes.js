const categoryRoutes = require("express").Router();
const {
  addCategory,
  editCategory,
  deleteCategory,
  getCategory,
} = require("../controller/categoryHandler");
const { jwtVerifyAdmin } = require('../../../helper/authHandler')
/************************************************************************************************************
 *                                          [ Category Routes ]
 ************************************************************************************************************/

categoryRoutes.post("/addcategory",jwtVerifyAdmin, addCategory);
categoryRoutes.put("/editcategory/:categoryId",jwtVerifyAdmin, editCategory);
categoryRoutes.delete("/deletecategory/:categoryId",jwtVerifyAdmin, deleteCategory);
categoryRoutes.get("/getcategory",jwtVerifyAdmin, getCategory);

module.exports = categoryRoutes;
