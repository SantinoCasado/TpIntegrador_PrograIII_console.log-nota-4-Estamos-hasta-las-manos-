const { db } = require('../data/database');

// Importar los modelos
const Product = require('./Product');
const User = require('./User');
const Sale = require('./Sale');
const SaleProduct = require('./SaleProduct');

//Asociaciones entre modelos

// Sale tiene muchos productos a traves de SaleProduct
Sale.belongsToMany(Product,{
    through: SaleProduct,
    foreignKey: 'saleId',
    as: 'products'
});

//Product pertenece a muchas ventas a traves de SaleProduct
Product.belongsToMany(Sale,{
    through: SaleProduct,
    foreignKey: 'productId',
    as: 'sales'
});

// SalePROduct pertenece a sale
SaleProduct.belongsTo(Sale,{foreignKey: 'saleId'});
// SaleProduct pertenece a Product
SaleProduct.belongsTo(Product,{foreignKey: 'productId'});

// Sale tiene muchos SaleProducts
Sale.hasMany(SaleProduct,{foreignKey: 'saleId'});
// Product tiene muchos SaleProducts
Product.hasMany(SaleProduct,{foreignKey: 'productId'});

module.exports = {
    db,
    User,
    Product,
    Sale,
    SaleProduct
};