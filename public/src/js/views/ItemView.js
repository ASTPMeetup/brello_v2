var TagsCollectionView = require('./TagsCollectionView');
var ItemFormView = require('./ItemFormView');
var _ = require('underscore');
var Backbone = require('backbone');

var ItemView = Backbone.View.extend({

  el: '<div class="jumbotron" id="item_model"></div>',

  template: _.template('\
    <span id="options">\
    <img src="../../../images/delete.png" id="delete">\
    <img src="../../../images/update.png" id="update">\
    </span>\
    <h3 id="name_title"><%= name %></h3>\
  '),

  events: {
    "click #delete": "removeItem",
    "click #update": "updateForm"
  },

  removeItem: function(){
    this.model.destroy();
    this.remove();
  },

  updateForm: function(e){
    e.preventDefault();
    var $target = $(e.currentTarget).closest('div');
    var editFormView = new ItemFormView({model: this.model});
    editFormView.render();
    $target.empty();
    $target.html(editFormView.el);
  },


  render: function(){
    this.$el.append(this.template({
      name: this.model.get('name')
    }));
    var tagsArray = this.model.get('tags');
    if (tagsArray.length != 0) {
      var tagListView = new TagsCollectionView({collection: tagsArray});
      this.$el.append(tagListView.render().el);
    }
    return this;
  }
});

module.exports = ItemView;
