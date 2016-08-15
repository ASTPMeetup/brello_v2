var TagsCollectionView = require('./TagsCollectionView');
var ItemFormView = require('./ItemFormView');
var TagModel = require('../models/TagModel');
var TagsCollection = require('../collections/TagsCollection');
var TagsBarView = require('./TagsBarView');
var _ = require('underscore');
var Backbone = require('backbone');

var ItemView = Backbone.View.extend({
  el: '<div class="jumbotron" id="item_model"></div>',

  initialize: function() {
    this.listenTo(this.model, "save", this.render);
    this.listenTo(this.model, "change:name", this.render);
    this.listenTo(this.model, "change:tags", this.render);

    var $this = this;

    $(this.el).droppable({
        drop:function(event, ui) {
          var droppedTag = $(ui.draggable).data("backbone-view");
          var newTag = new TagModel({
            color: droppedTag.get('color'),
            label: droppedTag.get('label')
          });
          newTag.fetch();


          newTag.save(null,{
            success: function(){
              var tagList = $this.model.get('tags');
              tagList.add(newTag);
              $this.model.save();

              var refreshBar = new TagsCollection();
              refreshBar.fetch({
                success: function(){
                  var tagsBar = new TagsBarView({collection: refreshBar});
                  $('#tag_menu').find('#tagsCollection').remove();
                  $('#tag_menu').children().append(tagsBar.render().el);
                }
              });
            }
          });
          ui.draggable.detach();
        }
    });
  },

  template: _.template('\
    <span id="options">\
    <img src="../../../images/delete.png" id="delete">\
    <img src="../../../images/update.png" id="update">\
    </span>\
    <h3 id="name_title"><%= name %></h3>\
  '),

  events: {
    "click #delete": "deleteItem",
    "click #update": "updateForm",
    "click .delete_tag": "removeTag"
  },

  deleteItem: function(){
    this.model.destroy();
    this.remove();
  },

  removeTag: function(e) {
    var itemTags = this.model.get('tags');
    var $tagID = $(e.currentTarget).attr('id');
    var tag2remove = itemTags.get($tagID);
    itemTags.remove(tag2remove);
    this.model.save();
  },

  updateForm: function(e){
    e.preventDefault();
    var $this = this;
    var $target = $(e.currentTarget).closest('div');
    var $targetCont
    var editFormView = new ItemFormView({model: this.model});
    editFormView.render();
    $target.empty();
    $target.html(editFormView.el);
  },


  render: function(){
    $(this.el).html('');

    this.$el.append(this.template({
      name: this.model.get('name')
    }));
    var tagsArray = this.model.get('tags');
    var noTags;
    if (tagsArray.length != 0) {
      var tagListView = new TagsCollectionView({collection: tagsArray});
      this.$el.append(tagListView.render().el);
    }
    else {
      var tagListView = new TagsCollectionView({collection: ""});
      this.$el.append(tagListView.render().el);
    }
    return this;
  }
});

module.exports = ItemView;
