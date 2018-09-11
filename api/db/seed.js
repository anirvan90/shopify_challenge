const db = require("./index.js");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");

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

let kitKat = new Order({
  products: [kit, kat],
  totalSale: 12
});

kitKat.save(err => {
  if (err) console.error("Something went wrong on kitkat");
});
