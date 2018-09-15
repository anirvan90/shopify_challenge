const path = require("path");
const User = require(path.join(__dirname, "../db/models/userModel"));
const bcrypt = require("bcryptjs");

function login(req, res) {
  res.send("hi from login");
}
function register(req, res) {
  const { username, password } = req.body.data;
  User.findOne({ username }).then(user => {
    if (!user) {
      bcrypt.hash(password, 10, (err, hashed) => {
        if (err) res.send("Error");
        let newUser = new User({
          username: username,
          password: hashed
        });
        newUser
          .save()
          .then(data => {
            res.status(201).json({ token: "hi", username: username });
          })
          .catch(err => {
            res.status(501).json({ message: "error in saving" });
          });
      });
    } else {
      res.status(400).json({ message: "Username is taken" });
    }
  });
}
function checkAuth(req, res) {
  res.send("hi from checkAuth");
}

module.exports = { login, register, checkAuth };
