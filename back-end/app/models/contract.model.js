const moment = require('moment');

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        propertyId: String,
        userId: String,
        startDate: Date,
        endDate: Date,
      },{
        versionKey: false,
        collection: "contracts",
    });
  
    const Contract = mongoose.model("contract", schema);
    return Contract;
  };