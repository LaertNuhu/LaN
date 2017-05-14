var express =require("express")
var router = express.Router(),
    Sensor = require("../models/sensor")



router.get("/stats",isLoggedIn ,function (req,res) {
  Sensor.find({},function (err, sensors) {
    if (err) {
      console.log(err);
    } else {
      res.render("stats",{sensors:sensors})
    }
  })
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated())
  return next()
  res.redirect("/login")
}


module.exports = router
