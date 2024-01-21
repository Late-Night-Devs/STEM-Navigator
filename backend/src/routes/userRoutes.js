const express = require('express');
const userController = require('../controllers/userController');
const userFavoriteController = require('../controllers/userFavoriteController');

//localhost:3000/user/...
const router = express.Router();

// get all the users from database
router.get('/', userController.getAllUsers);

router.post('/addUser', userController.addUser);

// router.get('/findUserID', userController.findUserID);

router.get('/checkEmailExists', userController.checkEmailExists);

router.delete('/removeUser/:userID', userController.removeUser);

//  URL/user/favorite 
router.get('/favorite', userFavoriteController.getAllFavorites);

router.post('/favorite/addFavorite', userFavoriteController.addFavoriteProgram);

router.post('/favorite/removeFavorite', userFavoriteController.removeFavoriteProgram);
module.exports = router;


