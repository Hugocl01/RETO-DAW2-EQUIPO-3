const camposUsuarioFormulario = [
    {
        name: 'username',
        label: 'Usuario',
        type: 'text',
        placeholder: 'Nombre de usuario'
    },
    {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        placeholder: 'Contraseña de usuario'
    },
    {
        name: 'tipo',
        label: 'Rol',
        type: 'select',
        placeholder: 'Seleccione el rol',
        options: [
            { value: 'gestion', label: 'Gestión' },
            { value: 'medico', label: 'Médico' },
            { value: 'admin', label: 'Administrador' }
        ]
    }
];

export default camposUsuarioFormulario;