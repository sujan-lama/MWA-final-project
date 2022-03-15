const express = require("express");
const { getUsers, addUser, deleteUser } = require('../controllers/adminControllers');
const router = express.Router();
router.get('/users', getUsers);
router.post("/add-user", addUser);
router.delete("/delete-user/:email", deleteUser);

module.exports = router;