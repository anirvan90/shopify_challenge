const path = require("path");
const Product = require(path.join(__dirname, "../db/models/productModel"));
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const { validateUser, isShopOwner } = require(path.join(
  __dirname,
  "../controllers/shopController"
));
// POST: Add One Product to Shop - Protected
async function addOneProduct(req, res) {
  let apiKey = req.headers["x-api-key"];
  let { shopId, name, sellPrice, inventory, tags } = req.body.data;
  if ((await isShopOwner(apiKey, shopId)) === false) {
    res.status(401).json({ message: `Unauthorized Request` });
    return;
  }
  let newProd = new Product({
    name: name,
    sellPrice: sellPrice,
    shop: shopId,
    inventory: inventory,
    tags: tags
  });
  try {
    let savedProd = await newProd.save();
    res.status(201).json({
      message: `Successfull Added ${savedProd.name}`,
      product: savedProd
    });
  } catch (err) {
    res.status(501).json({ message: `Failed To Save New Product` });
  }
}

// GET: Get One Product from Shop
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

// GET: Get All Products
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

// PUT: Edit One Product
async function editOneProduct(req, res) {
  let { productId, shopId, name } = req.body.data;
  let apiKey = req.headers["x-api-key"];
  if ((await isShopOwner(apiKey, shopId)) === false) {
    res.status(401).json({ message: `Unauthorized Request` });
    return;
  }
  try {
    let updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { name: name }
    );
    res.status(201).json({ message: `Successfully Updated Product` });
  } catch (error) {
    res.status(404).json({ message: error });
  }

  // Product.findOneAndUpdate({ _id: productId }, { name: name })
  //   .then(data => {
  //     res
  //       .status(201)
  //       .json({ message: `Successfully Changed ${data.name} to ${name}` });
  //   })
  //   .catch(err => {
  //     res.status(404).json({ message: err });
  //   });
}

// DELETE: Delete One Product
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
