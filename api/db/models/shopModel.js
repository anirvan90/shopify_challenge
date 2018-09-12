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
