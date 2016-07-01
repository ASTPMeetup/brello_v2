var ItemView = require('./ItemView.js');
var Backbone = require('backbone');

var ItemsCollectionView = Backbone.View.extend({
  el: '<div id="itemsCollection"></div>',

  initialize: function() {
    this.listenTo(this.collection, 'update', this.render)
  },

  render: function() {
    var that = this;
    $(this.el).html('');

    console.log(this.collection);

    this.collection.each(function(item) {
      var itemView = new ItemView({ model: item });
      $(that.el).append(itemView.render().el);
    });
    return this;
  }
});

module.exports = ItemsCollectionView;
