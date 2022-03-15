const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    category: String,

});

module.exports = {"Foods": mongoose.model("Foods", schema), "FoodSchema" : schema};