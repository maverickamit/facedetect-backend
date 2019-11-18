const handleProfile = (req, res, db) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .select("*")
    .then(data => {
      if (data.length) {
        res.json(data[0]);
      } else {
        res.status(400).json("User is nonexistent!");
      }
    })
    .catch(err => {
      res.json("Something is wrong!");
    });
};

module.exports = {
  handleProfile: handleProfile
};
