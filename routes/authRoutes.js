const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.route('/login').post(userController.userLogin);

router.route('/register').post(userController.userRegister);

module.exports = router;