
class Product {
    constructor(id, name, price, image, type, description, stock) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
      this.type = type;
      this.description = description;
      this.stock = stock || 99;
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
  
      // --- LOGICA DEL BOTON MODIFICADA ---
      const controls = document.createElement("div");
      controls.classList.add("d-flex", "align-items-center", "mt-2", "w-100");
      
      const cartBtn = document.createElement("button");
      cartBtn.className = "btn w-100"; // Ancho completo
      
      // Chequear si está en el carrito
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const isInCart = cart.some(item => item.id === this.id);
  
      // Definir estado inicial visual
      if (isInCart) {
          cartBtn.classList.add("btn-danger");
          cartBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Quitar del carrito';
      } else {
          cartBtn.classList.add("btn-success");
          cartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Agregar';
      }
  
      // Deshabilitar si no hay stock
      let isInactive = typeof this.isActive !== "undefined" && !this.isActive;
      if (this.stock <= 0 || isInactive) {
        cartBtn.disabled = true;
        cartBtn.classList.remove("btn-success", "btn-danger");
        cartBtn.classList.add("btn-secondary");
        cartBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Sin stock';
      }
  
      // Evento Click con Toggle
      cartBtn.onclick = () => {
        if (cartBtn.disabled) return;
  
        // Volver a leer el carrito actual
        let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existsIndex = currentCart.findIndex(item => item.id === this.id);
  
        if (existsIndex !== -1) {
            // SI YA EXISTE -> BORRAR (Lógica de toggle)
            currentCart.splice(existsIndex, 1);
            localStorage.setItem('cart', JSON.stringify(currentCart));
            
            // Cambiar botón visualmente a "Agregar"
            cartBtn.classList.remove("btn-danger");
            cartBtn.classList.add("btn-success");
            cartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Agregar';
            
            showNotification("Producto eliminado del carrito", "warning");
        } else {
            // SI NO EXISTE -> AGREGAR
            // Usamos la función global addToCart o lo hacemos manual aquí para controlar el toggle
            // (Hacemos manual para asegurar que funcione el toggle visual inmediatamente)
            currentCart.push({
                id: this.id,
                name: this.name,
                price: this.price,
                image: this.image,
                quantity: 1
            });
            localStorage.setItem('cart', JSON.stringify(currentCart));
  
            // Cambiar botón visualmente a "Quitar"
            cartBtn.classList.remove("btn-success");
            cartBtn.classList.add("btn-danger");
            cartBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Quitar del carrito';
            
            showNotification("Producto agregado al carrito", "success");
        }
        
        // Actualizar el círculo de notificación si existe la función
        if(typeof updateCartCircle === 'function') updateCartCircle();
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