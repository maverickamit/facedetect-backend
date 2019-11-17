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

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: 987,
      hash: "",
      email: "john@gmail.com"
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (
    email === database.users[0].email &&
    password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error loggin in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  db("users")
    .insert({
      name: name,
      email: email,
      time: new Date()
    })
    .returning("*")
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json("unable to register"));

  // db("login").insert([
  //   {
  //     hash: password,
  //     email: email
  //   }
  // ]);

  // res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  let isUserExist = false;
  database.users.forEach(user => {
    if (user.id === req.params.id) {
      isUserExist = true;
      return res.json(user);
    }
  });

  if (!isUserExist) {
    res.status(404).json("No such user");
  }
});

app.put("/image", (req, res) => {
  let isUserExist = false;
  database.users.forEach(user => {
    if (user.id === req.body.id) {
      isUserExist = true;
      user.entries += 1;
      return res.json(user);
    }
  });

  if (!isUserExist) {
    res.status(404).json("No such user");
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
