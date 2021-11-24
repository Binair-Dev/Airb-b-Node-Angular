module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Montant: Number,
      },{
        versionKey: false,
        collection: "treasury",
    });
  
    const Treasury = mongoose.model("treasury", schema);
    return Treasury;
  };