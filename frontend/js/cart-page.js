// import eliminado, showNotification ya es global

// Aca iria todala logica para renderizar y manejar la pagina del carrito de compras
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  document.getElementById("clear-cart").addEventListener("click", clearCart);
  document
    .getElementById("confirm-purchase")
    .addEventListener("click", confirmPurchase);
});

function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<div class="alert alert-info text-center">El carrito está vacío.</div>';
    return;
  }

  let total = 0;

  let html = `<div class="table-responsive"><table class="table table-dark table-bordered table-hover align-middle text-center" style="background: #1a0025; border-radius: 12px; overflow: hidden;">
    <thead>
      <tr>
        <th class="text-center">Imagen</th>
        <th class="text-center">Producto</th>
        <th class="text-center">Precio</th>
        <th class="text-center">Cantidad</th>
        <th class="text-center">Subtotal</th>
        <th class="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>`;

  cart.forEach((item, idx) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    if (item.isActive === false || item.stock === 0) {
      html += `<tr>
        <td class="text-center"><img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:8px; box-shadow:0 0 8px #ff00cc33;"></td>
        <td class="text-center">${item.name}</td>
        <td colspan="4" class="text-center">
          <span class="text-danger fw-bold">This product is not available</span>
        </td>
      </tr>`;
    } else {
      html += `<tr>
        <td class="text-center"><img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:8px; box-shadow:0 0 8px #ff00cc33;"></td>
        <td class="text-center">${item.name}</td>
        <td class="fw-bold text-center">$${item.price}</td>
        <td class="text-center">
          <input type="number" min="1" max="99" value="${item.quantity}" data-idx="${idx}" class="form-control form-control-sm cart-qty-input text-center mx-auto" style="width:70px;">
        </td>
        <td class="fw-bold text-center">$${subtotal}</td>
        <td class="text-center">
          <button class="btn btn-danger btn-sm remove-btn px-3" data-idx="${idx}" title="Eliminar">Eliminar</button>
        </td>
      </tr>`;
    }
  });

  html += `</tbody></table></div>`;
  html += `<div class="text-end fw-bold fs-5">Total: $${total}</div>`;

  cartContainer.innerHTML = html;

  //Evento para eliminar o modificar cantidades
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.closest("button").dataset.idx;
      removeFromCart(idx);
    });
  });

  document.querySelectorAll(".cart-qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const idx = e.target.dataset.idx;
      const newQuantity = parseInt(e.target.value);
      updateCartQuantity(idx, newQuantity);
    });
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function updateCartQuantity(index, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (quantity < 1) quantity = 1;
  cart[index].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

async function confirmPurchase() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    showNotification("El carrito está vacío!", "warning");
    return;
  }

  // Validar stock antes de enviar la compra
  let errors = [];
  for (const item of cart) {
    // Consultar stock actual desde la API
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/products/${item.id}`);
      const product = await res.json();
      if (!product.isActive || product.stock < item.quantity) {
        errors.push(`El producto '${item.name}' no tiene suficiente stock (disponible: ${product.stock}, solicitado: ${item.quantity})`);
      }
    } catch (err) {
      errors.push(`No se pudo verificar el stock de '${item.name}'`);
    }
  }
  if (errors.length > 0) {
    showNotification(errors.join('\n'), "error", 6000);
    return;
  }

  // Si todo OK, enviar la compra al backend
  try {
    const customerName = localStorage.getItem('gaming-customer-name') || 'Cliente';
    const saleProducts = cart.map(item => ({ productId: item.id, quantity: item.quantity }));
    const res = await fetch(`${CONFIG.API_BASE_URL}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName, products: saleProducts })
    });
    const data = await res.json();
    if (res.status === 201) {
      // Guardar la venta en localStorage para el ticket
      const sale = {
        id: data.sale?.id || data.id || Date.now(),
        createdAt: data.sale?.createdAt || data.createdAt || new Date().toISOString(),
        customerName: customerName,
        products: data.sale?.products || cart,
        subtotal: data.sale?.total || data.total || cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      };
      localStorage.setItem('lastSale', JSON.stringify(sale));
      localStorage.removeItem("cart");
      window.location.href = 'ticket.html';
    } else if (data.errors) {
      showNotification(data.errors.join('\n'), "error", 6000);
    } else {
      showNotification("Error al procesar la compra.", "error");
    }
  } catch (err) {
    showNotification("Error de conexión con el servidor.", "error");
  }
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
  showNotification("Cart cleared successfully.", "success");
}
