function AdministracionMenu({ onSelect }) {
    return (
        <div className="d-flex flex-wrap justify-content-center gap-3 my-4">
            <button onClick={() => onSelect("usuarios")} className="btn btn-primary">Usuarios</button>
            <button onClick={() => onSelect("perfiles")} className="btn btn-primary">Perfiles</button>
            <button onClick={() => onSelect("pabellones")} className="btn btn-primary">Pabellones</button>
            <button onClick={() => onSelect("patrocinadores")} className="btn btn-primary">Patrocinadores</button>
            <button onClick={() => onSelect("centros")} className="btn btn-primary">Centros</button>
            <button onClick={() => onSelect("ciclos")} className="btn btn-primary">Ciclos</button>
        </div>
    );
}

export default AdministracionMenu;
