import { getComponentesAdmitidos } from './http-componentes.js'
import { crearReceta, getRecetas, obtenerRecetaSugerida } from './http-disenador.js'
import { enviarImagenJoya } from './http-images.js';

var idJoya;
var usuario = JSON.parse(sessionStorage.getItem('usuario'));
const botonDisenarJoya = document.getElementById('botonDisenarJoya');
const componentesInsert = document.getElementById('componentesInsert');
const botonAnadirComponente = document.getElementById('botonAnadirComponente');
const botonConsultarJoya = document.getElementById('botonConsultarJoya');
const botonSugerirJoya = document.getElementById('botonSugerirJoya');
const mensajeError = document.getElementById('mensajeError');
const mensajeError2 = document.getElementById('mensajeError2');
const botonTerminarDiseno = document.getElementById('botonTerminarDiseno');
const cantidadComponente = document.getElementById('cantidadComponente');
const tablaComponentes = document.getElementById('tablaComponentes');
const nombreJoya = document.getElementById('nombreJoya');
const divDisenarJoya = document.getElementById('divDisenarJoya');
const joyas = document.getElementById('joyas');
const tablaJoyas = document.getElementById('tablaJoyas');
const sugerenciaJoya = document.getElementById('sugerenciaJoya');
const tablaSugerencia = document.getElementById('tablaSugerencia');
const tablaSugerencias = document.getElementById('tablaSugerencias');
const solicitarReceta = document.getElementById('solicitarReceta');
const selectorJoyaSugerida = document.getElementById('selectorJoyaSugerida');
const usarReceta = document.getElementById('usarReceta');
const descartarReceta = document.getElementById('descartarReceta')
const mensaje = document.getElementById('message')
var fotoJoyas = document.getElementById('fotoJoya');
const profileIconImg = document.getElementById('profileIconImg')
var fotoSeleccionada = 0
var recetaSugerida
var componentes = []

comprobarLogin()
init()

function init(){
    profileIconImg.src = usuario.foto
}

function comprobarLogin() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != "ZGlzZfFhZG9y") {
        window.location.href = 'index.html';
    }
}

/////////Funcionalidad terminar la receta de la joya

botonTerminarDiseno.addEventListener('click', async function () {
    var validNombre = validarNombreJoya()
    var validTabla = validarCantidadComponentes()

    if (validNombre && validTabla) {
        //mandar peticion guardar diseño joya json usuario.id y usuario.token
        let receta = formarJsonReceta()
        let responseFoto = await fotoJoyaBD(fotoSeleccionada);
        receta.joya.foto = responseFoto.url
        

        let data = await crearReceta(JSON.stringify(receta), usuario.id, usuario.token)
        if (data === undefined) {
            mensajeError.textContent = 'Receta no insertada, asegurate de subir una imagen para tu joya!'
        } else if (data.success) {
            mensajeError.style.color = 'Green'
            mensajeError.textContent = 'Recenta insertada!'
            nombreJoya.value = '';
            setTimeout(() => {
                mensajeError.textContent = '';
            }, 4000);
            componentes = await obtenerComponentes(usuario.token)
            cantidadComponente.value = ''
            eliminarContenidoTabla(tablaComponentes)
            rellenarSelector()
        }
    }
})

document.getElementById('fotoJoya').addEventListener('change', async function (event) {
    fotoSeleccionada = event.target.files[0];

});

async function subirFotoJoya(foto) {
    let response = await enviarImagenJoya(foto)
    return response
}

async function fotoJoyaBD(foto) {
    const response = await subirFotoJoya(foto);
    return response
}

function formarJsonReceta() {

    let receta = {
        "joya": {
            "nombre": nombreJoya.value,
            "foto": 'a',
            "componentes": []
        }
    }
    //recorre la tabla sacando los valores de las celdas
    for (let i = 1; i < tablaComponentes.rows.length; i++) {
        let row = tablaComponentes.rows[i];
        let componente = row.cells[0].textContent;
        let cantidad = parseInt(row.cells[1].textContent);
        receta.joya.componentes.push({ "nombre": componente, "cantidad": cantidad });
    }

    return receta
}

