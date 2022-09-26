import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./pages/index";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </RecoilRoot>
    );
};

export default App;
