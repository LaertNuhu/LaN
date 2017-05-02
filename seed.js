var mongoose = require("mongoose"),
    Sensor = require("./models/sensor")



    var data =[
      {
        name:"Temp",
        value:["21","23","20"],
        soll:"21"
      },
      {
        name:"Luftfeut",
        value:["0.2","0.1","0.3"],
        soll:"0.2"
      },
      {
        name:"Licht",
        value:["0.2","0.1","0.3"],
        soll:"0.2"
      }
    ]


function seedDB(){
  Sensor.remove({},function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("all removed from sensor");
      // add campgrounds
      data.forEach(function (seed) {
        Sensor.create(seed,function (err,sensor) {
          if (err) {
            console.log(err);
          } else {
            // console.log("Sensor added"+sensor);
          }
        })
      })
    }
  })
}

module.exports = seedDB
