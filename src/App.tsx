import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Home, Issue, Save, NotFound } from "./pages";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/issue" element={<Issue />} />
                    <Route path="/save" element={<Save />} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    );
};

export default App;
