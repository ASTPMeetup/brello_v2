var _ = require('underscore');
var Backbone = require('backbone');

var TagView = Backbone.View.extend({
  el: '<span id="tag"></span>',

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

// $(myDraggable).draggable({
//     helper:"clone",
//     containment:"document"
// });
//
// $(myDroppable).droppable({
//     drop:function(event, ui) {
//         ui.draggable.detach().appendTo($(this));
//     }
// });

module.exports = TagView;
