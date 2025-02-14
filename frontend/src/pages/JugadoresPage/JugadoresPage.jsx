import { useEffect, useState } from "react";
import $negocio from "../../core/negocio";
import Jugador from "../../components/Jugador";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner"
import TablaJugadores from "../../components/Tablas/TablaJugadores";

function JugadoresPage() {
 return(<>
 <TablaJugadores></TablaJugadores>
 </>)
}

export default JugadoresPage;

