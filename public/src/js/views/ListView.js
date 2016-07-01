var ItemsCollectionView = require('./ItemsCollectionView');
var _ = require('underscore');
var Backbone = require('backbone');

var ListView = Backbone.View.extend({

  el: '<div id="list"></div>',

  template: _.template('<br><h3 id="list_title"><%= title %></h3>'),

  render: function(){
    this.$el.append(this.template({
      title: this.model.get('title'),
    }));
    var itemsArray = this.model.get('items');
    var itemsListView = new ItemsCollectionView({collection: itemsArray});
    this.$el.append(itemsListView.render().el);

    return this;
  }
});

module.exports = ListView;
