const url = 'http://127.0.0.1:8000/api/'



export async function enviarImagen(imagen) {
    
    let formData = new FormData();
    formData.append('imagen', imagen);  

    let options = {
        method: 'POST',
        body: formData,  
    };

    try {
        const response = await fetch(url + 'subirImagen/', options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function enviarImagenJoya(imagen) {
    
    let formData = new FormData();
    formData.append('imagen', imagen);  

    let options = {
        method: 'POST',
        body: formData,  
    };

    try {
        const response = await fetch(url + 'anadirFotoJoya/', options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}


export async function actualizarImagen(id,foto){
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foto)
    }
    try {
        const response = await fetch(url + 'actualizarFoto/' + id, options)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}