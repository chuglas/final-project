var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Style = require('../models/style');

var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');


/* GET home page. */
router.post('/',  (req, res, next) => {

  var userId = req.user._id

  const style = {
    // _user: userId,
    // styleName: req.body.name
    user: userId,
    styleName: ''
  };

  User.findById(userId, (err, user)=>{
    console.log("userObject ", user);
    let userStyle = new Style(style);
    console.log("userStyle Object: ", userStyle)
    user.styles.push(userStyle);
    console.log("user styles array ", user.styles);

    user.save((err)=> {
      userStyle.save((err, styleSaved)=>{
        if (err) { next(err); }
        // res.redirect(`/${user.username}/events/${eventSaved._id}`);
      });
    });
  });
});

module.exports = router;
