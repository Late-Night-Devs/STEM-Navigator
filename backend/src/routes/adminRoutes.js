const express = require("express");
const router = express.Router();
const { addTag, updateTag } = require("../controllers/tagController");

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
  console.log("backend recieved post: ", req.body);
  res.send("backend recieved program-form");
  // if program_id == -1 then the user wants to ADD a program
  // for any other program_id, the user wants to EDIT the program
});

module.exports = router;
