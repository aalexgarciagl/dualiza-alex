const url = 'http://127.0.0.1:8000/api/usuarios/'


export async function obtenerRoles(id) { 
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url + 'roles/' + id, options)
        if (!response.ok) {
            throw new Error(response);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        // Redirigir a la pantalla de error del servidor
        // window.location.href = 'errorServer.html'
    }
}

export async function obtenerToken(json) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }
    try {
        const response = await fetch(url + 'login/token', options)

        return await response.json()

    } catch (error) {
        console.error(error)
    }
}


export async function obtenerDatosMiUser(id){
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url + '' + id, options)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export async function updateUser(id,json){
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    }
    try {
        const response = await fetch(url + id, options)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}


export async function changePassword(id,json,token){
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(json)
    }
    try {
        const response = await fetch(url + 'password/' + id, options)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}

export async function cambiarRolUsuario (id,json,token){
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: json
    }
    try {
        const response = await fetch(url + 'cambiar_rol/' + id, options)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}


