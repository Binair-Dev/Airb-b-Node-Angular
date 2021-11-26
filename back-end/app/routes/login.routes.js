module.exports = app => {
    const x = require("../controllers/login.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", x.login);
  
    app.use('/api/login', router);
  };