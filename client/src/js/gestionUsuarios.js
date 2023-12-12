import { obtenerTodosUsuarios, eliminarUsuarioBd, actualizarUsuario, anadirRol, borrarRol, insertarUsuario } from './http-admin.js'
import { obtenerRoles } from "./http-usuarios"
import * as valid from "./validations.js"

const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const datosUsuario = document.getElementById('datosUsuario')
const modificarUsuario = document.getElementById('modificarUsuario')
const tabla = document.getElementById('tabla')
const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const direccion = document.getElementById('direccion')
const dni = document.getElementById('dni')
const mssgDatos = document.getElementById('mssgDatos')
const rolSection = document.getElementById('rolSection')
const rolSectionEliminar = document.getElementById('rolSectionEliminar')
const addRol = document.getElementById('addRol')
const delRol = document.getElementById('delRol')
const datosInsertar = document.getElementById('datosInsertar')
const botonInsertarUsuario = document.getElementById('botonInsertarUsuario')
const addUsuario = document.getElementById('addUsuario')

var usuarios = []
var userSeleccionado = {
    nombre: '',
    email: '',
    direccion: '',
    dni_cif: '',
    created_at: '',
    updated_at: ''
}


init()

function init() {
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto

    comprobarLogin()
    ocultarElementos()
    rellenarTablaUsuarios()
}

function comprobarLogin() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != "YWRtaW4=") {
        window.location.href = 'index.html';
    }
}

function ocultarElementos() {
    datosInsertar.style.display = 'none';
    datosUsuario.style.display = 'none'
}


async function rellenarTablaUsuarios() {
    usuarios = []
    usuarios = await obtenerUsuarios(usuario.token)

    // https://www.w3schools.com/jsref/met_table_insertrow.asp
    usuarios.forEach(usuario => {
        let row = tabla.insertRow();
        let nombre = row.insertCell();
        let email = row.insertCell();
        let direccion = row.insertCell();
        let dni_cif = row.insertCell();
        let created_at = row.insertCell();
        let eliminar = row.insertCell();
        let info = row.insertCell();
        nombre.innerHTML = usuario.nombre;
        email.innerHTML = usuario.email;
        direccion.innerHTML = usuario.direccion;
        dni_cif.innerHTML = usuario.dni_cif;
        created_at.innerHTML = new Date(usuario.created_at).toLocaleDateString();
        eliminar.innerHTML = `
                                <button id="eliminarBotonTabla" class="btn custom-button">Eliminar</button>
                            `
        info.innerHTML = `
                            <button id="infoUsuarios" class="btn custom-button">Info</button>
                        `
    });
}



async function obtenerUsuarios(token) {
    var data = await obtenerTodosUsuarios(token)
    if (data === undefined) {
        sessionStorage.clear()
        window.location.href = 'index.html'
    }
    return meterUsuarios(data)
}

function meterUsuarios(data) {
    data.usuarios.forEach(user => {
        usuarios.push(user)
    });
    return usuarios
}

//muestra la informacion de los datos del usuario seleccionado en la card para realizar acciones sobre ese usuario
async function mostrarDatosUsuarios() {
    rolSection.innerHTML = '';
    rolSectionEliminar.innerHTML = '';

    if (userSeleccionado.dni_cif != 'DNI/CIF') {
        datosUsuario.style.display = 'block'
        nombre.value = userSeleccionado.nombre
        email.value = userSeleccionado.email
        direccion.value = userSeleccionado.direccion
        dni.value = userSeleccionado.dni_cif
        mostrarSectionAddRol()
        mostrarSectionDelRol()
    }
}

//muestra los roles QUE TIENE un usuario para eliminar
async function mostrarSectionDelRol() {
    let id = 0
    usuarios.forEach(user => {
        if (user.email === userSeleccionado.email) {
            id = user.id
        }
    });

    let roles = await peticionRolesUsuario(id, usuario.token)
    let rolesDisponibles = ['admin', 'colaborador', 'clasificador', 'diseñador'].filter(role => roles.includes(role));
    rolesDisponibles.forEach(role => {
        let option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        rolSectionEliminar.appendChild(option);
    });
}

