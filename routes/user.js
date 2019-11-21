const {auth} = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const functions = require("../middleware/functions")
const express = require("express");
const router = express.Router();

router.get("/current", auth, async (req, res) => {
  const user = await functions.runQuery(`Select * from user where id = ${req.user.id}`);
  res.send(user);
});

router.post("/", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.send({statusCode: 405, errorMessage: error.details });

  //find an existing user
  let queryResults = await functions.runQuery(`Select * from user where email = "${req.body.email}"`);
  console.log(queryResults.length);
  if (queryResults.length>0) return res.status(400).send("User already registered.");

  userData = new User(req.body.name, req.body.email, req.body.password, req.body.role);
  userData.password = await bcrypt.hash(userData.password, 10);
  queryResults = await functions.runQuery(`Insert into user(name, password, email, role) values("${userData.name}", "${userData.password}", "${userData.email}", "${userData.role}")`);
  userData.id = queryResults.insertId;
  const token = userData.generateAuthToken();
  await functions.runQuery(`Insert into usertoken(token, userId) values("${token}", ${userData.id})`);
  res.header("x-auth-token", token).send(userData);
});

module.exports = router;
