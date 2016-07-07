var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var UserModel = require('../models/UserModel');
var register = require('./register');

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});


router.post('/', passport.authenticate('local'), function(req, res) {
  res.redirect('/'); //can only navigate to '/' if
});

module.exports = router;
