const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const User = require(path.join(__dirname, "../db/models/userModel"));
const Joi = require("joi");
const bcrypt = require("bcryptjs");

// Get All Shops - Params None - Return json all shops
async function getAllShops(req, res) {
  const data = await Shop.find({}, "-orders -__v -ownerKey").exec();
  res.status(200).json(data);
}

// Add One Shop - Param Name - Return Success/Fail Message
async function addOneShop(req, res) {
  try {
    let apiKey = req.headers["x-api-key"];
    let { name, username, password } = req.body.data;
    let validUser = await validateUserToCreateShop(username, password, apiKey);
    if (validUser.status === false) {
      res.status(401).json({ message: validUser.message });
      return;
    }
    validateName(name, res);
    let shop = new Shop({ name: name, ownerKey: apiKey });
    let savedShop = await shop.save();
    if (savedShop) {
      res.status(201).json({
        name: savedShop.name,
        id: savedShop._id,
        message: `Your New Shop Is Ready!`
      });
    }
  } catch (err) {
    res.status(501).json(err);
  }
}

// Edit Name of Shop - Param Name & ID - Return Success/Fail Message
async function editOneShop(req, res) {
  let apiKey = req.headers["x-api-key"];
  let { oldName, newName, id } = req.body.data;
  if ((await isShopOwner(apiKey, id)) === false) {
    res.status(401).json({ message: `Unauthorized Request` });
    return;
  }
  validateName(newName, res);
  let shop = await Shop.findOneAndUpdate({ name: oldName }, { name: newName });
  if (shop) {
    res
      .status(201)
      .json({ message: `Successfully Changed ${oldName} to ${newName}` });
  } else {
    res.status(404).send(`Could Not Save`);
  }
}

// Delete One Shop - Param Id - Return Success/Fail Message
async function deleteOneShop(req, res) {
  let apiKey = req.headers["x-api-key"];
  let { id, name } = req.body.data;
  if ((await isShopOwner(apiKey, id)) === false) {
    res.status(401).json({ message: `Unauthorized Request` });
    return;
  }
  let shop = await Shop.findOneAndDelete({ _id: id });
  if (shop) {
    shop.remove();
    res.status(202).json({ message: `You Have Deleted ${shop.name}` });
  } else {
    res.status(404).send({ message: `Something Went Wrong!` });
  }
}

// Shop Name Validation Helper Function - This needs to be fixed
function validateName(name, res) {
  const schema = Joi.string()
    .alphanum()
    .min(5)
    .max(12)
    .required();
  return Joi.validate(name, schema, (err, val) => {
    if (err) {
      res.status(501).json({
        message: `Shop Name Must Be between 3 and 12 characters and alphanumeric`
      });
    }
  });
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

async function validateUser(apiKey) {
  let user = await User.findOne({ apiKey: apiKey });
  if (user) {
    return true;
  }
  return false;
}

async function isShopOwner(apiKey, id) {
  if ((await validateUser(apiKey)) === true) {
    let shop = await Shop.findOne({ _id: id });
    if (shop) {
      if (shop.ownerKey === apiKey) {
        return true;
      }
    }
  }
  return false;
}

module.exports = {
  getAllShops,
  addOneShop,
  editOneShop,
  deleteOneShop,
  isShopOwner,
  validateUser
};
