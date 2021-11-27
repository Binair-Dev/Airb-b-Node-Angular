require('dotenv').config()
const db = require("../models");
const { authenticateToken } = require('../_tool/authentificator');
const User = db.user;

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
      isAdmin: req.body.isAdmin
    });
  
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
    if(!req.user.isAdmin) {
      res.status(401).send("Unauthorized")
      return;
    }
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
    if(!req.user.isAdmin) {
      res.status(401).send("Unauthorized")
      return;
    }
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
  if(!req.user.isAdmin) {
    res.status(401).send("Unauthorized")
    return;
  }
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
      isAdmin: req.body.isAdmin
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
            isAdmin: user.isAdmin
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
  if(!req.user.isAdmin) {
    res.status(401).send("Unauthorized")
    return;
  }
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
  if(!req.user.isAdmin) {
    res.status(401).send("Unauthorized")
    return;
  }
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