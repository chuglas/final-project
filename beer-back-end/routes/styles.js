var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Style = require('../models/style');
const Brand = require('../models/brand');
const Pairing = require('../models/pairing');

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

// -----------------------------------------------------------------------------
// ADDING A NEW BEER STYLE
// -----------------------------------------------------------------------------

router.post('/',  (req, res, next) => {

  var currentUser = req.user._id;

  const style = {
    userId: currentUser,
    name: req.body.name,
    description: req.body.description,
    color: req.body.color,
    colorNum: req.body.colorNum,
    apiId: req.body.apiId,
    styleBrands: [],
    stylePairings: []
  };

  User.findById(currentUser, (err, user)=>{
    let userStyle = new Style(style);
    user.styles.push(userStyle);
    user.save((err)=> {
      userStyle.save((err, styleSaved)=>{
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


// -----------------------------------------------------------------------------
// GETTING THE BEER STYLES FROM THE API
// -----------------------------------------------------------------------------

router.get('/api-styles', (req, res, next) => {

  requestify.get('http://api.brewerydb.com/v2/styles/?key=3de4a6d59df63b4b0b12af0bad45b68c').then(function(response) {
      // console.log(response.getBody()); <-- Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
      return res.json(response.body); // <--  Get the response raw body
  });

});

// -----------------------------------------------------------------------------
// GETTING THE INDIVUDAL BEER STYLE INFORMATION
// -----------------------------------------------------------------------------

router.get('/style/:id', (req, res) => {

  var currentUser = req.user._id;

  Style.findOne({ 'userId': req.user._id, 'apiId': req.params.id }, function (err, style) {
    if (err) return handleError(err);
    if (style) {
      res.json(style);
    }
  });
});

// -----------------------------------------------------------------------------
// GETTING BRANDS BY STYLE
// -----------------------------------------------------------------------------

router.get('/style/:id/brand', (req, res, next) => {
  var currentUser = req.user._id;

  Style.findOne({ 'userId': req.user._id, 'apiId': req.params.id })
    .populate('styleBrands')
    .exec((err, style)=>{
      if (err) { res.send(err); }
      console.log("hi hi: ", style);
      if (style) {
        return res.json(style.styleBrands);
      }
  });
});


// -----------------------------------------------------------------------------
// ADDING A BRAND TO A STYLE
// -----------------------------------------------------------------------------

router.post('/style/:id/brand',  (req, res, next) => {

  var currentUser = req.user._id;

  Style.findOne({ 'userId': req.user._id, 'apiId': req.params.id }, function (err, style) {

    console.log('style found: ', style);

    const brand = {
      user: currentUser,
      style: style._id,
      name: req.body.name,
      breweryName: req.body.breweryName,
      tastingNotes: req.body.tastingNotes,
      rating: req.body.rating
    };

    console.log('style found: ', style);
    let styleBrand = new Brand(brand);
    style.styleBrands.push(styleBrand);
    style.save((err)=> {
      styleBrand.save((err, brandSaved)=>{
        if (err) {
          return res.send(err);
        }
        console.log('brand saved: ', brandSaved);
        return res.json({
          message: 'New Style created!',
          brandSaved: brandSaved
        });
      });
    });
  });

});

// -----------------------------------------------------------------------------
// UPDATING A BRAND
// -----------------------------------------------------------------------------

router.put('/style/:id/brand/:brandId', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {

  Brand.findOneAndUpdate({ 'userId': req.user._id, 'apiId': req.params.id }, {
    name: req.body.name,
    breweryName: req.body.breweryName,
    tastingNotes: req.body.tastingNotes,
    rating: req.body.rating
    }, (err) => {
      if (err) {
        return res.send(err);
      }

      return res.json({
        message: 'Brand updated successfully'
      });
    });
  }
});


// -----------------------------------------------------------------------------
// GETTING PAIRINGS BY STYLE
// -----------------------------------------------------------------------------

router.get('/style/:id/pairing', (req, res, next) => {
  var currentUser = req.user._id;

  Style.findOne({ 'userId': req.user._id, 'apiId': req.params.id })
    .populate('stylePairings')
    .exec((err, style)=>{
      if (err) { res.send(err); }
      console.log("hi hi: ", style);
      if (style) {
        return res.json(style.stylePairings);
      }  
  });
});


// -----------------------------------------------------------------------------
// ADDING A PAIRING TO A STYLE
// -----------------------------------------------------------------------------

router.post('/style/:id/pairing',  (req, res, next) => {

  var currentUser = req.user._id;

  Style.findOne({ 'userId': req.user._id, 'apiId': req.params.id }, function (err, style) {

    console.log('style found: ', style);

    const pairing = {
      user: currentUser,
      style: style._id,
      name: req.body.name,
      breweryName: req.body.breweryName,
      description: req.body.description,
      rating: req.body.rating
    };

    console.log('style found: ', style);
    let stylePairing = new Pairing(pairing);
    style.stylePairings.push(stylePairing);
    style.save((err)=> {
      stylePairing.save((err, pairingSaved)=>{
        if (err) {
          return res.send(err);
        }
        console.log('pairing saved: ', pairingSaved);
        return res.json({
          message: 'New Style created!',
          pairingSaved: pairingSaved
        });
      });
    });
  });

});




module.exports = router;
