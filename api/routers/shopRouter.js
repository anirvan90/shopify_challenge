const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const router = require("express").Router();

//Get All Shops
router.get("/shops", (req, res) => {
  Shop.find()
    .populate()
    .exec((err, data) => {
      if (err) console.log(err);
      res.status(200).json(data);
    });
});
//Get One Shop

router.get("/shops/:shopID", (req, res) => {
  let id = req.params.shopID;
  Shop.findOne({ _id: id })
    .populate()
    .exec((err, data) => {
      res.status(200).json(data);
    });
});

//Add One Shop
//Delete One Shop
//Add Product to Shop
//Add Order to Shop

module.exports = router;
