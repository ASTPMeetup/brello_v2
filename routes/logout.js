var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var UserModel = require('../models/UserModel');
var register = require('./register');
var login = require('./login');

router.get('/', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
