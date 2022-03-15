const responseData = require('../dtos/response');
const moment = require("moment");
const {validateDate} = require("../utils/validations");
const {Polls} = require("../models/polls");
const {Foods} = require("../models/foods");
const data = require('../resources/foods.json')

const findAll = (req, res)=>{
    Foods.find({}, (err, docs) => {
        if(err)
           return  res.status(500).json(responseData("Something wrong happened , Please try again : "+err))
        res.json(responseData(null, docs))
    });
}

const findById = (req, res)=>{
    Foods.findById( {_id: req.params.id}, (err, doc) => {
        if(err)
            return res.status(500).json(responseData("Error happened while searching food" + err))
        res.json(responseData(null, doc))
        }
    );
}

const save = async (req, res)=>{

    const {name, category} = req.body;
    const food  = new Foods({
        name: name,
        category: category,
    });
    await food.save();
    res.json(responseData( `A Food successfully created between ` , food));
}

const update = async (req, res) =>{

    const food_id = req.params.id;
    const {name , category, contents} = req.body;

    Foods.updateOne({_id: food_id},
        {$set: {"name": name , "category": category}},
        ((error, doc) => {
            if(error)
                return res.status(500).json(responseData("Error happened while updating food" + error))
            res.json(responseData(null, doc))
        }));
}

const deleteById =   (req, res)=>{
    Foods.deleteOne({_id: req.params.id},
        (error) => {
            return res.status(500).json(responseData("Error happened while trying to remove food : " +error))
        });
    res.json(responseData("Food removed successfully", req.params.id));
}

const findByCategory = (req, res)=>{
     Foods.find({"category": req.params.category.toUpperCase()},
         ((error, docs) =>
         {
             if(error) return res.status(500).json(responseData("No category found" + error))
             res.json(responseData(null, docs))
         }))
}

const prePopulate = (req, res) => {

    const data  = require("../resources/foods.json");

    Foods.insertMany(data)
        .then(_=> res.json(responseData("Food data populated successfully")))
        .catch((err)=> res.status(500).json(responseData("Error happened while trying to load food data" + err)));

}

const foodController = {
    findAll,
    findById,
    save,
    update,
    deleteById,
    findByCategory,
    prePopulate};

module.exports = foodController;