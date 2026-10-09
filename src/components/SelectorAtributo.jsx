function SelectorAtributo({ nombre, valor, minimo, maximo, onCambiar }) {
    return (
        <div className="selector-atributo">
            <div className="atributo-encabezado">
                <label htmlFor={nombre}>{nombre}</label>
                <span>{valor}</span>
            </div>

            <input
                id={nombre}
                type="range"
                min={minimo}
                max={maximo}
                value={valor}
                onChange={(evento) => onCambiar(Number(evento.target.value))}
            />
        </div>
    );
}

export default SelectorAtributo;
