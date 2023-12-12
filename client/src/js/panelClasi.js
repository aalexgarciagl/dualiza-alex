const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const clasificarEnvios = document.getElementById('clasificarEnvios');
const gestionComponentes = document.getElementById('gestionComponentes');
const gestionInventario = document.getElementById('gestionInventario');
const gestionEnvios = document.getElementById('gestionEnvios');
init()

function init(){
    comprobarLogin()
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto
}

async function comprobarLogin() { 
    if (!usuario || usuario === '' || usuario.token == '' || usuario.abilitie != "Y2xhc2lmaWNhZG9y") {
        window.location.href = 'index.html';
    }
}

clasificarEnvios.addEventListener('click' , function () {
    window.location.href = 'clasificarLotes.html';
})

gestionComponentes.addEventListener('click' , function () {
    window.location.href = 'gestionComponentes.html';
})

gestionInventario.addEventListener('click' , function () {
    window.location.href = 'gestionInventario.html';
})

gestionEnvios.addEventListener('click' , function () {
    window.location.href = 'gestionEnvios.html';
})