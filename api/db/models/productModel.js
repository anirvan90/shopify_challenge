// const path = require("path");
const mongoose = require("mongoose");
// const db = path.join(__dirname, "../index.js");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true
  },
  sellPrice: {
    type: Number,
    min: 0,
    require: true
  },
  inventory: {
    type: Number,
    min: 0,
    require: false
  },
  url: {
    type: String,
    require: false
  },
  image_link: {
    type: String,
    require: false
  },
  tags: [String]
});

const Product = mongoose.model("Product", productSchema);

module.exports.productSchema = productSchema;
module.exports = Product;
