module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Email: String,
        Password: String,
      },{
        versionKey: false,
        collection: "login",
    });
    
    const Login = mongoose.model("login", schema);
    return Login;
  };