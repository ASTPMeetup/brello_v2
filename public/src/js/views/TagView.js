var _ = require('underscore');
var Backbone = require('backbone');

var TagView = Backbone.View.extend({
  el: '<span id="tag"></span>',

  initialize: function() {
    $(this.el).draggable({
        containment:"document",
        start: function(event,ui){
          $(ui.item).show();
          clone = $(ui.item).clone();
        }
    });
    $(this.el).data("backbone-view", this.model);
  },

  template: _.template('<small style="background-color: <%= color %> "><%= label %></small>'),

  render: function() {

    if (this.model.length != 0) {
      this.$el.append(this.template({
        label: this.model.get('label'),
        color: this.model.get('color')
      }));
    }
    return this;
    }
  });

module.exports = TagView;
