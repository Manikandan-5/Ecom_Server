const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["For Men", "For Women", "Kids"]
    },

    brand: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    sale: {
      type: Number,
      default: 0
    },

    sizes: [
      {
        type: String,
        enum: ["SM", "MD", "LG", "XL"]
      }
    ],

    reviews: {
      type: Number,
      default: 0
    },

    stock: {
      type: Number,
      default: 0
    },

    image: {
      type: String
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);