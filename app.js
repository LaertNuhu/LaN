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
    seedDB = require("./seed")

mongoose.connect("mongodb://localhost/projekt")
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static("public"))

// * Passport Configuration *
app.use(expressSession({
  secret:"jeff , my name is jeff", // wil be used to encode and decode the session
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
// takes the data and encodes it and put it in session and deencodes it
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// *------------------------*

// Seed file used to reset DB and give inital conntent
seedDB()

// index Routes
app.get("/",function (req,res) {
  res.render("home")
})

app.get("/stats",function (req,res) {
  Sensor.find({},function (err, sensors) {
    if (err) {
      console.log(err);
    } else {
      res.render("stats",{sensors:sensors})
    }
  })
})


app.get("/plants",function (req,res) {
  res.render("plants")
})


// Authentication Routes

// Login
app.get("/login",function (req,res) {
  res.render("login")
})
app.post("/login",passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}),function (req,res) {})


// Register
app.get("/register",function (req,res,err) {
  res.render("register",{err:err})
})

app.post("/register",function (req,res) {
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
      res.redirect("/")
    })
  })
})


// Logout
app.get("/logout",function (req,res) {
  req.logout()
  res.redirect("/")
})


http.listen(3000,function () {
  console.log("Listening on port 3000");
})


// Socket configuration

// io.on("connection",function (socket) {
//   console.log("a user is connected");
//   setTimeout(interval(socket),10000)
//   socket.on("disconnect",function () {
//     console.log("User disconnected");
//   })
//
// })
// File manipulation and databak content will be changed
function readFile() {
  // !!! global variable used json
  fs.readFile('Data/file.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  this.json = JSON.parse(data);
  // console.log(json);
  // console.log(json["Temp"].value);
  Sensor.findOneAndUpdate({name:json["Temp"].name},{$set:{value:json["Temp"].value}},function (err,updVal) {
    if (err) {
      console.log(err);
    } else {
      // console.log(updVal);
    }
  })
  Sensor.findOneAndUpdate({name:json["Luftfeut"].name},{$set:{value:json["Luftfeut"].value}},function (err,updVal) {
    if (err) {
      console.log(err);
    } else {
      // console.log(updVal);
    }
  })
  Sensor.findOneAndUpdate({name:json["Licht"].name},{$set:{value:json["Licht"].value}},function (err,updVal) {
    if (err) {
      console.log(err);
    } else {
      // console.log(updVal);
    }
  })
})
return this.json
}
// not efficient , but a way to make the vlaues dynmaic
function interval(socket){
  setInterval(function () {
    io.sockets.emit("readFile", readFile())
    socket.on("sendagain",function () {
      io.sockets.emit("readFile", readFile())
    })
  },3000)
}


// ******************************
// *******Try with watchFile ****
// ******************************
// **** Funktional **************
// ******************************



  io.on("connection",function (socket) {
    console.log("a user is connected");
    // using watchfile prvided by Node.js (fs)
    // change detected
    fs.watchFile("Data/file.json",change)

    // if we recive an empty object
    // !!!! Error handeling must be improved
    socket.on("sendagain",function () {
      io.sockets.emit("readFile", this.json)
    })
    socket.on("disconnect",function () {
      console.log("User disconnected");
    })

  })

function change(curr ,prev) {
  if (curr.size != prev.size | curr!=prev) {
    // there has been a change
    // read change
    fs.readFile("Data/file.json",function (err,data) {
      if (err) {
        throw err
      }
      this.json = JSON.parse(data)
      // change db
      changeDB(this.json)
      // eimt readFile event
      io.sockets.emit("readFile",this.json)
    })
  }
}

function changeDB(json) {
  Sensor.findOneAndUpdate({name:json["Temp"].name},{$set:{value:json["Temp"].value}},function (err,updVal) {
    if (err) {
      console.log(err);
    } else {
      // console.log(updVal);
    }
  })
  Sensor.findOneAndUpdate({name:json["Luftfeut"].name},{$set:{value:json["Luftfeut"].value}},function (err,updVal) {
    if (err) {
      console.log(err);
    } else {
      // console.log(updVal);
    }
  })
  Sensor.findOneAndUpdate({name:json["Licht"].name},{$set:{value:json["Licht"].value}},function (err,updVal) {
    if (err) {
      console.log(err);
    } else {
      // console.log(updVal);
    }
  })
}
