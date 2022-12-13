const { userModel } = require("../model/userModel");
const { decryptFun } = require("../../../helper/comFunction")

/********************************************************************************************************
 *                                        [ Helping Function ]
 ********************************************************************************************************/


// For Check User Verify Or Not On Login Time..
const checkUserVerified = async function (findQuery, password) {
  let result = await userModel.findOne(findQuery);
  if (!result) {
    throw new Error("This User Is Not Exist Here.");
  }
  const verifyPass = await decryptFun(password, result.password);
  if (!verifyPass) {
    throw new Error("Invalid Credential.");
  }
  return result;
};
// For Check User Exist Or Not On SignUp Time..
const checkUserExist = async function (req) {
  try {
    const { userEmailId } = req.body;
    const result = await userModel.findOne({ userEmailId });
    if (result && result.userEmailId == userEmailId) {
      throw new Error("EmailID Allready Exist.");
    }
  } catch (error) {
    throw error;
  }

};


module.exports = {
  checkUserVerified,
  checkUserExist,
};
