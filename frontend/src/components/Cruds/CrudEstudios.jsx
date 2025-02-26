import { useMemo, useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import { cargarCiclos, cargarCentros } from "../../data/FuncionesCombobox";
import Spinner from "../Spinner";

function CrudEstudios({ onModoCambio }) {
    const seccion = useMemo(() => ({ nombre: "Estudios" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const safeToLower = (value) => (value ? value.toString().toLowerCase() : "");

    const filteredItems = items.filter((estudio) => {
        const query = searchQuery.toLowerCase();
        return (
            safeToLower(estudio.centro).includes(query) ||
            safeToLower(estudio.ciclo).includes(query)
        );
    });

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    // Cargar valores en sessionStorage
    useEffect(() => {
        cargarCentros();
        cargarCiclos();
    }, []);

    const handleEditar = (estudio) => {
        const centros = JSON.parse(sessionStorage.getItem("centros")) || {};
        const ciclos = JSON.parse(sessionStorage.getItem("ciclos")) || {};

        const centro_id = Object.keys(centros).find((key) => centros[key] === estudio.centro) || "";
        const ciclo_id = Object.keys(ciclos).find((key) => ciclos[key] === estudio.ciclo) || "";

        onModoCambio("editar", {
            ...estudio,
            centro_id,
            ciclo_id,
        });
    };

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Estudios</h2>

            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar estudios..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onModoCambio("crear")} // Cambia el modo a "crear"
                >
                    Crear Estudio
                </button>
            </div>

            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Centro</th>
                        <th>Ciclo</th>
                        <th>Curso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((estudio) => (
                        <tr key={estudio.id}>
                            <td>{estudio.centro}</td>
                            <td>{estudio.ciclo}</td>
                            <td>{estudio.curso}</td>
                            <td className="d-flex">
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => handleEditar(estudio)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteItem(estudio.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No hay estudios disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default CrudEstudios;
