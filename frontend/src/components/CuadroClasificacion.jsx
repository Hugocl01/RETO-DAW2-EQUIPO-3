import React, { useState } from "react";
import "./css/CuadroClasificacion.css";
import "./css/EstilosComun.css";

/**
 * Componente que muestra una tabla de clasificación de equipos.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.titulo - El título que se mostrará encima de la tabla.
 * @param {Array<Object>} props.equipos - Un array de objetos que representan los equipos y sus estadísticas.
 * @param {string} props.equipos[].equipo - El nombre del equipo.
 * @param {number} props.equipos[].partidos_jugados - El número de partidos jugados por el equipo.
 * @param {number} props.equipos[].puntos - Los puntos acumulados por el equipo.
 * @param {number} props.equipos[].goles_favor - Los goles a favor del equipo.
 * @param {number} props.equipos[].goles_contra - Los goles en contra del equipo.
 * @param {number} props.equipos[].diferencia_goles - La diferencia de goles del equipo (goles a favor - goles en contra).
 * @returns {JSX.Element} El componente de la tabla de clasificación.
 */
const CuadroClasificacion = ({ titulo, equipos }) => {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  /**
   * Maneja el evento de clic en una fila de la tabla.
   * 
   * @param {number} index - El índice de la fila que se ha clickeado.
   */
  const handleRowClick = (index) => {
    setFilaSeleccionada(filaSeleccionada === index ? null : index);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{titulo}</h2>

      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th className="text-center align-middle">Posición</th>
                <th className="text-center align-middle">Equipo</th>
                <th className="text-center align-middle">Partidos Jugados</th>
                <th className="text-center align-middle">Puntos</th>
                <th className="text-center align-middle">Goles a Favor</th>
                <th className="text-center align-middle">Goles en Contra</th>
                <th className="text-center align-middle">Diferencia de Goles</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((equipo, fila) => (
                <tr
                  key={equipo.equipo}
                  className={`${fila < 2 ? "table-success" : ""} ${filaSeleccionada === fila ? "selected-row" : ""}`}
                  onClick={() => handleRowClick(fila)}
                >
                  <td>{fila + 1}</td>
                  <td>{equipo.equipo}</td>
                  <td>{equipo.partidos_jugados}</td>
                  <td>{equipo.puntos}</td>
                  <td>{equipo.goles_favor}</td>
                  <td>{equipo.goles_contra}</td>
                  <td className={equipo.diferencia_goles >= 0 ? "text-success" : "text-danger"}>
                    {equipo.diferencia_goles}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CuadroClasificacion;
