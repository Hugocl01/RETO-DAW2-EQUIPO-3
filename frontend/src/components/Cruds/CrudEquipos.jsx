import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator"; // Asegúrate de la ruta correcta

function CrudEquipos({ onModoCambio }) {
  // Memoriza la sección para evitar recrearla en cada render
  const seccion = useMemo(() => ({ nombre: "Equipos" }), []);
  const { items, loading, error, deleteItem } = useCrud(seccion);

  // Estados para búsqueda y paginación
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ajusta según tus necesidades

  // Filtrado de items según el término de búsqueda (por ejemplo, por todos los campos visibles en la tabla)
  const filteredItems = items.filter((equipo) => {
    const query = searchQuery.toLowerCase();
    return (
      equipo.nombre.toLowerCase().includes(query) ||
      equipo.centro.toLowerCase().includes(query) ||
      equipo.grupo.toLowerCase().includes(query) ||
      equipo.entrenador.toLowerCase().includes(query) ||
      (equipo.inscripcion?.estado?.toString().toLowerCase().includes(query) || '') ||
      (equipo.stats?.goles?.toString().includes(query) || '') // Para los goles, que son numéricos
    );
  });  

  // Cálculos de paginación
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página en cada búsqueda
  };

  if (loading) return <p>Cargando equipos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Equipos</h2>

      {/* Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar equipos..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Tabla de datos */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Centro</th>
            <th>Grupo</th>
            <th>Entrenador</th>
            <th>Estado Inscripción</th>
            <th>Goles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((equipo) => (
            <tr key={equipo.slug}>
              <td>{equipo.nombre}</td>
              <td>{equipo.centro}</td>
              <td>{equipo.grupo}</td>
              <td>{equipo.entrenador}</td>
              <td>{equipo.inscripcion?.estado}</td>
              <td>{equipo.stats?.goles}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onModoCambio("editar", equipo)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteItem(equipo.slug)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                No hay equipos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Componente de paginación reutilizable */}
      <Paginator 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
}

export default CrudEquipos;
