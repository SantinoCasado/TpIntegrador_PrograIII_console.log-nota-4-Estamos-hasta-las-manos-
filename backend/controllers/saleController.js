const { Sale, Product, SaleProduct } = require("../models");

// C - CREATE - crear una nueva venta con productos
const createSale = async (req, res) => {
  try {
    const { customerName, products, paymentMethod } = req.body;

    // Calcular el total
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    // Crear la venta
    const newSale = await Sale.create({
      customerName,
      totalAmount,
      paymentMethod: paymentMethod || "cash",
      status: "completed",
    });

    // Agregar los productos a la venta y actualizar stock
    for (const item of products) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await SaleProduct.create({
          saleId: newSale.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        });
        // Reducir el stock
        let newStock = product.stock - item.quantity;
        let updateFields = { stock: newStock };
        // Si el stock llega a 0, dar de baja lógica
        if (newStock <= 0) {
          updateFields.isActive = false;
          newStock = 0;
        }
        await product.update(updateFields);
      }
    }

    // Buscar la venta creada con sus productos
    const completeSale = await Sale.findByPk(newSale.id, {
      include: [
        {
          model: Product,
          as: "products",
          through: { attributes: ["quantity", "unitPrice"] },
        },
      ],
    });

    res.status(201).json(completeSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// R - READ - obtener todas las ventas
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Product,
          as: "products",
          through: { attributes: ["quantity", "unitPrice"] }, // Excluir atributos de la tabla intermedia
        },
      ],
    });
    res.json(sales);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// R - READ - obtener una venta por ID
const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: "products",
          through: { attributes: ["quantity", "unitPrice"] }, // Excluir atributos de la tabla intermedia
        },
      ],
    });
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// U - UPDATE - actualizar una veenta que EXISTE
const updateSale = async (req, res) => {
  try {
    const sale = await Sale.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Sale updated successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// D - DELETE - eliminar una venta SIN DESACTIVAR
const deleteSale = async (req, res) => {
  try {
    await Sale.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Marcar como completada la venta
const completeSale = async (req, res) => {
  try {
    await Sale.update(
      { status: "completed" },
      { where: { id: req.params.id } }
    );
    res.json({ message: "Sale completed successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Marcar como cancelada la centa
const cancelSale = async (req, res) => {
  try {
    await Sale.update({ status: "canceled" }, { where: { id: req.params.id } });
    res.json({ message: "Sale canceled successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  completeSale,
  cancelSale,
};
