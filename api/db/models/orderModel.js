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
  if (
    !this.products ||
    !Array.isArray(this.products) ||
    !this.products.length < 1
  ) {
    return next();
  }
  Product.find({}, { sellPrice: 1 })
    .lean()
    .exec(function(err, products) {
      if (err) console.log(err);
      let totalSale = 0;
      products.forEach(product => {
        totalSale += product.sellPrice;
      });
      order.totalSale = totalSale;
      next(err);
    });
});

orderSchema.pre("save", function(next) {
  let order = this;
  order
    .model("Shop")
    .update({ _id: order.shop }, { $push: { orders: order } }, (err, data) => {
      if (err) console.log(err);
      console.log("saved");
    });
  next();
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
