const moment = require('moment');

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        propertyId: String,
        locataireId: String,
        proprioId: String,
        startDate: Date,
        endDate: Date,
        Assurance: Boolean,
      },{
        versionKey: false,
        collection: "contracts",
    });
  
    const Contract = mongoose.model("contract", schema);
    return Contract;
  };