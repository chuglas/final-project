var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Style = require('../models/style');
var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtOptions');
var requestify = require('requestify');


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
    description: req.body.description,
    color: req.body.color,
    apiId: req.body.apiId,
    styleBrands: [],
    stylePairings: []
  };

  console.log("style in backend?: ", style);

  User.findById(currentUser, (err, user)=>{
    let userStyle = new Style(style);
    user.styles.push(userStyle);
    user.save((err)=> {
      userStyle.save((err, styleSaved)=>{
        console.log("userId :", user);
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

router.get('/api-styles', (req, res, next) => {

  requestify.get('http://api.brewerydb.com/v2/styles/?key=3de4a6d59df63b4b0b12af0bad45b68c').then(function(response) {
      // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
      // console.log(response.getBody());
      // Get the response raw body
      return res.json(response.body);
  });

});


router.get('/style/:id', (req, res) => {

  var currentUser = req.user._id;

  console.log("usah: ", req.user._id);
  console.log("styl ", req.params.id);

  Style.findOne({ 'userId': req.user._id, 'apiId': req.params.id }, function (err, style) {
    if (err) return handleError(err);
    if (style) {
      console.log(style);
      res.json(style);
    }
  });


});


module.exports = router;