function validarCantidadComponentes() {
    let validTabla = true
    if (tablaComponentes.rows.length <= 1) {
        validTabla = false
        mensajeError2.style.color = 'orange'
        mensajeError2.textContent = 'Debe introducir componentes al diseño!'
    } else {
        mensajeError2.textContent = ''
    }
    return validTabla
}

function validarNombreJoya() {
    let validNombre = true
    if (nombreJoya.value == '') {
        mensajeError.style.color = 'orange'
        mensajeError.textContent = 'Introducir el nombre de la joya!'
        nombreJoya.style.borderBottom = '5px solid orange'
        validNombre = false
    } else {
        mensajeError.textContent = ''
        nombreJoya.style.borderBottom = '0px solid orange'
    }
    return validNombre
}

/////////Funcionalidad boton consultar joyas

botonConsultarJoya.addEventListener('click', async function () {
    divDisenarJoya.style.display = 'none';

    botonDisenarJoya.style.backgroundColor = ''
    botonDisenarJoya.style.color = ''

    botonConsultarJoya.style.backgroundColor = '#F7A072'
    botonConsultarJoya.style.color = 'black'

    botonSugerirJoya.style.backgroundColor = ''
    botonSugerirJoya.style.color = ''
    sugerenciaJoya.style.display = 'none';
    tablaSugerencia.style.display = 'none'
    eliminarContenidoTabla(tablaJoyas)

    joyas.style.display = 'block'

    let data = await obtenerRecetasJoyas(usuario.token)
    data.joyas.forEach(joya => {
        var row = tablaJoyas.insertRow();
        row.insertCell().innerHTML = joya.Joya;
        //.map recorre cada elemento de un array y devuelve un nuevo array con los resultados de aplicar una función a cada elemento
        let componentesHtml = joya.Componentes.map(componente =>
            `<div class="row">
                ${componente.cantidad} ${componente.nombre}
             </div>`).join('<br>');

        row.insertCell().innerHTML = componentesHtml;
        row.insertCell().innerHTML = `<img style="width: 25%" src="${joya.Foto}">`
    })
})


async function obtenerRecetasJoyas(token) {
    let data = await getRecetas(token)
    return data
}





/////////Funcionalidad añadir componentes al diseño de la joya
botonDisenarJoya.addEventListener('click', async function () {
    botonDisenarJoya.style.backgroundColor = '#F7A072'
    botonDisenarJoya.style.color = 'black'

    botonConsultarJoya.style.backgroundColor = ''
    botonConsultarJoya.style.color = ''

    botonSugerirJoya.style.backgroundColor = ''
    botonSugerirJoya.style.color = ''



    mensajeError2.textContent = ''
    componentesInsert.style.borderBottom = '0px'
    mensajeError.textContent = ''
    cantidadComponente.style.borderBottom = '0px'

    joyas.style.display = 'none'
    divDisenarJoya.style.display = 'block';
    sugerenciaJoya.style.display = 'none';
    tablaSugerencia.style.display = 'none'

    componentes = await obtenerComponentes(usuario.token)

    eliminarContenidoTabla(tablaComponentes)
    rellenarSelector()
})

