const { authenticateToken } = require("../_tool/authentificator.js");
module.exports = app => {
    const contract = require("../controllers/contract.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", contract.create);
    router.get("/", contract.findAll);
    router.get("/:id", contract.findOne);
    router.put("/:id", contract.update);
    router.delete("/:id", contract.delete);
    router.delete("/", contract.deleteAll);
  
    app.use('/api/contract', router);
  };