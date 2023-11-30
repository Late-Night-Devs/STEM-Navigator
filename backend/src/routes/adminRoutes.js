const express = require("express");
const router = express.Router();
const checkAdminEmail = require("../adminAuthMiddleware");

router.get("/admin-modify-db", checkAdminEmail, (req, res) => {
  res.json({ message: "Welcome to the Admin Tools Page!" });
});

module.exports = router;
