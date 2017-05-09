var Sensor= require("../models/sensor"),
    express = require ("express"),
    app = express(),
    fs = require("fs"),
    http = require("http").Server(app),
    io = require("socket.io")(http)

var json = this.json

function change(curr ,prev) {
  if (curr.size != prev.size | curr!=prev) {
    // there has been a change
    // read change
    fs.readFile("./Data/file.json",function (err,data) {
      if (err) {
        throw err
      }
      this.json = JSON.parse(data)
      json = JSON.parse(data)
      console.log(json);
      // change db
      changeDB(this.json)
      // eimt readFile event
      io.sockets.emit("readFile",json)
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
console.log("2.:"+json);
module.exports = {change , json}
