const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ key: "helloWorld" });
});

app.listen(PORT, () => {
  console.log(`App is listening on Port:${PORT}`);
});
