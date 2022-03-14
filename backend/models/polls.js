const mongoose = require('mongoose');
const {UserSchema} = require("./users");
const {FoodsSchema} = require("./foods");

const Schema = mongoose.Schema;

const FoodWithVoteSchema = new Schema({
    foodItem: FoodsSchema,
    votes: [UserSchema] // password needs to be removed
})

const pollSchema = new Schema({
    _id: String,
    title: String,
    start_date: Date,
    end_date: Date,
    target_date: Date,
    foods : [FoodWithVoteSchema]
})

module.exports = {"Polls": mongoose.model("Polls", pollSchema)};