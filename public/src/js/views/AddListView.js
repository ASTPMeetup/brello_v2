var ListsCollectionView = require('./ListsCollectionView');
var listModel = require('../models/ListModel');
var _ = require('underscore');
var Backbone = require('backbone');

var AddListView = Backbone.View.extend({

  el: '<div id="list"></div>',

  template: _.template('<h1 class="list_title" id="<% id %>"><%= title %></h1>'),

  formTemplate: _.template('\
    <form name="list_form" id="list_form">\
        <input form="form" name="list_content" type="text" class="content_input" align="left" placeholder=" add list" required>\
        <input type="submit" value="submit" class="button" align="right">\
    </form>\
  '),

  events: {
    'submit #list_form': 'updateCollection'
  },

  updateCollection: function(e){
    e.preventDefault();
    var $this = this;
    var $form = $(e.currentTarget);
    var listContent = $form.find('[name="list_content"]').val();
    var tags = [];
    var newlist = new listModel({name: listContent, tags: tags, list: this.model.get('_id')});
    newlist.save(null, {
      success: function(){
        $this.model.collection.fetch();
        $('#list_form').each(function(){this.reset();});
      }
    });
  },

  render: function(){
    $(this.el).html('');

    this.$el.append(this.template({
      title: this.model.get('title'),
      id: this.model.get('_id')
    }));
    var listsArray = this.model.get('lists');
    var listsListView = new ListsView({collection: listsArray});
    this.$el.append(listsListView.render().el);
    this.$el.append(this.formTemplate());

    return this;
  }
});

module.exports = AddListView;
