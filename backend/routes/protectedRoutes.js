const express = require("express");
const { getProtected } = require('../controllers/protectedController');
const router = express.Router();

router.get('/', getProtected);
module.exports = router;