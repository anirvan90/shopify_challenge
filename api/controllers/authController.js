const path = require("path");
const User = require(path.join(__dirname, "../models/userModel"));
const bcrypt = require("bcryptjs");
const Shop = require(path.join(__dirname, "../models/shopModel"));

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
async function checkAuth(req, res, next) {
  let apiKey = req.headers["x-api-key"];
  if (isEmpty(req.body)) {
    id = null;
  } else {
    id = req.body.data.shopId;
  }
  let name = req.params.shopName;
  if ((await isShopOwner(apiKey, id, name)) === false) {
    res.status(401).json({ message: `Unauthorized Request` });
    return;
  }
  next();
}

async function validateWithApiKey(apiKey) {
  let user = await User.findOne({ apiKey: apiKey });
  if (user) {
    return true;
  }
  return false;
}

async function isShopOwner(apiKey, id, name) {
  let searchObj = {};
  if (id === null || id === undefined) {
    searchObj["name"] = name;
  } else {
    searchObj["_id"] = id;
  }
  if ((await validateWithApiKey(apiKey)) === true) {
    let shop = await Shop.findOne(searchObj);
    if (shop) {
      if (shop.ownerKey === apiKey) {
        return true;
      }
    }
  }
  return false;
}

async function authAddDelete(req, res, next) {
  let { username, password } = req.body.data;
  let apiKey = req.headers["x-api-key"];
  let result = await validateUserToCreateShop(username, password, apiKey);
  if (result.status === true) {
    next();
  } else {
    res.status(401).json({ message: result.message });
    return;
  }
}

async function validateUserToCreateShop(username, password, apiKey) {
  try {
    let user = await User.findOne({ username: username });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        if (user.apiKey === apiKey) {
          return { status: true };
        } else {
          return { status: false, message: `API Keys Do Not Match` };
        }
      } else {
        return { status: false, message: `Password Does Not Match` };
      }
    } else {
      return { status: false, message: `User Not Found` };
    }
  } catch (error) {
    return { status: false, message: `User Not Found`, error: error };
  }
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

module.exports = { register, checkAuth, authAddDelete };
