var mongoose = require("mongoose"),
    mysql = require('mysql'),
    dbconfig = require('./config/database'),
    Sensor = require("./models/sensor")



function seedDB(){
// Messung tabele
    connection.query('CREATE TABLE IF NOT EXISTS `Messung` (\
  `arduinoNr` int(11) NOT NULL,\
  `messungNr` int(11) NOT NULL,\
  `logischeZeit` bigint(20) NOT NULL,\
  `luftfeuchtigkeit` float NOT NULL,\
  `bodenfeuchtigkeit` float NOT NULL,\
  `temperatur` float NOT NULL,\
  `lichtintensität` float NOT NULL,\
  PRIMARY KEY (`messungNr`)\
) ENGINE=InnoDB DEFAULT CHARSET=latin1;',function (err,result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
    })

    // Pflanzenart tabele
    connection.query('CREATE TABLE IF NOT EXISTS `Pflanzenart` (\
  `pflanzenId` int(11) NOT NULL,\
  `pflanzenName` text NOT NULL,\
  `sollLuftFeMax` float NOT NULL,\
  `sollLuftFeMin` float NOT NULL,\
  `sollBodenMax` float NOT NULL,\
  `sollBodenMin` float NOT NULL,\
  `lichtstunden` int(11) NOT NULL,\
  `sollTempMax` float NOT NULL,\
  `sollTempMin` float NOT NULL,\
  `active` tinyint(1),\
  PRIMARY KEY (`pflanzenId`)\
) ENGINE=InnoDB DEFAULT CHARSET=latin1;',function (err,result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
    })

    // Benutzer tabele
    connection.query('CREATE TABLE IF NOT EXISTS `Benutzer` (\
  `userId` int(11) NOT NULL AUTO_INCREMENT,\
  `userername` text NOT NULL,\
  `passwort` text NOT NULL,\
  `vorname` text NOT NULL,\
  `nachname` text NOT NULL,\
  `admin` tinyint(1) NOT NULL,\
  PRIMARY KEY (`userId`)\
) ENGINE=InnoDB DEFAULT CHARSET=latin1;',function (err,result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
    })

    // Zeit tabele
    connection.query('CREATE TABLE IF NOT EXISTS `Zeit` (\
  `logischeZeit` bigint(20) NOT NULL,\
  `arduinoZeit` bigint(20) NOT NULL,\
  `raspberryZeit` datetime NOT NULL,\
  `arduinoNr` int(11) NOT NULL,\
  PRIMARY KEY (`logischeZeit`)\
) ENGINE=InnoDB DEFAULT CHARSET=latin1;',function (err,result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
    })
}

module.exports = seedDB
