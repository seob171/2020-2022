import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, NotFound, Bookmark, Issues } from "./pages/index";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/issues" element={<Issues />} />
                        <Route path="/bookmark" element={<Bookmark />} />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </RecoilRoot>
    );
};

export default App;
