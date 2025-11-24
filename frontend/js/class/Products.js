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

    // Solo botón de carrito
    const controls = document.createElement("div");
    controls.classList.add("d-flex", "align-items-center", "mt-2");
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
    }

    cartBtn.onclick = () => {
      if (cartBtn.disabled) {
        showNotification("No se puede agregar: sin stock o inactivo", "error");
        return;
      }
      addToCart(this, 1); // Solo agrega 1, cantidad se elige en el carrito
      showNotification("Producto agregado al carrito", "success");
    };

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

// export { Product };
