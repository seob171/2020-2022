import router from "./router.js";
import TextView from "./store/view";
import ChangeTextBtn from "./store/changeTextBtn";

window.onload = () => {
  const app = document.querySelector("#observer");

  const textView = new TextView();
  const changeTextBtn = new ChangeTextBtn();

  app.appendChild(textView.$target);
  app.appendChild(changeTextBtn.$target);

  document.body.addEventListener("click", (e) => {
    // if(e.target.matches('data-link')){
    e.preventDefault();
    window.history.pushState(null, null, e.target.getAttribute("route"));
    router();
    // }
  });
  window.addEventListener("popstate", () => {
    router();
  });
  router();
};
