import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./pages/index";
import { ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;
