require('dotenv').config()
const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken')

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const user = new User({
      Prenom: req.body.Prenom,
      Nom: req.body.Nom,
      Email: req.body.Email,
      Pays: req.body.Pays,
      Telephone: req.body.Telephone,
      Password: req.body.Password,
      isAdmin: req.body.isAdmin,
      Token: ""
    });
  
    const token = jwt.sign({Email: user.Email, isAdmin: user.isAdmin}, process.env.ACCESS_TOKEN_SECRET);
    user.Token = token;

    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findOne({Email: id})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with email " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with email=" + id });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    const user = new User({
      Prenom: req.body.Prenom,
      Nom: req.body.Nom,
      Email: req.body.Email,
      Pays: req.body.Pays,
      Telephone: req.body.Telephone,
      Password: req.body.Password,
      isAdmin: req.body.isAdmin,
      Token: req.body.Token
    });

    User.find({Email: id})
      .then(data => {
        data.forEach(element => {
        if (!element) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else{
          element.updateOne({
            Nom: user.Nom, 
            Prenom: user.Prenom, 
            Email: user.Email,
            Pays: user.Pays,
            Telephone: user.Telephone,
            Password: user.Password,
            isAdmin: user.isAdmin,
            Token: jwt.sign({Email: user.Email, isAdmin: user.isAdmin}, generate_token(64))
          }).then(data => {
            res.status(200).send(data)
          });
        }});
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe Property was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    User.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} User were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all user."
        });
      });
  };
  
function generate_token(length){
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];  
  for (var i=0; i<length; i++) {
      var j = (Math.random() * (a.length-1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join("");
}