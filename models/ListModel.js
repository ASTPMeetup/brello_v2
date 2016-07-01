var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var listSchema = new Schema({	'title' : String,	'items' : Array});

module.exports = mongoose.model('List', listSchema);
