const express = require("express");
const userController = require("../controllers/userController");
const userFavoriteController = require("../controllers/userFavoriteController");

//localhost:3000/user/...
const router = express.Router();

// get all the users from database
router.get("/", userController.getAllUsers);

router.post("/addUser", userController.addUser);

router.get("/findUserID", userController.findUserID);

// router.get("/isAdmin", userController.isAdmin);

router.get("/checkEmailExists", userController.checkEmailExists);

router.delete("/removeUser/:userID", userController.removeUser);

//  URL/user/favorite
router.get("/favorite", userFavoriteController.getAllFavorites);

router.get('/favorite/getFavoritePrograms/:userID', userFavoriteController.getFavoritePrograms);

// Define the route for checking favorites
router.get(
  "/favorite/checkFavorite/:userID/:programID",
  userFavoriteController.checkFavorite
);

router.post("/favorite/addFavorite", userFavoriteController.addFavoriteProgram);

router.post(
  "/favorite/removeFavorite",
  userFavoriteController.removeFavoriteProgram
);
module.exports = router;
