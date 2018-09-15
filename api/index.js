const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const productRouter = require(path.join(__dirname, "./routers/productRouter"));
const orderRouter = require(path.join(__dirname, "./routers/orderRouter"));
const shopRouter = require(path.join(__dirname, "./routers/shopRouter"));

// Declare Port to serve application
const PORT = process.env.PORT || 8080;

const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

// Routers - Authentication Logic

// Routers - API Logic
app.use("/api", productRouter);
app.use("/api", orderRouter);
app.use("/api", shopRouter);

// Redirect Unimplmented Routes
app.use((req, res) => {
  res.status(400).json({ message: "Not Implemented" });
});

// Serve Application
app.listen(PORT, () => {
  console.log(`App is listening on Port:${PORT}`);
});
