var express =require("express")
var router = express.Router(),
    passport= require("passport")

require('../config/passport')(passport);


// index Routes
router.get("/",function (req,res) {
  res.render("home")
})
router.get("/go",function (req,res) {
  res.redirect("/stats")
})

// Authentication Routes

// Login
router.get("/login",function (req,res) {
  res.render("login")
})
// router.post("/login",passport.authenticate("local",{
//   successRedirect:"/stats",
//   failureRedirect:"/login"
// }),function (req,res) {})

// geting ready for mySQL integration
router.post("/login",passport.authenticate("local-login",{
  successRedirect:"/stats",
  failureRedirect:"/login"
}),function (req,res) {})

router.post("/register",passport.authenticate("local-signup",{
  successRedirect:"/stats",
  failureRedirect:"/login"
}),function (req,res) {})

// Register
router.get("/register",function (req,res,err) {
  res.render("register",{err:err})
})

router.post("/register",function (req,res) {
  var username = req.body.username
  var password = req.body.password
  var newUser =new User({username:username})
  User.register(newUser,password,function (err,user) {
    if (err) {
      console.log(err);
      if (err.message) {
        return res.redirect("login")
      } else {
      return res.render("register",{err:err})
        }
    }
    passport.authenticate("local")(req,res,function () {
      res.redirect("/stats")
    })
  })
})


// Logout
router.get("/logout",function (req,res) {
  req.logout()
  res.redirect("/")
})

module.exports = router