function eliminarContenidoTabla(tabla) {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

botonAnadirComponente.addEventListener('click', function () {
    var validCant = true
    var validComp = true
    if (cantidadComponente.value <= 0) {
        mensajeError.style.color = 'orange'
        mensajeError.textContent = 'Tiene que seleccionar una cantidad de componentes'
        cantidadComponente.style.borderBottom = '5px solid orange'
        validCant = false
    } else {
        mensajeError.textContent = ''
        cantidadComponente.style.borderBottom = '0px'
    }


    if (componentesInsert.value == '') {
        mensajeError2.style.color = 'orange'
        mensajeError2.textContent = 'Tiene que seleccionar un componente'
        componentesInsert.style.borderBottom = '5px solid orange'
        validComp = false
    } else {
        mensajeError2.textContent = ''
        componentesInsert.style.borderBottom = '0px'
    }

    if (validCant && validComp) {
        anadirComponentesTabla(cantidadComponente.value, componentesInsert.value)
        for (let index = 0; index < componentes.length; index++) {
            if (componentes[index].nombre === componentesInsert.value) {
                componentes.splice(index, 1);
            }
        }
        rellenarSelector()
    }

})

function rellenarSelector() {
    componentesInsert.innerHTML = '';
    cantidadComponente.value = ''
    componentes.forEach(componente => {
        componentesInsert.innerHTML += `<option value="${componente.nombre}">${componente.nombre}</option>`;
    });
}

function anadirComponentesTabla(cantidad, componente) {
    const row = tablaComponentes.insertRow();
    row.insertCell().innerHTML = componente;;
    row.insertCell().innerHTML = cantidad;

}

async function obtenerComponentes(token) {
    let data = await getComponentesAdmitidos(token)
    return data.componentes
}

//funcionalidad del boton sugerir joya
botonSugerirJoya.addEventListener('click', () => {
    eliminarContenidoTabla(tablaSugerencias)
    botonConsultarJoya.style.color = ''
    botonConsultarJoya.style.backgroundColor = ''
    botonDisenarJoya.style.color = ''
    botonDisenarJoya.style.backgroundColor = ''
    botonSugerirJoya.style.backgroundColor = '#F7A072'
    botonSugerirJoya.style.color = 'black'
    sugerenciaJoya.style.display = 'block';
    divDisenarJoya.style.display = 'none'
    tablaSugerencia.style.display = 'none'
    joyas.style.display = 'none'
})

solicitarReceta.addEventListener('click', async function () {
    sugerenciaJoya.style.display = 'none';

    let json = JSON.stringify({
        "joya": selectorJoyaSugerida.value
    })

    let data = await obtenerRecetaSugerida(json, usuario.token)
    tablaSugerencia.style.display = 'block'

    var row = tablaSugerencias.insertRow();
    row.insertCell().innerHTML = data.joya.nombre;
    let componentesHtml = data.joya.componentes.map(componente =>
        `<div class="row">
            ${componente.nombre}
         </div>`).join('<br>');

    row.insertCell().innerHTML = componentesHtml;
    recetaSugerida = data.joya
})

usarReceta.addEventListener('click', async function () {
    let json = {
        "joya": {
            "nombre": recetaSugerida.nombre,
            "foto" : "https://dualiza-bucket.s3.eu-north-1.amazonaws.com/joyas/imagen-default-joya.jpeg",
            "componentes": []
        },
    }
    recetaSugerida.componentes.forEach(componente => {
        let c = {
            "nombre": componente.nombre,
            "cantidad": componente.cantidad
        }
        json.joya.componentes.push(c)
    });

    let data = await crearReceta(JSON.stringify(json), usuario.id, usuario.token)
    if (data.success) {
        mensaje.textContent = 'Receta insertada. Espere:'
        setTimeout(() => {
            let count = 4;
            let cuentaAtras = setInterval(() => {
                mensaje.textContent = `Receta insertada. Espere: ${count}`;
                count--;
                if (count < 0) {
                    clearInterval(cuentaAtras);
                    mensaje.textContent = '';
                    tablaSugerencia.style.display = 'none';
                    botonSugerirJoya.style.color = ''
                    botonSugerirJoya.style.backgroundColor = ''
                    eliminarContenidoTabla(tablaSugerencias)
                }
            }, 1000);
        }, 1000);
    }
})

descartarReceta.addEventListener('click', function () {
    eliminarContenidoTabla(tablaSugerencias)
    sugerenciaJoya.style.display = 'block'
    tablaSugerencia.style.display = 'none'
});