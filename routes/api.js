var express =require("express")
var router = express.Router(),
    passport= require("passport"),
    mysql = require('mysql'),
    dbconfig = require('../config/database')

require('../config/passport')(passport);

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

// Login
router.get("/api/login",function (req,res) {
  res.render("login")
})
// router.post("/login",passport.authenticate("local",{
//   successRedirect:"/stats",
//   failureRedirect:"/login"
// }),function (req,res) {})

// geting ready for mySQL integration
router.post("/api/login",passport.authenticate("local-login",{
  successRedirect:"/api/stats",
  failureRedirect:"/login"
}),function (req,res) {})


// Register
router.get("/api/register",function (req,res,err) {
  res.render("register",{err:err})
})

router.post("/api/register",passport.authenticate("local-signup",{
  successRedirect:"/stats",
  failureRedirect:"/login"
}),function (req,res) {})


// Logout
router.get("/api/logout",function (req,res) {
  req.logout()
  res.send("logout")
})

// Plants

// Index
router.get("/api/plants",isLoggedIn,function (req,res) {
    connection.query('Select * from pflanzen',function (err,plants) {
      if (err) {
        console.log(err);
      }
      // console.log(plants);
      res.json(plants)
    })
})
// CREATE
router.post("/api/plants",isLoggedIn,function (req,res) {
  var val =
  [
    req.body.pflanzeName,
    req.body.sollLuftFeMIN,
    req.body.sollLuftFeMAX,
    req.body.sollBodenMIN,
    req.body.sollBodenMAX,
    req.body.sollLichtMIN,
    req.body.sollLichtMAX,
    req.body.sollTempMIN,
    req.body.sollTempMAX
  ]
  connection.query('CREATE TABLE IF NOT EXISTS`' + dbconfig.database + '`.`' + dbconfig.pflanzen_table + '` ( \
      `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
      `pflanzeName` VARCHAR(20) NOT NULL , \
      `sollLuftFeMIN` FLOAT NOT NULL, \
      `sollLuftFeMAX` FLOAT NOT NULL, \
      `sollBodenMIN` FLOAT NOT NULL, \
      `sollBodenMAX` FLOAT NOT NULL, \
      `sollLichtMIN` FLOAT NOT NULL, \
      `sollLichtMAX` FLOAT NOT NULL, \
      `sollTempMIN` FLOAT NOT NULL, \
      `sollTempMAX` FLOAT NOT NULL, \
          PRIMARY KEY (`id`)\
  )',function (err, result) {
    if (err) {
      console.log(err);
    }
    connection.query('INSERT INTO '+dbconfig.pflanzen_table+' (pflanzeName, sollLuftFeMIN, sollLuftFeMAX, sollBodenMIN,sollBodenMAX,sollLichtMIN,sollLichtMAX,sollTempMIN,sollTempMAX) VALUES (?,?,?,?,?,?,?,?,?);',val,function (err,values) {
      if (err) {
        console.log(err);
      }
      // console.log("done");
      res.json(values)
    })
  })
})

// NEW
router.get("/api/plants/new",isLoggedIn,function (req,res) {
  res.render("plants/new")
})

// SHOW
router.get("/api/plants/:id",isLoggedIn,function (req,res) {
  // find by name
  connection.query('Select * from pflanzen where id="'+req.params.id+'"',function (err,plant) {
    if (err) {
      console.log(err);
    }
    // console.log(plant);
    res.json(plant)
  })
})

// Edit
router.get("/api/plants/:id/edit",isLoggedIn,function (req,res) {
  // console.log(req.params.id);
  connection.query('Select * from pflanzen where id = "'+req.params.id+'"',function (err,plant) {
    if (err) {
      console.log(err);
    }
    // console.log(plant);
    res.json(plant)
  })
})

// Update
router.put("/api/plants/:id",isLoggedIn,function (req,res) {
  var val =
  [
    req.body.pflanzeName,
    req.body.sollLuftFeMIN,
    req.body.sollLuftFeMAX,
    req.body.sollBodenMIN,
    req.body.sollBodenMAX,
    req.body.sollLichtMIN,
    req.body.sollLichtMAX,
    req.body.sollTempMIN,
    req.body.sollTempMAX
  ]
  connection.query('UPDATE pflanzen SET pflanzeName= ?, sollLuftFeMIN = ? ,sollLuftFeMAX=?, sollBodenMIN=?, sollBodenMAX=?, sollLichtMIN=?, sollLichtMAX=?, sollTempMIN=? ,sollTempMAX=? WHERE id='+req.params.id+'',val,function (err,newPlant) {
    if (err) {
      console.log(err);
    }
    // console.log(newPlant);
    res.redirect("/plants")
  })
})

// Delete
router.delete("/api/plants/:id",isLoggedIn,function (req,res) {
  connection.query('Delete from '+dbconfig.database +'.'+dbconfig.pflanzen_table+' where id = '+req.params.id,function (err) {
    if (err) {
      console.log(err);
    }
    res.send("deleted")
    // res.redirect("/plants")
  })
})


// Stats
// Create the Messung tabele and do the search. Change the graph conf.
router.get("/api/stats" ,isLoggedIn,function (req,res) {
  connection.query('CREATE TABLE IF NOT EXISTS `Messung` (\
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    `arduinoNr` int(11) NOT NULL,\
    `messungNr` int(11) NOT NULL,\
    `luftfeuchtigkeit` float NOT NULL,\
    `bodenfeuchtigkeit` float NOT NULL,\
    `temperatur` float NOT NULL,\
    `lichtintensität` float NOT NULL,\
    PRIMARY KEY (`id`,`arduinoNr`)\
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',function (err,result) {
    if (err) {
      console.log(err);
    }
    // connection.query('INSERT INTO Messung (arduinoNr, messungNr, luftfeuchtigkeit, bodenfeuchtigkeit,temperatur,lichtintensität) VALUES (?,?,?,?,?,?);', randomData(), function(err, result) {
      // if (err) {
      //   console.log(err);
      // }
      // if(arduion1){
      //   logischezeit1++
      //   if (Math.random()*100 > 50) {
      //     arduionzeit1++
      //   }
      // }else{
      //   logischezeit2++
      //   if (Math.random()*100 > 50) {
      //     arduionzeit2++
      //   }
      // }
      connection.query('Select * from Messung order by messungNr',function (err,sensors) {
        if (err) {
          console.log(err);
        }
        res.json(sensors)
      })
    })
  // })
})


function isLoggedIn(req,res,next) {
  if(req.isAuthenticated())
  return next()
  res.redirect("/login")
}

module.exports = router
