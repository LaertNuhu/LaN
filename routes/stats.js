var express =require("express")
var router = express.Router(),
    mysql = require('mysql'),
    dbconfig = require('../config/database'),
    Sensor = require("../models/sensor")



var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var logischezeit1 = 0
var logischezeit2 = 0
var arduionzeit1 = 0
var arduionzeit2 = 0
var arduion1 = true

function randomData() {
  var Arduino_Nr = [1,2]
  var Arduino = Arduino_Nr[Math.floor(Math.random()*Arduino_Nr.length)];
  var luftfeuchtigkeit = Math.floor((Math.random() * 10) + 4);
  var temperatur = Math.floor((Math.random() * 40) + 4);
  var bodenfeuchtigkeit = Math.floor((Math.random() * 20) + 4);
  var lichtintensität = Math.floor((Math.random() * 5) + 4);
  if (Arduino == 1) {
    arduion1 = true
    return [Arduino,logischezeit1,arduionzeit1,luftfeuchtigkeit,bodenfeuchtigkeit,temperatur,lichtintensität]
  }
  arduion1=false
  return [Arduino,logischezeit2,arduionzeit2,luftfeuchtigkeit,bodenfeuchtigkeit,temperatur,lichtintensität]
}


// Create the Messung tabele and do the search. Change the graph conf.
router.get("/stats",isLoggedIn ,function (req,res) {
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
    console.log("Succsess");
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
        res.render("stats/stats",{sensors:sensors})
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
