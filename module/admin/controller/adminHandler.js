const { adminModel } = require("../model/admin");
const { Types } = require("mongoose");
const { jwtToken, decryptFun } = require("../../../helper/comFunction");

/********************************************************************************************************
 *                                      Admin API [ AdminSignIn-SignOut ]
 ********************************************************************************************************/

const adminSignIn = async function (req, res) {
  try {
    const { adminEmail, adminPassword } = req.body;
    const admin = await adminModel.findOne({ adminEmail });
    if (!admin) {
      throw new Error("Invalid Credential.");
    }
    await decryptFun(adminPassword, admin.adminPassword);
    const token = await jwtToken({
      adminEmail: admin.adminEmail,
      adminId: admin.adminId,
      adminName: admin.adminName
    });
    const signInData = await adminModel.findOneAndUpdate(
      { adminEmail },
      { $set: { isLogin: true } },
      { new: true, projection: { password: 0, createdAt: 0, updatedAt: 0 } }
    );
    return res.json({
      meta: { msg: "Admin SignIn Successfully.", status: true },
      data: signInData,
      token
    });
  } catch (error) {
    console.log("hello++++++++++++++++",error)
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};

const adminLogOut = async function(req, res) {
  try {
    await adminModel.findOneAndUpdate(
      { adminId: Types.ObjectId(req.adminDetails.adminId) },
      { $set: { isLogin: false } }
    );
    return res.json({
      meta: { msg: "Admin Successfully LogOut.", status: true }
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};

module.exports = {
  adminSignIn,
  adminLogOut
};
