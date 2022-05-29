import { getState, subscribe } from "./observer.js";
import { textState } from "./index.js";

export default class TextView {
  constructor() {
    this.$target = document.createElement("div");
    subscribe(textState, this.render.bind(this));
    this.render();
  }

  render() {
    const text = getState(textState);
    this.$target.innerHTML = `
        <div>${text}</div>
      `;
  }
}
