var Backbone = require('backbone');
var _ = require('underscore');
var TagsCollection = require('../collections/TagsCollection');

var ItemModel = Backbone.Model.extend({
  urlRoot: '/items',
  idAttribute: '_id',

  toJSON: function(){
    var attributes = _.clone(this.attributes); //clone the attributes
    if(attributes.tags) {
      if(attributes.tags.length){
        if (attributes.tags.length != 0) {
          attributes.tags = attributes.tags.pluck('_id');
        }
        else {
          attributes.tags = [];
        }
      }
    } // "pluck" the `_id`s of the models in the collection
    return attributes; // return the final object
  }
});

module.exports = ItemModel;
