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
        res.status(200).send(data[0])
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