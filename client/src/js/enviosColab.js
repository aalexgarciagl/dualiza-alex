import { obtenerTodosEstados } from './http-estadosEntrega.js'
import { obtenerLotes, cancelarEnvioColaborador } from './http-lotes.js'

var usuario = JSON.parse(sessionStorage.getItem('usuario'));
const tabla = document.getElementById('tabla')

init()


function init(){
    comprobarLogin()
    rellenarTablaLotes()
    const profileIconImg = document.getElementById('profileIconImg')
    const profileIconImg2 = document.getElementById('profileIconImg2')
    profileIconImg.src = usuario.foto
    profileIconImg2.src = usuario.foto
    profileIconImg2.style.width = "150px"

}

function comprobarLogin() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != 'Y29sYWJvcmFkb3I=') {
        window.location.href = 'index.html';
    }
}

async function rellenarTablaLotes() {
    var data = await obtenerLotes(usuario.id, usuario.token)
    var estados = await obtenerEstados()
    // https://www.w3schools.com/jsref/met_table_insertrow.asp
    data.lotes.forEach(lote => {
        let row = tabla.insertRow();
        let cod_envio = row.insertCell();
        let latitud = row.insertCell();
        let longitud = row.insertCell();
        let estado = row.insertCell();
        let fecha = row.insertCell();
        let cancelar_envio = row.insertCell();
        cod_envio.innerHTML = lote.id;
        latitud.innerHTML = lote.latitud;
        longitud.innerHTML = lote.longitud;
        estados.forEach(estado => {  
            if (estado.id == lote.estado) {
                lote.estado = estado.nombre.charAt(0).toUpperCase() + estado.nombre.slice(1);
            }
        })
        estado.innerHTML = lote.estado;
        fecha.innerHTML = new Date(lote.created_at).toLocaleDateString();
        switch (lote.estado) {
            case 'Enviado':
                cancelar_envio.innerHTML = '<button class="btn custom-button">Cancelar</button>';
                break;
            case 'Clasificado':
                cancelar_envio.innerHTML = '<img src="../assets/clasificado.png" alt="">';
                break;
            case 'Cancelado':
                cancelar_envio.innerHTML = '<img src="../assets/cancelado.png" alt="">';
                break;
            case 'Recibido':
                cancelar_envio.innerHTML = '<img src="../assets/recibido.png" alt="">';
                break;
            default:
                break;
        } 
    });
}

async function cancelarEnvio(id_estado, id_usuario, token) { 
    let data = await cancelarEnvioColaborador("cancelado", id_estado, id_usuario, token);
    if (data.success) {
        return true
    }
}

async function obtenerEstados() {
    var data = await obtenerTodosEstados()
    if (data.success) {
        return meterEstados(data.estados)
    }
}

function meterEstados(data) { 
    var estados = []
    data.forEach(function (estado) { 
        let e = {
            "id" : estado.id,
            "nombre" : estado.nombre
        }
        estados.push(e);
    });
    return estados
}

tabla.addEventListener('click', function(event) {

    if (event.target.tagName === 'BUTTON') {
        let row = event.target.closest('tr');
        let id_estado = row.cells[0].innerText;
        let estado = row.cells[3];
        let cancelar_envio = row.cells[5];
        if (estado.innerHTML == 'Enviado') {
            const data = cancelarEnvio(id_estado, usuario.id, usuario.token)
            if (data) {
                cancelar_envio.innerHTML = '<img src="../assets/cancelado.png" alt="">';
                estado.innerHTML = "Cancelado"
            }
        }
}});
