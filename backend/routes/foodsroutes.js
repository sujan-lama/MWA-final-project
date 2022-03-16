const express = require("express");
const router = express.Router();
const foodController = require('../controllers/foodsController');

router.get("/", foodController.findAll);
router.post("/", foodController.save);
router.get("/:id", foodController.findById);
router.put("/:id", foodController.update);
router.delete("/:id", foodController.deleteById);

router.get("/category/:category", foodController.findByCategory);
router.post("/pre-populate", foodController.prePopulate);

module.exports = router;

