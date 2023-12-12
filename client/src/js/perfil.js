import { actualizarImagen, enviarImagen } from "./http-images.js"
import { changePassword, obtenerDatosMiUser, updateUser, obtenerRoles, cambiarRolUsuario } from "./http-usuarios.js"
import { logoutAccesos } from "./http-accesos.js"
import { validCorreoElectronico, validDireccion, validDni_cif, validNombre, validPassword } from "./validations.js"
const usuario = JSON.parse(sessionStorage.getItem('usuario'))
const modificarDatosButton = document.getElementById('modificarDatos')
const modificarPasswordButton = document.getElementById('modificarPassword')
const modificarFotoBtn = document.getElementById("modificarFotoBtn")
const admin = document.getElementById("admin")
const colaboradorEnvios = document.getElementById("colaboradorEnvios")
const colaboradorEntrega = document.getElementById("colaboradorEntrega")
const diseñador = document.getElementById("diseñador")
const clasificador = document.getElementById("clasificador")
const cambiarRol = document.getElementById("cambiarRol")
const rolesUsuario = document.getElementById('rolesUsuario')
const logout = document.getElementById('logout')

let fotoselec

init()

function init(){
    rellenarSelector()
    comprobarLogin()
    const profileIconImg2 = document.getElementById('profileIconImg2')
    profileIconImg2.src = usuario.foto
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto    
    ocultarElementos();
    switch (usuario.abilitie) {
        case 'YWRtaW4=':
            mostrarAdmin();
            break;

        case 'Y2xhc2lmaWNhZG9y':
            mostrarClasificador();
            break;

        case 'ZGlzZfFhZG9y':
            mostrarDiseñador();
            break;
        
        case 'Y29sYWJvcmFkb3I=':
            mostrarColaborador();
            break;
        default:
            break;
    }
}

async function rellenarSelector() {
    let data = await obtenerRoles(usuario.id)
    data.data.forEach(rol => {
        if (btoa(rol) !== usuario.abilitie) {
            rolesUsuario.innerHTML += `<option value="${rol}">${rol}</option>`;
        }
    });
}

function mostrarClasificador() { 
    clasificador.style.display = 'block';
}

function mostrarDiseñador() { 
    diseñador.style.display = 'block';
}

function mostrarColaborador() { 
    colaboradorEnvios.style.display = 'block';
    colaboradorEntrega.style.display = 'block';
}

function mostrarAdmin() { 
    admin.style.display = 'block';
}

function ocultarElementos() {
    admin.style.display = 'none';
    colaboradorEnvios.style.display = 'none';
    colaboradorEntrega.style.display = 'none'; 
    diseñador.style.display = 'none';
    clasificador.style.display = 'none';
}

function comprobarLogin() {
    if (!usuario || usuario === '') {
        window.location.href = 'index.html';
    }
}

document.getElementById('fotoInput').addEventListener('change', function (event) {    
    fotoselec = event.target.files[0];
});


modificarFotoBtn.addEventListener('click', () => {  
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    
    if (!fotoselec) {
        alert('Selecciona una imagen antes de modificar');
        return;
    }
    
    const respuesta = seleccImagenar(fotoselec, usuario.id);      
    
    document.getElementById('fotoInput').value = '';
    
    setTimeout(() => {
        location.reload();  
    }, 5000);
});




async function seleccImagenar(image){
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const respuesta = await enviarImagen(image); 
    usuario.foto = respuesta.url
    sessionStorage.setItem('usuario',JSON.stringify(usuario))  
    updateFotoUser(usuario.id) 
    return await respuesta
}

async function updateFotoUser(id){
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const datosJSON = {
        "foto": usuario.foto
    }
    const response = await actualizarImagen(id,datosJSON)
}

window.addEventListener('DOMContentLoaded', () => {
    rellenarInputs()
})

async function obtenerDatosUser(){
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    return await obtenerDatosMiUser(usuario.id)
}


async function modificarPassword(){    
    const passwordInputNew = document.getElementById("passwordInputNew")
    const labelPasswordInput = document.getElementById('labelPasswordInput')
    const passwordOk = validPassword(passwordInputNew.value)
    if(!passwordOk){
        passwordInputNew.style.borderBottom = "5px solid orange"
        labelPasswordInput.innerHTML = ''
    }else{
        const datosJSON = {
            "newPassword": btoa(passwordInputNew.value)
        } 
        await changePassword(usuario.id,datosJSON,usuario.token)
        return passwordOk
    }
    
}


async function rellenarInputs(){
    const datosUser = await obtenerDatosUser()
    const inputNombre = document.getElementById('nombreInput')
    const inputEmail = document.getElementById('emailInput')
    const inputDireccion = document.getElementById('direccionInput')

    inputNombre.value = datosUser.usuario.nombre
    inputEmail.value = datosUser.usuario.email
    inputDireccion.value = datosUser.usuario.direccion
}

async function actualizarDatos(){
    var todoOk = true
    const datosUser = await obtenerDatosUser()
    const inputNombre = document.getElementById('nombreInput')
    const inputEmail = document.getElementById('emailInput')
    const inputDireccion = document.getElementById('direccionInput')    
    
    if(!validNombre(inputNombre.value)){
        inputNombre.style.borderBottom = '5px solid orange'
        todoOk = false
    }
    if(!validCorreoElectronico(inputEmail.value)){
        inputEmail.style.borderBottom = '5px solid orange'
        todoOk = false
    }
    if(!validDireccion(inputDireccion.value)){
        inputDireccion.style.borderBottom = '5px solid orange'
        todoOk = false
    }
    if(todoOk){
        const datosJSON = {
            "nombre": inputNombre.value,
            "email": inputEmail.value,
            "dni_cif": datosUser.usuario.dni_cif,
            "direccion": inputDireccion.value
        }    
       
        await updateUser(usuario.id,datosJSON)
        return todoOk
    }
    
}


modificarFotoBtn.addEventListener('click',() => {  
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    
    if (!fotoselec) {
        alert('Selecciona una imagen antes de modificar');
        return;
    }  
    
    const respuesta = seleccImagenar(fotoselec, usuario.id);      
    document.getElementById('fotoInput').value = '';
})

modificarDatosButton.addEventListener('click', async () => {
    const todoOk = await actualizarDatos()
    if(todoOk){
        window.location.reload()
    }    
})

modificarPasswordButton.addEventListener('click', async () => {
    const passwordInputNew = document.getElementById("passwordInputNew")
    const labelPasswordInput = document.getElementById('labelPasswordInput')
    const passwordOk = await modificarPassword()
    if(passwordOk){
        labelPasswordInput.style.display = "" 
        passwordInputNew.style.borderBottom = '5px solid green'    
        labelPasswordInput.innerHTML = 'Contraseña actualizada.'  
        labelPasswordInput.style.color = 'green' 
        passwordInputNew.value = ""
    }
})

cambiarRol.addEventListener('click', async function() {
    const datosJSON = JSON.stringify({
        "rol": rolesUsuario.value
    })
    let data = await cambiarRolUsuario(usuario.id, datosJSON, usuario.token)

    usuario.token = data.data.token
    usuario.abilitie = btoa(rolesUsuario.value)
    sessionStorage.setItem('usuario', JSON.stringify(usuario))
    window.location.href = 'perfil.html'
})

logout.addEventListener('click', async function() { 
    let data = await logoutAccesos(usuario.id);
    sessionStorage.clear()
    window.location.href = 'index.html'
});