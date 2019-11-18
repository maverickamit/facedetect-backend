const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(value => {
      if (bcrypt.compareSync(password, value[0].hash)) {
        db("users")
          .select("*")
          .where("email", "=", email)
          .then(data => {
            res.json(data[0]);
          });
      } else {
        res.status(400).json("Wrong Credentials");
      }
    })
    .catch(err => res.json("something is wrong"));
};

module.exports = {
  handleSignin: handleSignin
};
