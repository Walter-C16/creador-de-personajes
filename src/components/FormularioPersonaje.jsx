import { useState } from 'react';
import SelectorRasgos from './SelectorRasgos';
import SelectorAtributo from './SelectorAtributo';

const PUNTOS_TOTALES = 15;

function FormularioPersonaje({ onCrear, onVolver, procesando }) {
    const [errores, setErrores] = useState({});
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('Humano');
    const [clase, setClase] = useState('Guerrero');
    const [alineamiento, setAlineamiento] = useState('Bueno');
    const [rasgos, setRasgos] = useState([]);
    const [historia, setHistoria] = useState('');
    const [atributos, setAtributos] = useState({
        fuerza: 1,
        magia: 1,
        agilidad: 1
    });

    const puntosUsados = Object.values(atributos)
        .reduce((total, valor) => total + valor, 0);

    const puntosRestantes = PUNTOS_TOTALES - puntosUsados;

    function cambiarAtributo(nombre, nuevoValor) {
        setAtributos((anteriores) => {
            const puntosOtrosAtributos = Object.entries(anteriores)
                .filter(([atributo]) => atributo !== nombre)
                .reduce((total, [, valor]) => total + valor, 0);

            const maximoPermitido = Math.min(
                10,
                PUNTOS_TOTALES - puntosOtrosAtributos
            );

            return {
                ...anteriores,
                [nombre]: Math.max(1, Math.min(nuevoValor, maximoPermitido))
            };
        });
    }

    function validarFormulario() {
        const nuevosErrores = {};

        if (nombre.trim().length < 3 || nombre.trim().length > 30) {
            nuevosErrores.nombre =
                'El nombre debe tener entre 3 y 30 caracteres.';
        }

        if (rasgos.length === 0) {
            nuevosErrores.rasgos =
                'Seleccioná al menos un rasgo de personalidad.';
        }

        if (puntosRestantes !== 0) {
            nuevosErrores.atributos =
                'Debés distribuir todos los puntos disponibles.';
        }

        return nuevosErrores;
    }

    function handleEnvio(evento) {
        evento.preventDefault();

        const erroresEncontrados = validarFormulario();

        setErrores(erroresEncontrados);

        if (Object.keys(erroresEncontrados).length > 0) {
            return;
        }

        const nuevoPersonaje = {
            nombre: nombre.trim(),
            raza,
            clase,
            rasgos,
            historia: historia.trim(),
            atributos
        };

        onCrear(nuevoPersonaje);
    }

    return (
        <main className="formulario-contenedor">
            <h1>Crear personaje</h1>

            <form onSubmit={handleEnvio}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                    required
                />

                {errores.nombre && (
                    <p className="mensaje-error">{errores.nombre}</p>
                )}

                <label htmlFor="raza">Raza</label>
                <select
                    id="raza"
                    value={raza}
                    onChange={(evento) => setRaza(evento.target.value)}
                >
                    <option>Humano</option>
                    <option>Elfo</option>
                    <option>Enano</option>
                    <option>Orco</option>
                </select>

                <fieldset>
                    <legend>Clase</legend>

                    {['Guerrero', 'Mago', 'Arquero', 'Paladín'].map((opcion) => (
                        <label key={opcion}>
                            <input
                                type="radio"
                                name="clase"
                                value={opcion}
                                checked={clase === opcion}
                                onChange={() => setClase(opcion)}
                            />
                            {opcion}
                        </label>
                    ))}
                </fieldset>

                <SelectorRasgos
                    seleccionados={rasgos}
                    onCambiar={setRasgos}
                />

                {errores.rasgos && (
                    <p className="mensaje-error">{errores.rasgos}</p>
                )}

                <fieldset>
                    <legend>Atributos</legend>

                    <p>Puntos disponibles: {puntosRestantes}</p>

                    {Object.entries(atributos).map(([nombre, valor]) => (
                        <SelectorAtributo
                            key={nombre}
                            nombre={nombre}
                            valor={valor}
                            minimo={1}
                            maximo={10}
                            onCambiar={(nuevoValor) =>
                                cambiarAtributo(nombre, nuevoValor)
                            }
                        />
                    ))}
                </fieldset>

                {errores.atributos && (
                    <p className="mensaje-error">{errores.atributos}</p>
                )}

                <label htmlFor="historia">Historia del personaje</label>

                <textarea
                    id="historia"
                    value={historia}
                    onChange={(evento) => setHistoria(evento.target.value)}
                    placeholder="Contá el origen de tu aventurero..."
                    rows={5}
                    maxLength={500}
                />

                <div className="acciones-formulario">
                    <button type="button" onClick={onVolver} disabled={procesando}>
                        Volver
                    </button>

                    <button type="submit" disabled={procesando}>
                        {procesando ? 'Creando...' : 'Crear personaje'}
                    </button>
                </div>
            </form>
        </main>
    );
}

export default FormularioPersonaje;
