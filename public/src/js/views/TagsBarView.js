var TagView = require('./TagView.js');
var TagsCollection = require('../collections/TagsCollection');
var _ = require('underscore');
var Backbone = require('backbone');

var TagsBarView = Backbone.View.extend({
  el: '<div id="tagsCollection"><br></div>',

  render: function(){
    var $this = this;
    $(this.el).html('');

    $this.collection.each(function(tag){
      var tagView = new TagView({model: tag});
      $this.$el.prepend(tagView.render().el);
    });

    return this;
  }

});

module.exports = TagsBarView;
