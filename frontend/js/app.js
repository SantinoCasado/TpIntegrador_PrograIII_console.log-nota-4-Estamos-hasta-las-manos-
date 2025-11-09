// Confiuracion de la aplicacion frontend
const APP_CONFIG = {
    CUSTOMER_NAME_KEY: 'gaming-customer-name',
    THEME_KEY: 'gaming-theme',
    PRODUCTS_PAGE: 'products.html'
};

const COMPANY_NAME = 'Gaming';

// Inicializacion de la aplicacion
document.addEventListener('DOMContentLoaded', function(){
    console.log('Gaming Frontend App Initialized');

    //Cargar temas
    loadSavedTheme();
    setupThemeToggle();

    //Configuro el formulario
    setupCustomerForm();

    // Configuro efectos
    setupEffects();

    console.log('All setup complete.');
});

/* ========================== FUNCIONES GLOBALES ==============================*/
// Efectos visuales
function setupEffects(){
    // Efecto hover en logo
    const logo = document.getElementById('logo-img');
    if(logo){
        logo.addEventListener('mouseenter', function(){
            logo.style.transform = 'scale(1.1) rotate(5deg)';
        });

        logo.addEventListener('mouseleave', function(){
            logo.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    //Efecto de las cards
    const cards = document.querySelectorAll('.gaming-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(){
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 16px rgba(139, 0, 255, 0.3)';
        });
            
        card.addEventListener('mouseleave', function(){
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
        });
    });
}

/* ========================== CONFIGURACION DEL index.html ==============================*/ 
// Configuracion del formulario de cliente
function setupCustomerForm(){
    const form = document.getElementById('customer-form');
    const nameInput = document.getElementById('customer-name');
    const continueButton = document.getElementById('continue-btn');

    if(!form || !nameInput || !continueButton){
        console.error('Customer form elements not found.');
        return;
    }

    //Valido en tiempo real
    nameInput.addEventListener('input', function(){
        const name = nameInput.value.trim();
        const validation = validateCustomerName(name);

        if(validation.isValid){
            hideError('name-error');
            toggleButton('continue-btn', true);
        }else{
            if (name.length > 0){
                showError('name-error', validation.message);
            }
            toggleButton('continue-btn', false);
        }
    });

    // Manejo del envio del formulario
    form.addEventListener('submit', function(event){
        event.preventDefault();

        const name = nameInput.value.trim();
        const validation = validateCustomerName(name);

        if (validation.isValid){
            redirectToProductsPage();
        }else{
            showError('name-error', validation.message);
        }
    });

    // Redireccion a la pagina de productos
    function redirectToProductsPage(){
        // animacion de redireccion
        const main = document.querySelector('main');
        if(main){
            main.style.opacity = '0.5';
            main.style.transition = 'opacity 0.5s ease';
        }

        setTimeout(() => {
            window.location.href = APP_CONFIG.PRODUCTS_PAGE;
        }, 300);
    }
};