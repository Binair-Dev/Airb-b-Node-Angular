const { authenticateToken } = require("../_tool/authentificator.js");
module.exports = app => {
    const treasury = require("../controllers/treasury.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", treasury.findAll);
    router.put("/:id", treasury.update);
  
    app.use('/api/treasury', authenticateToken, router);
  };