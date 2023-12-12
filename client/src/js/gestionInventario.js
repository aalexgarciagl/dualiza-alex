import { actualizarCantidad, obtenerComponentes } from "./http-inventario.js";

const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const datosComponente = document.getElementById('datosComponente')
const tabla = document.getElementById('tabla')
const nombre = document.getElementById('nombre')
const cantidad = document.getElementById('cantidad')
const modificarComponente = document.getElementById('modificarComponente')
const mssgDatos = document.getElementById('mssgDatos')

var componentes = [] 
var componenteSeleccionado = {
    nombre: '',
    cantidad: ''
}

init()

function init() {    
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto
    mostrarNav()
    comprobarLogin()
    ocultarElementos()
    rellenarTablaComponentes()
}

function mostrarNav() {
    if (usuario.abilitie == "Y2xhc2lmaWNhZG9y") {
        panelAdmin.style.display = 'none'
    }else {
        panelClasi.style.display = 'none'
    }
}

function comprobarLogin() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != "YWRtaW4=" && usuario.abilitie != "Y2xhc2lmaWNhZG9y") {
        window.location.href = 'index.html'; 
        window.location.href = 'index.html';
    }
}

function ocultarElementos() {    
    datosComponente.style.display = 'none'
}

async function rellenarTablaComponentes() {
    componentes = []
    componentes = await obtenerTodosComponentes(usuario.token)    
    // https://www.w3schools.com/jsref/met_table_insertrow.asp
    componentes.forEach(componente => {
        let row = tabla.insertRow();
        let nombre = row.insertCell();
        let cantidad = row.insertCell();  
        let info = row.insertCell();     
        nombre.innerHTML = componente.nombre_componente;
        cantidad.innerHTML = componente.cantidad;     
        info.innerHTML = `
                            <button id="infoComponente" class="btn custom-button">Info</button>
                        `   
        
    });
}

async function obtenerTodosComponentes(token) {
    var data = await obtenerComponentes(token)
    if (data === undefined) {
        sessionStorage.clear()
        window.location.href = 'index.html'
    }   
    return meterComponente(data)
}

function meterComponente(data) {
    data.componentes.forEach(componente => {
        componentes.push(componente)
    });    
    return componentes
}


function acutalizarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
    rellenarTablaComponentes();
}

async function mostrarDatosComponente() {     
    datosComponente.style.display = 'block'
    nombre.value = componenteSeleccionado.nombre
    cantidad.value = componenteSeleccionado.cantidad   
}

function declararComponenteSeleccionado(row) {
    componenteSeleccionado = {
        nombre: row.parentNode.cells[0].innerText,
        cantidad: row.parentNode.cells[1].innerText
    }
}

async function peticionUpdate(json, token) {
    let data = await actualizarCantidad(token, json)
    return data;
}

tabla.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON' && event.target.id === 'infoComponente') {        
        let row = event.target.parentNode;
        declararComponenteSeleccionado(row)
        mostrarDatosComponente()
    }
});


modificarComponente.addEventListener('click', async function () {
    const json = {
        nombre: nombre.value,
        cantidad: cantidad.value
    }
    const data = await peticionUpdate(JSON.stringify(json),usuario.token)

    if (data.success) {
        mssgDatos.style.color = 'orange'
        mssgDatos.textContent = 'Cantidad modificada'
        setTimeout(() => {
            mssgDatos.textContent = '';
        }, 9000);
        acutalizarTabla()
    } else {
        mssgDatos.style.color = 'orange'
        mssgDatos.textContent = 'Error al modificar cantidad'
        setTimeout(() => {
            mssgDatos.textContent = '';
        }, 9000);
    }
    

});