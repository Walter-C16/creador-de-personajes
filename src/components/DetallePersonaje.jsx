
import imagenesPorRaza from '../utils/imagenesPersonajes';

function DetallePersonaje({ personaje, onVolver }) {
    const imagen = imagenesPorRaza[personaje.raza];

    return (
        <main className="detalle-personaje">
            <button
                type="button"
                className="boton-volver"
                onClick={onVolver}
            >
                ← Volver
            </button>

            <h1>{personaje.nombre}</h1>

            <div className="detalle-contenido">
                {imagen && (
                    <img
                        src={imagen}
                        alt={`Retrato de ${personaje.raza}`}
                        className="detalle-imagen"
                    />
                )}

                <div className="detalle-columna-informacion">
                    <section className="detalle-informacion">
                        <h2>Información general</h2>

                        <p><strong>Raza:</strong> {personaje.raza}</p>
                        <p><strong>Clase:</strong> {personaje.clase}</p>

                        <h2>Atributos</h2>

                        {Object.entries(personaje.atributos ?? {}).map(
                            ([nombre, valor]) => (
                                <div className="detalle-atributo" key={nombre}>
                                    <span>{nombre}</span>
                                    <strong>{valor}</strong>
                                </div>
                            )
                        )}

                        <h2>Rasgos de personalidad</h2>

                        <div className="detalle-rasgos">
                            {personaje.rasgos?.length ? (
                                personaje.rasgos.map((rasgo) => (
                                    <span className="etiqueta-rasgo" key={rasgo}>
                                        {rasgo}
                                    </span>
                                ))
                            ) : (
                                <p>Sin rasgos</p>
                            )}
                        </div>
                    </section>

                    <section className="detalle-historia">
                        <h2>Historia</h2>
                        <p>
                            {personaje.historia || 'Sin historia registrada.'}
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default DetallePersonaje;
