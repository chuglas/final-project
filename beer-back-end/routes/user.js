var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');

// Our user model
const User           = require("../models/user");

router.get("/user", (req, res, next) => {
  // if (err) {
  //   res.status(400).json({ message: err });
  // } else {
    return res.json(req.user);
  // }
});


module.exports = router;
