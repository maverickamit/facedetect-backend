const Clarifai = require("clarifai");

const handleApiCall = (req, res) => {
  const app = new Clarifai.App({
    apiKey: "adf356b58c634ee98c2d9de8859629a6"
  });

  app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log("Error from server side"));
};

const handleCounter = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(data => {
      console.log(data[0]);
      res.json(data[0]);
    })
    .catch(err => res.status(400).json("unable to get count"));
};

module.exports = {
  handleCounter,
  handleApiCall
};
