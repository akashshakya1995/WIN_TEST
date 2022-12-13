const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    groupName:String,
    categoryName: { type: String, index: true },
    categoryDesc: { type: String },
    categoryId: { type: mongoose.Types.ObjectId, auto: true, index: true },
    status: {
      type: String,
      enum: ["ACTIVE", "DELETE", "DEACTIVE"],
      default: "ACTIVE"
    },
    createdAt: Number,
    updatedAt: Number
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("productCategory", categorySchema);

module.exports = { categoryModel };
