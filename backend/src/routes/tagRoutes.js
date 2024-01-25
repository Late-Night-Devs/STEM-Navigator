const express = require("express");
const tagController = require("../controllers/tagController");

const router = express.Router();

router.get("/", tagController.getTags);
// delete route
router.delete("/:tagId", (req, res) => {
  const tagId = req.params.tagId;
  // logic to delete the tag (and programTag entries)
  res.send(
    "backend recieved request to delete tag with id " + tagId.toString()
  );
});

module.exports = router;
