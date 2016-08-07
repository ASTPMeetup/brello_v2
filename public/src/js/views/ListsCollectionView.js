var ListView = require('./ListView.js');
var ListModel = require('../models/ListModel');
var Backbone = require('backbone');
var _ = require('underscore');

var ListsCollectionView = Backbone.View.extend({
  el: '<div id="columns"></div>',

  initialize: function() {
    // this.listenTo(this.collection, 'update', this.render);
    // this.listenTo(this.collection, "add", this.render);
  },

  template: _.template('\
    <div id="list">\
        <form name="list_form" class="title_form">\
          <input form="form" name="list_content" type="text" id="title_input" align="left" placeholder=" add list" required>\
          <input type="submit" value="submit" class="button" id="add_list_button" align="right">\
        </form>\
    </div>\
  '),

  events: {
    "submit .title_form": "addList"
  },

  addList: function(e) {
    e.preventDefault();
    var that = this;
    var $form = $(e.currentTarget);
    var listContent = $form.find('[name="list_content"]').val();
    var newList = new ListModel({title: listContent});
    newList.save(null, {
      success: function(){
        that.collection.fetch({
          success: function(){
            var newListView = new ListView({ model: newList });
            $('#columns #list:first-child').after(newListView.render().el);
            $('.title_form').each(function(){this.reset();});
          }
        });
      }
    });
  },

  render: function() {
    var that = this;
    $(this.el).html('');
    this.collection.each(function(List) {
      var listView = new ListView({ model: List });
      $(that.el).prepend(listView.render().el);
    });
    $(this.el).prepend(this.template());
    return this;
  }
});

module.exports = ListsCollectionView;
