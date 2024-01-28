const express = require("express");
const router = express.Router();
const checkAdminEmail = require("../adminAuthMiddleware");

router.get("/admin-modify-db", checkAdminEmail, (req, res) => {
  res.json({ message: "Welcome to the Admin Tools Page!" });
});

router.post("/admin-modify-db/tag-form-submit", (req, res) => {
  console.log("backend recieved post: ", req.body);
  // if tag_id == -1 then the user wants to ADD a tag
  // for any other tag id, the user wants to EDIT the tag
})




module.exports = router;
