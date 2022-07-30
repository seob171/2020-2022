import { $ } from "./util/util.js";
import "../css/index.css";
import App from "./App.js";

// core 컴포넌트로 구현한 App 컴포넌트를 html #root div 에 렌더링.
new App($("#root"));
