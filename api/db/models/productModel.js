const mongoose = require("mongoose");
const db = require("../index");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  sellPrice: {
    type: Number,
    min: 0,
    required: true
  },
  inventory: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    required: false
  },
  image_link: {
    type: String,
    required: false
  },
  tags: [String],
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  inStock: {
    type: Boolean
  }
});

productSchema.pre("save", function(next) {
  let product = this;
  product.inStock = product.inventory > 0 ? true : false;
  next();
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports.productSchema = productSchema;
module.exports = Product;
