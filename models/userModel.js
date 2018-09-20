const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  apiKey: String
});

userSchema.pre("save", function(next) {
  let user = this;
  user.password = bcrypt.hashSync(user.password, 10);
  user.apiKey = bcrypt.hashSync(process.env.AUTH_SECRET, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
