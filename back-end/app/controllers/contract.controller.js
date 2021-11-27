const db = require("../models");
const Contract = db.contract;

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const contract = new Contract({
      propertyId: req.body.propertyId,
      locataireId: req.body.locataireId,
      proprioId: req.body.proprioId,
      startDate: new Date(req.body.startDate),
      endDate: new  Date(req.body.endDate),
      Assurance: req.body.Assurance,
    });
  
    contract
      .save(contract)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the contract."
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
  
    Contract.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contract."
        });
      });
  };

exports.findOne = (req, res) => {
  if(!req.user.isAdmin) {
    res.status(401).send("Unauthorized")
    return;
  }
    const id = req.params.id;
  
    Contract.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Contract with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Contract with id=" + id });
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
  
    Contract.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Contract with id=${id}. Maybe Contract was not found!`
          });
        } else res.send({ message: "Contract was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Contract with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
  if(!req.user.isAdmin) {
    res.status(401).send("Unauthorized")
    return;
  }
    const id = req.params.id;
  
    Contract.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Contract with id=${id}. Maybe Contract was not found!`
          });
        } else {
          res.send({
            message: "Contract was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Contract with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
  if(!req.user.isAdmin) {
    res.status(401).send("Unauthorized")
    return;
  }
  Contract.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Contract were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Contract."
        });
      });
  };