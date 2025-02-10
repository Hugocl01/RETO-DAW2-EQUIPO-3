import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout.jsx";
import InicioPage from "../pages/InicioPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

function AppEnrutador() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<InicioPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppEnrutador;