import { useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import llamadas from "../../data/FuncionesCombobox";

/**
 * Función que obtiene la lista de centros desde sessionStorage o desde la API.
 * Si los datos están en sessionStorage, los usa; si no, realiza una solicitud a la API.
 * 
 * @returns {Array} Lista de centros en formato [{ value, label }].
 */
const fetchCentros = async () => {
    try {
        const storedData = sessionStorage.getItem("centros");
        if (storedData) {
            console.log("Cargando centros desde sessionStorage");
            const data = JSON.parse(storedData);
            return Object.keys(data).map(key => ({ value: key, label: data[key] }));
        }
        console.log("Cargando centros desde la API...");
        const data = await llamadas().centros();
        if (!data) return [];
        return Object.keys(data).map(key => ({ value: key, label: data[key] }));
    } catch (error) {
        console.error("Error al obtener los centros", error);
        return [];
    }
};

/**
 * Función que obtiene la lista de ciclos desde sessionStorage o desde la API.
 * Si los datos están en sessionStorage, los usa; si no, realiza una solicitud a la API.
 * 
 * @returns {Array} Lista de ciclos en formato [{ value, label }].
 */
const fetchCiclos = async () => {
    try {
        const storedData = sessionStorage.getItem("ciclos");
        if (storedData) {
            console.log("Cargando ciclos desde sessionStorage");
            const data = JSON.parse(storedData);
            return Object.keys(data).map(key => ({ value: key, label: data[key] }));
        }
        console.log("Cargando ciclos desde la API...");
        const data = await llamadas().ciclos();
        if (!data) return [];
        return Object.keys(data).map(key => ({ value: key, label: data[key] }));
    } catch (error) {
        console.error("Error al obtener los ciclos", error);
        return [];
    }
};

/**
 * Componente que gestiona un formulario para crear o editar estudios.
 * Permite seleccionar un centro, un ciclo y un curso, y luego guardar o cancelar los cambios.
 * 
 * @component
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.datosIniciales - Datos iniciales para la edición (si los hay).
 * @param {function} props.onGuardar - Función que se ejecuta cuando se guarda el formulario.
 * @param {function} props.onCancelar - Función que se ejecuta cuando se cancela el formulario.
 * 
 * @returns {React.Element} El componente del formulario para crear o editar un estudio.
 */
function FormularioEstudios({ datosIniciales, onGuardar, onCancelar }) {
    // Estado para el formulario
    const [formData, setFormData] = useState({ centro_id: "", ciclo_id: "", curso: "" });
    const [centros, setCentros] = useState([]);
    const [ciclos, setCiclos] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false); // Para evitar múltiples inicializaciones
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Llamadas a los hooks para las operaciones CRUD
    const { createItem, updateItem, fetchItems, loading, error } = useCrud({ nombre: "Estudios" });

    // Efecto que obtiene centros y ciclos
    useEffect(() => {
        const obtenerCentros = async () => { setCentros(await fetchCentros()); };
        obtenerCentros();

        const obtenerCiclos = async () => { setCiclos(await fetchCiclos()); };
        obtenerCiclos();
    }, []);

    // Efecto que inicializa el formulario si hay datos iniciales
    useEffect(() => {
        if (datosIniciales && centros.length > 0 && ciclos.length > 0 && !isInitialized) {
            const centroSeleccionado = centros.find(centro => centro.label === datosIniciales.centro);
            const cicloSeleccionado = ciclos.find(ciclo => ciclo.label === datosIniciales.ciclo);
            setFormData({
                centro_id: centroSeleccionado ? centroSeleccionado.value : "",
                ciclo_id: cicloSeleccionado ? cicloSeleccionado.value : "",
                curso: datosIniciales.curso ? datosIniciales.curso.toString() : "",
            });
            setIsInitialized(true); // Marcamos que ya se inicializó
        }
    }, [datosIniciales, centros, ciclos, isInitialized]);

    /**
     * Maneja el cambio en los campos del formulario.
     * 
     * @param {Object} event - El evento de cambio.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value.toString() });
    };

    /**
     * Maneja el envío del formulario. Guarda o actualiza los datos según el caso.
     * 
     * @param {Object} event - El evento de envío del formulario.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            if (datosIniciales) {
                await updateItem(datosIniciales.id, formData);
            } else {
                await createItem(formData);
            }
            onGuardar(formData);
        } catch (error) {
            console.error("Error al guardar estudio:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Renderizado del formulario
    return (
        <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
            <h2 className="mb-4 text-center">{datosIniciales ? 'Editar estudio' : 'Crear estudio'}</h2>
            <div className="mb-3">
                <label htmlFor="centro_id" className="form-label">Centro</label>
                <select name="centro_id" id="centro_id" className="form-select" value={formData.centro_id} onChange={handleChange} disabled={isSubmitting}>
                    <option value="" hidden>Seleccione un centro</option>
                    {centros.map((centro) => (<option key={centro.value} value={centro.value}>{centro.label}</option>))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="ciclo_id" className="form-label">Ciclo</label>
                <select name="ciclo_id" id="ciclo_id" className="form-select" value={formData.ciclo_id} onChange={handleChange} disabled={isSubmitting}>
                    <option value="" hidden>Seleccione un ciclo</option>
                    {ciclos.map((ciclo) => (<option key={ciclo.value} value={ciclo.value}>{ciclo.label}</option>))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="curso" className="form-label">Curso</label>
                <select name="curso" id="curso" className="form-select" value={formData.curso} onChange={handleChange} disabled={isSubmitting}>
                    <option value="" hidden>Seleccione un curso</option>
                    <option value="1">1º</option>
                    <option value="2">2º</option>
                </select>
            </div>
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : "Guardar"}</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onCancelar} disabled={isSubmitting}>Cancelar</button>
            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
    );
}

export default FormularioEstudios;
