const db = require("../models");
const auth = require("../_tool/authentificator");
const User = db.user;

exports.login = async (req, res) => {

  User.findOne({Email: req.body.Email}).then((data) => {

    let user = {
      _id: data._id,
      Nom: data.Nom,
      Prenom: data.Prenom,
      Email: data.Email,
      Pays: data.Pays,
      Telephone: data.Telephone,
      Password: data.Password,
      isAdmin: data.isAdmin
    }
    
    if(user !== null) {
      if(req.body.Email !== user.Email) {
        res.status(401).send('Invalid credentials')
        return;
      }
      if(req.body.Password !== user.Password) {
        res.status(401).send('Invalid credentials')
        return;
      }
      
      console.log("test");
      const accessToken = auth.generateToken(user);
      res.status(200).send({accessToken});
    }
    else {
      res.status(404).send("Not found")
    }
  })
}