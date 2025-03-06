/**
 * Componente `Partidos` que muestra una lista de partidos con información sobre los equipos y la hora del partido.
 * 
 * @component
 * @returns {JSX.Element} Componente que representa la lista de partidos.
 */
function Partidos() {
    return (
        <div>
            {/* Primer partido */}
            <div className="container text-center p-4 rounded">
                <div className="row justify-content-center align-items-center bg-light text-dark p-3 rounded">
                    {/* Equipo 1 */}
                    <div className="col-4 bg-secondary p-3 text-white rounded d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
                        Equipo1
                    </div>

                    {/* Hora y VS */}
                    <div className="col-2 d-flex flex-column align-items-center">
                        <div className="w-20 text-center p-1 mb-2 text-white bg-secondary rounded" style={{ minWidth: "150px" }}>
                            18:00
                        </div>
                        <div className="w-30 text-center p-1 mb-2 rounded" style={{ minWidth: "150px" }}>
                            VS.
                        </div>
                    </div>

                    {/* Equipo 2 */}
                    <div className="col-4 bg-secondary p-3 text-white rounded d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
                        Equipo2
                    </div>
                </div>
            </div>

            {/* Segundo partido */}
            <div className="container text-center p-4 rounded">
                <div className="row justify-content-center align-items-center bg-light text-dark p-3 rounded">
                    {/* Equipo 1 */}
                    <div className="col-4 bg-secondary p-3 text-white rounded d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
                        Equipo1
                    </div>

                    {/* Hora y VS */}
                    <div className="col-2 d-flex flex-column align-items-center">
                        <div className="w-20 text-center p-1 mb-2 text-white bg-secondary rounded" style={{ minWidth: "150px" }}>
                            19:00
                        </div>
                        <div className="w-30 text-center p-1 mb-2 rounded" style={{ minWidth: "150px" }}>
                            VS.
                        </div>
                    </div>

                    {/* Equipo 2 */}
                    <div className="col-4 bg-secondary p-3 text-white rounded d-flex align-items-center justify-content-center" style={{ height: "60px" }}>
                        Equipo2
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partidos;
