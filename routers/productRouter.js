const path = require("path");
const router = require("express").Router();
const { checkAuth } = require(path.join(
  __dirname,
  "../controllers/authController"
));
// Import Controller Functions - Products
const {
  addOneProduct,
  getOneProduct,
  getAllProducts,
  editOneProduct,
  deleteOneProduct
} = require(path.join(__dirname, "../controllers/productController"));

// Add One Product to Shop
// Only Shop Admin should be able to add
//Protect
router.post("/shops/:shopName/products", checkAuth, addOneProduct);

// Get All Products From One Shop
// Everyone - These queries should be cached [think redis]
router.get("/shops/:shopName/products", getAllProducts);

// Get One Product From One Shop
// Everyone - Cached dependent on number of times this query comes in
router.get("/shops/:shopName/products/:productId", getOneProduct);

// Edit One Product From One Shop - Ex Name
// Only For Shop Admin Use
router.put("/shops/:shopName/products", checkAuth, editOneProduct);

// Delete One Product From One Shop
// Only For Shop Admin Use
router.delete("/shops/:shopName/products", checkAuth, deleteOneProduct);

module.exports = router;
