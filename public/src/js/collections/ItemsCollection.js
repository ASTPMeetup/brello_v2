var Backbone = require('backbone');
var ItemModel = require('../models/ItemModel');
var _ = require('underscore');
var TagsCollection = require('./TagsCollection');

var ItemsCollection = Backbone.Collection.extend({
  url: '/items',
  model: ItemModel,

  // parse: function(objs) {
  //   _.each(objs, function(obj) {
  //     var Tags = obj.tags
  //     obj.tags = new TagsCollection(Tags);
  //   });
  //   return objs;
  // }
});

module.exports = ItemsCollection;
