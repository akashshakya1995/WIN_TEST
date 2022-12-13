
const getAllProductDataWithBatch = function() {
  return [
    { $match: { $or: [{ status: "ACTIVE" }, { status: "DEACTIVE" }] } },
    {
      $lookup: {
        from: "productcategories",
        localField: "categoryId",
        foreignField: "categoryId",
        as: "category"
      }
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        productId: 1,
        productName: 1,
        description: 1,
        createdAt: 1,
        status: 1,
        categoryName: "$category.categoryName",
        categoryId: "$category.categoryId",
      }
    },
    {
      $project: {
        productId: 1,
        productName: 1,
        description: 1,
        createdAt: 1,
        status: 1,
        categoryName: 1,
        categoryId: 1
      }
    }
  ];
};


module.exports = { getAllProductDataWithBatch };
