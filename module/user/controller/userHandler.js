const { Types } = require("mongoose");
const { userModel } = require("../model/userModel");
const { jwtToken, encryptFun } = require("../../../helper/comFunction");
const { checkUserVerified, checkUserExist } = require("../services/userService");


/************************************************************************************************************
 *                                        User API [ SignIn-logOut ]
 ************************************************************************************************************/
const signUp = async function (req, res) {
  try {
    const { userEmailId, password, fullName, gender } = req.body;
    await checkUserExist(req);
    const hashPass = await encryptFun(password);
    const obj = {
      userEmailId,
      password: hashPass,
      fullName,
      gender
    };
    const userSignup = await new userModel(obj).save();
    return sendRes(res, "Successfully SignUp.", true, userSignup);
  } catch (error) {
    return sendRes(res, error.message, false);
  }
};

const signIn = async function (req, res) {
  try {
    const { email, password } = req.body;
    let findQuery = { userEmailId: email };
    const result = await checkUserVerified(findQuery, password);
    const token = await jwtToken({ userEmailId: result.userEmailId, mobile: result.mobile, userId: result.userId });
    const response = await userModel.findOneAndUpdate(
      { userId: result.userId },
      { $set: { isLogin: true } },
      { new: true }
    );
    return res.json({
      meta: { msg: "Successfully SignIn.", status: true },
      data: response,
      token
    });
  } catch (error) {
    return sendRes(res, error.message, false);
  }
};

const addNewAddress = async function (req, res) {
  try {
    const isDefault = req.body.isDefault == "true" ? true : false;
    const obj = {
      fullName: req.body.fullName,
      country: req.body.country,
      state: req.body.state,
      pinCode: req.body.pinCode,
      city: req.body.city,
      mobileNo: req.body.mobileNo,
      isDefault: isDefault
    };
    if (req.body.isDefault) {
      await userModel.findOneAndUpdate(
        { userId: req.userDetails.userId, "address.isDefault": isDefault },
        { $set: { "address.$.isDefault": false } }
      );
    }
    const addAddress = await userModel.findOneAndUpdate(
      { userId: req.userDetails.userId },
      { $push: { address: obj } },
      { new: true }
    );
    return sendRes(res, "Address Added Successfully.", true, addAddress);
  } catch (error) {
    return sendRes(res, error.message, false);
  }
};

const logOut = async function (req, res) {
  try {
    await userModel.findOneAndUpdate(
      { userId: Types.ObjectId(req.userDetails.userId) },
      { $set: { isLogin: false } }
    );
    return sendRes(res, "logOut successfully.", true);
  } catch (error) {
    return sendRes(res, error.message, false);
  }
};

module.exports = {
  signUp,
  addNewAddress,
  signIn,
  logOut,

};
