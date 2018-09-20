const path = require("path");
const router = require("express").Router();
const { register } = require(path.join(
  __dirname,
  "../controllers/authController"
));

router.post("/register", register);

module.exports = router;
