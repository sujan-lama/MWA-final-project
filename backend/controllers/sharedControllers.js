const bcrypt = require('bcrypt');
const fs = require("fs");
const saltRounds = 10;
const { Users } = require("../models/users");

async function saveUser(body) {
    const { email, password, name, role } = body;

    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    let userData = { email: email, password: encryptedPassword, name: name, role: role };
    const user = new Users(userData);
    console.log(user)
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

async function checkEmailAddressUnique(email) {
    const userDetail = await Users.findOne({ email: email });
    return !userDetail;

}

module.exports = { saveUser, generateUser, checkEmailAddressUnique }