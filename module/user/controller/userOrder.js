const { ObjectId } = require("mongoose").Types;
const { orderModel } = require("../model/orderModel");
const { userModel } = require("../model/userModel");
const {
  prepareNewArray,
  prepareTotal,
  stockMaintainAfterOrder,
  checkProductDetails

} = require("../services/orderService");


/********************************************************************************************************
 *                                Order API [ OrderPlace ]
 ********************************************************************************************************/

const orderPlace = async function (req, res) {
  try {
    const { userId, userEmailId } = req.userDetails;
    const { shipingAddressId, paymentMethod } = req.body;

    const data = await userModel.findOne({ userId: userId, address: { $elemMatch: { _id: ObjectId(shipingAddressId) } } }, { "address.$": 1 }
    );
    if (!data) {
      return sendRes(res, "Please Firstly Add shipping Address.", false);
    }
    const productArray = prepareNewArray(req);
    await checkProductDetails(req, res, productArray)
    let grandTotal = prepareTotal(req, productArray);
    let obj = {
      userId,
      userEmailId,
      shipingAddress: data.address[0],
      billingAddress: data.address[0],
      productDetails: productArray,
      grandAmount: grandTotal,
      paymentMethod: paymentMethod
    };
    const order = await orderModel.insertMany(obj);
    const promises = stockMaintainAfterOrder(productArray);
    await Promise.all(promises);
    return sendRes(res, "Successfully Order Place.", true, order);
  } catch (error) {
    return sendRes(res, error.message, false);
  }
};


module.exports = {
  orderPlace,
};
