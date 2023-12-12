const usuario = JSON.parse(sessionStorage.getItem('usuario'));
const gestionUsuarios = document.getElementById('gestionUsuarios');
const gestionComponentes = document.getElementById('gestionComponentes');
const gestionEnvios = document.getElementById('gestionEnvios');
const gestionInventario = document.getElementById('gestionInventario')

init()

function init(){
    comprobarLogin()
    const profileIconImg = document.getElementById('profileIconImg')
    profileIconImg.src = usuario.foto
}

async function comprobarLogin() { 
    if (!usuario || usuario === '' ||usuario.token == '' || usuario.abilitie != 'YWRtaW4=') {
        window.location.href = 'index.html';
    }else {
        var existe = await gestionUsuarios(usuario.id)
        if (existe === undefined) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    }
}

gestionUsuarios.addEventListener('click' , function () {
    window.location.href = 'gestionUsuarios.html';
})

gestionComponentes.addEventListener('click' , function () {
    window.location.href = 'gestionComponentes.html';
})

gestionEnvios.addEventListener('click' , function () {
    window.location.href = 'gestionEnvios.html';
})

gestionInventario.addEventListener('click', function(){
    window.location.href = 'gestionInventario.html'
})
