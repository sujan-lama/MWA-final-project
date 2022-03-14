const Users = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseData = require('../response/response');
const fs = require("fs");
const saltRounds = 10;

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
        const { email } = req.body;
        const isEmailUnique = await checkEmailAddressUnique(email);
        if (!isEmailUnique) {
            return res.status(401).json(responseData("Email already exists"));
        }
        const userData = await saveUser(req.body);
        return res.json(responseData("Signup successful", userData))

    } catch (error) {
        console.log(error);
        return res.status(500).json(responseData("Something went wrong. Please try again"));
    }

}

async function saveUser(body) {
    const { email, password, name, role } = body;

    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // generate new id
    const id = Date.now();
    let userData = { _id: id, email: email, password: encryptedPassword, name: name, role: role };
    const user = new Users(userData);
    await user.save();
    delete userData.password;
    return userData;
}

async function generateUser() {
    fs.readFile('./default_users.json', 'utf-8', async (err, data) => {
        if (err) {
            console.log("Failed to generate default users");
            return;
        }
        const users = JSON.parse(data);
        for (const user of users) {
            const isUnique = await checkEmailAddressUnique(user.email);
            if (isUnique) {
                await saveUser(user);
            }
        }
        console.log("Default users successfully generated");
    });
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


module.exports = { login, signup, verifyEmail, generateUser };