const admin = document.getElementById('admin');
const colaboradorEnvios = document.getElementById('colaboradorEnvios');
const colaboradorEntrega = document.getElementById('colaboradorEntrega');
const clasificador = document.getElementById('clasificador');
const diseñador = document.getElementById('diseñador');
const profileIconImg = document.getElementById('profileIconImg')
const usuario = JSON.parse(sessionStorage.getItem('usuario'));

init();

function init() {
    comprobarLogin()
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

function comprobarLogin() {
    if (!usuario || usuario === '') {
        window.location.href = 'index.html';
    }
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