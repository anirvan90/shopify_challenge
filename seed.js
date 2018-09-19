const path = require("path");
require(path.join(__dirname, "./api/config/database"));
const Product = require(path.join(__dirname, "./api/models/productModel"));
const Order = require(path.join(__dirname, "./api/models/orderModel"));
const Shop = require(path.join(__dirname, "./api/models/shopModel"));

const t1 = new Shop({
  name: "t1"
});

t1.save(err => {
  if (err) console.error(`Error Saving t1`);
});

const t2 = new Shop({
  name: "t2"
});

t2.save(err => {
  if (err) console.error(`Error Saving t2`);
});

const t3 = new Shop({
  name: "t3"
});

t3.save(err => {
  if (err) console.error(`Error Saving t3`);
});

// function getShopProducts(shopName) {
//   return Shop.findOne({ name: shopName })
//     .populate("shops")
//     .exec((err, data) => {
//       console.log(data);
//     });
// }

// const chew = new Product({
//   name: "Chewable",
//   sellPrice: 15.99,
//   inventory: 12
// });

// chew.save(err => {
//   if (err) console.error("Something went wrong with chew");
// });

getShopProducts("PupShop");

// data = Shop.findOne({ name: "PupShop" })
//   .then(data => {
//     return data;
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const rope = new Product({
//   name: "Rope",
//   sellPrice: 12.99,
//   inventory: 10,
//   shop: pupshop
// });

// const chewchew = new Order({
//   products: [chew, chew],
//   shop: pupshop
// });

// const roperope = new Order({
//   products: [rope, rope],
//   shop: pupshop
// });

// const chewrope = new Order({
//   products: [chew, rope],
//   shop: pupshop
// });

// const katshop = new Shop({
//   name: "KatShop",
//   products: [],
//   orders: []
// });

// let kit = new Product({
//   name: "kit",
//   sellPrice: 10.99,
//   inventory: 10,
//   shop: katshop
// });

// let kat = new Product({
//   name: "kat",
//   sellPrice: 1.0,
//   inventory: 5,
//   shop: katshop
// });

// let kitkat = new Order({
//   products: [kit, kat],
//   totalSale: 12,
//   shop: katshop
// });

// let kitkit = new Order({
//   products: [kit, kit],
//   totalSale: 0,
//   shop: katshop
// });

// let katkat = new Order({
//   products: [kat, kat],
//   totalSale: 13,
//   shop: katshop
// });

// pupshop.save(err => {
//   if (err) console.error("Something went wrong with pupshop");
// });

// rope.save(err => {
//   if (err) console.error("Something went wrong with chew");
// });

// chewchew.save(err => {
//   if (err) console.error("Something went wrong with chewchew");
// });

// chewrope.save(err => {
//   if (err) console.error("Something went wrong with chewrope");
// });

// roperope.save(err => {
//   if (err) console.error("Something went wrong with roperope");
// });

// Shop.updateOne(
//   { name: pupshop.name },
//   { products: [chew, rope], orders: [chewchew, roperope, chewrope] }
// ).then(data => {
//   console.log("chewchew");
// });

// katshop.save(err => {
//   if (err) console.error("Something went wrong on katshop");
// });

// kat.save(err => {
//   if (err) console.error("something went wrong here");
// });

// kit.save(err => {
//   if (err) console.error("something went wrong");
// });

// kitkat.save(err => {
//   if (err) console.error("Something went wrong on kitkat");
// });

// kitkit.save(err => {
//   if (err) console.error("Something went wrong on kitkit");
// });

// katkat.save(err => {
//   if (err) console.error("Something went wrong on katkat");
// });

// Shop.updateOne(
//   { name: katshop.name },
//   { products: [kit, kat], orders: [kitkat, kitkit, katkat] }
// ).then(data => {
//   console.log("donezo");
// });
