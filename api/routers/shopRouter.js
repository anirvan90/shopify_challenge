const router = require("express").Router();
const path = require("path");

const { checkAuth, authAddDelete } = require(path.join(
  __dirname,
  "../controllers/authController"
));

// Import Middleware Controller Functions - Shop
const {
  getAllShops,
  addOneShop,
  editOneShop,
  deleteOneShop
} = require(path.join(__dirname, "../controllers/shopController"));

//Get All Shops
// This Could Become A Very Expensive Request
// Filtering shops could help or caching
router.get("/shops", getAllShops);

//Add One Shop
//Admin Only - Returns store id (keep safe) and name
router.post("/shops", authAddDelete, addOneShop);

// Edit Something on Shop eg name
// Admin Only
router.put("/shops", checkAuth, editOneShop);

//Delete One Shop
//Admin Only
router.delete("/shops", authAddDelete, deleteOneShop);

module.exports = router;
