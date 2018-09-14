const router = require("express").Router();
const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const Product = require(path.join(__dirname, "../db/models/productModel"));
const Order = require(path.join(__dirname, "../db/models/orderModel"));

const {
  getAllShops,
  addOneShop,
  editOneShop,
  deleteOneShop
} = require(path.join(__dirname, "../controllers/shopController"));

const {
  addOneProduct,
  getOneProduct,
  getAllProducts,
  editOneProduct,
  deleteOneProduct
} = require(path.join(__dirname, "../controllers/productController"));

const {
  getAllOrders,
  addOneOrder,
  getOneOrder,
  deleteOneOrder
} = require(path.join(__dirname, "../controllers/orderController"));

//Get All Shops
// This Could Become A Very Expensive Request
router.get("/shops", getAllShops);

//Add One Shop
//Admin Only - Returns store id (keep safe) and name
router.post("/shops", addOneShop);

// Edit Something on Shop eg name
// Admin Only
router.put("/shops", editOneShop);

//Delete One Shop
//Admin Only
router.delete("/shops", deleteOneShop);

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

// Get All Orders From One Shop
// Admin Only - By ShopId
router.get("/shops/:shopName/orders", getAllOrders);

// Create One Order For One Shop
// Hacky But It Works
router.post("/shops/:shopName/orders", addOneOrder);

// Get One Order For One Shop
// Both User and Admins
router.get("/shops/:shopName/orders/:orderId", getOneOrder);

// Edit One Order For One Shop
// User should be able to take out products and add products
// Body should be an array of new product ids

// Delete One Order For One Shop
// Should not be open to everyone
router.delete("/shops/:shopName/orders", deleteOneOrder);

module.exports = router;
