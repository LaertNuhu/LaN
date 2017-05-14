var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var SensorSchema = new mongoose.Schema({
  name:String,
  value:[Number],
  soll:Number
})

SensorSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("Sensor",SensorSchema)

// There is no need for this . config files will be used.
