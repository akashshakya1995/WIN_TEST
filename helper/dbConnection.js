const mongoose = require("mongoose");
const { setUp} = require("../config/env");

const dbConnect = async function(env) {
  try {
    const mongoUrl = setUp(env);
    console.log("Establishing Mongo DB Connection...");
    const x = await mongoose.connect(mongoUrl, { useNewUrlParser: true });
    console.log("Mongo DB Connected :)");
    return false;
  } catch (error) {
    console.log("==== DB Connection Error ====", error.message);
    throw error;
  }
};

module.exports = { dbConnect };