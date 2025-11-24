const { Sale, Product, SaleProduct, db } = require('../models');

async function debugSalesProducts() {
  try {
    await db.authenticate();
    console.log('Conexión a la base de datos OK');

    // Listar todas las ventas con sus productos asociados
    const sales = await Sale.findAll({
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: ['quantity', 'unitPrice'] }
        }
      ]
    });
    console.log('Ventas y productos asociados:');
    sales.forEach(sale => {
      console.log(`Venta #${sale.id} - Cliente: ${sale.customerName}`);
      if (sale.products.length === 0) {
        console.log('  Sin productos asociados');
      } else {
        sale.products.forEach(product => {
          const rel = product.SaleProduct || product.sale_products?.[0];
          console.log(`  Producto: ${product.name} | Cantidad: ${rel?.quantity} | Precio unitario: ${rel?.unitPrice}`);
        });
      }
    });

    // Listar todos los registros de la tabla sale_products
    const saleProducts = await SaleProduct.findAll();
    console.log('\nRegistros en sale_products:');
    saleProducts.forEach(sp => {
      console.log(`Venta #${sp.saleId} - Producto #${sp.productId} | Cantidad: ${sp.quantity} | Precio unitario: ${sp.unitPrice}`);
    });

    // Listar productos y su stock actual
    const products = await Product.findAll();
    console.log('\nStock actual de productos:');
    products.forEach(product => {
      console.log(`Producto #${product.id} - ${product.name} | Stock: ${product.stock}`);
    });

    process.exit();
  } catch (err) {
    console.error('Error en la depuración:', err);
    process.exit(1);
  }
}

debugSalesProducts();
