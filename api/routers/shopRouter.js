const path = require("path");
const mongoose_obj = require("mongoose").Types.ObjectId;
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const Product = require(path.join(__dirname, "../db/models/productModel"));
const Order = require(path.join(__dirname, "../db/models/orderModel"));
const router = require("express").Router();

//Get All Shops
// Only System Admins - This Could Become A Very Expensive Request
router.get("/shops", (req, res) => {
  Shop.find()
    .populate("products")
    .populate("orders")
    .exec((err, data) => {
      if (err) console.log(err);
      res.status(200).json(data);
    });
});

// Get One Shop & Products
// Everyone (should not return shopID)
router.get("/shops/:shopName", (req, res) => {
  let name = req.params.shopName;
  Shop.findOne({ name: name })
    .populate("products", "name sellPrice inventory url image_link tags")
    .exec((err, data) => {
      if (err) console.error(err);
      res.status(200).json(data);
    });
});

//Add One Shop
//Admin Only - Returns store id (keep safe) and name
router.post("/shops", (req, res) => {
  let name = req.body.data.name;
  let shop = new Shop({ name: name });
  shop.save(function(err, data) {
    if (err) res.status(501).send(`Error Creating New Shop ${name}`);
    Shop.findOne({ name: name }).then(data => {
      res.status(201).json({ id: data._id, name: data.name });
    });
  });
});

//Delete One Shop

// Add Product to Shop
// Only Shop Admin should be able to add
router.post("/shops/:shopName/products", (req, res) => {
  let id = req.body.data.id;
  let name = req.body.data.name;
  let sellPrice = req.body.data.sellPrice;
  let newProd = new Product({
    name: name,
    sellPrice: sellPrice,
    shop: id
  });
  newProd.save(err => {
    if (err) res.status(501).send(`Failed To Save A New Product`);
    Shop.findOneAndUpdate(
      { _id: id },
      { $push: { products: newProd } },
      (err, data) => {
        if (err) {
          res.status(501).send("Failed to Save");
        }
        res.status(201).send(`Success`);
      }
    );
  });
});

//Add Order to Shop

// Get Shop Products
// Everyone
router.get("/shops/:shopName/products", (req, res) => {
  let name = req.params.shopName;
  Shop.findOne({ name: name })
    .populate("products", "name sellPrice inventory url image_link tags")
    .exec(function(err, shop) {
      if (err) res.status(404).send(`Could Not Find Products for ${name}`);
      res.status(200).json(shop.products);
    });
});

// Get One Shop Product
// Everyone
router.get("/shops/:shopName/products/:productId", (req, res) => {
  let name = req.params.shopName;
  let id = req.params.productId;
  Product.findOne({ _id: id }, "name sellPrice inventory url tags")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(404).send(`Could Not Find A Product With Id ${id} at ${name}`);
    });
});

module.exports = router;
