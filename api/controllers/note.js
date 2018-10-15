const mongoose = require('mongoose');
const Note = require('../models/note');

exports.get = (req, res) => {
  Note.find({
      tags: req.params.tag
    }).exec()
    .then(result => {
      console.log(result)
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(201).json({
        "message": "Error while fetching, please check server log for more informations"
      });
    })
};

exports.post = (req, res) => {
  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags
  });

  note.save().then(result => {
    console.log(result)
    res.status(201).json({
      "message": "saved"
    })
  }).catch(err => {
    console.log(err);
    res.status(201).json({
      "message": "Error while saving, please check server log for more informations"
    })
  });

};

exports.put = (req, res) => {
  Note.findById(req.params.tagid, function (err, note) {
    if (err) return console.log(err);
    note.set({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    });
    note.save(function (err, updated) {
      if (err) {
        console.log(err)
        res.status(500).json({'message': 'error'})
      }

      res.status(201).json(updated)
    })
  })
};

exports.delete = (req, res) => {
  Note.deleteOne({
    _id: req.params.tagid
  }, function (err) {
    if (err) {
      console.log(err)
      res.status(500).json({'message': 'error'})
    }
  })
};
