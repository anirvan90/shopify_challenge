const path = require("path");
const Shop = require(path.join(__dirname, "../models/shopModel"));
const Joi = require("joi");

// Get All Shops - Params None - Return json all shops
async function getAllShops(req, res) {
  const data = await Shop.find({}, "-orders -__v -ownerKey").exec();
  res.status(200).json(data);
}

// Add One Shop - Param Name - Return Success/Fail Message
async function addOneShop(req, res) {
  let apiKey = req.headers["x-api-key"];
  let { name } = req.body.data;
  let result = validateName(name, res);
  if (result.error !== null) {
    res.status(401).json({
      message: `Shop Name Must Be Between 5 & 12 AlphaNumeric Characters`
    });
    return;
  }
  try {
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
  let result = validateName(newName, res);
  if (result.error !== null) {
    res.status(401).json({
      message: `Shop Name Must Be Between 5 & 12 AlphaNumeric Characters`
    });
    return;
  }
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

// Shop Name Validation Helper Function
function validateName(name) {
  const schema = Joi.string()
    .alphanum()
    .min(5)
    .max(12)
    .required();
  const result = Joi.validate(name, schema);
  return result;
}

module.exports = {
  getAllShops,
  addOneShop,
  editOneShop,
  deleteOneShop
};
