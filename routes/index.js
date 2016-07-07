var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var UserModel = require('../models/UserModel');
var login = require('./login');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/login');
  } else {
    console.log('skips login');
    res.render('index', {
      title: 'Express',
      username: req.user.username
    });
  }
});

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Super Kewl App', username: 'Person'});
// });

module.exports = router;
