const opcionesRasgos = [
    'Valiente',
    'Inteligente',
    'Sigiloso',
    'Carismático',
    'Impulsivo',
    'Misterioso'
];

function SelectorRasgos({ seleccionados, onCambiar }) {
    function cambiarRasgo(rasgo) {
        if (seleccionados.includes(rasgo)) {
            onCambiar(
                seleccionados.filter((item) => item !== rasgo)
            );
        } else {
            onCambiar([...seleccionados, rasgo]);
        }
    }

    return (
        <fieldset>
            <legend>Rasgos de personalidad</legend>

            {opcionesRasgos.map((rasgo) => (
                <label key={rasgo}>
                    <input
                        type="checkbox"
                        checked={seleccionados.includes(rasgo)}
                        onChange={() => cambiarRasgo(rasgo)}
                    />
                    {rasgo}
                </label>
            ))}
        </fieldset>
    );
}

export default SelectorRasgos;
