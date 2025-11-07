const content = document.querySelector('.content-login');
const btnLogin = document.querySelector('.btnLogin');
const iconClose = document.querySelector('.icon-close');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const loginOverlay = document.getElementById('loginOverlay');

registerLink.addEventListener('click', () => {
    content.classList.add('active');
});
loginLink.addEventListener('click', () => {
    content.classList.remove('active');
});

btnLogin.addEventListener('click', () => {
    loginOverlay.classList.add('active');
    content.classList.add('active-login');
});

iconClose.addEventListener('click', () => {
    content.classList.remove('active-login');
    loginOverlay.classList.remove('active');
});

loginOverlay.addEventListener('click', (e) => {
    // Cerrar si se hace clic fuera del formulario
    if (e.target === loginOverlay) {
        content.classList.remove('active-login');
        loginOverlay.classList.remove('active');
    }
});
