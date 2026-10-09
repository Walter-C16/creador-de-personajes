const URL_BASE = '/api/personajes';

export async function obtenerPersonajes() {
    const respuesta = await fetch(URL_BASE);

    if (!respuesta.ok) {
        throw new Error('No se pudieron obtener los personajes');
    }

    return respuesta.json();
}

export async function guardarPersonaje(indice, personaje) {
    const respuesta = await fetch(`${URL_BASE}/${indice}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personaje)
    });

    if (!respuesta.ok) {
        const datos = await respuesta.json().catch(() => ({}));
        throw new Error(datos.error || 'No se pudo crear el personaje');
    }

    return respuesta.json();
}

export async function borrarPersonaje(indice) {
    const respuesta = await fetch(`${URL_BASE}/${indice}`, {
        method: 'DELETE'
    });

    if (!respuesta.ok) {
        throw new Error('No se pudo eliminar el personaje');
    }
}
