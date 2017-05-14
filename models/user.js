var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
  username:String,
  email:String,
  password:String
})

UserSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User",UserSchema)

// Not needed anymore : using MySQl -> this will be handeled at config files
