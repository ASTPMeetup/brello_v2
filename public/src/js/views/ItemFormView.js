var Backbone = require('backbone');
var _ = require('underscore');
var ItemView = require('./ItemView');

var ItemFormView = Backbone.View.extend({
      el: '<div></div>',

      template: _.template('\
        <form name="post_input" id="edit_item_form">\
            <input form="form" name="new_content" type="text" class="new_content_input" value="<%= name %>" align="left">\
            <input type="submit" value="submit" class="button" align="right">\
        </form>\
        <br>\
      '),

    events: {
      'submit #edit_item_form': 'updateItem'
    },

    updateItem: function(e){
      e.preventDefault();
      var $this = this;
      var $form = $(e.currentTarget);
      var itemUpdate = $form.find('[name="new_content"]').val();
      this.model.set('name', itemUpdate);
      // this.model.save();
      this.model.save(null, {
        parseModel: false,
        success: function() {
          console.log('kewl!');
        }
      });
    },

    render: function() {
      $(this.el).html(this.template({
        name: this.model.get('name')
      }));
      return this;
    }

  });

  module.exports = ItemFormView;
