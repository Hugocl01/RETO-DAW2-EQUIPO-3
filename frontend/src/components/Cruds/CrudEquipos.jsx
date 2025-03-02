import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar y visualizar los equipos. Permite realizar búsqueda 
 * de equipos y ver la información de cada uno, incluyendo el nombre, centro, 
 * grupo, entrenador, estado de inscripción y goles. También incluye la 
 * funcionalidad de paginación.
 *
 * @component
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando el usuario cambia el modo (crear, editar, etc.).
 * 
 * @returns {React.Element} El componente `CrudEquipos` para gestionar los equipos.
 */
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

  /**
   * Maneja el cambio en el término de búsqueda. Se reinicia a la primera página cada vez que cambia la búsqueda.
   * 
   * @param {Object} e - El evento de cambio del campo de búsqueda.
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página en cada búsqueda
  };

  // Si los datos están cargando, mostramos el spinner
  if (loading) {
    return <Spinner />;
  }
  // Si hay un error en la carga, mostramos un mensaje de error
  if (error) {
    return <p>Error: {error}</p>;
  }
  
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
