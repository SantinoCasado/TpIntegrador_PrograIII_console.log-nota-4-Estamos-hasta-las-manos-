const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// POST /api/users => crear usuario admin
router.post('/register', userController.createUser);

// POST /api/users/login => login de usuario admin
router.post('/login', userController.loginUser);

module.exports = router;