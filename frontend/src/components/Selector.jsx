function Selector({ opciones, valor = 0, onSelect }) {
    return (
        <select value={valor} onChange={(e) => onSelect(e.target.value)}>
            <option value="0" disabled>Seleccione una opción</option>
            {opciones.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>
                    {opcion.nombre}
                </option>
            ))}
        </select>
    );
}

export default Selector;
