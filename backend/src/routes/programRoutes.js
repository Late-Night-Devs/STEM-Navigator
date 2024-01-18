const express = require("express");
const programController = require("../controllers/programController");

const router = express.Router();

router.get("/", programController.getPrograms);
router.post("/filter", programController.filterPrograms);

// delete all associated entries to proID and its self based on programId params
router.delete("/:programId", programController.deleteProgram);

module.exports = router;
