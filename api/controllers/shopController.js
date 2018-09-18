const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const User = require(path.join(__dirname, "../db/models/userModel"));
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { isShopOwner } = require(path.join(
  __dirname,
  "../controllers/authController"
));

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
  let { oldName, newName } = req.body.data;
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
  let { shopId } = req.body.data;
  let shop = await Shop.findOneAndDelete({ _id: shopId });
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

module.exports = {
  getAllShops,
  addOneShop,
  editOneShop,
  deleteOneShop
};
