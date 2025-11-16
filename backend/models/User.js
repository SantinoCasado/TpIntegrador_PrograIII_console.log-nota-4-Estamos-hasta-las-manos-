const { db } = require('../data/database');
const { DataTypes } = require('sequelize');

//Definición del modelo User
const User = db.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'users'
});

module.exports = User;