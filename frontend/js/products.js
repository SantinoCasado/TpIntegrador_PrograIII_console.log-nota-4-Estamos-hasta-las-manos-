import { Product } from './class/Products.js';
import {showNotification} from './utils.js';

const hardwareIcons = []; // Eliminados, ya no se usan
const softwareIcons = []; // Eliminados, ya no se usan

let allProducts = [];
let currentCategory = 'all';

// Event listeners para los filtros
// Hardware
document.getElementById('filter-hardware').addEventListener('click', () => {
  currentCategory = 'hardware';
  renderProducts();
});
// Software
document.getElementById('filter-software').addEventListener('click', () => {
  currentCategory = 'software';
  renderProducts();
});
// Todos
document.getElementById('filter-all').addEventListener('click', () => {
  currentCategory = 'all';
  renderProducts();
});
// Ordenamiento
document.getElementById('sort-products').addEventListener('change', () => {
  renderProducts();
});

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/products`);
    allProducts = await response.json();
    renderProducts();
  } catch (error) {
    showNotification('Failed to load products', 'error');
  }
});

// Renderiza los productos en el contenedor
function renderProducts() {
  const container = document.getElementById('products-list');
  if (!container) return;
  container.innerHTML = '';

  getFilteredProducts().forEach(prod => {
    const productCard = new Product(
      prod.id,
      prod.name,
      prod.price,
      prod.image,
      prod.category,
      prod.description,
      prod.stock
    );
    container.appendChild(productCard.createHtmlElement());
  });
}

// Filtrado y ordenamiento de productos
function getFilteredProducts() {
  let filtered = allProducts;
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category && p.category.trim().toLowerCase() === currentCategory);
  }
  const sortValue = document.getElementById('sort-products').value;
  if (sortValue === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sortValue === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sortValue === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sortValue === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
  return filtered;
}

// ================================ Funciones relacionadas al carrito de compras ====================
// Renderiza el círculo del carrito usando un elemento fijo en el HTML
function updateCartCircle() {
  const notif = document.getElementById('cart-success-notif');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!notif) return;
  if (cart.length === 0) {
    notif.style.display = 'none';
  } else {
    notif.style.display = 'flex';
  }
}

document.addEventListener('DOMContentLoaded', updateCartCircle);

export function addToCart(product, quantity) {
  // No agregar si la cantidad es menor que uno
  if (quantity < 1) return;

  // Leer el carrito actual desde el almacenamiento local
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Busco si el producto ya está en el carrito
  const index = cart.findIndex(item => item.id === product.id);

  if (index !== -1) {
    // Si ya está, actualizar la cantidad
    cart[index].quantity += quantity;
  } else {
    // Si no está, agregarlo
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  // Guardar el carrito actualizado en el almacenamiento local
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCircle();
  // Mostrar mensaje de exito junto con el pop out del redireccionamiento del carrito
  showNotification('Product added to cart', 'success');
}