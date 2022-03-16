const responseData = require('../dtos/response');
const moment = require("moment");
const { validateDate } = require("../utils/validations");
const { Polls } = require("../models/polls");
const { Foods } = require("../models/foods");
const { Users } = require("../models/users");
const mongoose = require('mongoose');

const findAll = (req, res) => {
    Polls.find({}, (err, docs) => {
        if(err)
          return res.status(500).json(responseData("Somthing wrong happened , Please try again : " + err))
        res.json(responseData(null, docs))
    });
}

const findById = (req, res)=>{
    Polls.findById( {_id: req.params.id},
        (err, doc) =>{
          if(err)
              return res.status(500).json(responseData("An error occured while trying to search a poll"));
          res.json(responseData(null, doc));
        });
}

const save = async (req, res) => {

    // 1. Get data
    const { category, title, start_date, end_date, target_date, foods } = req.body;

    // 2. Perform validation , transformation ..etc
    const parsed_start_date = moment(start_date);
    const parsed_end_date = moment(end_date);
    const parsed_target_date = moment(target_date)

    const check = validateDate(parsed_start_date, parsed_end_date, parsed_target_date);

    if (!check.success) return res.status(400).json(check);

    const foodsWithVotes = [];
    JSON.parse(JSON.stringify(foods)).forEach(element => {
        foodsWithVotes.push({ foodItem: element, votes: [] });
    });

    // 3. Persist to db
    const poll = new Polls({
        category: category,
        title: title,
        start_date: parsed_start_date,
        end_date: parsed_end_date,
        target_date: parsed_target_date,
        foods: foodsWithVotes
    });
    await poll.save();

    //4. return appropriate response/errs
    const range = `${parsed_start_date.format("dddd, MMMM Do YYYY, h:mm:ss a")} and ${parsed_end_date.format("dddd, MMMM Do YYYY, h:mm:ss a")}`
    res.json(responseData( `A poll successfully created between ${range}` , poll));

}

const update = async (req, res) => {

    const poll_id = req.params.id;
    const { food_id, user_id } = req.body;
    const user = await Users.findById({ _id: user_id });

    Polls.updateOne({ _id: poll_id, "foods._id": food_id },
        { $push: { "foods.$.votes": user } },
        ((error, doc) => {
                if(error) return res.status(500).json(responseData("An Error haappened while trying to update a poll" + error))
                res.json(responseData(null, doc))
        }
        ));
}

const deleteById = (req, res)=>{
     Polls.deleteOne({_id: req.params.id},
        (error =>  {
            if(error)  return res.status(500).json(responseData("Error Happened while trying to remove poll : " +error))
        }));
    res.json(responseData("Poll removed successfully", req.params.id));
}

const getVoteResults = async (req, res) => {

    let id = mongoose.Types.ObjectId(req.params.id);
    const match = { $match: { "_id": id } }
    const unwind = { $unwind: "$foods" }
    const project = { $project: { "_id": 1, title: 1, voteCounts: { $size: "$foods.votes" }, foods: 1 } }
    const sort = { $sort: { voteCounts: -1 } }

    Polls.aggregate([match, unwind, project, sort], ((error, result) => {
        if (error)
            return res.status(500).json("Error occured when trying to fetch poll result : " + error);
        res.json(responseData(null, result));
    }));
}

const pollController = { findAll, findById, save, update, deleteById, getVoteResults };

module.exports = { "pollController": pollController };