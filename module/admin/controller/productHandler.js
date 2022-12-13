
const { Types } = require("mongoose");
const { productModel } = require("../model/productModel");
const { getAllProductDataWithBatch } = require("../services/productHandlerPipeline");


/********************************************************************************************************
 *                                     Product API [ AddProduct-deleteProduct ]
 ********************************************************************************************************/

const addProduct = async function (req, res) {
  const {
    productName,
    categoryId,
    description,
    totalQuantity,
    price
  } = req.body;
  try {
    const findProduct = await productModel.findOne({ productName });
    if (findProduct) {
      return res.json({
        meta: {
          msg: "Product is allready Added.Please Add Stock",
          status: false
        }
      });
    }
    const obj = {
      productName,
      categoryId,
      description,
      totalQuantity,
      price
    };

    const data = await new productModel(obj).save();
    return res.json({
      meta: { msg: "Successfully Add Product.", status: true },
      data: data
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};

const getProductDetails = async function (req, res) {
  try {
    const pipeline = getAllProductDataWithBatch();
    const productData = await productModel.aggregate(pipeline);
    return res.json({
      meta: { msg: "Successfully found Products", status: true },
      data: productData
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};

const editProduct = async function (req, res) {
  try {
    const { description, minimumStockLevel } = req.body;
    const obj = { description, minimumStockLevel }
    const findProduct = await productModel.findOne({
      productId: Types.ObjectId(req.params.productId)
    });
    if (findProduct) {
      const data = await productModel.findOneAndUpdate(
        { productId: Types.ObjectId(req.params.productId) },
        { $set: obj },
        { new: true }
      );
      return res.json({
        meta: { msg: "Successfully Update Product", status: true },
        data: data
      });
    } else {
      return res.json({
        meta: { msg: "Product not found", status: true }
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
}

const deleteProduct = async function (req, res) {
  try {
    await productModel.findOneAndUpdate(
      { productId: Types.ObjectId(req.params.productId) },
      { $set: { status: "DELETE" } }
    );
    return res.json({
      meta: { msg: "Successfully Deleted Product.", status: true }
    });
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false }
    });
  }
};




module.exports = {
  addProduct,
  getProductDetails,
  deleteProduct,
  editProduct
};
