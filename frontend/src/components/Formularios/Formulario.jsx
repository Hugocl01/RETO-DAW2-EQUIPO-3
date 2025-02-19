import { useEffect, useState } from "react";

/**
 * Componente de formulario genérico.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.datosIniciales - Los datos iniciales del formulario.
 * @param {Function} props.onGuardar - Función que se ejecuta al guardar el formulario.
 * @param {Array} props.camposFormulario - Configuración de los campos del formulario.
 * @param {Function} props.onValidar - Función de validación del formulario.
 * @param {Function} props.onCancelar - Función que se ejecuta al cancelar el formulario.
 * @returns {JSX.Element} El formulario genérico.
 */
function Formulario({ datosIniciales, onGuardar, camposFormulario, onCancelar }) {

    console.log(datosIniciales)
    // Estados
    const [formData, setFormData] = useState({});
    const [errores, setErrores] = useState({});

    // Al montar el componente y si hay cambios en la propiedad 'datosIniciales'
    useEffect(() => {
        if (datosIniciales) {
            setFormData(datosIniciales);
        }
    }, [datosIniciales]);

    console.log(formData)
    // Funciones
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nuevosErrores = '';
        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length === 0) {
            onGuardar(formData);
        }
    };

    // Renderizado
    return (
        <form onSubmit={handleSubmit} className="formulario">
            {camposFormulario.map((campo) => (
                <div key={campo.name}>
                    <label htmlFor={campo.name}>{campo.label}</label>
                    {campo.type === 'select' ? (
                        <select name={campo.name} id={campo.name} value={formData[campo.name] || ''} onChange={handleChange} className="selector">
                            <option value="" hidden>{campo.placeholder}</option>
                            {campo.options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    ) : campo.type === 'textarea' ? (
                        <textarea name={campo.name} id={campo.name} value={formData[campo.name] || ''} onChange={handleChange} className="input"></textarea>
                    ) : (
                        <input type={campo.type} name={campo.name} id={campo.name} value={formData[campo.name] || ''} onChange={handleChange} className="input" />
                    )}
                    {errores[campo.name] && <span className="error-formulario">{errores[campo.name]}</span>}
                </div>
            ))}
            <div className="botones-formulario">
                <button type="submit" className="boton" title="Guardar los datos.">Guardar</button>
                <button type="button" className="boton cancelar" onClick={onCancelar} title="Cancelar y volver a la tabla.">Cancelar</button>
            </div>
        </form>
    );
}

export default Formulario;
