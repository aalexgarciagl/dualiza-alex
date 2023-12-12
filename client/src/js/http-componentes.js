const url = 'http://127.0.0.1:8000/api/componentes/'

export async function getComponentesAdmitidos(token) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(url, options)
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

export async function clasificarComponenteLote(json,token, idLote) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: json
    }
    try {
        const response = await fetch("http://127.0.0.1:8000/api/clasificar/componente/" + idLote, options)
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

export async function eliminarComponente(id, token) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(url + id, options)
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

export async function anadirComponente(json, token) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: json
    }
    try {
        const response = await fetch(url + 'insertar', options)
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

export async function modificarComponente(json, token, id) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: json
    }
    try {
        const response = await fetch(url + 'actualizar/'+ id, options)
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