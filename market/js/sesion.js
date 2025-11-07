let usuarioActual = null;

document.addEventListener('DOMContentLoaded', () => {
    const guardado = localStorage.getItem('usuarioLogueado');
    if (guardado) {
        usuarioActual = guardado;
        actualizarBotonLogin(true);
    }

    const btnLogin = document.querySelector('.btnLogin');
    const iconClose = document.querySelector('.icon-close');
    const overlay = document.getElementById('loginOverlay');

    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');
    const content = document.querySelector('.content-login');

    // animación entre Sesión / Registro
    registerLink.addEventListener('click', () => {
        content.classList.add('active');
    });
    loginLink.addEventListener('click', () => {
        content.classList.remove('active');
    });

    // botón "Sesión"
    btnLogin.addEventListener('click', () => {
        if (usuarioActual) {
            cerrarSesion();
        } else {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // cerrar con X o clic fuera
    iconClose.addEventListener('click', cerrarLogin);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) cerrarLogin();
    });
});

function inicioSesion() {
    const usuario = document.getElementById('usu').value.trim();
    const pass = document.getElementById('pass').value.trim();

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const encontrado = usuarios.find(u => u.usuario === usuario && u.pass === pass);

    if (!encontrado) {
        alert('Usuario o contraseña incorrectos');
        return;
    }

    usuarioActual = usuario;
    localStorage.setItem('usuarioLogueado', usuario);
    cerrarLogin();
    actualizarBotonLogin(true);
    showNotification(`Bienvenido, ${usuario}!`);
}

function registrarUsuario() {
    const usuario = document.getElementById('usuReg').value.trim();
    const pass = document.getElementById('passReg').value.trim();
    const nombre = document.getElementById('nombre').value.trim();

    if (!usuario || !pass || !nombre) {
        alert('Por favor completa todos los campos');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
        alert('Ese usuario ya existe');
        return;
    }

    usuarios.push({ usuario, pass, nombre });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    showNotification('Usuario registrado correctamente');
    document.querySelector('.content-login').classList.remove('active');
}

function cerrarSesion() {
    usuarioActual = null;
    localStorage.removeItem('usuarioLogueado');
    actualizarBotonLogin(false);
    showNotification('Sesión cerrada');
}

function cerrarLogin() {
    const overlay = document.getElementById('loginOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function actualizarBotonLogin(estaLogueado) {
    const btn = document.querySelector('.btnLogin');
    btn.textContent = estaLogueado ? 'Cerrar sesión' : 'Sesión';
}
