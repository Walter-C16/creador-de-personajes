const fs = require('node:fs');
const path = require('node:path');

const RUTA_ARCHIVO = path.join(
    __dirname,
    '..',
    'datos',
    'personajes.json'
);

function obtenerPersonajes() {
    try {
        const contenido = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
        const personajes = JSON.parse(contenido);

        if (!Array.isArray(personajes) || personajes.length !== 3) {
            throw new Error('El archivo de personajes es inválido');
        }

        return personajes;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [null, null, null];
        }

        throw error;
    }
}

function guardarPersonajes(personajes) {
    fs.mkdirSync(path.dirname(RUTA_ARCHIVO), {
        recursive: true
    });

    fs.writeFileSync(
        RUTA_ARCHIVO,
        JSON.stringify(personajes, null, 2),
        'utf8'
    );
}

module.exports = {
    obtenerPersonajes,
    guardarPersonajes
};
