const mongoose = require("mongoose");
const orderSchema = require("../models/orderModel").orderSchema;
const productSchema = require("../models/productModel").productSchema;
const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders"
    }
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products"
    }
  ]
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
