import { newPasswordUpdate } from "./http-accesos"

const avisoCorrecto = document.getElementById('avisoCorrecto')
const inputEmail = document.getElementById('inputEmail')
const botonGeneratePassword = document.getElementById('botonGeneratePassword')
const labelCorreoEnviada = document.getElementById('labelCorreoEnviada')
const recuperarPasswordDiv = document.getElementById('recuperarPasswordDiv')

init()

function init(){
    avisoCorrecto.style.display = "none"
}

botonGeneratePassword.addEventListener('click', async function(){
    recuperarPasswordDiv.style.display = "none"
    const correo = inputEmail.value
    avisoCorrecto.style.display = "block"
    labelCorreoEnviada.innerHTML = `<h2 class=color-orange>Esta funcion esta en mantenimiento...</h2>`
    json = {
        email: correo
    }
    const response = await updatePassword(json)
})


async function updatePassword(json){
    return await newPasswordUpdate(json)
}