// Confiuracion de la aplicacion frontend
const APP_CONFIG = {
    CUSTOMER_NAME_KEY: 'gaming-customer-name',
    PRODUCTS_PAGE: './product.html'
};

// Inicializacion de la aplicacion
document.addEventListener('DOMContentLoaded', function(){
    console.log('Gaming Frontend App Initialized');

    //Cargar temas
    loadSavedTheme();
    setupThemeToggle();

    //Configuro el formulario
    setupCustomerForm();

    // Verifico si hay un nombre guardado
    checkExistingCustomer();

    // Configuro efectos
    setupEffects();

    console.log('All setup complete.');
});

// Configuracion del formulario de cliente
function setupCustomerForm(){
    const form = document.getElementById('customer-form');
    const nameInput = document.getElementById('customer-name');
    const
};