var _ = require('underscore');
var Backbone = require('backbone');
// var TagsCollection = require('../collections/TagsCollection');
// var TagsBarView = require('./TagsBarView');

var TagView = Backbone.View.extend({
  el: '<span id="tag"></span>',

  initialize: function() {
    $(this.el).draggable({
        cancel: ".jumbotron",
        appendTo: ".jumbotron",
        containment:"document",
        opacity: 0.8
    });
    $(this.el).data("backbone-view", this.model);
  },

  template: _.template('<small style="background-color: <%= color %> "><%= label %> <span><img id="<%= id %>" class="delete_tag" src="../../../images/delete_tag.png"></span></small>'),

  render: function() {

    if (this.model.length != 0) {
      this.$el.append(this.template({
        label: this.model.get('label'),
        color: this.model.get('color'),
        id: this.model.get('_id')
      }));
    }
    return this;
    }
  });

module.exports = TagView;
