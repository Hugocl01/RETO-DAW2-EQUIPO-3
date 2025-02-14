import React, { useState, useEffect } from "react";

function EditForm({ item, onSave, onCancel }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Inicializar el estado con los datos del objeto cuando cambia el `item`
        setFormData(item);
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Llamar la función `onSave` al guardar
    };

    console.log(item)

    return (
        <div>
            <h3>Editar {item.nombre || 'Entidad'}</h3>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key] ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default EditForm;