//muestra los roles QUE NO TIENE un usuario para añadirselo
async function mostrarSectionAddRol() {
    let id = 0
    usuarios.forEach(user => {
        if (user.email === userSeleccionado.email) {
            id = user.id
        }
    });

    let roles = await peticionRolesUsuario(id, usuario.token)
    let rolesDisponibles = ['admin', 'colaborador', 'clasificador', 'diseñador'].filter(role => !roles.includes(role));
    rolesDisponibles.forEach(role => {
        let option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        rolSection.appendChild(option);
    });
}

async function peticionRolesUsuario(id) {
    let data = await obtenerRoles(id)
    if (data.success) {
        return data.data
    }
}

//asigno variables al usuario seleccionado
function declararUsuarioSeleccionado(row) {
    userSeleccionado = {
        nombre: row.parentNode.cells[0].innerText,
        email: row.parentNode.cells[1].innerText,
        direccion: row.parentNode.cells[2].innerText,
        dni_cif: row.parentNode.cells[3].innerText,
        created_at: row.parentNode.cells[4].innerText,
        updated_at: row.parentNode.cells[5].innerText
    }
}

async function eliminarUser(token, id) {
    let data = await eliminarUsuarioBd(token, id);
    if (data.message === 'Usuario eliminado correctamente.') {
        return true
    } else {
        return false
    }
}

function acutalizarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
    rellenarTablaUsuarios();
}

async function peticionUpdate(bodyJson, token, idUsuarioSeleccionado) {
    let data = await actualizarUsuario(bodyJson, token, idUsuarioSeleccionado)
    return data;
}

function comprobarDatoModificar(n, e, d, dir) {
    let todoOk = true
    if (valid.validCorreoElectronico(e)) {
        email.style.borderBottom = ''
    } else {
        email.style.borderBottom = '5px solid orange'
        todoOk = false
    }

    if (valid.validDireccion(dir)) {
        direccion.style.borderBottom = ''
    } else {
        direccion.style.borderBottom = '5px solid orange'
        todoOk = false
    }

    if (valid.validDni_cif(d)) {
        dni.style.borderBottom = ''
    } else {
        dni.style.borderBottom = '5px solid orange'
        todoOk = false
    }

    if (valid.validNombre(n)) {
        nombre.style.borderBottom = ''
    } else {
        nombre.style.borderBottom = '5px solid orange'
        todoOk = false
    }
    return todoOk
}

delRol.addEventListener('click', async function () {
    const bodyJson = JSON.stringify({
        "rol": rolSectionEliminar.value
    });
    let id = 0

    usuarios.forEach(user => {
        if (user.email === userSeleccionado.email) {
            id = user.id
        }
    });

    let data = await borrarRol(bodyJson, id, usuario.token);
    if (data.success) {
        datosUsuario.style.display = 'none';
        rolSection.innerHTML = '';
        mssgDatos.style.color = 'orange'
        mssgDatos.textContent = 'Rol eliminado'
        setTimeout(() => {
            mssgDatos.textContent = '';
        }, 9000);
    }
})

//recoge el rol que desea introducir y lo introduce al usuario
addRol.addEventListener('click', async function () {
    const bodyJson = JSON.stringify({
        "rol": rolSection.value
    });
    let id = 0

    usuarios.forEach(user => {
        if (user.email === userSeleccionado.email) {
            id = user.id
        }
    });

    let data = await anadirRol(bodyJson, id, usuario.token);
    if (data.success) {
        datosUsuario.style.display = 'none';
        rolSection.innerHTML = '';
        mssgDatos.style.color = 'orange'
        mssgDatos.textContent = 'Rol añadido'
        setTimeout(() => {
            mssgDatos.textContent = '';
        }, 9000);
    }
});

