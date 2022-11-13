import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement);

/* RecoilRoot provider를 이용하여 recoil을 사용가능하도록 설정. */
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
);
