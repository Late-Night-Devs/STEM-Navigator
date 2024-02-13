const express = require("express");
const router = express.Router();
const { addTag, updateTag } = require("../controllers/tagController");
const {
  addProgram,
  updateProgram,
} = require("../controllers/programController");

router.get("/admin-modify-db", (req, res) => {
  res.json({ message: "Welcome to the Admin Tools Page!" });
});

router.post("/admin-modify-db/tag-form-submit", (req, res) => {
  const { tag_id } = req.body;

  if (tag_id === -1) {
    // Add a new tag
    addTag(req, res);
  } else {
    // Update an existing tag
    updateTag(req, res);
  }
});

router.post("/admin-modify-db/program-form-submit", (req, res) => {
  const program_id = Number(req.body.program_id);

  if (program_id === -1) {
    // Add a new program
    addProgram(req, res);
  } else {
    // Update the existing program
    updateProgram(req, res);
  }
});

module.exports = router;
