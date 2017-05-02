var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var SensorSchema = new mongoose.Schema({
  name:String,
  value:[String],
  soll:String
})

SensorSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("Sensor",SensorSchema)
