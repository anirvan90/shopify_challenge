const path = require("path");
const User = require(path.join(__dirname, "../db/models/userModel"));
const bcrypt = require("bcryptjs");

function register(req, res) {
  const { username, password } = req.body.data;
  User.findOne({ username }).then(user => {
    if (!user) {
      bcrypt.hash(password, 10, (err, hashed) => {
        if (err) res.send("Error");
        let newUser = new User({
          username: username,
          password: hashed,
          apiKey: bcrypt.hashSync(process.env.AUTH_SECRET, 10)
        });
        newUser
          .save()
          .then(data => {
            res.status(201).json({
              apiKey: data.apiKey,
              username: data.username,
              message: `KEEP YOUR KEYS TO YOUR CHEST. SEND THEM WITH IN YOUR REQUEST HEADERS`
            });
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

module.exports = { register, checkAuth };
