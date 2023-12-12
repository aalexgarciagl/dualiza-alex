const url = 'http://127.0.0.1:8000/api/'

export async function obtenerTodosEstados() {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch(url + 'estados_entrega' , options)
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

