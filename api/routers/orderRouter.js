const path = require("path");
const router = require("express").Router();
const {
  getAllOrders,
  addOneOrder,
  getOneOrder,
  deleteOneOrder
} = require(path.join(__dirname, "../controllers/orderController"));

// const Order = require(path.join(__dirname, "../db/models/orderModel"));

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
router.put("/shops/:shopName/orders/:orderId");

// Delete One Order For One Shop
// Should not be open to everyone
router.delete("/shops/:shopName/orders", deleteOneOrder);

module.exports = router;
