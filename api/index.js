const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const productRouter = require(path.join(__dirname, "./routers/productRouter"));
const orderRouter = require(path.join(__dirname, "./routers/orderRouter"));
const shopRouter = require(path.join(__dirname, "./routers/shopRouter"));
const authRouter = require(path.join(__dirname, "./routers/authRouter"));
require("./config/config")();

// Declare Port to serve application
const PORT = process.env.PORT || 3000;

const app = express();

// MIDDLEWARE
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

// Routers - Authentication Logic
app.use("/api/v1", authRouter);

// Routers - API Logic
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", shopRouter);

// Redirect Unimplmented Routes
app.use((req, res) => {
  res.status(400).json({ message: "Not Implemented" });
});

// process.on("uncaughtException", function(err) {
//   console.error("global exception:", err.message);
// });

// Serve Application
app.listen(PORT, () => {
  console.log(`App is listening on Port:${PORT}`);
});
