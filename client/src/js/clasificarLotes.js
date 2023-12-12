import { lotesEntregados, componentesLote, clasificarlote } from "./http-lotes.js";
import { getComponentesAdmitidos, clasificarComponenteLote } from "./http-componentes.js";

const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const tablaLotes = document.getElementById('tablaLotes');
const tablaLoteEspecifico = document.getElementById('tablaLoteEspecifico');
const tablaComponentes = document.getElementById('tablaComponentes');
const clasificarComponente = document.getElementById('clasificarComponente');
const tablaTodosLotes = document.getElementById('tablaTodosLotes');
const volverBoton = document.getElementById('volverBoton');
const selectorComponentes = document.getElementById('selectorComponentes');
const botonClasificarComponente = document.getElementById('botonClasificarComponente');
const cantidad = document.getElementById('cantidad');
const descripcion = document.getElementById('descripcion');
const mssg = document.getElementById('mssg');
const botonMarcarLoteClasificado = document.getElementById('botonMarcarLoteClasificado');
const profileIconImg = document.getElementById('profileIconImg')
var arrayComponentes = []
var idLote = 0
init()


function init() { 
    comprobarLogin()
    rellenarTabla()
    profileIconImg.src = usuario.foto
}

function comprobarLogin() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != "Y2xhc2lmaWNhZG9y") {
        window.location.href = 'index.html';
    }
}

async function rellenarTabla() {
    
    let lotes = await recibirLotes(usuario.token) 
    
    lotes.lotes.forEach(lote => {
        let row = tablaLotes.insertRow()
        let id_lote = row.insertCell().innerHTML = lote.id
        let remitente = row.insertCell().innerHTML = lote.usuario
        let fecha = row.insertCell().innerHTML = new Date(lote.fecha).toLocaleDateString();
        let accion = row.insertCell().innerHTML = `<img id="botonClasificar" src="../assets/clasificar.png"></img>`
    });
}



async function rellenarSelector() {
    selectorComponentes.innerHTML = '';
    let componentesAdmitidos = await getComponentesAdmitidos(usuario.token);

    componentesAdmitidos.componentes.forEach( componente => {
        if (!arrayComponentes.includes(componente.nombre)) {
            let option = document.createElement('option');
                option.value = componente.nombre;
                option.text = componente.nombre;
                selectorComponentes.appendChild(option);
        }
    })
}

function mostrarTablaLoteUnico(idLote, remitente) { 
    tablaTodosLotes.style.display = 'none';
    clasificarComponente.style.display = 'block';
    let row = tablaLoteEspecifico.insertRow()
    row.insertCell().innerHTML = idLote
    row.insertCell().innerHTML = remitente
}

async function mostrarTablaComponentes(idLote) {
    let componentes = await componentesLote(idLote,usuario.token)
    arrayComponentes = []
    componentes[0].forEach(componente => {
        let row = tablaComponentes.insertRow()
        let nombre = row.insertCell().innerHTML = componente.componente
        let cantidad = row.insertCell().innerHTML = componente.cantidad
        let descripcion = row.insertCell().innerHTML = componente.descripcion
        arrayComponentes.push(componente.componente)
    });

}

async function recibirLotes(token) { 
    let data = await lotesEntregados(token)
    if (data.success) {
        return data
    }
}

function comprobarInputs() {

    let todoOk = true
    if ((isNaN(cantidad.value) || cantidad.value <= 0 || cantidad.value == '')  &&  descripcion.value.length < 5) {
        descripcion.style.borderBottom = '5px solid orange';
        cantidad.style.borderBottom = '5px solid orange';
        mssg.style.color = 'orange'
        mssg.textContent = 'Debe introducir una cantidad y una descripción válida'
        return false
    }else {
        descripcion.style.borderBottom = '0px';
        cantidad.style.borderBottom = '0px';
        mssg.textContent = ''
    }
    
    if (isNaN(cantidad.value) || cantidad.value <= 0) {
        mssg.style.color = 'orange'
        mssg.textContent = 'El campo cantidad debe ser un número y mayor que 0'
        cantidad.style.borderBottom = '5px solid orange';
        return false
    }else {
        mssg.textContent = ''
        cantidad.style.borderBottom = '0px';
    }
    
    if (descripcion.value.length < 5) {
        mssg.style.color = 'orange'
        mssg.textContent = 'Tiene que tener una descripción de al menos 5 caracteres'
        descripcion.style.borderBottom = '5px solid orange';
        return false
    }else {
        mssg.textContent = ''
        descripcion.style.borderBottom = '0px';
    }

    return todoOk
}

tablaLotes.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') { 
        const selectedRow = e.target.parentNode.parentNode;
        idLote = selectedRow.cells[0].innerHTML;
        const remitente = selectedRow.cells[1].innerHTML;
        mostrarTablaLoteUnico(idLote, remitente)
        mostrarTablaComponentes(idLote)
        rellenarSelector()
    }

})

volverBoton.addEventListener('click', function() {
    while (tablaLoteEspecifico.rows.length > 1) {
        tablaLoteEspecifico.deleteRow(1);
    }
    while (tablaComponentes.rows.length > 1) {
        tablaComponentes.deleteRow(1);
    }
    tablaTodosLotes.style.display = 'block';
    clasificarComponente.style.display = 'none';
})

botonClasificarComponente.addEventListener('click', async function() { 
    let inputCorrectos = comprobarInputs()

    if (inputCorrectos) {
        let jsonComponente = JSON.stringify({
            "componente": selectorComponentes.value,
            "cantidad" : cantidad.value,
            "descripcion" : descripcion.value
        })
        let data = await clasificarComponenteLote(jsonComponente, usuario.token, idLote)
        let row = tablaComponentes.insertRow()
        let opcionSelector = selectorComponentes.value
        row.insertCell().innerHTML = opcionSelector
        row.insertCell().innerHTML = cantidad.value
        row.insertCell().innerHTML = descripcion.value
        let options = Array.from(selectorComponentes.options)
        options.forEach(option => {
            if (option.value === opcionSelector) {
                option.remove()
            }
        })
        cantidad.value = ''
        descripcion.value = ''
    }

    
})

botonMarcarLoteClasificado.addEventListener('click', async function() {
    let json = JSON.stringify({
        "estado" : "clasificado"
    })
    let data = await clasificarlote(json ,idLote, usuario.token)
    if (data.success) {


        clasificarComponente.style.display = 'none';
        tablaTodosLotes.style.display = 'block';
        let filaTablaLotes = tablaLotes.getElementsByTagName('tr');
        for (let i = filaTablaLotes.length - 1; i > 0; i--) {
            filaTablaLotes[i].remove();
        }
        let filaTablaLote = tablaLoteEspecifico.getElementsByTagName('tr');
        for (let i = filaTablaLote.length - 1; i > 0; i--) {
            filaTablaLote[i].remove();
        }
        rellenarTabla()
    }
})