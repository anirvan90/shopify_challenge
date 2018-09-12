const path = require("path");
const Product = require(path.join(__dirname, "../db/models/productModel"));
const router = require("express").Router();

//Get All Products
router.get("/products", (req, res) => {
  Product.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Error Fetching All Products");
      res.status(404).send(err);
    });
});

//Get One Product
router.get("/products/:productName", (req, res) => {
  let name = req.params.productName;
  Product.findOne({ name: name }).then(data => {
    if (data) {
      res.status(200).json(data);
    } else {
      console.error(`Error Fetching ${name}`);
      res.status(404).send({ error: `Could Not Find ${name}` });
    }
  });
});

//Add One Product
router.post("/products/", (req, res) => {});

//Delete One Product By ID
router.delete("/products/:productId");

//Update A Product By ID
router.put("/products/:productId");

module.exports = router;
