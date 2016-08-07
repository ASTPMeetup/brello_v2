var TagView = require('./TagView.js');
var _ = require('underscore');
var Backbone = require('backbone');

var TagsCollectionView = Backbone.View.extend({
  el: '<div id="tagsCollection"><br></div>',

  initialize: function() {
    this.listenTo(this.collection, "add", this.render);
  },

  render: function(){
    var $this = this;
    $(this.el).html('');

    if($this.collection.length){
      if ($this.collection.length != 0){
        $this.collection.each(function(tag){
          var tagView = new TagView({model: tag});
          $this.$el.append(tagView.render().el);
        });
      }
      else {
        var tagView = new TagView({model: this.collection});
        $this.$el.append(tagView.render().el);
      }
    }
    return this;
  }

});

module.exports = TagsCollectionView;
