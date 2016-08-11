window.$ = window.jQuery = require('jquery');
var ListsCollectionView = require('./views/ListsCollectionView');
var ListsCollection = require('./collections/ListsCollection');
var TagsBarView = require('./views/TagsBarView');
var TagsCollection = require('./collections/TagsCollection');

var listsCollection = new ListsCollection();
var tagsMenu = new TagsCollection();

$(document).ready(function(){
  listsCollection.fetch({
    success: function(){
      var listsCollectionView = new ListsCollectionView({collection: listsCollection});
      $('#app').html(listsCollectionView.render().el);
    }
  });

  tagsMenu.fetch({
    success: function(){
      var tagsBar = new TagsBarView({collection: tagsMenu});
      $('#tag_menu').children().append(tagsBar.render().el);
    }
  });


  $('#add_tag').on('click', function(e){
    e.preventDefault();
    $('#tag_menu').css('display', 'block');
  });

  $('#hide_menu').on('click', function(e){
    e.preventDefault();
    $('#tag_menu').css('display', 'none');
  });
});
