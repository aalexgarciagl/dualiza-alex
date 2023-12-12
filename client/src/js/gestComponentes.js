import { getComponentesAdmitidos, eliminarComponente, anadirComponente, modificarComponente } from './http-componentes.js'

const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const tablaComponentes = document.getElementById('tablaComponentes')
const mssg = document.getElementById('mssg')
const botonInsertarComponente = document.getElementById('botonInsertarComponente')
const datosComponente = document.getElementById('datosComponente')
const datosInsertar = document.getElementById('datosInsertar')
const addComponente = document.getElementById('addComponente')
const nombreInsert = document.getElementById('nombreInsert')
const errorNombre = document.getElementById('errorNombre')
const hardwareInsert = document.getElementById('hardwareInsert')
const nombreDatos = document.getElementById('nombreDatos')
const botonModificarComponente = document.getElementById('botonModificarComponente')
const mensajeErorr = document.getElementById('mensajeErorr')
const panelAdmin = document.getElementById('panelAdmin')
const panelClasi = document.getElementById('panelClasi')
var idSeleccionado

var componentes = []

init() 

function init() {
    comprobarLogin()
    mostrarNav()
    rellenarTabla()
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto
}

function comprobarLogin() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != "YWRtaW4=" && usuario.abilitie != "Y2xhc2lmaWNhZG9y") {
        window.location.href = 'index.html'; 
    }
}

function mostrarNav() {
    if (usuario.abilitie == "Y2xhc2lmaWNhZG9y") {
        panelAdmin.style.display = 'none'
    }else {
        panelClasi.style.display = 'none'
    }
}


function mostrarDatosInputs(row) { 
    nombreDatos.value = row.parentNode.cells[0].innerText
    hardwareInsert.value = row.parentNode.cells[1].innerText
    componentes.forEach(function (componente) {
        if (componente.nombre === nombreDatos.value) {
            idSeleccionado = componente.id;
        }
    })
}


function acutalizarTabla() {
    while (tablaComponentes.rows.length > 1) {
        tablaComponentes.deleteRow(1);
    }
    rellenarTabla();
}

async function rellenarTabla() {
    componentes = []
    componentes = await obtenerComponentes(usuario.token) 
    componentes.forEach( function(componente) {
        let row = tablaComponentes.insertRow();
        let nombre = row.insertCell();
        let hardware = row.insertCell();
        let eliminar = row.insertCell();
        let info = row.insertCell();
        nombre.innerHTML = componente.nombre
        if (componente.hardware)  {
            hardware.innerHTML = 'Si'
        }else {
            hardware.innerHTML = 'No'
        }
        eliminar.innerHTML = `
                                <button id="eliminarBotonTabla" class="btn custom-button">Eliminar</button>
                            `
        info.innerHTML = `
                            <button id="infoBotonTabla" class="btn custom-button">Info</button>
                        `
    })
}

async function obtenerComponentes(token) {
    let data = await getComponentesAdmitidos(usuario.token)
    return data.componentes
}



function anadirFilaTablaComponentes(nombre, hardware) { 
    let row = tablaComponentes.insertRow();
        row.insertCell().innerHTML = nombre;
        if (hardware) {
            row.insertCell().innerHTML = 'Si';
        }else {
            row.insertCell().innerHTML = 'No';
        }
        row.insertCell().innerHTML = `
                <button id="eliminarBotonTabla" class="btn custom-button">Eliminar</button>
            `;
        row.insertCell().innerHTML = `
                <button id="infoBotonTabla" class="btn custom-button">Info</button>
            `;
}


function declararComponenteSeleccionado (row) { 
    let nombre = row.parentNode.cells[0].innerText
    let id
    componentes.forEach(function (componente) {
        if (componente.nombre === nombre) {
            id = componente.id;
        }
    })
    return id
}

botonInsertarComponente.addEventListener('click', function () {
    datosComponente.style.display = 'none'
    datosInsertar.style.display = 'block'
    
})

addComponente.addEventListener('click', async function () {
    if (nombreInsert.value == '') {
        nombreInsert.style.borderBottom = '5px solid orange'
        errorNombre.style.color = 'orange'
        errorNombre.textContent = 'Debe introducir un nombre válido'
    }else {
        nombreInsert.style.borderBottom = '0px'
        errorNombre.textContent = ''
        let nombreComponente = nombreInsert.value
        
        if (hardwareInsert.value === 'si') {
            var hardwareComponente = true
        }else {
            var hardwareComponente = false
        }

        let jsonComponente = JSON.stringify({
            'nombre' : nombreComponente,
            'hardware' : hardwareComponente
        })
        let data = await anadirComponente(jsonComponente ,usuario.token)
        if (data.success) {
            componentes = await obtenerComponentes(usuario.token)
            anadirFilaTablaComponentes(nombreComponente, hardwareComponente)
            datosInsertar.style.display = 'none'
        }
    }

})


tablaComponentes.addEventListener('click', async function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.id === 'eliminarBotonTabla') {
        let row = event.target.parentNode;
        let idComponente = declararComponenteSeleccionado(row)
        let data = await eliminarComponente(idComponente, usuario.token)
        if (data.success) {
            componentes = componentes.filter(componente => componente.id !== idComponente);
            let filaEliminar = event.target.parentNode.parentNode;
            filaEliminar.parentNode.removeChild(filaEliminar);
            mssg.style.color = 'orange'
            mssg.textContent = 'Componente eliminado'
            setTimeout(() => {
                mssg.textContent = '';
            }, 4000);
        }
    }

    if (event.target.tagName === 'BUTTON' && event.target.id === 'infoBotonTabla') {
        let row = event.target.parentNode;
        datosInsertar.style.display = 'none';
        datosComponente.style.display = 'block';
        mostrarDatosInputs(row)
        

    }
});

botonModificarComponente.addEventListener("click", async function() {
    
    if (nombreDatos.value === '') {
        nombreInsert.style.borderBottom = '5px solid orange'
        mensajeErorr.textContent = 'Debe introducir un nombre válido'
    }else {
        let h = true

        if (hardwareInsert.value === 'Si') {
            h = true
        }else if (hardwareInsert.value === 'No') {
            h = false
        }

        var json = {
            "nombre": nombreDatos.value,
            "hardware": h
        }
        let data = await modificarComponente(JSON.stringify(json), usuario.token, idSeleccionado)
        if (data.success ) {
            acutalizarTabla()
        }
    }

})
