var Backbone = require('backbone');
var _ = require('underscore');

var TagModel = Backbone.Model.extend({
  urlRoot: '/tags',
  idAttribute: '_id',

  parse: function(model, options) {
    if (options.parseModel === false) {
      return false;
    }
    return model;
  },
});

module.exports = TagModel;
