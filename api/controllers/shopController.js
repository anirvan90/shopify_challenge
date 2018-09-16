const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const Joi = require("joi");

// Get All Shops - Params None - Return json all shops
function getAllShops(req, res) {
  Shop.find({}, "-orders -__v").exec((err, data) => {
    if (err) res.status(404).send(`Could Not Find Resources`);
    res.status(200).json(data);
  });
}

// Add One Shop - Param Name - Return Success/Fail Message
function addOneShop(req, res, next) {
  let { name } = req.body.data;
  validateName(name, res);
  let shop = new Shop({ name: name });
  shop.save(function(err, data) {
    if (err)
      res.status(501).json({ message: `Error Creating New Shop ${name}` });
    Shop.findOne({ name: name }).then(data => {
      res.status(201).json({ id: data._id, name: data.name });
    });
  });
}

// Edit Name of Shop - Param Name & ID - Return Success/Fail Message
function editOneShop(req, res) {
  let { name, id } = req.body.data;
  validateName(name, res);
  Shop.findOneAndUpdate({ _id: id }, { name: name })
    .then(data => {
      res
        .status(201)
        .json({ message: `Successfully Changed ${data.name} to ${name}` });
    })
    .catch(err => {
      res.status(404).send(err);
    });
}

// Delete One Shop - Param Id - Return Success/Fail Message
function deleteOneShop(req, res) {
  let { id } = req.body.data;
  Shop.findOneAndDelete({ _id: id })
    .then(data => {
      data.remove();
      res.status(202).json({ message: `You Have Deleted ${data.name}` });
    })
    .catch(err => {
      res.status(404).send({ message: `Something Went Wrong!` });
    });
}

// Shop Name Validation Helper Function
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
module.exports = { getAllShops, addOneShop, editOneShop, deleteOneShop };
