const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    adminName: String,
    adminEmail: String,
    adminPassword: String,
    adminRole: String,
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], default: "MALE" },
    isLogin: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE"],
      default: "ACTIVE"
    },
    typeOfAdmin: {
      type: String,
      enum: ["SUPERADMIN", "SUBADMIN"],
      default: "SUBADMIN"
    },
    createdAt: Number,
    updatedAt: Number
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", adminSchema, "admin");

module.exports = { adminModel };
