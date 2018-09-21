const mongoose = require("mongoose");

// URL For Local
// mongoose.connect("mongodb://localhost:27017/fluffykins");

// URL For Docker
mongoose.connect("mongodb://mongo:27017/fluffykins");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error:.."));
db.once("open", () => {
  console.log(`MongoDB is now connected`);
});

module.exports = db;
