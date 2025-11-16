const { db } = require('../data/database');
const { DataTypes } = require('sequelize');

//Definicion del modelo SaleProduct
const SaleProduct = db.define('sale_products', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    saleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    unitPrice:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    subtotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }
},{
    timestamps: true,
    tableName: 'sale_products'
});

module.exports = SaleProduct;