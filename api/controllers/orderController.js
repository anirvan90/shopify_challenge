const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const Order = require(path.join(__dirname, "../db/models/orderModel"));
const { isShopOwner } = require(path.join(
  __dirname,
  "../controllers/shopController"
));

// GET: Get all orders - Protected
async function getAllOrders(req, res) {
  let name = req.params.shopName;
  let apiKey = req.headers["x-api-key"];
  // let shopId = req.body.shopId;
  if ((await isShopOwner(apiKey, null, name)) === false) {
    res.status(401).json({ message: `Unauthorized Request` });
    return;
  }
  try {
    let orders = await Shop.findOne({ name: name }).populate("orders");
    if (orders === null) {
      res.status(404).json({ message: `No Orders To Show` });
    } else {
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(404).json({ message: `No Orders To Show`, error: error });
  }
}

// POST: Add a new order
async function addOneOrder(req, res) {
  let productIds = req.body.data.productIds;
  let name = req.params.shopName;
  let shop = await Shop.findOne({ name: name });
  let order = new Order({
    products: [...productIds],
    shop: shop._id
  });
  try {
    let savedOrder = await order.save();
    res.status(201).json({ message: `Order Saved`, order: savedOrder });
  } catch (error) {
    res.status(401).json({ message: `Error Saving Order` });
  }
}

// GET: Get one order with order id
async function getOneOrder(req, res) {
  let id = req.params.orderId;
  let order = await Order.findOne(
    { _id: id },
    "_id orderDate totalSale discount"
  ).populate("products", "name _id sellPrice");
  if (order === null) {
    res.status(404).json({ message: `Could Not Find Products for ${id}` });
  } else {
    res.status(200).json(order);
  }
}

// DELETE: Delete one order - Protected
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
