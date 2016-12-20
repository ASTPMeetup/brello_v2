window.$ = window.jQuery = require('jquery');
var ListsCollectionView = require('./views/ListsCollectionView');
var ListsCollection = require('./collections/ListsCollection');
var TagsBarView = require('./views/TagsBarView');
var TagsCollection = require('./collections/TagsCollection');
var Backbone = require('backbone');

var listsCollection = new ListsCollection();
var allTags = new TagsCollection();

$(document).ready(function(){
  listsCollection.fetch({
    success: function(){
      var listsCollectionView = new ListsCollectionView({collection: listsCollection});
      $('#app').html(listsCollectionView.render().el);
    }
  });

  allTags.fetch({
    success: function(){
      var tagsMenu = new Backbone.Collection(allTags.first(6));
      var tagsBar = new TagsBarView({collection: tagsMenu});
      $('#tag_menu').children().append(tagsBar.render().el);
    }
  });


  $('#add_tag').on('click', function(e){
    e.preventDefault();
    $('#tag_menu').css('display', 'block');
    $('#addImage').animate({'height': '60px'}, 'slow');
  });

  $('#hide_menu').on('click', function(e){
    e.preventDefault();
    $('#tag_menu').css('display', 'none');
    $('#addImage').animate({'height': '40px'}, 'slow');
  });
});
