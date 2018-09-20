const path = require("path");
require(path.join(__dirname, "./config/database"));
require(path.join(__dirname, "./config/config"))();
const Product = require(path.join(__dirname, "./models/productModel"));
const Order = require(path.join(__dirname, "./models/orderModel"));
const Shop = require(path.join(__dirname, "./models/shopModel"));
const User = require(path.join(__dirname, "./models/userModel"));

async function createUser() {
  const user = new User({
    username: "admin",
    password: "pass"
  });
  let savedUser = await user.save();
  return savedUser;
}

async function createShop() {
  let savedUser = await createUser();
  let newShop = new Shop({
    name: "TestShop",
    ownerKey: savedUser.apiKey
  });
  let savedShop = await newShop.save();
  return savedShop;
}

async function addProductsOrders() {
  let shop = await createShop();
  let prod1 = new Product({
    name: "TestProd1",
    sellPrice: 10,
    inventory: 12,
    tags: ["test", "first"],
    shop: shop._id
  });
  let prod2 = new Product({
    name: "TestProd2",
    sellPrice: 20,
    inventory: 2,
    tags: ["test", "second"],
    shop: shop._id
  });
  let savedProd1 = await prod1.save();
  let savedProd2 = await prod2.save();

  let order1 = new Order({
    products: [savedProd1._id, savedProd1._id, savedProd2._id],
    shop: shop._id
  });

  let savedOrder1 = await order1.save();
  console.log(savedOrder1);
}

let test = addProductsOrders();
test
  .then(data => {
    console.log(`Successfully Seeded DB`);
    process.exit(0);
  })
  .catch(err => {
    console.log(`Error Seeding DB ${err}`);
    process.exit(1);
  });
