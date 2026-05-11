const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (
  req,
  res,
  next
) => {
  try {
    const product =
      await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });

  } catch (err) {
    next(err);
  }
};

// GET PRODUCTS WITH PAGINATION
exports.getProducts = async (
  req,
  res,
  next
) => {
  try {

    // PAGE & LIMIT
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 6;

    // SKIP
    const skip = (page - 1) * limit;

    // TOTAL PRODUCTS
    const totalProducts =
      await Product.countDocuments();

    // PRODUCTS
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // TOTAL PAGES
    const totalPages = Math.ceil(
      totalProducts / limit
    );

    res.status(200).json({
      success: true,

      products,

      currentPage: page,

      totalPages,

      totalProducts,

      limit,
    });

  } catch (err) {
    next(err);
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (
  req,
  res,
  next
) => {
  try {

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (err) {
    next(err);
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (
  req,
  res,
  next
) => {
  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};