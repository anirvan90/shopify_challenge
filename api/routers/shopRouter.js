const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const Product = require(path.join(__dirname, "../db/models/productModel"));
const Order = require(path.join(__dirname, "../db/models/orderModel"));
const router = require("express").Router();
const Joi = require("joi");

//Get All Shops
// Only System Admins - This Could Become A Very Expensive Request
// Essentially Querying the ENTIRE DB!!
router.get("/shops", (req, res) => {
  Shop.find().exec((err, data) => {
    if (err) res.status(404).send(`Could Not Find Resources`);
    res.status(200).json(data);
  });
});

//Add One Shop
//Admin Only - Returns store id (keep safe) and name
router.post("/shops", (req, res) => {
  const schema = Joi.string()
    .alphanum()
    .min(5)
    .max(12)
    .required();
  let name = req.body.data.name;
  Joi.validate(name, schema, (err, val) => {
    if (err) {
      res
        .status(501)
        .send("Shop Name Must Be between 3 and 12 characters and alphanumeric");
    }
  });
  let shop = new Shop({ name: name });
  shop.save(function(err, data) {
    if (err) res.status(501).send(`Error Creating New Shop ${name}`);
    Shop.findOne({ name: name }).then(data => {
      res.status(201).json({ id: data._id, name: data.name });
    });
  });
});

// Edit Something on Shop eg name
// Admin Only
router.put("/shops", (req, res) => {
  let id = req.body.data.id;
  let name = req.body.data.name;
  Shop.findOneAndUpdate({ _id: id }, { name: name })
    .then(data => {
      res.status(201).send(`Successfully Changed ${data.name} to ${name}`);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

//Delete One Shop
//Admin Only
router.delete("/shops", (req, res) => {
  let id = req.body.data.id;
  Shop.findOneAndDelete({ _id: id })
    .then(data => {
      data.remove();
      res.status(202).send(`You Have Deleted ${data.name}`);
    })
    .catch(err => {
      res.status(404).send(`Something Went Wrong!`);
    });
});

// Add One Product to Shop
// Only Shop Admin should be able to add
router.post("/shops/:shopName/products", (req, res) => {
  let id = req.body.data.shopId;
  let name = req.body.data.name;
  let sellPrice = req.body.data.sellPrice;
  let inventory = req.body.data.inventory;
  let newProd = new Product({
    name: name,
    sellPrice: sellPrice,
    shop: id,
    inventory: inventory
  });
  newProd.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(501).send(`Failed To Save A New Product`);
    }
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

// Get All Products From One Shop
// Everyone
router.get("/shops/:shopName/products", (req, res) => {
  let name = req.params.shopName;
  Shop.findOne({ name: name })
    .populate("products", "tags _id name sellPrice inventory url tags")
    .exec(function(err, shop) {
      if (err) res.status(404).send(`Could Not Find Products for ${name}`);
      res.status(200).json(shop.products);
    });
});

// Get One Product From One Shop
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

// Edit One Product From One Shop - Ex Name
// Only For Shop Admin Use
router.put("/shops/:shopName/products", (req, res) => {
  let productId = req.body.data.productId;
  let name = req.body.data.name;
  Product.findOneAndUpdate({ _id: productId }, { name: name })
    .then(data => {
      res.status(201).send(`Successfully Changed ${data.name} to ${name}`);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

// Delete One Product From One Shop
// Only For Shop Admin Use
router.delete("/shops/:shopName/products", (req, res) => {
  let productId = req.body.data.productId;
  Product.findOneAndDelete({ _id: productId })
    .then(data => {
      res.status(202).send(`You Have Deleted ${data.name}`);
    })
    .catch(err => {
      res.status(404).send(`Something Went Wrong!`);
    });
});

// Get All Orders From One Shop
// Admin Only - By ShopId
router.get("/shops/:shopName/orders", (req, res) => {
  let name = req.params.shopName;
  Shop.findOne({ name: name })
    .populate("orders")
    .exec(function(err, data) {
      if (err) res.status(404).send(err);
      res.send(data);
    });
});

// Create One Order For One Shop
// Hacky But It Works
router.post("/shops/:shopName/orders", (req, res) => {
  let productIds = req.body.data.productIds;
  Shop.findOne({ name: req.params.shopName })
    .then(data => {
      let order = new Order({
        products: [...productIds],
        shop: data._id
      });
      order.save(err => {
        Shop.findOneAndUpdate(
          { _id: data.id },
          { $push: { orders: order } },
          function(err, data) {
            if (err) res.status(501).send(`Fookage`);
            res.status(201).send(data);
          }
        );
        if (err) res.status(501).send(`Error`);
      });
    })
    .catch(err => {
      res.status("Error");
    });
});

// Get One Order For One Shop
// Both User and Admins
router.get("/shops/:shopName/orders/:orderId", (req, res) => {
  let id = req.params.orderId;
  Order.findOne({ _id: id }, "_id orderDate totalSale discount")
    .populate({
      path: "products",
      match: { sellPrice: { $gte: 10 } }
    })
    .exec(function(err, shop) {
      if (err) res.status(404).send(`Could Not Find Products for ${id}`);
      res.status(200).json(shop);
    });
});

// Edit One Order For One Shop
// User should be able to take out products and add products
// Body should be an array of new product ids
// Or orders once placed can't be edited --> Longer Term Goal
// router.put("shops/:shopName/orders/:orderId", (req, res) => {
//   let id = req.params.orderId;
//   let productIds = req.body.data.productIds;
//   Order.findOneAndUpdate({ _id: id });
// });

// Delete One Order For One Shop
router.delete("shop/:shopName/orders/:orderId");

module.exports = router;
