const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const Order = require(path.join(__dirname, "../db/models/orderModel"));

function getAllOrders(req, res) {
  let name = req.params.shopName;
  Shop.findOne({ name: name })
    .populate("orders")
    .exec(function(err, data) {
      if (err) res.status(404).send(err);
      res.json(data);
    });
}

function addOneOrder(req, res) {
  let productIds = req.body.data.productIds;
  Shop.findOne({ name: req.params.shopName })
    .then(data => {
      let order = new Order({
        products: [...productIds],
        shop: data._id
      });
      order.save(err => {
        if (err) res.status(501).json({ message: `Error` });
        res.status(201).json({ message: `Order Saved` });
      });
    })
    .catch(err => {
      res.status(501).json({ message: `Error Saving` });
    });
}

function getOneOrder(req, res) {
  let id = req.params.orderId;
  Order.findOne({ _id: id }, "_id orderDate totalSale discount")
    .populate({
      path: "products",
      match: { sellPrice: { $gte: 10 } }
    })
    .exec(function(err, shop) {
      if (err) {
        res.status(404).json({ message: `Could Not Find Products for ${id}` });
      }
      res.status(200).json(shop);
    });
}

function deleteOneOrder(req, res) {
  let orderId = req.body.data.orderId;
  Order.findOneAndDelete({ _id: orderId })
    .then(data => {
      data.remove();
      res.status(202).json({ message: `You Have Deleted ${data._id}` });
    })
    .catch(err => {
      res.status(404).json({ message: `Something Went Wrong!` });
    });
}
module.exports = {
  getAllOrders,
  addOneOrder,
  getOneOrder,
  deleteOneOrder
};
