const path = require("path");
const Order = require(path.join(__dirname, "../db/models/orderModel"));
const router = require("express").Router();

//Get All Orders
router.get("/orders", (req, res) => {
  Order.find()
    .populate("products")
    .exec((err, data) => {
      res.status(201).json(data);
    });
});

//Get One Order
router.get("/orders/:orderID", (req, res) => {
  let orderID = req.params.orderID;
  Order.findOne({ _id: orderID })
    .populate("products")
    .exec((err, data) => {
      if (err) res.send("Im fooked");
      res.status(200).json(data);
    });
});
//Add One Order
//Update One Order
//Delete One Order

module.exports = router;
