var ItemsCollectionView = require('./ItemsCollectionView');
var ItemModel = require('../models/ItemModel');
var TitleFormView = require('./TitleFormView');
var _ = require('underscore');
var Backbone = require('backbone');

var ListView = Backbone.View.extend({

  el: '<div id="list"></div>',

  // initialize: function() {
  //   this.listenTo(this.model, "sync", this.render);
  //   this.listenTo(this.model, "all", this.render);
  // },

  template: _.template('<div><span id="options">\
    <img src="../../../images/delete.png" id="delete">\
    <img style="opacity: 0.7;" src="../../../images/update_title.png" id="update">\
    </span>\
    <h1 class="list_title" id="<% id %>"><%= title %></h1></div>\
  '),

  itemFormTemplate: _.template('\
    <br>\
    <form name="item_form" id="item_form">\
        <input form="form" name="item_content" type="text" class="content_input" align="left" placeholder=" add item" required>\
        <input type="submit" value="submit" class="button" align="right">\
    </form>\
  '),

  events: {
    'submit #item_form': 'updateCollection',
    "click #delete": "removeList",
    "click #update": "updateListForm"
  },

  removeList: function(){
    this.model.destroy();
    this.remove();
  },

  updateListForm: function(e){
    e.preventDefault();
    var $target = $(e.currentTarget).closest('div');
    var titleFormView = new TitleFormView({model: this.model});
    titleFormView.render();
    $target.empty();
    $target.html(titleFormView.el);
  },

  updateCollection: function(e){
    e.preventDefault();
    var $this = this;
    var $form = $(e.currentTarget);
    var itemContent = $form.find('[name="item_content"]').val();
    var tags = [];
    var newItem = new ItemModel({name: itemContent, list: this.model.get('_id')});
    newItem.save(null, {
      success: function(){
        $this.model.fetch();
        $('#item_form').each(function(){this.reset();});
      }
    });
  },

  render: function(){
    $(this.el).html('');

    this.$el.append(this.template({
      title: this.model.get('title'),
      id: this.model.get('_id')
    }));
    var itemsArray = this.model.get('items');
    if (itemsArray.length){
      var itemsListView = new ItemsCollectionView({collection: itemsArray});
      this.$el.append(itemsListView.render().el);
    }
    this.$el.append(this.itemFormTemplate());

    return this;
  }
});

module.exports = ListView;
