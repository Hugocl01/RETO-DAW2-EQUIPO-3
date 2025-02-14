import React from "react";

const CuadroClasificacion = ({ titulo, equipos }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{titulo}</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Posición</th>
            <th>Equipo</th>
            <th>Partidos Jugados</th>
            <th>Puntos</th>
            <th>Goles a Favor</th>
            <th>Goles en Contra</th>
            <th>Diferencia de Goles</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo, index) => (
            // Para los dos primeros puestos (index < 2), aplicamos 'table-success'
            <tr
              key={equipo.equipo}
              className={index < 2 ? "table-success" : ""}
            >
              <td>{index + 1}</td>
              <td>
                {equipo.equipo}
              </td>
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
  );
};

export default CuadroClasificacion;
