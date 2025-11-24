import { showNotification } from "./utils.js";

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
  let html = `<table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>`;

  cart.forEach((item, idx) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    html += `<tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <input type="number" min="1" max="99" value="${item.quantity}" data-idx="${idx}" class="form-control form-control-sm cart-qty-input" style="width:70px;">
            </td>
            <td>$${subtotal}</td>
            <td>
                <button class="btn btn-danger btn-sm remove-btn" data-idx="${idx}"><i class="fa fa-trash"></i></button>
            </td>
        </tr>`;
  });

  html += `</tbody></table>`;
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

function confirmPurchase() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    showNotification("The cart is empty!", "warning");
    return;
  }
  localStorage.removeItem("cart");
  renderCart();
  showNotification(
    "¡Purchase confirmed! Thank you for your purchase.",
    "success"
  );
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
  showNotification("Cart cleared successfully.", "success");
}
