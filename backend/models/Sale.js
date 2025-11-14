const db = require('../data/database');
const { DataTypes } = require('sequelize');

//Definición del modelo Sale
const Sale = db.define('sales', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customerName:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    totalAmount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('pending', 'completed', 'canceled'),
        defaultValue: 'pending',
    },
    paymentMethod:{
        type: DataTypes.STRING(50),
        allowNull: true,
    }
},{
    timestamps: true,
    tableName: 'sales'
});

module.exports = Sale;