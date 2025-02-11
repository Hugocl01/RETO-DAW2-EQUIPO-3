import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Imports para Bootstrap y Bootstrap Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { SeguridadProvider } from './contexts/SeguridadProvider.jsx';
import AppEnrutador from './routers/AppEnrutador.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SeguridadProvider>
            <AppEnrutador />
        </SeguridadProvider>
    </StrictMode>,
)
