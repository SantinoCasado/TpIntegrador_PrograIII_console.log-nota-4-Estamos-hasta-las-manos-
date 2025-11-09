function validateCustomerName(name){
    //Verifico que no este vacio
    if(!name || name.trim().length === 0){
        return {isValid: false, message: "Name cannot be empty."};
    }

    // Verifico longitud minima y maxima
    if(name.length < 2){
        return {isValid: false, message: "Name must be at least 2 characters long."};
    }

    if(name.length > 50){
        return {isValid: false, message: "Name cannot exceed 50 characters."};
    }

    // Solo letras, espacios y algunos caracteres especiales
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
    if(!nameRegex.test(name.trim())){
        return {isValid: false, message: "Name contains invalid characters."};
    }

    return {isValid: true, message: ""};
}

// Funciones para manejar mensajes de error
function showError(elementId, message){
    const errorElement = document.getElementById(elementId);
    if(errorElement){
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}
function hideError(elementId){
    const errorElement = document.getElementById(elementId);
    if(errorElement){
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Funciones para habilitar y deshabilitar el boton
function toggleButton(buttonId, enable){
    const button = document.getElementById(buttonId);
    if(button){
        button.disabled = !enable;

        //Cambiar estilo segund estado
        if(enable){
            button.classList.remove('btn-secondary');
            button.classList.add('btn-gaming');
        }else{
            button.classList.remove('btn-gaming');
            button.classList.add('btn-secondary');
        }
    }
}