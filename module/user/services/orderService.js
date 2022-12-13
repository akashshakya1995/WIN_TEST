const { productModel } = require("../../admin/model/productModel");


/********************************************************************************************************
 *                                          [ Helping Function ]
 ********************************************************************************************************/

// For Prepare Data To Save In Db.Those User Purchage Of Products.
const checkQuantity = function (req, productId) {
  const productDetails = req.body.products;
  let quantity = 0;
  productDetails.forEach(item => {
    if (productId == item.productId) {
      quantity = item["quantity"];
    }
  });
  return quantity;
};

const prepareNewArray = function (req) {
  const prepareArray = [];
  req.body.products.forEach(item => {
    const array = {
      quantity: checkQuantity(req, item.productId),
      TotalPrice: item.price * checkQuantity(req, item.productId),
      OriginalPrice: item.price,
      productId: item.productId,
    };
    prepareArray.push(array);
  });
  return prepareArray;
};
// For Sum Product Amount.
const prepareTotal = function (req, newArray) {
  let grandTotal = 0;
  newArray.forEach(el => {
    (grandTotal += el.TotalPrice)
  });
  return grandTotal;
};
// For Maintain Stock And Wallet Amonut After Successfully Order.
const subtractStock = function (product) {
  const { quantity, productId } = product;
  const p2 = productModel.findOneAndUpdate(
    { productId: productId },
    { $inc: { totalQuantity: -quantity, totalSale: quantity } }
  );
  return [p2];
};

const stockMaintainAfterOrder = function (products) {
  const promises = [];
  products.forEach(product => {
    const [p2] = subtractStock(product);
    promises.push(p2);
  });
  return promises;
};

const checkProductDetails = async function (req, res, productArray) {
  try {
    productArray.forEach(async el => {
      const data = await productModel.findOneAndUpdate({ productId: el.productId })
      if (data) {
        if (data.totalQuantity < el.quantity) {
          return sendRes(res, "Product out of stock !!!", false);
        }
        if (data.price < el.OriginalPrice) {
          return sendRes(res, "Please enter valid price !!!", false);
        }
      }
    })
  } catch (error) {
    throw error;
  }
}

module.exports = {
  prepareNewArray,
  prepareTotal,
  stockMaintainAfterOrder,
  checkProductDetails
};
