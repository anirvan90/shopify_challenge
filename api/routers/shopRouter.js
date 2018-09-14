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

module.exports = router;
