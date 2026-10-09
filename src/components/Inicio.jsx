
import CasilleroPersonaje from './CasilleroPersonaje';

function Inicio({
    personajes,
    onSeleccionarCasillero,
    onEliminarPersonaje,
    onVerDetallePersonaje
}) {
    return (
        <main>
            <h1>Creador de personajes</h1>

            <div className="contenedor-casilleros">
                {personajes.map((personaje, indice) => (
                    <CasilleroPersonaje
                        key={indice}
                        personaje={personaje}
                        onClick={() => onSeleccionarCasillero(indice)}
                        onEliminar={() => onEliminarPersonaje(indice)}
                        onVerDetalle={() => onVerDetallePersonaje(indice)}
                    />
                ))}
            </div>
        </main>
    );
}

export default Inicio;
