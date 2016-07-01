var TagModel = require('../models/TagModel');
var Backbone = require('backbone');

var TagsCollection = Backbone.Collection.extend({
  url: '/tags',
  model: TagModel
});

module.exports = TagsCollection;
