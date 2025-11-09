const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
}

const STORAGE_KEY = 'gaming-theme';

// Cargo el tema guardado
function loadSavedTheme(){
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const theme = savedTheme || THEMES.DARK // Por defecto dark

    applyTheme(theme);
    updateThemeButton(theme);
}

// Funcion de aplicar tema
function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);

    //Cambio de algun estilo en especifico
    const body = document.body;
    if(theme === THEMES.DARK){
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }
}

//Funcion que CAMBIA el tema
function toggleTheme(){
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    applyTheme(newTheme);
    updateThemeButton(newTheme);
    savedTheme(newTheme);
}

// Actualizaciomn del TEXTO del boton
function updateThemeButton(theme){
    const button = document.getElementById('theme-toggle');
    if(!button) return;

    const icon = button.querySelector('i');
    const text = button.querySelector('span');

    if(theme === THEMES.DARK){
        if(icon) icon.className = 'fas fa-sun';
        if(text) text.textContent = 'Light Mode';
    }else{
        if(icon) icon.className = 'fas fa-moon';
        if(text) text.textContent = 'Dark Theme';
    }
}

// Funcion que GUARDA el tema en localStorage para recuperarlo despues
function savedTheme(theme){
    localStorage.setItem(STORAGE_KEY, theme);
}

// Eveneto del boton
function setupThemeToggle(){
    const button = document.getElementById('theme-toggle');
    if(button){
        button.addEventListener('click', toggleTheme);
    }
}