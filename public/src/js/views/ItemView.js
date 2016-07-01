var TagsCollectionView = require('./TagsCollectionView');
var _ = require('underscore');
var Backbone = require('backbone');

var ItemView = Backbone.View.extend({

  el: '<div class="jumbotron"></div>',

  initialize: function() {
    this.listenTo(this.model, 'update', this.render)
  },

  template: _.template(['<h3 id="name_title"><%= name %></h3>',
    '<a href="#"><span id="remove">remove</span></a><br>',
  ].join('')),

  render: function(){

  console.log(this.model);

  this.$el.append(this.template({
    name: this.model.get('name')
  }));
  var tagsArray = this.model.get('tags');
  var tagListView = new TagsCollectionView({collection: tagsArray});
  this.$el.append(tagListView.render().el);

  return this;
  }
});

module.exports = ItemView;
