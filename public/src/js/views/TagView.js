var _ = require('underscore');
var Backbone = require('backbone');

var TagView = Backbone.View.extend({
  el: '<span id="tag"></span>',

  template: _.template('<small style="background-color: <%= model.get("color") %> "><%= model.get("label") %></small>'),

  render: function() {
    this.$el.append(this.template({model: this.model}));
    return this;
  }
});

module.exports = TagView;
