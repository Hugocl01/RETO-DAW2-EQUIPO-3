import { useState } from "react";
import "../css/Inscribirse.css";
import "../css/JugadorLabel.css";

function JugadorLabel({
  id,
  nombre_completo,
  estudio_id,
  dniCapitan,
  emailCapitan,
  telefonoCapitan,
  esCapitan,
  onRemove,
  onSetCapitan,
  isCapitanDisabled,
  errores,
  estudios,
  numeroJugador,
  onJugadorChange,
}) {
  const [animating, setAnimating] = useState(false);

  // Estados locales de cada campo
  const [nombre, setNombre] = useState(nombre_completo || "");
  const [estudioId, setEstudioId] = useState(estudio_id || "");
  const [dni, setDni] = useState(dniCapitan || "");
  const [email, setEmail] = useState(emailCapitan || "");
  const [telefono, setTelefono] = useState(telefonoCapitan || "");

  // Manejo de cambios en los inputs. Actualiza el estado local y avisa al padre (onJugadorChange) para mantener sincronizado.
  const handleInputChange = (campo, valor) => {
    if (valor !== undefined && valor !== null) {
      if (campo === "nombre_completo") setNombre(valor);
      if (campo === "estudio_id") setEstudioId(valor);
      if (campo === "dni") setDni(valor);
      if (campo === "email") setEmail(valor);
      if (campo === "telefono") setTelefono(valor);

      // Notifica al componente padre de este cambio en un jugador.
      onJugadorChange(id, campo, valor);
    }
  };

  // Eliminar jugador (con un breve efecto de fade-out)
  const handleDelete = () => {
    setAnimating(true);
    setTimeout(() => {
      onRemove(id);
    }, 300);
  };

  return (
    <div
      className={`labelJugador d-flex justify-content-flex align-items-center pe-3 mb-4 h-100 ${
        animating ? "fade-out" : ""
      }`}
    >
      <div className="card p-3 bg-light col-11 w-100" id={`jugador-${id}`}>
        {/* Título: Jugador + Toggle capitán */}
        <div className="tituloJugador w-100 bg-primary py-2 px-3 text-white rounded d-flex align-items-center justify-content-between">
          <h5 className="">Jugador {numeroJugador}</h5>
          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input me-2"
              type="checkbox"
              role="switch"
              id={`capitan-${id}`}
              checked={esCapitan}
              onChange={() => onSetCapitan(id, !esCapitan)}
              disabled={isCapitanDisabled}
            />
            <label className="form-check-label" htmlFor={`capitan-${id}`}>
              Capitán
            </label>
          </div>
        </div>

        {/* Nombre Completo */}
        <div className="mt-3">
          <label>Nombre Completo: *</label>
          <input
            type="text"
            className="form-control"
            name="nombre_completo"
            value={nombre}
            onChange={(e) => handleInputChange("nombre_completo", e.target.value)}
          />
          {/* Error desde Laravel */}
          {errores?.nombre_completo && (
            <span className="text-danger small">{errores.nombre_completo}</span>
          )}
        </div>

        {/* Estudio */}
        <div className="mt-3">
          <label>Estudio: *</label>
          <select
            className="form-select"
            name="estudio_id"
            value={estudioId}
            onChange={(e) => handleInputChange("estudio_id", e.target.value)}
          >
            <option value="">Selecciona un estudio</option>
            {estudios.map((estudio) => (
              <option key={estudio.id} value={estudio.id}>
                {estudio.ciclo} - Curso {estudio.curso}
              </option>
            ))}
          </select>
          {/* Error desde Laravel */}
          {errores?.estudio_id && (
            <span className="text-danger small">{errores.estudio_id}</span>
          )}
        </div>

        {/* Solo aparecen DNI, Email, Teléfono si es Capitán */}
        {esCapitan && (
          <>
            <div className="mt-3">
              <label>DNI: *</label>
              <input
                type="text"
                className="form-control"
                name="dni"
                value={dni}
                onChange={(e) => handleInputChange("dni", e.target.value)}
              />
              {/* Error desde Laravel */}
              {errores?.dni && (
                <span className="text-danger small">{errores.dni}</span>
              )}
            </div>

            <div className="mt-3">
              <label>Email: *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {/* Error desde Laravel */}
              {errores?.email && (
                <span className="text-danger small">{errores.email}</span>
              )}
            </div>

            <div className="mt-3">
              <label>Teléfono: *</label>
              <input
                type="tel"
                className="form-control"
                name="telefono"
                value={telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
              />
              {/* Error desde Laravel */}
              {errores?.telefono && (
                <span className="text-danger small">{errores.telefono}</span>
              )}
            </div>
          </>
        )}

        {/* Botón de eliminación */}
        <div className="eliminar mt-4 d-flex justify-content-center">
          <i
            className="bi bi-trash text-danger fs-4"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default JugadorLabel;
