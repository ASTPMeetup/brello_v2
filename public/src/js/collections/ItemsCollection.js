var Backbone = require('backbone');
var ItemModel = require('../models/ItemModel');
var _ = require('underscore');

var ItemsCollection = Backbone.Collection.extend({
  url: '/items',
  model: ItemModel
});

module.exports = ItemsCollection;
