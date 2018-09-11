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
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
