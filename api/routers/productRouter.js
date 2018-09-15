const path = require("path");
const router = require("express").Router();

// Import Controller Functions - Products
const {
  addOneProduct,
  getOneProduct,
  getAllProducts,
  editOneProduct,
  deleteOneProduct
} = require(path.join(__dirname, "../controllers/productController"));
const Product = require(path.join(__dirname, "../db/models/productModel"));

// Add One Product to Shop
// Only Shop Admin should be able to add
//Protect
router.post("/shops/:shopName/products", addOneProduct);

// Get All Products From One Shop
// Everyone
router.get("/shops/:shopName/products", getAllProducts);

// Get One Product From One Shop
// Everyone
router.get("/shops/:shopName/products/:productId", getOneProduct);

// Edit One Product From One Shop - Ex Name
// Only For Shop Admin Use
router.put("/shops/:shopName/products", editOneProduct);

// Delete One Product From One Shop
// Only For Shop Admin Use
router.delete("/shops/:shopName/products", deleteOneProduct);

module.exports = router;
