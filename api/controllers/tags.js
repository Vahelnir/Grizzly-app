const mongoose = require('mongoose');
const Note = require('../models/note');

exports.list = (req, res) => {
   Note.distinct('tags', function(err, title) {
     if (err) {
       console.log(err)
       res.status(500).json({'message': 'error'})
     }
    res.status(201).json(title)
  })
}
