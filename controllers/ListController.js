var ListModel = require('../models/ListModel.js');
var ItemModel = require('../models/ItemModel.js');
var ItemsCollection = require('../public/src/js/collections/ItemsCollection.js');
var mongoose = require('mongoose');

/**
* ListController.js
*
* @description :: Server-side logic for managing lists.
*/
module.exports = {

  /**
  * ListController.list()
  */
  list: function (req, res) {
    ListModel.find(function (err, lists) {
      if (err) {
        return res.json(500, {
          message: 'Error getting list.'
        });
      }
      for (list in lists){
        ItemModel.find({ list: mongoose.Types.ObjectId(list._id) }).populate('tags').exec(function(err, items) {
          list.items = items;
        });
      }
      return res.json(lists);
    });
  },

  /**
  * ListController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    ListModel.findOne({_id: id}, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error getting list.'
        });
      }
      if (!list) {
        return res.json(404, {
          message: 'No such list'
        });
      }
      var listId = list._id;
      var thisList = list;
      ItemModel.find({ list: mongoose.Types.ObjectId(listId) }).populate('tags').exec(function(err, items) {
        thisList.items = items;
      });
      return res.json(thisList);
    });
  },

  /**
  * ListController.create()
  */
  create: function (req, res) {
    var list = new ListModel({			title : req.body.title,			items : req.body.items
    });

    list.save(function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error saving list',
          error: err
        });
      }
      return res.json(list);
    });
  },

  /**
  * ListController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    ListModel.findOne({_id: id}, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error saving list',
          error: err
        });
      }
      if (!list) {
        return res.json(404, {
          message: 'No such list'
        });
      }

      list.title = req.body.title ? req.body.title : list.title;			list.items = req.body.items ? req.body.items : list.items;
      list.save(function (err, list) {
        if (err) {
          return res.json(500, {
            message: 'Error getting list.'
          });
        }
        if (!list) {
          return res.json(404, {
            message: 'No such list'
          });
        }
        ListModel.findOne({_id: id}).populate('items').exec(function (err, list) {
          return res.json(list);
        });
      });
    });
  },

  /**
  * ListController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    ListModel.findByIdAndRemove(id, function (err, list) {
      if (err) {
        return res.json(500, {
          message: 'Error getting list.'
        });
      }
      return res.json(list);
    });
  }
};
