const { adminModel } = require("./module/admin/model/admin");
const { encryptFun } = require("./helper/comFunction");

exports.createNewAdmin = async function (adminPassword) {
  try {
    const adminExist = await adminModel.findOne({});
    if (!adminExist) {
      console.log("Admin Dont Exist, Creating New");
      // If Not Admin -- Create New Admin
      const hashedPassword = await encryptFun(adminPassword);
      const obj = {
        adminEmail: "akash@win.com",
        adminPassword: hashedPassword,
        adminName: "Akash kumar",
        typeOfAdmin: "SUPERADMIN",
        adminRole: "ALL"
      };
      await new adminModel(obj).save();
      console.log("admin data added Successfully.");
    }
    console.log("admin allready created.")
  } catch (error) {
    console.log("Internal Server Error.", error);
  }
};
