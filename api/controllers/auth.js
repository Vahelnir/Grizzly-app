const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');

exports.create = (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {

        if (err) return; // todo: handle error here

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            username: req.body.username,
            password: hash
        });

        user.save().then(result => {
            console.log(result)
            res.status(201).json({
                "message": "User created"
            })
        }).catch(err => {
            console.log(err);
            res.status(201).json({
                "message": "Error while creating user, please check server log for more informations"
            })
        });
    });

};

exports.login = (req, urlres) => {
    console.log(req.body)
    User.find({
        username: req.body.username
      }).exec()
      .then(result => {
        bcrypt.compare(req.body.password, result[0].password, (err, res) => {
            if(res) {
                urlres.status(201).json({
                    "message": "correct auth"
                }) // todo: send jwt
            } else {
                urlres.status(201).json({
                    "message": "wrong auth"
                }) 
            } 
          });
      })
      .catch(err => {
        console.log(err)
        res.status(201).json({
          "message": "Error while login, please check server log for more informations"
        });
      })


};