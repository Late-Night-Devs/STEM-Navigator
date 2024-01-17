const express = require("express");
const programController = require("../controllers/programController");

const router = express.Router();

router.get("/", programController.getPrograms);
router.post("/filter", programController.filterPrograms);

router.delete("/:programId", (req, res) => {
  const programId = req.params.programId;
  // logic to delete the program (and programTag entries)
  res.send(
    "backend recieved request to delete program with id " + programId.toString()
  );
});

module.exports = router;
