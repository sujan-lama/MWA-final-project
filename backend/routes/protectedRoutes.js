const express = require("express");
const { getProtected } = require('../controllers/protectedController');
const router = express.Router();
const authenticationMW = require('../middlewares/authenticationMW');
router.get('/', authenticationMW, getProtected);
module.exports = router;