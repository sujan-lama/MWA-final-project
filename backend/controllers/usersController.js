const {Users }  = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseData = require('../dtos/response');
const {checkEmailAddressUnique}  = require('./sharedControllers');
async function login(req, res) {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json(responseData("Email and password field is required"));
        }

        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(401).json(responseData("Email does not exists."));
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(401).json(responseData("Password is incorrect"));
        }

        //login successful
        const accessToken = jwt.sign({
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role
        }, process.env.TOKEN_SECRET);
        const data = { id: user.id, email: user.email, name: user.name, token: accessToken, role: user.role };
        return res.json(responseData("Login successful", data));
    } catch (error) {
        console.log(error);
        return res.status(500).json(responseData("Something went wrong. Please try again later"));
    }

}

async function signup(req, res) {
    try {
        const { email, password, name, role } = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const isEmailUnique = await checkEmailAddressUnique(email);
        if (!isEmailUnique) {
            return res.status(401).json(responseData("Email already exists"));
        }

        // generate new id
        const id = Math.floor(new Date().getTime() / 1000).toString();
        let userData = { _id: id, email: email, password: encryptedPassword, name: name, role: role };
        const user = new Users(userData);
        await user.save();
        delete userData.password;
        return res.json(responseData("Signup successful", userData))

    } catch (error) {
        console.log(error);
        return res.status(500).json(responseData("Something went wrong. Please try again"));
    }

}


async function verifyEmail(req, res) {
    const email = req.params.email;
    const isUnique = await checkEmailAddressUnique(email);
    if (!isUnique) {
        return res.json({ success: false, message: "Email already exists" });
    }
    return res.json({ success: true, message: "Email is available" });
}

async function checkEmailAddressUnique(email) {
    const userDetail = await Users.findOne({ email: email });
    if (userDetail)
        return false;
    return true;
}



module.exports = { login, verifyEmail };