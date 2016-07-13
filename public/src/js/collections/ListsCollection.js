var ListModel = require('../models/ListModel');
var Backbone = require('backbone');
var _ = require('underscore');
var ItemsCollection = require('./ItemsCollection');
var TagsCollection = require('./TagsCollection');

var ListsCollection = Backbone.Collection.extend({
  url: '/lists',
  model: ListModel,
});

module.exports = ListsCollection;
