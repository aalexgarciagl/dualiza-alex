const url = 'http://127.0.0.1:8000/api/'

export async function loginUsuario(email, password) {
    const usuario = {
        "email": email,
        "password": password
    }
    
    // Use template literals for constructing the URL
    const url = 'http://127.0.0.1:8000/api/';

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }
    try {
        const response = await fetch(url + 'login', options);
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

export async function registerUser(datos) {    
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }
    try {
        const response = await fetch(url + 'register', options)
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

export async function logoutAccesos(id) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url + 'logut/' + id, options)
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


export async function newPasswordUpdate(datos) {    
    
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }
    try {
        const response = await fetch(url + 'solicitarNewPassword', options)
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



