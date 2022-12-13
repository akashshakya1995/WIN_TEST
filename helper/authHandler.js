const jwt = require("jsonwebtoken");
const { adminModel } = require("../module/admin/model/admin");
const { userModel } = require("../module/user/model/userModel")

/**********************************************************************************************************
 *                                              Admin [ x-auth-key ]
 **********************************************************************************************************/

const jwtVerifyAdmin = async (req, res, next) => {
  if (
    req.headers.token == "null" ||
    req.headers.token == "" ||
    req.headers.token == "undefined" ||
    req.headers.token == null ||
    req.headers.token == undefined
  ) {
    return res.status(401).json({
      meta: { msg: "Unauthorized Access", status: true }
    });
  }
  jwt.verify(req.headers.token, "Hello_win_JWT", function (err, decoded) {
    if (err) {
      return res.status(401).json({
        meta: { msg: "Unauthorized Access", status: false }
      });
    } else {
      adminModel.findOne({ adminId: decoded.adminId }).then(result => {
        if (result.isLogin == false) {
          return res.status(440).json({
            meta: { msg: "Session Expired.", status: false }
          });
        }
        req.adminDetails = decoded
        next();
      });
    }
  });
};

const jwtVerifyUser = async (req, res, next) => {
  if (
    req.headers.token == "null" ||
    req.headers.token == "" ||
    req.headers.token == "undefined" ||
    req.headers.token == null ||
    req.headers.token == undefined
  ) {
    return res.status(401).json({
      meta: { msg: "Unauthorized Access", status: false }
    });
  }
  jwt.verify(req.headers.token, "Hello_win_JWT", function (err, decoded) {
    if (err) {
      return res.status(401).json({
        meta: { msg: "Unauthorized Access", status: false }
      });
    } else {
      userModel.findOne({ userId: decoded.userId }).then(result => {
        if (!result) {
          return res.status(401).json({
            meta: {
              msg: "Unauthorized Access",
              status: false,
              action: "logOut"
            }
          });
        }
        if (result.isLogin == false) {
          return res.status(440).json({
            meta: { msg: "Session Expired.", status: false }
          });
        }
        req.userDetails = decoded;
        next();
      });
    }
  });
};


module.exports = { jwtVerifyAdmin, jwtVerifyUser };
