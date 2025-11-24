let cart = []; // Array que almacenará los productos en el carrito

export function addToCart(product) {
    // Si el porudcto ya está en el carrito, aumentar la cantidad
    const existing = cart.find(item => item.id === product.id);
    if(existing) {
        // Verificar stock antes de aumentar cantidad
        if(existing.quantity >= product.stock) {
            showNotification('Not enough stock available', 'error');
            return;
        }
        existing.quantity++;
    } else {
        // Si no está, agregarlo con cantidad 1
        cart.push({...product, quantity: 1});
    }
}

export function getCart() {
    return cart;
}

export function clearCart() {
    cart = [];
}