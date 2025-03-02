import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar y visualizar los perfiles. Solo muestra el campo `tipo`.
 *
 * @component
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando el usuario cambia el modo (crear, editar, etc.).
 * 
 * @returns {React.Element} El componente `CrudPerfiles` para gestionar los perfiles.
 */
function CrudPerfiles({ onModoCambio }) {
    const seccion = useMemo(() => ({ nombre: "Perfiles" }), []);
    const { items, loading, error, deleteItem } = useCrud(seccion);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filtrar por `tipo`
    const filteredItems = items.filter((perfil) =>
        perfil.tipo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Perfiles</h2>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por tipo..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((perfil) => (
                        <tr key={perfil.slug}>
                            <td>{perfil.tipo}</td>
                        </tr>
                    ))}
                    {currentItems.length === 0 && (
                        <tr>
                            <td className="text-center">No hay perfiles disponibles.</td>
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

export default CrudPerfiles;
