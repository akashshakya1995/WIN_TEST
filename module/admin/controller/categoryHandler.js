const { categoryModel } = require("../model/categoryModel");

/********************************************************************************************************
 *                                     Category API [ AddCategory-DeleteSubCategory ]
 ********************************************************************************************************/

const addCategory = async function(req, res) {
  try {
    const { categoryName, categoryDesc,groupName } = req.body;
    const result = await categoryModel.find({ categoryName });
    if (result.length > 0) {
      return res.json({
        meta: {
          msg: "Another Category already Exist with this name.",
          status: false
        }
      });
    }

    const obj = { categoryName, categoryDesc,groupName };
    await new categoryModel(obj).save();
    return res.json({
      meta: { msg: "Successfully Add Category.", status: true }
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};

const editCategory = async function(req, res) {
  try {
    const { categoryName, categoryDesc } = req.body;
    let obj = { categoryName, categoryDesc };
    await categoryModel.findOneAndUpdate(
      { categoryId: req.params.categoryId, status: "ACTIVE" },
      { $set: obj },
      { new: true }
    );
    return res.json({
      meta: { msg: "Successfully Updated Categories Details.", status: true }
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: true }
    });
  }
};

const deleteCategory = async function(req, res) {
  try {
    await categoryModel.findOneAndUpdate(
      { categoryId: req.params.categoryId },
      { $set: { status: "DELETE" } }
    );
    return res.json({
      meta: { msg: "Category Deleted.", status: true }
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: true }
    });
  }
};

const getCategory = async function(req, res) {
  try {
    const data = await categoryModel.find(
      { status: "ACTIVE" },
      { subCategory: 0 }
    );
    return res.json({
      meta: { msg: "Category List.", status: true },
      data: data
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: true }
    });
  }
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategory,
};
