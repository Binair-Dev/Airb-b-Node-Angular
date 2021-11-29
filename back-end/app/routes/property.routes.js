const { authenticateToken } = require("../_tool/authentificator.js");
module.exports = app => {
    const property = require("../controllers/property.controller.js");
  
    var secured = require("express").Router();
    var unsecured = require("express").Router();
  
    secured.post("/", property.create);
    secured.get("/", property.findAll);
    unsecured.get("/:id", property.findAllByUserId);
    secured.put("/:id", property.update);
    secured.delete("/:id", property.delete);
    secured.delete("/", property.deleteAll);
  
    app.use('/api/property', authenticateToken, secured);
    app.use('/api/property', unsecured);
  };