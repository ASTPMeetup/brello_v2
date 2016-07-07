var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);