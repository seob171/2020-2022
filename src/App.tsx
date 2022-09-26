import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./pages/index";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
