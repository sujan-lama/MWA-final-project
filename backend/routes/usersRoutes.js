const express = require("express");
const {  addUser, login, verifyEmail } = require('../controllers/usersController');
const router = express.Router();


router.post("/login", login);
router.get("/verify/:email", verifyEmail);
module.exports = router;

