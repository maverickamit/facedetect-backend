const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "12345",
    database: "smart-brain"
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(value => {
      if (bcrypt.compareSync(password, value[0].hash)) {
        res.json("success");
      } else {
        res.status(400).json("Wrong Credentials");
      }
    })
    .catch(err => res.json("something is wrong"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  var hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx("login")
      .insert({
        hash: hash,
        email: email
      })

      .then(() => {
        trx("users")
          .insert({
            name: name,
            email: email,
            time: new Date()
          })
          .returning("*")
          .then(user => {
            res.json(user[0]);
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(err => res.status(400).json("unable to register"));
  });
});

app.get("/profile/:id", (req, res) => {
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
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => res.status(400).json("unable to get count"));
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
