import { getAllLotes, clasificarlote } from "./http-lotes.js";

const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const tablaLotes = document.getElementById('tablaLotes');
var lotes = []

init() 

function init() { 
    mostrarNav()
    comprobarLogin()
    rellenarTablaLotes()
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto
}

function comprobarLogin() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != "YWRtaW4=" && usuario.abilitie != "Y2xhc2lmaWNhZG9y") {
        window.location.href = 'index.html'; 
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

async function rellenarTablaLotes() {
    lotes = await obtenerLotes()
    rellenarCeldas(lotes)
    
}

async function obtenerLotes() {
    let data = await getAllLotes(usuario.token)
    return data.lotes
}

function rellenarCeldas(lotes){
    lotes.forEach(lote => {
        let row = tablaLotes.insertRow()
        row.insertCell().innerHTML = lote.id
        row.insertCell().innerHTML = lote.usuario
        row.insertCell().innerHTML = lote.latitud
        row.insertCell().innerHTML = lote.longitud
        row.insertCell().innerHTML = lote.estado.charAt(0).toUpperCase() + lote.estado.slice(1);
        if (lote.estado === 'clasificado') {
            row.insertCell().innerHTML = '<img src="../assets/clasificado.png" alt="">';
        }else if (lote.estado === 'enviado') {
            row.insertCell().innerHTML = `<button id="botonCancelar" class="btn custom-button">Cancelar</button>
                                          <button id="botonRecibido" class="btn custom-button">Recibido</button>`;
        }else if (lote.estado === 'cancelado') {
            row.insertCell().innerHTML = '<img src="../assets/cancelado.png" alt="">';
        }else if (lote.estado === 'entregado') {
            row.insertCell().innerHTML = '<img src="../assets/recibido.png" alt="">';
        }
    });
}

tablaLotes.addEventListener('click', async function(event) {
    if (event.target.tagName === 'BUTTON' && event.target.id === 'botonCancelar') {
        //Cancela el envio, mandar petion cambiar estado del envio y cambiar la imagen a cancelada
        let selectedRow = event.target.parentNode.parentNode;
        var idLote = selectedRow.cells[0].innerHTML;
        let json = JSON.stringify({
            'estado' :'cancelado'
        })
        let data  = await clasificarlote(json, idLote, usuario.token)
        if (data.success) {
            selectedRow.cells[4].innerHTML = 'Cancelado'
            selectedRow.cells[5].innerHTML ='<img src="../assets/cancelado.png" alt="">';
        }
    }

    if (event.target.tagName === 'BUTTON' && event.target.id === 'botonRecibido') {
        //maraca como recibido el envio, mandar petion cambiar estado del envio y cambiar la imagen a recibido
        let selectedRow = event.target.parentNode.parentNode;
        var idLote = selectedRow.cells[0].innerHTML;
        let json = JSON.stringify({
            'estado' :'entregado'
        })
        let data  = await clasificarlote(json, idLote, usuario.token)
        if (data.success) {
            selectedRow.cells[4].innerHTML = 'Recibido'
            selectedRow.cells[5].innerHTML ='<img src="../assets/recibido.png" alt="">'
        }
    }
})