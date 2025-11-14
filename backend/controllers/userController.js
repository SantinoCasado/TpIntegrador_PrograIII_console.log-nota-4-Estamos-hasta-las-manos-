const { User } = require('../models');
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
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Buscar el usuario por email
        const user = await User.findOne({ 
            where: { email } 
        });

        if(!user){
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        // Verifico la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        // El login fue exitoso
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    }catch (error) {
        res.json({ message: error.message });
    }
};

// U - UPDATE - actualizar un usuario por ID
const updateUser = async (req, res) => {
    try {
        let updatedData = {...req.body}; // Clono los datos recibidos

        // Si se proporciona una nueva contraseña, hashearla
        if(updatedData.password){
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }

        const updatedUser = await User.update(updatedData, {
            where: { id: req.params.id }    // Actualizo por ID
        });

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// D - DELETE - eliminar un usuario por ID
const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    loginUser,
    updateUser,
    deleteUser
};