const express = require('express');
const userFavoriteController = require('../controllers/userFavoriteController');

const router = express.Router();

router.get('/', userFavoriteController.getAllFavorites);

router.post('/user/favorite', userFavoriteController.addFavoriteProgram);
module.exports = router;
