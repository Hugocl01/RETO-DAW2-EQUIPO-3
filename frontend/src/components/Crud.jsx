function Crud({ seccion }) {
    if (!seccion) {
        return <p>No se ha seleccionado ninguna sección.</p>;
    }

    return (
        <>
            <h3>{seccion.nombre}</h3>
            <p>Descripción: {seccion.descripcion}</p>
        </>
    );
}

export default Crud;
