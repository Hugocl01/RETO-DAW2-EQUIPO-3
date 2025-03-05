import { useState, useEffect } from "react";
import { useCrud } from "../../hooks/useCrud";
import llamadas from "../../data/FuncionesCombobox";

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

function FormularioEstudios({ datosIniciales, onGuardar, onCancelar }) {
    const [formData, setFormData] = useState({ centro_id: "", ciclo_id: "", curso: "" });
    const [centros, setCentros] = useState([]);
    const [ciclos, setCiclos] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false); // Para evitar múltiples inicializaciones
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createItem, updateItem, fetchItems, loading, error } = useCrud({ nombre: "Estudios" });

    useEffect(() => {
        const obtenerCentros = async () => { setCentros(await fetchCentros()); };
        obtenerCentros();

        const obtenerCiclos = async () => { setCiclos(await fetchCiclos()); };
        obtenerCiclos();
    }, []);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value.toString() });
    };

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
