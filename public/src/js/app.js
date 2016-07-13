window.$ = window.jQuery = require('jquery');
var ListsCollectionView = require('./views/ListsCollectionView');
var ListsCollection = require('./collections/ListsCollection');

var listsCollection = new ListsCollection();

$(document).ready(function(){
  listsCollection.fetch({
    success: function(){
      var listsCollectionView = new ListsCollectionView({collection: listsCollection});
      $('#app').html(listsCollectionView.render().el);
    }
  });
});
