const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user;

exports.generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'}) //30m
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if(!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err)  return res.sendStatus(401);
  
      User.findOne({Email: user.Email}).then((data) => {
        if(user.Nom !== data.Nom) return res.sendStatus(401)
        if(user.Prenom !== data.Prenom) return res.sendStatus(401)
        if(user.Email !== data.Email) return res.sendStatus(401)
        if(user.Pays !== data.Pays) return res.sendStatus(401)
        if(user.Telephone !== data.Telephone) return res.sendStatus(401)
        if(user.Password !== data.Password) return res.sendStatus(401)
        if(user.isAdmin !== data.isAdmin) return res.sendStatus(401)
        
        req.user = user;
        next();
      })
    })
}