var Backbone = require('backbone');
var _ = require('underscore');
var TagsCollection = require('../collections/TagsCollection');

var ItemModel = Backbone.Model.extend({
  urlRoot: '/items',
  idAttribute: '_id',

  parse: function(model, options) {
    if (options.parseModel == false){
      return model;
    }
    else {
      var tags = model.tags;
      model.tags = new TagsCollection(tags);
      return model;
    }
  },

  toJSON: function(options){
    if (options.parseModel === false) {
      return false;
    }
    var attributes = _.clone(this.attributes); //clone the attributes
    if(attributes.tags && attributes.tags.length && attributes.tags.length != 0) {
      attributes.tags = attributes.tags.pluck('_id');
    }
    else {
      attributes.tags = [];
    } // "pluck" the `_id`s of the models in the collection
    return attributes; // return the final object
  }
});

module.exports = ItemModel;
