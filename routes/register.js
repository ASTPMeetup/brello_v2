var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var UserModel = require('../models/UserModel');
var login = require('./login');
var logout = require('./logout');
var index = require('./index');

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('register');
  }
});

router.post('/', function(req, res, next) {
  UserModel.findOne({ username : req.body.username.toLowerCase() }, function (err, user) {
    if (user) { // if the username is taken
      req.flash('error', 'The username has already been used');
      return res.redirect('/register');
    }

    if (req.body.password.length <= 5) {
      req.flash('error', 'Password must be at least 6 characters');
      return res.redirect('/register');
    }

    // the cost in processing the data. If hackers' computers get faster, we salt
    // it harder on a logarithmic scale, staying ahead
    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

      var user = new UserModel({
        username: req.body.username.toLowerCase(),
        password: hash,
      });

      user.save(function (error, user) {

        if (error) {
          req.flash('error', error.message);
          res.redirect('/');
        }

        req.login(user, function(err) {
          if (err) { return res.redirect('/'); }

          // If the users has been created successfully, log them in with
          // passport to start their session and redirect to the '/' route
          return res.redirect('/index');
        });
      });
    });
  });
});

module.exports = router;
