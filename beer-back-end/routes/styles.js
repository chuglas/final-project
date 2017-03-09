var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Style = require('../models/style');

var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');


/* GET home page. */

router.get('/', (req, res, next) => {
  var currentUser = req.user._id;

  User.findOne({_id: currentUser })
    .populate('styles')
    .exec((err, user)=>{
      if (err) { res.send(err); }
      return res.json(user.styles);
  });
});


router.post('/',  (req, res, next) => {

  var currentUser = req.user._id;

  const style = {
    userId: currentUser,
    name: req.body.name,
    styleBrands: [],
    stylePairings: []
  };

  console.log("style in backend?: ", style);

  User.findById(currentUser, (err, user)=>{
    let userStyle = new Style(style);
    user.styles.push(userStyle);
    user.save((err)=> {
      userStyle.save((err, styleSaved)=>{
        console.log("userId :", user)
        console.log("styleSaved: ", styleSaved);
        if (err) {
          return res.send(err);
        }
        return res.json({
          message: 'New Style created!',
          styleSaved: styleSaved
        });
      });
    });
  });
});


router.post('/test', function(req, res) {
  const style = new Style({
    userId: req.body.userId,
    name: req.body.name,
  });

  style.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Style created!',
      style: style
    });
  });
});



module.exports = router;
