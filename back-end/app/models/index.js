const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./user.model.js")(mongoose);
db.property = require("./property.model.js")(mongoose);
db.contract = require("./contract.model.js")(mongoose);
db.treasury = require("./treasury.model.js")(mongoose);

module.exports = db;