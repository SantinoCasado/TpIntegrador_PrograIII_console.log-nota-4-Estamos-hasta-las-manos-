const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');

// C - CREATE - crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // No se retorna la contraseña en la respuesta
        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            createdAt: newUser.createdAt
        };

        res.json(userResponse);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// R - READ - obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'createdAt'] // Sin constraseña (privada)
        });
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// R - REDAD - obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id', 'name', 'createdAt'] // Sin constraseña (privada)
        });
        if(user){
            res.json(user);
        }else{
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

// LOGIN - autenticar usuario
/*const loginUser = async (req, res) => {
    try {
        const {name, password} = req.body;

        // Buscar el usuario por nombre
        const user = await User.findOne({ 
            where: { name } 
        });

        if(!user){
            return res.status(404).json({ message: 'Inavlid credentials' });
        }*/