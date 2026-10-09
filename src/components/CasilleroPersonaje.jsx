import imagenesPorRaza from '../utils/imagenesPersonajes';

function CasilleroPersonaje({ personaje, onClick, onEliminar, onVerDetalle }) {
    if (personaje) {
        const imagenPersonaje = imagenesPorRaza[personaje.raza];

        return (
            <div className="casillero ocupado">
                <button
                    type="button"
                    className="boton-detalle"
                    onClick={onVerDetalle}
                    aria-label={`Ver detalle de ${personaje.nombre}`}
                >
                    {imagenPersonaje && (
                        <img
                            src={imagenPersonaje}
                            alt={`Retrato de ${personaje.raza}`}
                            className="imagen-personaje"
                        />
                    )}

                    <h2>{personaje.nombre}</h2>
                    <p>{personaje.raza} - {personaje.clase}</p>

                    <small>
                        {personaje.rasgos?.length
                            ? personaje.rasgos.join(', ')
                            : 'Sin rasgos'}
                    </small>
                </button>
                <button
                    type="button"
                    className="boton-eliminar"
                    onClick={onEliminar}
                    aria-label={`Eliminar a ${personaje.nombre}`}
                >
                    ×
                </button>
            </div >
        );
    }

    return (
        <button
            type="button"
            className="casillero vacio"
            onClick={onClick}
            aria-label="Crear personaje"
        >
            <span className="simbolo-mas">+</span>
        </button>
    );
}

export default CasilleroPersonaje;