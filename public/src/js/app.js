window.$ = window.jQuery = require('jquery');
var ListsCollectionView = require('./views/ListsCollectionView');
var ItemsCollection = require('./collections/ItemsCollection');
var TagsCollection = require('./collections/TagsCollection');
var ListsCollection = require('./collections/ListsCollection');

var listsCollection = new ListsCollection();
var itemsCollection = new ItemsCollection();
var tagsCollection = new TagsCollection();

$(document).ready(function(){
  listsCollection.fetch({
    success: function() {
      itemsCollection.fetch({
        success: function() {
          var listsCollectionView = new ListsCollectionView({collection: listsCollection});
          $('#app').html(listsCollectionView.render().el);
        }
      });
    }
  });
});
