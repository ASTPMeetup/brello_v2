var ItemView = require('./ItemView.js');
var Backbone = require('backbone');
var _ = require('underscore');

var ItemsCollectionView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('add', this.render, this);
    // $(this.el).sortable({});
  },

  el: '<div id="itemsCollection"></div>',

  render: function() {
    var that = this;
    $(this.el).html('');

    this.collection.each(function(item) {
      var itemView = new ItemView({model: item});
      $(that.el).append(itemView.render().el);
    });
    return this;
  }
});

module.exports = ItemsCollectionView;
