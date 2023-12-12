export function validPassword(psswd) {
    let expresionRegular = /^[a-zA-Z\d*#$]{3,12}$/;      
    return expresionRegular.test(psswd) ? true : false;
}

export function validCorreoElectronico(correo) {    
    let expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/     
    return expresionRegular.test(correo) ? true : false;
}


export function validNombre(nombre){
    let expresionRegular = /^.{3,120}$/
    return expresionRegular.test(nombre) ? true : false
}


export function validDni_cif(dni_cif){
    let expresionRegular = /^(?:\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-HJ-NP-TV-Z])$/
    return expresionRegular.test(dni_cif) ? true : false 
}

export function validDireccion(direccion){
    var expresionRegular = /^.{3,300}$/
    return expresionRegular.test(direccion) ? true : false 
}