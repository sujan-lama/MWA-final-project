const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const schema = new Schema({
    _id: String,
    email: String,
    password: String,
    name:String,
    role:String
});

module.exports = {"Users": mongoose.model("Users", schema), "UserSchema" : schema};