import { useMemo, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

/**
 * Componente para gestionar y visualizar los jugadores. Permite realizar búsquedas
 * de jugadores por campos como nombre, equipo, estudio, email y teléfono. También 
 * incluye la funcionalidad de paginación para navegar entre los resultados.
 *
 * @component
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {function} props.onModoCambio - Función que se ejecuta cuando el usuario cambia el modo (crear, editar, etc.).
 * 
 * @returns {React.Element} El componente `CrudJugadores` para gestionar los jugadores.
 */
function CrudJugadores({ onModoCambio }) {
  const seccion = useMemo(() => ({ nombre: "Jugadores" }), []);
  const { items, loading, error, deleteItem } = useCrud(seccion);

  // Estados para la búsqueda y la paginación
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ajusta según tus necesidades

  /**
   * Filtra los jugadores según el término de búsqueda. 
   * Los jugadores son filtrados por nombre, equipo, estudio, dni, email y teléfono.
   */
  const filteredItems = items.filter((jugador) => {
    const query = searchQuery.toLowerCase();
    return (
      jugador.nombre.toLowerCase().includes(query) ||
      jugador.equipo.toLowerCase().includes(query) ||
      jugador.estudio.toLowerCase().includes(query) ||
      jugador.dni.toLowerCase().includes(query) ||
      jugador.email.toLowerCase().includes(query) ||
      jugador.telefono.includes(query)
    );
  });

  // Cálculos para la paginación
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  /**
   * Maneja los cambios en el campo de búsqueda. 
   * Reinicia la paginación a la primera página cuando se cambia la búsqueda.
   * 
   * @param {Object} e - El evento de cambio del campo de búsqueda.
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página al cambiar la búsqueda
  };

  // Si los datos están cargando, se muestra un spinner
  if (loading) {
    return <Spinner />;
  }
  // Si ocurre un error al cargar los datos, se muestra un mensaje de error
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Jugadores</h2>

      {/* Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar jugadores..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Tabla de Jugadores */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Estudio</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((jugador) => (
            <tr key={jugador.slug}>
              <td>{jugador.nombre}</td>
              <td>{jugador.equipo}</td>
              <td>{jugador.estudio}</td>
              <td>{jugador.email}</td>
              <td>{jugador.telefono}</td>
            </tr>
          ))}
          {currentItems.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No hay jugadores disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Componente de paginación */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default CrudJugadores;
