import Landing from "./pages/landing.js";
import Register from "./pages/register.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard.js";
import React from "react";
import PrivateRoutes from "./components/privateroute.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Final-Project-V2" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
