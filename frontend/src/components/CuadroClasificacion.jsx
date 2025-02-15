import React, { useState } from 'react';

const CuadroClasificacion = ({ titulo, equipos }) => {
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const handleRowClick = (index) => {
    if (filaSeleccionada === index) {
      setFilaSeleccionada(null);
    } else {
      setFilaSeleccionada(index);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{titulo}</h2>
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
              // Para los dos primeros puestos (index < 2), aplicamos 'table-success'
              <tr
                key={equipo.equipo}
                className={
                  fila < 2
                    ? filaSeleccionada === fila
                      // si la fila es verde se cambia a roja
                      ? "table-success table-danger"
                      : "table-success"
                    : filaSeleccionada === fila
                      // si la fila no es verde se pone roja
                      ? "table-danger"
                      : ""
                }
                onClick={() => handleRowClick(fila)}
              >
                <td>{fila + 1}</td>
                <td>{equipo.equipo}</td>
                <td>{equipo.partidos_jugados}</td>
                <td>{equipo.puntos}</td>
                <td>{equipo.goles_favor}</td>
                <td>{equipo.goles_contra}</td>
                <td
                  className={
                    equipo.diferencia_goles >= 0 ? "text-success" : "text-danger"
                  }
                >
                  {equipo.diferencia_goles}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CuadroClasificacion;
