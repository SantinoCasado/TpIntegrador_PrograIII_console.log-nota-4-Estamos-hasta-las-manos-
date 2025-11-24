// Verificacion si el localStorage esta disponible
function isLocalStorageAvailable(){
    try{
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    }catch(error){
        console.error('LocalStorage is not available:', error);
        return false;
    }
}

// Muestra de notificaciones
function showNotification(message, type='info', duration=3000){
    // Creacion del elemento de notificacion
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999'; // Asegura que este por encima de otros elementos
    notification.textContent = message;

    // Agregacion del dom
    document.body.appendChild(notification);

    // Remocion despues de un tiempo
    setTimeout(() => {
        notification.remove();
    }, duration);
}

// Formateo de nombre para poder mostrarlo
function formatCustomerName(name){
    if(!name) return '';

    return name
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizo la primera letra
        .join(' ');
}

// Verifico si la pagina es para celular
function isMobileDevice(){
    return window.innerWidth <= 768;
}

// Scroll suave hacia un elemento
function smoothScrollTo(elementId){
    const element = document.getElementById(elementId);
    if(element){
        element.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'
        });
    }
}

//export { showNotification };