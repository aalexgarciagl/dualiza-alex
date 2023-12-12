import { registerUser } from "./http-accesos.js"

const registrarseButton = document.getElementById('registrarseButton')



registrarseButton.addEventListener('click', function () {
    const nombre = document.getElementById('nombreInput')
    const email = document.getElementById('emailInput')
    const dni_cif = document.getElementById('dni_cifInput')
    const direccion = document.getElementById('direccionInput')
    const password = document.getElementById('passwordInput')
    const confirmPassword = document.getElementById('confirmPasswordInput')



    var validNombreVar = validNombre(nombre)
    var validCorreoVar = validCorreoElectronico(email)
    var validPasswordVar = validPassword(password)
    var validPasswordVerifiedVar = passwordVerified(password, confirmPassword)
    var validDni_cifVar = validDni_cif(dni_cif)
    var validDireccionVar = validDireccion(direccion)


    const datosJSON = {
        nombre: nombre.value,
        email: email.value,
        dni_cif: dni_cif.value,
        direccion: direccion.value,
        password: encriptarBase64(password.value)
    }

    if (validDireccionVar && validNombreVar && validCorreoVar && validPasswordVar && validPasswordVerifiedVar && validDni_cifVar) {
        comprobarRegistro(datosJSON)
    }


})

function encriptarBase64(texto) {
    return btoa(texto);
}


async function comprobarRegistro(datosJSON) {
    const labelFalloCorreo = document.getElementById('labelCorreoRepetido')
    const email = document.getElementById('emailInput')
    const response = await registerUser(datosJSON)
    var fraseErrorJSON = ''
    try {
        fraseErrorJSON = response.email[0]
    } catch {
        fraseErrorJSON = false
    }
    if (fraseErrorJSON == "The email has already been taken.") {
        labelFalloCorreo.style.display = ""
        email.style.borderBottom = '5px solid orange'
        labelFalloCorreo.innerHTML = 'Este correo ya tiene una cuenta asociada.'
        labelFalloCorreo.style.color = 'orange'
    } else {
        labelFalloCorreo.style.display = "none"
        labelFalloCorreo.innerHTML = ''
        labelFalloCorreo.style.color = ''
        window.location.href = "../html/index.html"
    }
}




function validNombre(nombreInput) {
    let expresionRegular = /^.{3,120}$/
    const labelNombreFallo = document.getElementById('labelNombreFallo')

    let correct = expresionRegular.test(nombreInput.value)
    if (correct) {
        labelNombreFallo.innerHTML = ''
        nombreInput.style.borderColor = ""
        nombreInput.style.borderWidth = "1px"
        return true
    } else {
        labelNombreFallo.style.display = ""
        nombreInput.style.borderBottom = '5px solid orange'
        labelNombreFallo.style.color = "orange"
        labelNombreFallo.innerHTML = 'El nombre debe tener entre 3 y 120 caracteres.'
        return false
    }
}


function validCorreoElectronico(correo) {
    let expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/
    const labelCorreoRepetido = document.getElementById('labelCorreoRepetido')
    if (expresionRegular.test(correo.value)) {
        labelCorreoRepetido.innerHTML = ''
        correo.style.borderColor = ""
        correo.style.borderWidth = "1px"
        return true
    } else {
        labelCorreoRepetido.style.display = ""
        correo.style.borderBottom = '5px solid orange'
        labelCorreoRepetido.style.color = "orange"
        labelCorreoRepetido.innerHTML = 'Introduce un correo válido (example: efpyi@example.com)'
        return false
    }
}

function validPassword(passwordInput) {
    const labelPasswordInput = document.getElementById('labelPasswordInput')
    let expresionRegular = /^[\w*#$]{6,12}$/
    if (expresionRegular.test(passwordInput.value)) {
        labelPasswordInput.innerHTML = ''
        passwordInput.style.borderColor = ""
        passwordInput.style.borderWidth = "1px"
        return true
    } else {
        labelPasswordInput.style.display = ""
        passwordInput.style.borderBottom = '5px solid orange'
        labelPasswordInput.style.color = "orange"
        labelPasswordInput.innerHTML = 'La contraseña debe tener entre 6 y 12 caracteres.'
        return false
    }
}

function passwordVerified(password, passwordVerified) {
    const labelPasswordRepetidaInput = document.getElementById('labelPasswordRepetidaInput')
    if (password.value === passwordVerified.value) {
        labelPasswordRepetidaInput.innerHTML = ''
        passwordVerified.style.borderColor = ""
        passwordVerified.style.borderWidth = "1px"
        return true
    } else {
        labelPasswordRepetidaInput.style.display = ""
        passwordVerified.style.borderBottom = '5px solid orange'
        labelPasswordRepetidaInput.style.color = "orange"
        labelPasswordRepetidaInput.innerHTML = 'Las contraseñas no coinciden.'
        return false
    }
}

function validDni_cif(dni_cif) {
    const labelDni_cifFallo = document.getElementById('labelDni_cifFallo')
    var regExp = /^(?:\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-HJ-NP-TV-Z])$/
    if (regExp.test(dni_cif.value)) {
        labelDni_cifFallo.innerHTML = ''
        dni_cif.style.borderColor = ""
        dni_cif.style.borderWidth = "1px"
        return true
    } else {
        labelDni_cifFallo.style.display = ""
        dni_cif.style.borderBottom = "5px solid orange"
        labelDni_cifFallo.style.color = "orange"
        labelDni_cifFallo.innerHTML = 'Introduce un DNI/CIF válido'
        return false
    }

}


function validDireccion(direccion) {
    const labelDirreccionFallo = document.getElementById('labelDirreccionFallo')
    var regExp = /^.{3,300}$/
    if (regExp.test(direccion.value)) {
        labelDirreccionFallo.innerHTML = ''
        direccion.style.borderColor = ""
        direccion.style.borderWidth = "1px"
        return true
    } else {
        labelDirreccionFallo.style.display = ""
        direccion.style.borderBottom = "5px solid orange"
        labelDirreccionFallo.style.color = "orange"
        labelDirreccionFallo.innerHTML = 'La direccion debe tener entre 3 y 300 caracteres.'
        return false
    }

}
