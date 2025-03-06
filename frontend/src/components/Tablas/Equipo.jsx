import img1 from '../../assets/imagenes/img1.jpg';

/**
 * Componente para mostrar la información de un equipo.
 * Permite navegar a la vista detallada del equipo al hacer clic en su nombre o imagen.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.equipo - Objeto que contiene la información del equipo.
 * @param {Function} props.fnNavegar - Función para navegar a la vista detallada del equipo.
 * @returns {JSX.Element} Componente de equipo.
 */
function Equipo({ equipo, fnNavegar }) {
  /**
   * Maneja el clic en el nombre o la imagen del equipo para navegar a su vista detallada.
   */
  function handleClickNavegar() {
    fnNavegar(equipo.slug);
  }

  return (
    <div className="row border-bottom py-2">
      <div className="col-6 d-flex flex-row justify-content-center text" onClick={handleClickNavegar}>
        <div className="d-flex flex-row w-75">
          <img
            src={img1}
            alt={`imagen${equipo.slug}`}
            style={{ width: "20%" }}
            className="flex-1"
          />
          <p className="m-0 justify-self-center text-center w-100 h5">{equipo.slug}</p>
        </div>
      </div>
      <div className="col-2 text-center h5">{equipo.stats.goles}</div>
      <div className="col-2 text-center h5">
        {equipo.stats.tarjetas_amarillas}
      </div>
      <div className="col-2 text-center h5">{equipo.stats.tarjetas_rojas}</div>
    </div>
  );
}

export default Equipo;
