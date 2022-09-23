import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./pages";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
