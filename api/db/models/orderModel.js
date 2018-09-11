const mongoose = require("mongoose");
const productSchema = require("./productModel.js").productSchema;

const orderSchema = new mongoose.Schema({
  products: {
    type: [productSchema],
    default: undefined
  },
  totalSale: {
    type: Number,
    min: 0
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
