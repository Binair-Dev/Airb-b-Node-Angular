const db = require("../models");
const Login = db.login;

const jwt = require('jsonwebtoken')
const User = db.user;

exports.login = async (req, res) => {
  try {
    const logged = new Login({
      Email: req.body.Email,
      Password: req.body.Password,
    });

    if (!(logged.Email && logged.Password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.find({ Email: logged.Email }).then(data => {
      if (logged.Password === data[0].Password) {
        let newToken = jwt.sign({Email: data[0].Email, isAdmin: data[0].isAdmin}, generate_token(64));
        data[0].updateOne({
            Token: newToken
        }).then(d => {
          data[0].Token = newToken;
          res.status(200).send(data[0])
        })
      } else {
        res.status(401).send(data[0])
      }
    });

    if(!user) {
      res.status(404)
    }
    else {
      res.status(401).send({success: false});
    }
  } catch (err) {
    console.log(err);
  }
};  

function generate_token(length){
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];  
  for (var i=0; i<length; i++) {
      var j = (Math.random() * (a.length-1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join("");
}