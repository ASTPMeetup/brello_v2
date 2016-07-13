var Backbone = require('backbone');
var _ = require('underscore');
var ItemsCollection = require('../collections/ItemsCollection');
var TagsCollection = require('../collections/TagsCollection');

var ListModel = Backbone.Model.extend({
  urlRoot: '/lists',
  idAttribute: '_id',

  parse: function(model, options) {
      if (options.parseModel === false) {
        return false;
      }
      var items = model.items;
      model.items = new ItemsCollection(items);
      model.items.each(function(item) {
        item.set('tags', new TagsCollection(item.get('tags')));
      });
    return model;
  },

  toJSON: function(){
    var attributes = _.clone(this.attributes); //clone the attributes
    if(attributes.items){
      if (attributes.items.length != 0) {
        attributes.items = attributes.items.pluck('_id');
      }
      else {
        attributes.items = [];
      } // "pluck" the `_id`s of the models in the collection
    }
    return attributes; // return the final modelect
  }
});

module.exports = ListModel;
