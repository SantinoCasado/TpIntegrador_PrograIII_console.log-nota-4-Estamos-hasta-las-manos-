const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// GET /api/users => obtener todos los usuarios admin
router.get('/', userController.getAllUsers);

// GET /api/users/:id => obtener usuario admin por ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id => actualizar usuario admin por ID
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id => eliminar usuario admin por ID
router.delete('/:id', userController.deleteUser);

// POST /api/users => crear usuario admin
router.post('/register', userController.createUser);

// POST /api/users/login => login de usuario admin
router.post('/login', userController.loginUser);

module.exports = router;