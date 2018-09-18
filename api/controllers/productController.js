const path = require("path");
const Product = require(path.join(__dirname, "../db/models/productModel"));
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const { validateUser, isShopOwner } = require(path.join(
  __dirname,
  "../controllers/shopController"
));

async function addOneProduct(req, res) {
  let apiKey = req.headers["x-api-key"];
  let { id, name, sellPrice, inventory } = req.body.data;
  if ((await isShopOwner(apiKey, id)) === false) {
    res.status(401).json({ message: `Unauthorized Request` });
    return;
  }
  let newProd = new Product({
    name: name,
    sellPrice: sellPrice,
    shop: id,
    inventory: inventory
  });
  newProd.save((err, data) => {
    if (err) {
      res.status(501).json({ message: `Failed To Save A New Product` });
    }
    res.status(201).json({ message: `Success` });
  });
}

function getOneProduct(req, res) {
  let name = req.params.shopName;
  let id = req.params.productId;
  Product.findOne({ _id: id }, "-__v")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: `Could Not Find A Product With Id ${id} at ${name}` });
    });
}

function getAllProducts(req, res) {
  let name = req.params.shopName;
  Shop.findOne({ name: name })
    .populate("products", "-shop")
    .exec(function(err, shop) {
      if (err)
        res
          .status(404)
          .json({ message: `Could Not Find Products for ${name}` });
      res.status(200).json(shop.products);
    });
}

function editOneProduct(req, res) {
  let productId = req.body.data.productId;
  let name = req.body.data.name;
  Product.findOneAndUpdate({ _id: productId }, { name: name })
    .then(data => {
      res
        .status(201)
        .json({ message: `Successfully Changed ${data.name} to ${name}` });
    })
    .catch(err => {
      res.status(404).json({ message: err });
    });
}

function deleteOneProduct(req, res) {
  let productId = req.body.data.productId;
  Product.findOneAndDelete({ _id: productId })
    .then(data => {
      data.remove();
      res.status(202).json({ message: `You Have Deleted ${data.name}` });
    })
    .catch(err => {
      res.status(404).json({ message: `Something Went Wrong!` });
    });
}

module.exports = {
  addOneProduct,
  getOneProduct,
  getAllProducts,
  editOneProduct,
  deleteOneProduct
};
