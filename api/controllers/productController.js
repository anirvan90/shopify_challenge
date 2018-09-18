const path = require("path");
const Product = require(path.join(__dirname, "../db/models/productModel"));
const Shop = require(path.join(__dirname, "../db/models/shopModel"));

// POST: Add One Product to Shop - Protected
async function addOneProduct(req, res) {
  let { shopId, name, sellPrice, inventory, tags } = req.body.data;
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
async function getOneProduct(req, res) {
  let id = req.params.productId;
  let name = req.params.shopName;
  try {
    let product = await Product.findOne({ _id: id });
    if (product === null) {
      res.status(200).json({ message: `No Product Found!` });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(404).json({
      message: `Could Not Find A Product With Id ${id} at ${name}`,
      error: error
    });
  }
}

// GET: Get All Products
async function getAllProducts(req, res) {
  let name = req.params.shopName;
  try {
    let shop = await Shop.findOne({ name: name }).populate("products");
    if (shop === null) {
      res.status(200).json({ message: `No Products To Show` });
    } else {
      res.status(200).json(shop.products);
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: `Could Not Find Products for ${name}`, error: error });
  }
}

// PUT: Edit One Product - Protected
async function editOneProduct(req, res) {
  let { productId, name } = req.body.data;
  try {
    let updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { name: name }
    );
    res.status(201).json({
      message: `Successfully Updated Product`,
      product: updatedProduct
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

// DELETE: Delete One Product - Protected
async function deleteOneProduct(req, res) {
  let { productId } = req.body.data;
  try {
    let prodToDelete = await Product.findOneAndDelete({ _id: productId });
    prodToDelete.remove();
    res.status(202).json({ message: `You Have Deleted ${prodToDelete.name}` });
  } catch (error) {
    res.status(404).json({ message: `Something Went Wrong!`, error: error });
  }
}

module.exports = {
  addOneProduct,
  getOneProduct,
  getAllProducts,
  editOneProduct,
  deleteOneProduct
};
