const mongoose = require("mongoose");
const productSchema = require("./productModel").productSchema;
const Async = require("async");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

shopSchema.pre("remove", function(next) {
  let shop = this;
  shop
    .model("Product")
    .remove({
      _id: { $in: shop.products }
    })
    .exec();
  next;
});

const Shop = mongoose.model("Shop", shopSchema, "shops");
module.exports = Shop;
