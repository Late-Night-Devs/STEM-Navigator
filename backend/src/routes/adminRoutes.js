const express = require("express");
const router = express.Router();
const checkAdminEmail = require("../adminAuthMiddleware");

router.get("/admin-modify-db", checkAdminEmail, (req, res) => {
  res.json({ message: "Welcome to the Admin Tools Page!" });
});

router.post("/admin-modify-db/tag-form-submit", (req, res) => {
  console.log(req.body);
  res.send("backend recieved post");
})




module.exports = router;
