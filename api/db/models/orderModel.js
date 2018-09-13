const mongoose = require("mongoose");

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
  }
});

orderSchema.post("save", function() {});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
