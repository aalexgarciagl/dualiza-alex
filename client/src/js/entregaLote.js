import { enviarPaquete } from './http-lotes.js'
const mssg = document.getElementById('mssg');
var usuario = JSON.parse(sessionStorage.getItem('usuario'));
const descripcion = document.getElementById('descripcion');
const botonEnviarLote = document.getElementById('botonEnviarLote')

init()

function init(){
    comprobarCredenciales()
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto
}

function comprobarCredenciales() {
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != 'Y29sYWJvcmFkb3I=') {
        window.location.href = 'index.html';
    }
}

function comprobarUbicacion() { 
    let latitud = sessionStorage.getItem('latitud')
    let longitud = sessionStorage.getItem('longitud')
    if (longitud == null || latitud == null) {
        return null
    }else {

        sessionStorage.removeItem('latitud');
        sessionStorage.removeItem('longitud');
        return [latitud, longitud]
    }
    
}

function comprobarDescripcion() {
    if (descripcion.value.trim() === '') {
        return null
    } else {
        return descripcion.value
    }
}

async function entregarPaquete(ubicacion, descripcion) {
    var respuestaJson = JSON.stringify({
        "latitud": ubicacion[0],
        "longitud": ubicacion[1],
        "descripcion": descripcion,
        "estado": 'enviado'
    });

    var data = await enviarPaquete(respuestaJson, usuario.token, usuario.id)
    return data
}

botonEnviarLote.addEventListener('click', async function () {
    let ubicacion = comprobarUbicacion()
    let descripcion = comprobarDescripcion()

    if (ubicacion == null && descripcion == null) {
        mssg.style.color = 'orange';
        mssg.textContent = 'Debe seleccionar una ubicación y una descripción'
    }else {
        if (ubicacion === null) {
            mssg.style.color = 'orange';
            mssg.textContent = 'Debe seleccionar una ubicación'
            setTimeout(() => {
                mssg.textContent = '';
            }, 4000);
        }
        
        if (descripcion === null) {
            mssg.style.color = 'orange';
            mssg.textContent = 'Debe proporcionar una descripción'
            setTimeout(() => {
                mssg.textContent = '';
            }, 4000);
        }
    }


    if (ubicacion != null && descripcion != null) {
        var data = await entregarPaquete(ubicacion, descripcion)
        if (data.success === true) {
            sessionStorage.setItem('paqueteEnviado', true);
            window.location.href = 'paqueteEnviado.html'
        }
    }
})
