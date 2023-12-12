import { Usuario } from './clases.js'
import { loginUsuario } from './http-accesos.js';
import { obtenerRoles } from './http-usuarios.js';
import { obtenerToken } from './http-accesos.js';
import * as validations from './validations.js';

const botonCambiarCuenta = document.getElementById('botonCambiarCuenta');
const botonLogin = document.getElementById('botonLogin');
const inicioSesion = document.getElementById('inicioSesion');
const elegirRol = document.getElementById('elegirRol');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const message = document.getElementById('message');
const messageEmail = document.getElementById('messageEmail');
const messagePassword = document.getElementById('messagePassword');
const colaborador = document.getElementById('botonColaborador');
const clasificador = document.getElementById('botonClasificador');
const admin = document.getElementById('botonAdministrador');
const diseñador = document.getElementById('botonDiseñador');

init()

async function comprobarUsuario() {
    const data = await comprobarCredenciales(inputEmail.value, inputPassword.value);    
    
    if (data && data.success) {

        sessionStorage.clear();

        ocultarElementosLogin();
        mostrarElementosElegirRol()

        guardarStorage('userEmail', data.data.email)
        guardarStorage('userPassword', encriptarBase64(inputPassword.value))

        try {
            const roles = await getRoles(data.data.id)
            roles.data.forEach(rol => {
                if (rol === 'colaborador') {
                    colaborador.style.display = 'block';
                } else if (rol === 'clasificador') {
                    clasificador.style.display = 'block';
                } else if (rol === 'admin') {
                    admin.style.display = 'block';
                } else if (rol === 'diseñador') {
                    diseñador.style.display = 'block';
                }
            });
        } catch (error) {
            console.error(error);
        }

    } else if(data && !data.success) {
        message.style.color = 'orange'
        message.textContent = 'Usuario o contraseña incorrectos'        
    }else{
        window.location.href = '../html/errorServer.html'
    }

    
    

    
}
function encriptarBase64(texto) {
    return btoa(texto);
  }

async function comprobarCredenciales(email, password) {

    const data = await loginUsuario(email, encriptarBase64(password));
    return data
}

async function getRoles(id) {
    const data = await obtenerRoles(id)
    return data;
}

async function getToken(json) {
    const data = await obtenerToken(json)
    return data
}

async function loginCorrecto(abilite) {
    const respuestaJson = JSON.stringify({
        "email": sessionStorage.getItem('userEmail'),
        "password": sessionStorage.getItem('userPassword'),
        "rol": abilite
    });
    sessionStorage.clear()
    const data = await getToken(respuestaJson)
    const usuario = new Usuario(data.user.id, data.data.token, abilite, data.user.foto)
    const usuarioJson = JSON.stringify(usuario)
    sessionStorage.setItem('usuario', usuarioJson)

    window.location.href = 'main.html'
}

function init() {
    const profileIconImg = document.getElementById('profileIconImg')
    // profileIconImg.src = usuario.foto
    if (sessionStorage.getItem('usuario')) {
        window.location.href = 'main.html';
    }
    elegirRol.style.display = 'none';
}

function ocultarElementosLogin() {
    inicioSesion.style.display = 'none';
}

function mostrarElementosElegirRol() {
    elegirRol.style.display = 'block';
    colaborador.style.display = 'none';
    clasificador.style.display = 'none';
    admin.style.display = 'none';
    diseñador.style.display = 'none';
}

function guardarStorage(key, value) {
    sessionStorage.setItem(key, value);
}

function comrobarInputs() {
    let respuesta = true
    if (!validations.validPassword(encriptarBase64(inputPassword.value))) {
        mostrarErrorPswd()
        respuesta = false
    }else{
        messagePassword.textContent = ''
        inputPassword.style.borderBottom = '0px'
    }

    if (!validations.validCorreoElectronico(inputEmail.value)){
        mostrarErrorMail()
        respuesta = false
    }else {
        messageEmail.textContent = ''
        inputEmail.style.borderBottom = '0px'
    }
    return respuesta
}

function mostrarErrorMail() {
    message.textContent = ''
    messageEmail.textContent = 'Intruduce un correo válido'
    messageEmail.style.color = 'orange'
    inputEmail.style.borderBottom = '5px solid orange'
}

function mostrarErrorPswd() {
    message.textContent = ''
    messagePassword.style.color = 'orange'
    messagePassword.textContent = 'Introduce una contraseña válida'
    inputPassword.style.borderBottom = '5px solid orange'
}

botonLogin.addEventListener('click', function () {

    if (comrobarInputs()) {
        inputEmail.style.borderBottom = '0px'
        inputPassword.style.borderBottom = '0px'
        messageEmail.textContent = ''
        messagePassword.textContent = ''
        comprobarUsuario()
    }

});

botonCambiarCuenta.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.reload();
});

admin.addEventListener('click', function () {
    loginCorrecto('admin')
});

colaborador.addEventListener('click', function () {
    loginCorrecto('colaborador')

});

clasificador.addEventListener('click', function () {
    loginCorrecto('clasificador')
});

diseñador.addEventListener('click', function () {
    loginCorrecto('diseñador')
});