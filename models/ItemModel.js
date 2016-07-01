var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var itemSchema = new Schema({	'name' : String,	'tags' : [{	 	type: Schema.ObjectId,	 	ref: 'Tag'	}],	'list': {		 type: Schema.ObjectId,		 ref: 'List'	 }});

module.exports = mongoose.model('Item', itemSchema);
