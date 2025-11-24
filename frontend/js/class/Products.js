//import { addToCart } from "../products.js";

class Product {
  name;
  price;
  image;
  type;
  description;

  constructor(id, name, price, image, type, description, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.type = type;
    this.description = description;
    this.stock = stock || 99; // Stock por defecto si no se proporciona
  }

  createHtmlElement() {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "h-100", "shadow-sm");

    const img = document.createElement("img");
    img.src = this.image;
    img.classList.add("card-img-top");
    img.alt = this.name;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = this.name;

    const descriptionP = document.createElement("p");
    descriptionP.classList.add("card-text");
    descriptionP.textContent = this.description;

    const priceH6 = document.createElement("h6");
    priceH6.classList.add("card-subtitle", "mb-2", "fw-bold");
    const formattedPrice = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(this.price);
    priceH6.textContent = formattedPrice;

    // Controles de cantidad y carrito
    const controls = document.createElement("div");
    controls.classList.add("d-flex", "align-items-center", "mt-2");

    const minusBtn = document.createElement("button");
    minusBtn.className = "btn btn-outline-secondary btn-sm";
    minusBtn.textContent = "-";

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.value = 0;
    qtyInput.min = 1;
    qtyInput.max = this.stock || 99;
    qtyInput.className = "form-control form-control-sm mx-2";
    qtyInput.style.width = "60px";

    const plusBtn = document.createElement("button");
    plusBtn.className = "btn btn-outline-secondary btn-sm";
    plusBtn.textContent = "+";

    minusBtn.onclick = () => {
      if (qtyInput.value > 1) qtyInput.value--;
    };
    plusBtn.onclick = () => {
      if (qtyInput.value < qtyInput.max) qtyInput.value++;
    };

    const cartBtn = document.createElement("button");
    cartBtn.className = "btn btn-success btn-sm ms-2";
    cartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i>';

    // Deshabilitar si no hay stock o el producto está inactivo
    let isInactive = typeof this.isActive !== "undefined" && !this.isActive;
    if (this.stock <= 0 || isInactive) {
      cartBtn.disabled = true;
      cartBtn.classList.add("btn-secondary");
      cartBtn.classList.remove("btn-success");
      cartBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Sin stock';
      qtyInput.disabled = true;
      minusBtn.disabled = true;
      plusBtn.disabled = true;
    }

    cartBtn.onclick = () => {
      if (cartBtn.disabled) {
        showNotification("No se puede agregar: sin stock o inactivo", "error");
        return;
      }
      const qty = parseInt(qtyInput.value);
      if (qty > qtyInput.max) {
        showNotification("No hay suficiente stock disponible", "error");
        return;
      }
      addToCart(this, qty);
      showNotification("Producto agregado al carrito", "success");
    };

    controls.appendChild(minusBtn);
    controls.appendChild(qtyInput);
    controls.appendChild(plusBtn);
    controls.appendChild(cartBtn);

    cardBody.appendChild(title);
    cardBody.appendChild(descriptionP);
    cardBody.appendChild(priceH6);
    cardBody.appendChild(controls);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
  }
}

//export { Product };