///modificar datos de un usuario
modificarUsuario.addEventListener('click', async function () {
    let idUsuarioSeleccionado = 0

    usuarios.forEach(user => {
        if (user.email === userSeleccionado.email) {
            idUsuarioSeleccionado = user.id
        }
    });

    let datosCorrectos = comprobarDatoModificar(nombre.value, email.value, dni.value, direccion.value)

    if (datosCorrectos) {
        const bodyJson = JSON.stringify({
            "nombre": nombre.value,
            "email": email.value,
            "dni_cif": dni.value,
            "direccion": direccion.value
        });
        let data = await peticionUpdate(bodyJson, usuario.token, idUsuarioSeleccionado)
        console.log(data)
        if (data.success) {
            mssgDatos.style.color = 'orange'
            mssgDatos.textContent = 'Usuario modificado'
            setTimeout(() => {
                mssgDatos.textContent = '';
            }, 9000);
            acutalizarTabla()
        } else {
            mssgDatos.style.color = 'orange'
            mssgDatos.textContent = 'Error al modificar usuario'
            setTimeout(() => {
                mssgDatos.textContent = '';
            }, 9000);
        }
    }

});

botonInsertarUsuario.addEventListener('click', function () {
    datosUsuario.style.display = 'none';
    datosInsertar.style.display = 'block';
})

addUsuario.addEventListener('click', async function () {

    let todoOk = comprobarDatoInsertar(document.getElementById('nombreInsert').value, document.getElementById('emailInsert').value, document.getElementById('passwordInsert').value, document.getElementById('direccionInsert').value, document.getElementById('dniInsert').value) //
    if (todoOk) {
        let usuarioInsertar = JSON.stringify({
            nombre: document.getElementById('nombreInsert').value,
            email: document.getElementById('emailInsert').value,
            password: document.getElementById('passwordInsert').value,
            direccion: document.getElementById('direccionInsert').value,
            dni_cif: document.getElementById('dniInsert').value
        })
        let data = await insertarUsuario(usuarioInsertar, usuario.token);
        if (data.success) {
            mssgDatos.style.color = 'orange'
            mssgDatos.textContent = 'Usuario insertado correctamente'
            setTimeout(() => {
                mssgDatos.textContent = '';
            }, 9000);
            acutalizarTabla()
        }
    }

})

//Boton de eliminar usuario dentro de la tabla
tabla.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.id === 'eliminarBotonTabla') {
        var confirmacion = confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmacion) {
            let row = event.target.parentNode;
            declararUsuarioSeleccionado(row)
            let id = 0

            usuarios.forEach(user => {
                if (user.email === userSeleccionado.email) {
                    id = user.id
                }
            });
            let data = eliminarUser(usuario.token, id);
            if (data) {
                // Actualiza la tabla sin recargar datos
                let filaEliminar = event.target.parentNode.parentNode;
                filaEliminar.parentNode.removeChild(filaEliminar);
                datosUsuario.style.display = "none"
                datosInsertar.style.display = "none"
                alert("Usuario eliminado correctamente")
            } else {
                alert("Error al eliminar el usuario")
            }
        } else {
            alert("Eliminación cancelada");
        }
    }
});

//muestra info de un usuario
tabla.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.id === 'infoUsuarios') {
        datosInsertar.style.display = 'none';
        let row = event.target.parentNode;
        declararUsuarioSeleccionado(row)
        mostrarDatosUsuarios()
    }
});


function comprobarDatoInsertar(n, e, p, dir, d) {
    let todoOk = true

    if (valid.validPassword(p)) {
        document.getElementById('passwordInsert').style.borderBottom = ''
    } else {
        document.getElementById('passwordInsert').style.borderBottom = '5px solid orange'
        todoOk = false
    }

    if (valid.validCorreoElectronico(e)) {
        document.getElementById('emailInsert').style.borderBottom = ''
    } else {
        document.getElementById('emailInsert').style.borderBottom = '5px solid orange'
        todoOk = false
    }

    if (valid.validDireccion(dir)) {
        document.getElementById('direccionInsert').style.borderBottom = ''
    } else {
        document.getElementById('direccionInsert').style.borderBottom = '5px solid orange'
        todoOk = false
    }

    if (valid.validDni_cif(d)) {
        document.getElementById('dniInsert').style.borderBottom = ''
    } else {
        document.getElementById('dniInsert').style.borderBottom = '5px solid orange'
        todoOk = false
    }

    if (valid.validNombre(n)) {
        document.getElementById('nombreInsert').style.borderBottom = ''
    } else {
        document.getElementById('nombreInsert').style.borderBottom = '5px solid orange'
        todoOk = false
    }
    return todoOk
}
