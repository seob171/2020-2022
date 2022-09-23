import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Home, NotFound } from "./pages";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<NotFound />} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    );
};

export default App;
