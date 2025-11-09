const CONFIG = {
    //URL del backend
    API_BASE_URL : 'http://localhost:3000/api',

    //URL del administrador
    ADMIN_URL : 'http://localhost:3000/admin/login',

    // Configuracion de paginacion
    ITEMS_PER_PAGE : 6,
    // Temas disponibles
    THEMES : {
        LIGHT: 'light',
        DARK: 'dark',
    },

    // Categorias de productos
    PRODUCT_CATEGORIES : {
        HARDWARE: "hardware",
        SOFTWARE: "software",
    },

    // Nombres para las cotegorias en el UI
    CATEGORY_NAMES : {
        hardware: "Hardware zone",
        software: "Software zone",
    },

    // Claves para el almacenamiento local
    LOCAL_STORAGE_KEYS : {
        CUSTOMER_NAME: 'customerName',  //Nombre del cliente
        CART: "shoppingCart",           //Carrito de compras
        THEME: "selectedTheme",         //Tema seleccionado
        CURRENT_PAGE: "currentPage",    //Página actual
    },

    //Configuracion de la simulacion de empresa
    COMPANY : {
        NAME: 'Gaming',
        LOGO: './assets/img/logo.png',
        FAVICON: './assets/img/favicon.png',
    },

    // Desarrolladores de la app
    DEVELOPERS : {
        STUDENT_1: 'Santino Casado',
        STUDENT_2: 'Thiago Patricio Fernandez Lado',
    },

    // Configuracion para el ticket en PDF
    PDF_CONFIG : {
        FILENAME: 'ticket_compra.pdf',
        MARGIN: 20,
        FORMAT: 'A4'
    }
};

// Hacer que la configuracion sea global
window.CONFIG = CONFIG;