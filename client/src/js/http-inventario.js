const url = "http://127.0.0.1:8000/api/inventario/"

export async function obtenerComponentes(token) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(url + 'list', options)
        if (!response.ok) {
            throw new Error(response);
        }
        return await response.json();
    } catch (error) {
        console.log(error);        
    }
}

export async function actualizarCantidad(token,body){
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: body
    }
    try {
        const response = await fetch(url + 'update', options)
        if (!response.ok) {
            throw new Error(response);
        }
        return await response.json();
    } catch (error) {
        console.log(error);        
    }
}