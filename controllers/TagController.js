var TagModel = require('../models/TagModel.js');

/**
* TagController.js
*
* @description :: Server-side logic for managing tags.
*/
module.exports = {

  /**
  * TagController.list()
  */
  list: function (req, res) {
    TagModel.find({user: req. user._id}, function (err, tags) {
      if (err) {
        return res.json(500, {
          message: 'Error getting tag.'
        });
      }
      return res.json(tags);
    });
  },

  /**
  * TagController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    TagModel.findOne({_id: id}, function (err, tag) {
      if (err) {
        return res.json(500, {
          message: 'Error getting tag.'
        });
      }
      if (!tag) {
        return res.json(404, {
          message: 'No such tag'
        });
      }
      return res.json(tag);
    });
  },

  /**
  * TagController.create()
  */
  create: function (req, res) {
    var tag = new TagModel({			label : req.body.label,			color : req.body.color
    });

    tag.save(function (err, tag) {
      if (err) {
        return res.json(500, {
          message: 'Error saving tag',
          error: err
        });
      }
      return res.json(tag);
    });
  },

  /**
  * TagController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    TagModel.findOne({_id: id}, function (err, tag) {
      if (err) {
        return res.json(500, {
          message: 'Error saving tag',
          error: err
        });
      }
      if (!tag) {
        return res.json(404, {
          message: 'No such tag'
        });
      }

      tag.label = req.body.label ? req.body.label : tag.label;			tag.color = req.body.color ? req.body.color : tag.color;
      tag.save(function (err, tag) {
        if (err) {
          return res.json(500, {
            message: 'Error getting tag.'
          });
        }
        if (!tag) {
          return res.json(404, {
            message: 'No such tag'
          });
        }
        return res.json(tag);
      });
    });
  },

  /**
  * TagController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    TagModel.findByIdAndRemove(id, function (err, tag) {
      if (err) {
        return res.json(500, {
          message: 'Error getting tag.'
        });
      }
      return res.json(tag);
    });
  }
};
