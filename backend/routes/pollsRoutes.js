const express = require("express");
const router = express.Router();
const { pollController } = require('../controllers/pollsController');


router.get("/", pollController.findAll);
router.post("/", pollController.save);
router.get("/:id", pollController.findById);
router.put("/:id", pollController.update); // vote
router.delete("/:id", pollController.deleteById);

router.get("/:id/results", pollController.getVoteResults)

router.get("/:id/results", pollController.getVoteResults)

module.exports = router;

