const { authenticateToken } = require("../_tool/authentificator.js");
module.exports = app => {
    const property = require("../controllers/property.controller.js");
  
    var secured = require("express").Router();
    var unsecured = require("express").Router();
    var find = require("express").Router();
  
    secured.post("/", property.create);
    secured.put("/:id", property.update);
    secured.delete("/:id", property.delete);
    secured.delete("/", property.deleteAll);

    unsecured.get("/", property.findAll);
    unsecured.get("/:id", property.findAllByUserId);
    find.get("/:id", property.findById);
  
    app.use('/api/property', authenticateToken, secured);
    app.use('/api/properties', unsecured);
    app.use('/api/findProperty', find);
  };