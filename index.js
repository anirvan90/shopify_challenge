const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const productRouter = require(path.join(__dirname, "./routers/productRouter"));
const orderRouter = require(path.join(__dirname, "./routers/orderRouter"));
const shopRouter = require(path.join(__dirname, "./routers/shopRouter"));
const authRouter = require(path.join(__dirname, "./routers/authRouter"));
require(path.join(__dirname, "./config/database"));
require("./config/config")();

// Declare Port to serve application
const PORT = 3000;

const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(bodyParser.json());

//Default Landing
app.get("/", (req, res) => {
  res.send(`HEY THERE! You Should Really Be Going to /api/v1/shops`);
});

// Routers - Authentication Logic
app.use("/api/v1", authRouter);

// Routers - API Logic
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", shopRouter);

// Redirect Unimplmented Routes & Errors
app.use((req, res) => {
  res.status(400).json({ message: "Not Implemented" });
});

// Serve Application
app.listen(PORT, () => {
  console.log(`App is listening on Port:${PORT}`);
});
