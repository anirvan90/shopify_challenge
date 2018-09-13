const mongoose = require("mongoose");
const Product = require("../models/productModel");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  totalSale: {
    type: Number,
    min: 0
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  discount: {
    type: Number
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  status: {
    type: String,
    enum: ["Open", "Shipped", "Closed"]
  }
});

orderSchema.pre("save", function(next) {
  let order = this;
  console.log(order);
  next();
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
