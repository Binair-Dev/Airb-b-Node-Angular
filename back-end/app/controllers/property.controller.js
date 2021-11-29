const db = require("../models");
const Property = db.property;

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const property = new Property({
      Titre: req.body.Titre,
      PetiteDescription: req.body.PetiteDescription,
      LongueDescription: req.body.LongueDescription,
      Pays: req.body.Pays,
      Ville: req.body.Ville,
      Rue: req.body.Rue,
      Num: parseInt(req.body.Num),
      CodePostal: parseInt(req.body.CodePostal),
      PictureUrl: req.body.PictureUrl,
      Capacite: parseInt(req.body.Capacite),
      SDB: parseInt(req.body.SDB),
      WC: parseInt(req.body.WC),
      Jardin: req.body.Jardin,
      Piscine: req.body.Piscine,
      MachineALaver: req.body.MachineALaver,
      Internet: req.body.Internet,
      AnimauxAdmis: req.body.AnimauxAdmis,
      Prix: req.body.Prix,
      proprioId: req.body.proprioId,
      Assurance: req.body.Assurance,
      Attente: req.body.Attente,
      Availlable: req.body.Availlable,
      Deleted: req.body.Deleted
    });
  
    property
      .save(property)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Property."
        });
      });
  };

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Property.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving property."
        });
      });
  };

  exports.findAllByUserId = (req, res) => {
    
    Property.find({proprioId: req.body.proprioId})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving property."
        });
      });
  };

exports.update = (req, res) => {
  if(req.user._id !== req.body.proprioId) {
    res.status(401).send("Unauthorized")
    return;
  }
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Property.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Property with id=${id}. Maybe Property was not found!`
          });
        } else res.send({ message: "Property was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Property with id=" + id
        });
      });
  };
exports.delete = (req, res) => {
  if(req.user._id !== req.body.proprioId) {
    res.status(401).send("Unauthorized")
    return;
  }
    const id = req.params.id;
  
    Property.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Property with id=${id}. Maybe Property was not found!`
          });
        } else {
          res.send({
            message: "Property was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Property with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
  if(!req.user.isAdmin) {
    res.status(401).send("Unauthorized")
    return;
  }
  Property.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Property were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all property."
        });
      });
  };