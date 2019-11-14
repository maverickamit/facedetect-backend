const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

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
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error loggin in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length - 1]);
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
