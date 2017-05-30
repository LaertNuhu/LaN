var express = require ("express"),
    expressSession = require("express-session"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    bodyParser= require("body-parser"),
    passport = require("passport"),
    passportLocal = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    app = express(),
    fs = require("fs"),
    http = require("http").Server(app),
    io = require("socket.io")(http),
    User = require("./models/user"),
    Sensor= require("./models/sensor"),
    seedDB = require("./seed"),
    mysql = require('mysql'),
    MySQLEvents = require('mysql-events')

var statsRoute = require("./routes/stats")
var plantsRoute = require("./routes/plants")
var indexRoute = require("./routes/index")
var apiRoute = require("./routes/api")

// mongoose will be deleted
// database connection is beeing handeled at config files
// mongoose.connect("mongodb://localhost/projekt")
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static("public"))

// * Passport Configuration *
require('./config/passport')(passport);

app.use(expressSession({
  secret:"jeff , my name is jeff", // wil be used to encode and decode the session
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
// // takes the data and encodes it and put it in session and deencodes it
// passport.use(new passportLocal(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())
// // *------------------------*
app.use(function (req,res,next) {
  res.locals.currentUser = req.user
  next()
})

// Seed file used to reset DB and give inital conntent
// seedDB()

app.use(statsRoute)
app.use(indexRoute)
app.use(plantsRoute)
app.use(apiRoute)

http.listen(3000,function () {
  console.log("Listening on port 3000");
})


// Socket configuration

io.on("connection",function (socket) {
  console.log("Connected");
  io.emit("first","hallo")
})
