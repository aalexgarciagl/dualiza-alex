const url = 'http://127.0.0.1:8000/api/colaborador/'

export async function enviarPaquete(body, token, id) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: body
    }
    try {
        const response = await fetch(url + 'entrega/' + id , options)

        return await response.json()

    } catch (error) {
        console.error(error)
    }   
}

export async function obtenerLotes(id, token) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(url + 'entrega/' + id , options)
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


export async function cancelarEnvioColaborador(estado, id_envio, id, token) {
    let bodyJson = JSON.stringify({
        "estado" : estado,
    })
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: bodyJson
    }
    try {
        const response = await fetch(url + 'entrega/cambio_estado/' + id_envio + "/" + id , options)
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

export async function lotesEntregados(token) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/api/clasificador/lotes_pendientes' , options)
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

export async function componentesLote(idLote,token) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/api/lote/componentes/' + idLote , options)
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

export async function clasificarlote(json, idLote,token) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: json
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/api/admin/clasificador/entrega/cambio_estado/' + idLote , options)
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

export async function getAllLotes(token) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/api/lotes', options)
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

