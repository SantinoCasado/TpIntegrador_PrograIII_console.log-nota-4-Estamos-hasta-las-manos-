const { db } = require('../data/database');
const { DataTypes } = require('sequelize');

// Definición del modelo Product
const Product = db.define('products', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    category:{
        type: DataTypes.ENUM('hardware', 'software'),
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    image:{
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '/images/no-image.svg'
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
},{
    timestamps: true,
    tableName: 'products'
});

module.exports = Product;
