import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Equipo from "../../components/Equipo";
import api from "../../services/api.js";
import Spinner from "../../components/Spinner.jsx";

function EquiposPage() {
  const [equipos, setEquipos] = useState(null);
  const [error, setError] = useState(null);
  const navegar = useNavigate();

  useEffect(() => {
    const obtenerListadoEquipos = async () => {
      try {
        const resultado = await api.get("/equipos");
        if (resultado.data.status === "success" && Array.isArray(resultado.data.equipos)) {
          setEquipos(resultado.data.equipos);
        } else {
          setError("No se pudo cargar la lista de equipos.");
        }
      } catch (error) {
        console.error(error);
        setError("Hubo un error al cargar los equipos.");
      }
    };

    obtenerListadoEquipos();
  }, []);

  if (error) {
    return <p className="text-center mt-5">{error}</p>;
  }

  if (!equipos) {
    return <Spinner />;
  }

  function navegarDetalleEquipo(slug) {
    navegar(`/equipos/${slug}`);
  }

  return (
    <>
      <title>Equipos</title>
      <section className="container-fluid py-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1>Listado de Equipos</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {equipos.map((equipo) => (
            <Equipo
              key={equipo.slug}
              equipoObtenido={equipo}
              fnNavegar={navegarDetalleEquipo}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default EquiposPage;
