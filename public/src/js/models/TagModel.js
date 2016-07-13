var Backbone = require('backbone');
var _ = require('underscore');

var TagModel = Backbone.Model.extend({
  urlRoot: '/tags',
  idAttribute: '_id'
});

module.exports = TagModel;
