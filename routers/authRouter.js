const path = require("path");
const router = require("express").Router();
const { register, checkAuth } = require(path.join(
  __dirname,
  "../controllers/authController"
));

router.post("/register", register);
// router.post("/checkAuth", checkAuth);

module.exports = router;
