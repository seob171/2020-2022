import Components from "./core/Components.js";
import router from "./router.js";
import { $ } from "./util/util.js";
import Nav from "./components/Layout/Nav.js";

export default class App extends Components {
  constructor(props) {
    super(props);
  }

  async initialState() {
    this.setState({});
  }

  template() {
    return `
      <div class="container">
        <section class="nav"></section>
        <section id="app"></section>
      </div>
    `;
  }

  async componentDidMount() {
    window.onload = async () => {
      const view = await router();
      new view($("#app"));
    };
    new Nav($(".nav"));
  }
}
