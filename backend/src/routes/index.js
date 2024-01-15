const express = require("express");
const router = express.Router();

const programRoutes = require("./programRoutes");
const tagRoutes = require("./tagRoutes");
const programTagsRoutes = require("./programTagsRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const userFavoriteRoutes = require("./userFavoriteRoutes");

// PATH localhost:3000/programs/${programRoutes}
router.use("/programs", programRoutes);

// PATH localhost:3000/tags/${tagRoutes}
router.use("/tags", tagRoutes);

router.use("/program-tags", programTagsRoutes);

router.use("/admin", adminRoutes);

// for USERS table
// testing localhost:3000/user
router.use("/user", userRoutes);

// Userfavorite table
router.use("/favorite", userFavoriteRoutes);

module.exports = router;
