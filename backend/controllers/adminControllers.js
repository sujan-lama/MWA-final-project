const responseData = require('../dtos/response');
const {Users} = require('../models/users');
const { saveUser, checkEmailAddressUnique } = require('./sharedControllers');

async function getUsers(req, res) {
    const users = await Users.find({ role: "USER" }, '_id name email role');
    return res.json(responseData("users fetched successful", users));
}


async function addUser(req, res) {
    try {
        const { email } = req.body;
        const isEmailUnique = await checkEmailAddressUnique(email);
        if (!isEmailUnique) {
            return res.status(401).json(responseData("Email already exists"));
        }
        const userData = await saveUser(req.body);
        return res.json(responseData("User successfully added", userData))

    } catch (error) {
        console.log(error);
        return res.status(500).json(responseData("Something went wrong. Please try again"));
    }

}

async function deleteUser(req, res) {
    const email = req.params.email;

    const response = await Users.deleteOne({ email: email });
    if (response.deletedCount === 1) {
        return res.status(200).json(responseData("User successfully deleted", { email: email }))
    }
    return res.status(401).json(responseData("Failed to delete user"));
}

module.exports = { getUsers, addUser, deleteUser }