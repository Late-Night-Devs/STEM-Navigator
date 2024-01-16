const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// get all the users from database
router.get('/', userController.getAllUsers);

router.post('/addUser', userController.addUser);
module.exports = router;
