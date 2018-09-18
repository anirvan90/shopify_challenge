const mongoose = require("mongoose");

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
  ],
  ownerKey: String
});

shopSchema.pre("remove", function(next) {
  let shop = this;
  shop
    .model("Product")
    .remove({ _id: { $in: shop.products } })
    .exec();
  next();
});

shopSchema.pre("remove", function(next) {
  let shop = this;
  shop
    .model("Order")
    .remove({ _id: { $in: shop.orders } })
    .exec();
  next();
});

const Shop = mongoose.model("Shop", shopSchema, "shops");
module.exports = Shop;
