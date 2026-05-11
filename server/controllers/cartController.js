const Cart = require("../models/Cart");

exports.addToCart = async (
  req,
  res,
  next
) => {
  try {

    const {
      userId,
      email,
      items,
      totalAmount,
    } = req.body;

    // CHECK EXISTING CART
    let cart = await Cart.findOne({
      userId,
    });

    // UPDATE CART
    if (cart) {

      cart.items = items;

      cart.totalAmount = totalAmount;

      cart.email = email;

      await cart.save();

    }

    // CREATE CART
    else {

      cart = await Cart.create({
        userId,
        email,
        items,
        totalAmount,
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {
    next(error);
  }
};
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.id
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    next(err);
  }
};