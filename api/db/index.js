const mongoose = require("mongoose");
const path = require("path");
mongoose.connect("mongodb://localhost:27017/fluffykins");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error:.."));
db.once("open", () => {
  console.log(`MongoDB ${process.env.MONGO_URL} is now connected`);
});

module.exports = db;
