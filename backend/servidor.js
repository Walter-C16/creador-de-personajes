
const express = require('express');
const {
    obtenerPersonajes,
    guardarPersonajes
} = require('./services/servicioPersonajes');

const app = express();
const PUERTO = 3001;

app.use(express.json());

// Cargar los personajes guardados al iniciar el servidor
let personajes = obtenerPersonajes();

// Endpoint de prueba
app.get('/api/saludo', (req, res) => {
    res.json({
        mensaje: 'Bienvenido al Gremio de Aventureros'
    });
});

// Obtener todos los personajes
app.get('/api/personajes', (req, res) => {
    res.json(personajes);
});

// Crear un personaje
app.post('/api/personajes/:indice', (req, res) => {
    const indice = Number(req.params.indice);
    const personaje = req.body;

    // Validar el casillero
    if (!Number.isInteger(indice) || indice < 0 || indice > 2) {
        return res.status(400).json({
            error: 'Casillero inválido'
        });
    }

    // Verificar que esté disponible
    if (personajes[indice] !== null) {
        return res.status(409).json({
            error: 'El casillero ya está ocupado'
        });
    }

    // Validar los datos principales
    if (
        !personaje ||
        typeof personaje.nombre !== 'string' ||
        personaje.nombre.trim().length < 3 ||
        personaje.nombre.trim().length > 30 ||
        typeof personaje.raza !== 'string' ||
        !personaje.raza.trim() ||
        typeof personaje.clase !== 'string' ||
        !personaje.clase.trim()
    ) {
        return res.status(400).json({
            error: 'Los datos del personaje son inválidos'
        });
    }

    const personajesActualizados = [...personajes];

    personajesActualizados[indice] = {
        ...personaje,
        nombre: personaje.nombre.trim()
    };

    try {
        guardarPersonajes(personajesActualizados);
        personajes = personajesActualizados;
        res.status(201).json(personajes[indice]);
    } catch (error) {
        console.error('Error al guardar personaje:', error);

        res.status(500).json({
            error: 'No se pudo guardar el personaje'
        });
    }
});

// Eliminar un personaje
app.delete('/api/personajes/:indice', (req, res) => {
    const indice = Number(req.params.indice);

    // Validar el casillero
    if (!Number.isInteger(indice) || indice < 0 || indice > 2) {
        return res.status(400).json({
            error: 'Casillero inválido'
        });
    }

    const personajesActualizados = [...personajes];

    // Liberar el casillero
    personajesActualizados[indice] = null;

    try {
        guardarPersonajes(personajesActualizados);
        personajes = personajesActualizados;

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar personaje:', error);

        res.status(500).json({
            error: 'No se pudo eliminar el personaje'
        });
    }
});

// Iniciar servidor
app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});
