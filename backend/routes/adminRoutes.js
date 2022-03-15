const express = require("express");
const { getUsers, addUser, deleteUser } = require('../controllers/adminControllers');
const router = express.Router();
const authenticationMW = require('../middlewares/authenticationMW');
router.get('/users', authenticationMW, getUsers);
router.post("/add-user", authenticationMW, addUser);
router.delete("/delete-user/:email",authenticationMW, deleteUser);

module.exports = router;