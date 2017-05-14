var express =require("express")
var router = express.Router()

router.get("/plants",isLoggedIn ,function (req,res) {
  res.render("plants")
})


function isLoggedIn(req,res,next) {
  if(req.isAuthenticated())
  return next()
  res.redirect("/login")
}

module.exports = router
