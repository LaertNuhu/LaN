var express =require("express")
var router = express.Router(),
    mysql = require('mysql'),
    dbconfig = require('../config/database'),
    Sensor = require("../models/sensor")



var connection = mysql.createConnection(dbconfig.connection);

// Create the Messung tabele and do the search. Change the graph conf.
router.get("/stats",isLoggedIn ,function (req,res) {
  Sensor.find({},function (err, sensors) {
    if (err) {
      console.log(err);
    } else {
      res.render("stats/stats",{sensors:sensors})
    }
  })
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated())
  return next()
  res.redirect("/login")
}


module.exports = router
