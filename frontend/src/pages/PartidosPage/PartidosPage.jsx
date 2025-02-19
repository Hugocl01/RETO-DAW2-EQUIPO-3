import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import TablaPartidos from "../../components/Partidos/TablaPartidos";
import api from "../../services/api";
//import "../src/components/css/EstilosComun.css";

/**
 *
 * @returns Página Partidos
 */
function PartidosPage() {
  /**
   * Creo estados para guardar los partidos
   * OpcionPartidos es para guardar el estado al cambiar de clasificatorio o eliminatorias
   * OpcionGrupos es para guardar el estado cuando queramos ver los partidos del del grupo A o b
   */
  const [partidos, setPartidos] = useState(null);
  const [opcionPartidos, setOpcionPartidos] = useState("");
  const [opcionGrupos, setGrupos] = useState("A");
  const [cargando, setCargando] = useState(true);

  /**
   * Se ejecuta al cargar el componente
   */
  useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const listaPartidos = await api.get("/partidos");

        if (listaPartidos.data.status === "success") {
          setPartidos(listaPartidos.data.partidos);
          setCargando(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    obtenerPartidos();
  }, []);

  /**
   * Hasta que no cargue los partidos, se mostrará el spinner
   */
  if (cargando) {
    return <Spinner />;
  }

  /**
   * Manejador para los cambios que se produzcan en los selectores
   * @param {event} e
   */
  function handleChange(e) {
    const seleccion = e.target.dataset.seleccion;
    const valor = e.target.value;

    if (seleccion === "partidos") {
      setOpcionPartidos(valor);
    } else {
      setGrupos(valor);
    }
  }

  return (
    <>
      <section className="container-fluid my-5 w-75">
        <div className="row">
          <h2 className="col-12 text-center">Partidos</h2>
        </div>

        <section className="p-3 mb-5 row my-3 border border-primary h-100">
          <h5 className="mb-3">Filtros</h5>
          <div className="w-50 col-md-12 d-flex flex-row justify-content-space-between">
            <select
              className="form-select"
              aria-label="Default select example"
              data-seleccion="partidos"
              value={opcionPartidos}
              onChange={handleChange}
            >
              <option value="">Selecciona tipo</option>
              <option value="clasificatorio">Clasificatorio</option>
              <option value="eliminatorias">Eliminatorias</option>
            </select>

            {/**  
             * Solo mostrar select de grupos si es clasificatorio
             */}
            {opcionPartidos === "clasificatorio" && (
              <select
                className="form-select mx-4"
                aria-label="Default select example"
                data-seleccion="grupos"
                value={opcionGrupos}
                onChange={handleChange}
              >
                <option value="A">Grupo A</option>
                <option value="B">Grupo B</option>
              </select>
            )}
          </div>
        </section>

        {/**
         * No se mostrará mientras no hayas seleccionado una opcion válida
         */}
        <section className="row">
          {opcionPartidos !== "" && (
            <TablaPartidos
              tipo={opcionPartidos}
              grupo={opcionGrupos}
              partidos={partidos}
            />
          )}
        </section>
      </section>
    </>
  );
}

export default PartidosPage;
