const express = require("express");
const tagController = require("../controllers/tagController");

const router = express.Router();

// PATH localhost:3000/tags/${tagRoutes}

router.get("/", tagController.getTags);
// delete route
router.delete("/remove/:tagIDs", tagController.deleteProgramsByTag);

module.exports = router;
