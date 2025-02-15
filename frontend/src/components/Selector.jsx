function Selector({ opciones, valor = 0 }) {

    return (
        <select name="" id="" value={valor}>
            <option value="0" selected disabled>Seleccione una opción</option>
            {opciones.map((opcion) => {
                <opcion value={opcion.id}>{opcion.nombre}</opcion>
            })}
        </select>
    );
}

export default Selector;