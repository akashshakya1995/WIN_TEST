
const mongoose = require("mongoose")
/**getOrder */

const getOrders = async function (req, res) {
  try {
    const order = await mongoose.connection
      .collection("orders")
      .find({})
      .toArray();
    return res.json({
      meta: { msg: "Successfully found order", status: true },
      data: order
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};
const getOrderDetails = async function (req, res) {
  try {
    const orderDetail = await mongoose.connection
      .collection("orders")
      .findOne({ orderId: mongoose.Types.ObjectId(req.params.orderId) });
    return res.json({
      meta: { msg: "Successfully found order details", status: true },
      data: orderDetail
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};
const updateOrderStatus = async function (req, res) {
  try {
    let findQuery = { orderId: mongoose.Types.ObjectId(req.params.orderId) };
    let statusBool = req.body.statusBool === "true" ? true : false;
    let status = {};
    if (req.body.statusName.toLowerCase() === "ordered") {
      status = { isOrdered: statusBool };
    } else if (req.body.statusName.toLowerCase() === "packed") {
      status = { isPacked: statusBool };
    } else if (req.body.statusName.toLowerCase() === "shipped") {
      status = { isShipped: statusBool };
    } else if (req.body.statusName.toLowerCase() === "delivered") {
      status = { isDeliverd: statusBool };
    } else {
      status = { isCancelled: statusBool };
    }
    const update = await mongoose.connection.collection("orders").findOneAndUpdate(findQuery, { $set: status }, { new: true })
    return res.json({ meta: { msg: "Updated", status: true }, data: update });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};

module.exports = { getOrders, getOrderDetails, updateOrderStatus };
