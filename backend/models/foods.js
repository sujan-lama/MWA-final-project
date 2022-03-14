const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: String
});

module.exports =  {"Foods": mongoose.model("Foods", foodSchema), "FoodsSchema": foodSchema};
