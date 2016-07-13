var Backbone = require('backbone');
var _ = require('underscore');
var ListView = require('./ListView');

var TitleFormView = Backbone.View.extend({
    el: '<div></div>',

    template: _.template('\
      <form name="list_form" id="title_form">\
        <input form="form" name="title_content" type="text" id="title_input" align="left" placeholder="<%= title %>" required>\
        <input type="submit" value="submit" class="button" id="add_list_button" align="right">\
      </form>\
      <br>\
    '),

    events: {
      'submit #title_form': 'updateListTitle'
    },

    updateListTitle: function(e){
      e.preventDefault();
      var $this = this;
      var this_el = this.$el;
      var $form = $(e.currentTarget);
      var titleUpdate = $form.find('[name="title_content"]').val();
      this.model.set("title", titleUpdate);
      this.model.save(null, {
        parseModel: false,
        success: function(){
          console.log("success!");
        }
      });
    },

    render: function() {
      $(this.el).html(this.template({
        title: this.model.get('title')
      }));
      return this;
    }

  });

  module.exports = TitleFormView;
