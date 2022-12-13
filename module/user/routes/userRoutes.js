const userRoutes = require("express").Router();
const { jwtVerifyUser } = require("../../../helper/authHandler");
const { signUp, signIn, addNewAddress, logOut } = require("../controller/userHandler");
const { orderPlace } = require("../controller/userOrder")




/************************************************************************************************************
 *                                             [ User Routes ]
 ************************************************************************************************************/

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);
userRoutes.put("/addnewaddress", jwtVerifyUser, addNewAddress);
userRoutes.post("/orderPlace", jwtVerifyUser, orderPlace);
userRoutes.put("/logout", jwtVerifyUser, logOut);


module.exports = userRoutes;
