const db = require("./index.js");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const Shop = require("./models/shopModel");
let kit = new Product({
  name: "Test Product",
  sellPrice: 10.99
});

kit.save(err => {
  if (err) console.error("something went wrong");
});

let kat = new Product({
  name: "Test Two",
  sellPrice: 1.0
});

kat.save(err => {
  if (err) console.error("something went wrong here");
});

let kitkat = new Order({
  products: [kit, kat],
  totalSale: 12
});

let kitkit = new Order({
  products: [kit, kit],
  totalSale: 0
});

let katkat = new Order({
  products: [kat, kat],
  totalSale: 13
});

const katshop = new Shop({
  name: "KatShop",
  products: [kit, kat],
  orders: [kitkat, katkat, kitkit]
});

kitkat.save(err => {
  if (err) console.error("Something went wrong on kitkat");
});

kitkit.save(err => {
  if (err) console.error("Something went wrong on kitkit");
});

katkat.save(err => {
  if (err) console.error("Something went wrong on katkat");
});

katshop.save(err => {
  if (err) console.error("Something went wrong on katshop");
});
