const adminRoutes = require("express").Router();
const { jwtVerifyAdmin } = require("../../../helper/authHandler");
const { adminSignIn,adminLogOut } = require("../controller/adminHandler");

/************************************************************************************************************
 *                                             [ Admin Routes ]
 ************************************************************************************************************/

adminRoutes.post("/adminLogin", adminSignIn);
adminRoutes.put("/adminLogOut", jwtVerifyAdmin, adminLogOut);


module.exports = adminRoutes;
