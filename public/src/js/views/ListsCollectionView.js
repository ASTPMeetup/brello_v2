var ListView = require('./ListView.js');
var Backbone = require('backbone');

var ListsCollectionView = Backbone.View.extend({
  el: '<div id="listsCollection"></div>',

  initialize: function() {
    this.listenTo(this.collection, 'update', this.render)
  },

  render: function() {
    var that = this;
    console.log(this.collection);
    $(this.el).html('');

    this.collection.each(function(List) {
      var listView = new ListView({ model: List });
      $(that.el).append(listView.render().el);
    });
    return this;
  }
});

module.exports = ListsCollectionView;
