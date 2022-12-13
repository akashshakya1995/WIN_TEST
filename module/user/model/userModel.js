const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, auto: true, index: true },
    fullName: String,
    userEmailId:String,
    password: String,
    gender: String,
    isLogin: { type: Boolean, default: false },
    address: [
      {
        fullName: { type: String },
        country: { type: String },
        state: { type: String },
        city: { type: String },
        pinCode: { type: Number },
        mobileNo:{type:Number},
        isDefault: { type: Boolean, default: false }
      }
    ],
    createdAt: Number,
    updatedAt: Number
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
