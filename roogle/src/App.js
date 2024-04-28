import Landing from "./pages/landing.js";
import Register from "./pages/register.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard.js";
import React from "react";
import PrivateRoutes from "./components/privateroute.js";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
