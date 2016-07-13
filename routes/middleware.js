var mongoose = require('mongoose');
var passport = require('passport');

module.exports = {
  auth: function(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }
    else {
    // If not authenticated, redirect to the login screen
      return res.redirect('/login');
    }
  }
}
