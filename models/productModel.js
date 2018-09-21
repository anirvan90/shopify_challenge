const mongoose = require("mongoose");

// Set up product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sellPrice: {
    type: Number,
    min: 0,
    required: true
  },
  inventory: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    required: false
  },
  imageLink: {
    type: String,
    required: false
  },
  tags: [String],
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  inStock: {
    type: Boolean
  }
});

// Hook to update product pre-save
productSchema.pre("save", function(next) {
  let product = this;
  // Update Product Fields
  product.inStock = product.inventory > 0 ? true : false;

  // Update Shop That Created The Product
  product
    .model("Shop")
    .update(
      { _id: product.shop },
      { $push: { products: product } },
      (err, data) => {
        if (err) console.log(err);
      }
    );

  next();
});

// Update Shop when products are deleted
productSchema.pre("remove", function(next) {
  let product = this;
  product
    .model("Shop")
    .update(
      { _id: product.shop },
      { $pull: { products: product._id } },
      (err, data) => {
        if (err) console.error(err);
      }
    );
  next();
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports.productSchema = productSchema;
module.exports = Product;
