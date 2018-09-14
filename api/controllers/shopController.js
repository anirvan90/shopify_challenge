const path = require("path");
const Shop = require(path.join(__dirname, "../db/models/shopModel"));
const Joi = require("joi");

function getAllShops(req, res) {
  Shop.find({}, "name products").exec((err, data) => {
    if (err) res.status(404).send(`Could Not Find Resources`);
    res.status(200).json(data);
  });
}

function addOneShop(req, res) {
  const schema = Joi.string()
    .alphanum()
    .min(5)
    .max(12)
    .required();
  let name = req.body.data.name;
  Joi.validate(name, schema, (err, val) => {
    if (err) {
      res.status(501).json({
        message: `Shop Name Must Be between 3 and 12 characters and alphanumeric`
      });
    }
  });
  let shop = new Shop({ name: name });
  shop.save(function(err, data) {
    if (err)
      res.status(501).json({ message: `Error Creating New Shop ${name}` });
    Shop.findOne({ name: name }).then(data => {
      res.status(201).json({ id: data._id, name: data.name });
    });
  });
}

function editOneShop(req, res) {
  let id = req.body.data.id;
  let name = req.body.data.name;
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

function deleteOneShop(req, res) {
  let id = req.body.data.id;
  Shop.findOneAndDelete({ _id: id })
    .then(data => {
      data.remove();
      res.status(202).json({ message: `You Have Deleted ${data.name}` });
    })
    .catch(err => {
      res.status(404).send({ message: `Something Went Wrong!` });
    });
}
module.exports = { getAllShops, addOneShop, editOneShop, deleteOneShop };
