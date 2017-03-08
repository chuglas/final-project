var express = require('express');
var router = express.Router();
const User = require('../models/user');

var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');


/* GET home page. */
router.post('/',  (req, res, next) => {

  var userId = req.user._id;

  const style = {
    _user: userId,
    styleName: req.body.name
  };

  console.log("getting in here?")

  User.findById(userId, (err, user)=>{
    let userStyle = new Style(style);
    user.styles.push(userStyle);
    user.save((err)=> {
      userStyle.save((err, styleSaved)=>{
        if (err) { next(err); }
        // res.redirect(`/${user.username}/events/${eventSaved._id}`);
      });
    });
  });
});

module.exports = router;
