var TagView = require('./TagView.js');
var _ = require('underscore');
var Backbone = require('backbone');

var TagsCollectionView = Backbone.View.extend({
  el: '<div id="tagsCollection"></div>',

  render: function(){
    var _this = this;
    console.log(this.collection);
    
    if (_this.collection.length != 0){
      _this.collection.each(function(tag){
        var tagView = new TagView({model: tag});
        _this.$el.append(tagView.render().el);
      });
    }
    else {
      var tagView = new TagView({model: this.collection});
      _this.$el.append(tagView.render().el);
    }
    return this;
  }

});

module.exports = TagsCollectionView;
