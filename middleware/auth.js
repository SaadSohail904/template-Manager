const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();
var acl = require('express-acl');
var app = require("../app.js");
const usersRoute = require("../routes/user");

module.exports = {
  auth: function(req, res, next) {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, config.get("myprivatekey"));
      req.decoded = decoded;
      router.use(acl.authorize);
      console.log(req.decoded);
      next();
    } catch (ex) {
      //if invalid token
      console.log(ex);
      res.status(400).send("Invalid token.");
    }
  },
  authRouter: router
}
