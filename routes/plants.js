var express =require("express")
var router = express.Router(),
    mysql = require('mysql'),
    dbconfig = require('../config/database')

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

// Index
router.get("/plants",isLoggedIn,function (req,res) {
    connection.query('Select * from pflanzen',function (err,plants) {
      if (err) {
        console.log(err);
      }
      // console.log(plants);
      res.render("plants",{plants:plants})
    })
})

// CREATE
router.post("/plants",isLoggedIn,function (req,res) {
  var val =
  [
    req.body.pflanzeName,
    req.body.sollLuftFeMin,
    req.body.sollLuftFeMax,
    req.body.sollBodenMin,
    req.body.sollBodenMax,
    req.body.lichtstunden,
    req.body.sollTempMin,
    req.body.sollTempMax
  ]
  connection.query('CREATE TABLE IF NOT EXISTS`' + dbconfig.database + '`.`' + dbconfig.pflanzen_table + '` ( \
      `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
      `pflanzeName` VARCHAR(20) NOT NULL , \
      `sollLuftFeMin` FLOAT NOT NULL, \
      `sollLuftFeMax` FLOAT NOT NULL, \
      `sollBodenMin` FLOAT NOT NULL, \
      `sollBodenMax` FLOAT NOT NULL, \
      `lichtstunden` FLOAT NOT NULL, \
      `sollTempMin` FLOAT NOT NULL, \
      `sollTempMax` FLOAT NOT NULL, \
      `active` tinyint(1),\
          PRIMARY KEY (`id`)\
  )',function (err, result) {
    if (err) {
      console.log(err);
    }
    connection.query('INSERT INTO '+dbconfig.pflanzen_table+' (pflanzeName, sollLuftFeMin, sollLuftFeMax, sollBodenMin,sollBodenMax,lichtstunden,sollTempMin,sollTempMax) VALUES (?,?,?,?,?,?,?,?);',val,function (err,values) {
      if (err) {
        console.log(err);
      }
      // console.log("done");
      res.redirect("/plants")
    })
  })
})

// NEW
router.get("/plants/new",isLoggedIn,function (req,res) {
  res.render("plants/new")
})

// SHOW
router.get("/plants/:id",isLoggedIn,function (req,res) {
  // find by name
  connection.query('Select * from pflanzen where id="'+req.params.id+'"',function (err,plant) {
    if (err) {
      console.log(err);
    }
    // console.log(plant);
    res.render("plants/show",{plant:plant})
  })
})

// Edit
router.get("/plants/:id/edit",isLoggedIn,function (req,res) {
  // console.log(req.params.id);
  connection.query('Select * from pflanzen where id = "'+req.params.id+'"',function (err,plant) {
    if (err) {
      console.log(err);
    }
    // console.log(plant);
    res.render("plants/edit",{plant:plant})
  })
})

// Update
router.put("/plants/:id",isLoggedIn,function (req,res) {
  var val =
  [
    req.body.pflanzenName,
    req.body.sollLuftFeMin,
    req.body.sollLuftFeMax,
    req.body.sollBodenMin,
    req.body.sollBodenMax,
    req.body.lichtstunden,
    req.body.sollTempMin,
    req.body.sollTempMax
  ]
  connection.query('UPDATE pflanzen SET pflanzenName= ?, sollLuftFeMin = ? ,sollBodenMax=?, sollBodenMin=?, sollBodenMax=?, lichtstunden=?, sollTempMin=? ,sollTempMax=? WHERE id='+req.params.id+'',val,function (err,newPlant) {
    if (err) {
      console.log(err);
    }
    // console.log(newPlant);
    res.redirect("/plants")
  })
})

// Update set Active
router.put("/plants/setActive/:id/",isLoggedIn,function (req,res) {
  connection.query('UPDATE pflanzen SET active=? ',[false],function (err,newPlant) {
    if (err) {
      console.log(err);
    }
    connection.query('UPDATE pflanzen SET active=? WHERE id='+req.params.id+'',[true],function (err,newPlant) {
      if (err) {
        console.log(err);
      }
      // console.log(newPlant);
      res.redirect("/plants")
    })
  })
})

// Delete
router.delete("/plants/:id",isLoggedIn,function (req,res) {
  connection.query('Delete from '+dbconfig.database +'.'+dbconfig.pflanzen_table+' where id = '+req.params.id,function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/plants")
  })
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated())
  return next()
  res.redirect("/login")
}

module.exports = router
