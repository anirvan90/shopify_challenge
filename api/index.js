const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");
const shopRouter = require("./routers/shopRouter");
// const Product = require(path.join(__dirname, "../api/db/models/productModel"));

const PORT = process.env.PORT || 8080;

const app = express();

// Middleware
app.use(bodyParser.json());

app.use("/api", productRouter);
app.use("/api", orderRouter);
app.use("/api", shopRouter);

app.listen(PORT, () => {
  console.log(`App is listening on Port:${PORT}`);
});
