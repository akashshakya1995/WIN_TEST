const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    productName: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId },
    description: String,
    status: { type: String, default: "DEACTIVE", enum: ["ACTIVE", 'DELETE', 'DEACTIVE'] },
    totalQuantity: Number,
    totalSale: Number,
    price: Number,
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
