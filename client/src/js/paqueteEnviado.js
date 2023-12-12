const inicioBoton = document.getElementById('inicioBoton');
const enviosBoton = document.getElementById('enviosBoton');

init()

function init() { 
    if (!sessionStorage.getItem('paqueteEnviado')) {
        window.location.href = 'main.html'
    }else {
        sessionStorage.removeItem('paqueteEnviado');
    }
}

inicioBoton.addEventListener('click', function() { 
    window.location.href = 'main.html'
})

enviosBoton.addEventListener('click', function() { 
    window.location.href = 'enviosColab.html'
})