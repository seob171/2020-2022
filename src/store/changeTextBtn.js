import { setState } from "./observer";
import { textState } from "./index";

export default class ChangeTextBtn {
  constructor() {
    this.$target = document.createElement("div");
    this.setText = setState(textState);
    this.render();
    this.$target.addEventListener("click", this.handleClick.bind(this));
  }
  render() {
    this.$target.innerHTML = `
      <input type="text"/>
      <button>text 변경</button>
    `;
  }

  handleClick({ target }) {
    if (target.tagName !== "BUTTON") return;
    const input = this.$target.querySelector("input");
    this.setText(input.value);
    input.value = "";
  }
}
