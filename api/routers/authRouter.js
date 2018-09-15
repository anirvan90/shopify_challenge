const path = require("path");
const router = require("express").Router();
const { register, login, checkAuth } = require(path.join(
  __dirname,
  "../controllers/authController"
));

router.post("/register", register);
router.post("/login", login);
router.post("/checkAuth", checkAuth);

module.exports = router;
