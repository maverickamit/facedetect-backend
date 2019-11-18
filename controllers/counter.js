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
  handleCounter: handleCounter
};
