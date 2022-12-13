const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    productDetails: [],
    shipingAddress: {
      fullname: String,
      country: String,
      state: String,
      city: String,
      pinCode: Number,
      mobileNo: Number
    },
    billingAddress: {
      fullname: String,
      country: String,
      state: String,
      city: String,
      pinCode: Number,
      mobileNo: Number
    },
    orderId: { type: mongoose.Types.ObjectId, auto: true },
    userEmailId: String,
    userId: String,
    grandAmount: Number,
    paymentMethod: String,
    isPacked: { type: Boolean, default: null },
    isShipped: { type: Boolean, default: null },
    isOrdered: { type: Boolean, default: null },
    isDeliverd: { type: Boolean, default: null },
    isCancelled: { type: Boolean, default: null },
    createdAt: Number,
    updatedAt: Number
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = { orderModel };
