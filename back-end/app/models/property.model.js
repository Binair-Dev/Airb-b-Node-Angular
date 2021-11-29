module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Titre: String,
        PetiteDescription: String,
        LongueDescription: String,
        Pays: String,
        Ville: String,
        Rue: String,
        Num: Number,
        CodePostal: Number,
        PictureUrl: String,
        Capacite: Number,
        SDB: Number,
        WC: Number,
        Jardin: Boolean,
        Piscine: Boolean,
        MachineALaver: Boolean,
        Internet: Boolean,
        AnimauxAdmis: Boolean,
        Prix: Number,
        proprioId: String,
        Assurance: Boolean,
        Attente: Boolean,
        Availlable: Boolean,
        Deleted: Boolean
      },{
        versionKey: false,
        collection: "properties",
    });
  
    const Property = mongoose.model("property", schema);
    return Property;
  };