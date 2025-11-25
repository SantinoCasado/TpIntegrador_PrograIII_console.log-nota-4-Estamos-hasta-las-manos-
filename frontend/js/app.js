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

    //Configuro el formulario solo si existe en la página
    if(document.getElementById('customer-form')){
        setupCustomerForm();
    }

    // Configuro efectos
    setupEffects();

    setupAdminMode();

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

/* ================= DESBLOQUEAR EL MODO ADMIN EN LA APLIACION ================= */
function setupAdminMode(){
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    let userInput = [];

    document.addEventListener('keydown', function(event){
        //Agrego la tecla presionada
        userInput.push(event.code);

        // Mantener solo las ultimas 10 teclas para evitar overflow
        if(userInput.length > konamiCode.length){
            userInput.shift();  // Elimino la primera tecla
        }

        // Verifico si el usuario ingreso el codigo correcto
        if(userInput.length === konamiCode.length){
            const isKonamiCode = userInput.every((key, index) => key === konamiCode[index]);
            if(isKonamiCode){
                showAdminButton();
                userInput = []; // Reseteo el input del usuario
            }
        }
    });
};

// Funcion para mostrar el boton de admin
function showAdminButton(){
    const adminButton = document.getElementById('admin-btn');
    if(adminButton){
        // Remuevo la clase d-none
        adminButton.classList.remove('d-none');

        //hacer visible el boton
        adminButton.style.display = 'block';
        adminButton.style.opacity = '0';
        adminButton.style.transform = 'scale(0.5)';

        // Animacion de aparicion
        setTimeout(() => {
            adminButton.style.transition = 'all 0.5s ease';
            adminButton.style.opacity = '1';
            adminButton.style.transform = 'scale(1)';
        }, 100)

        // Mostrar notificacion
        if(typeof showNotification === 'function'){
            showNotification('Admin Mode Enabled!', 'success');
        }
    }
}