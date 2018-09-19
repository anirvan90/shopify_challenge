const mongoose = require("mongoose");
const Product = require("../models/productModel");

// Set Up Order Schema
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

// Updates Order with Total Sale
orderSchema.pre("save", function(next) {
  let order = this;
  let counts = {};
  order.products.map((prod, index) => {
    if (counts[prod]) {
      counts[prod] += 1;
    } else {
      counts[prod] = 1;
    }
  });
  let temp = order.products.map(product => {
    return { _id: mongoose.Types.ObjectId(product) };
  });
  let totalSale = 0;
  let promises = Product.find({ _id: { $in: temp } }).exec();
  promises
    .then(data => {
      data.forEach(product => {
        totalSale += product.sellPrice * counts[product._id];
      });
      order.totalSale = totalSale;
      next();
    })
    .catch(err => {
      console.error(err);
    });
});

// Updates Shop Model with new Order ID
orderSchema.pre("save", function(next) {
  let order = this;
  order
    .model("Shop")
    .update({ _id: order.shop }, { $push: { orders: order } }, (err, data) => {
      if (err) console.log(err);
    });
  next();
});

// Update Shop Model with deleted order ID
orderSchema.pre("remove", function(next) {
  let order = this;
  order
    .model("Shop")
    .update(
      { _id: order.shop },
      { $pull: { orders: order._id } },
      (err, data) => {
        if (err) console.error(err);
      }
    );
  next();
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
