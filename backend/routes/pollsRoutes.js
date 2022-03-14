const express = require("express");
const router = express.Router();

router.get("/", pollController.findAll);
router.post("/", pollController.save);
router.get("/:id", pollController.findById);
router.put("/:id", pollController.update);
router.delete("/:id", pollController.deleteById);

module.exports = router;

