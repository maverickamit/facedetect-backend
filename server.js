const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const counter = require("./controllers/counter");
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

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  counter.handleCounter(req, res, db);
});

app.post("/imageurl", (req, res) => {
  counter.handleApiCall(req, res);
});
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
