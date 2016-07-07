var Backbone = require('backbone');
var _ = require('underscore');
var ItemsCollection = require('../collections/ItemsCollection');

var ListModel = Backbone.Model.extend({
  urlRoot: '/lists',
  idAttribute: '_id',

  // defaults: {
  //   title: '',
  //   items: []
  // },

  parse: function(list) {
    var items = list.items || [];
    list.items = new ItemsCollection(items);
    return list;
  },

  toJSON: function(){
    var attributes = _.clone(this.attributes); //clone the attributes
    if (attributes.items.length != 0) {
      attributes.items = attributes.items.pluck('_id');
    }
    else {
      attributes.items = [];
    } // "pluck" the `_id`s of the models in the collection
    return attributes; // return the final object
  }
});

module.exports = ListModel;
