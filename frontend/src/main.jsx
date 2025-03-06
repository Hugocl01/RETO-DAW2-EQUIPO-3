import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Imports para Bootstrap y Bootstrap Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css"; 
import "./index.css";

import { SeguridadProvider } from './contexts/SeguridadProvider.jsx';
import AppEnrutador from './routers/AppEnrutador.jsx';

/**
 * Punto de entrada principal de la aplicación.
 * Este archivo es responsable de inicializar la aplicación de React y montar el árbol de componentes en el DOM.
 * 
 * - Se aplica el `SeguridadProvider` para que todos los componentes hijos puedan acceder a los datos de seguridad/autenticación.
 * - Se importa y aplica Bootstrap y Bootstrap Icons para los estilos y la funcionalidad de la interfaz de usuario.
 * - Se utiliza `StrictMode` para activar advertencias sobre el ciclo de vida de los componentes y posibles problemas.
 * 
 * @module MainEntry
 * @function
 * @example
 * // Este archivo se ejecuta al iniciar la aplicación.
 * // No es necesario invocar una función manualmente, ya que es el punto de entrada.
 */

/**
 * Renderiza la aplicación en el elemento del DOM con el ID `root`.
 * 
 * @function
 * @returns {void}
 * @example
 * // Monta la aplicación en el DOM.
 * createRoot(document.getElementById('root')).render(
 *     <StrictMode>
 *         <SeguridadProvider>
 *             <AppEnrutador />
 *         </SeguridadProvider>
 *     </StrictMode>
 * );
 */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Proveedor de seguridad que envuelve la aplicación */}
        <SeguridadProvider>
            {/* Componente de enrutamiento de la aplicación */}
            <AppEnrutador />
        </SeguridadProvider>
    </StrictMode>,
);
