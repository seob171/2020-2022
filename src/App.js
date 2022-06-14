import Home from "./pages/Home.js";
import Posts from "./pages/Posts.js";
import Settings from "./pages/Settings.js";
import NotFound from "./pages/NotFound.js";
import Components from "./core/Components.js";
import { $ } from "./util/util.js";
import Router from "./router";

const CHANGE_ROUTE_EVENT = "locationChange";

export default class App extends Components {
  async initialState() {
    this.setState({});
  }

  template() {
    return `
      <h1>App</h1>
      <nav>
        <li data-navigate="/">home</li>
        <li data-navigate="/posts">posts</li>
        <li data-navigate="/setting">setting</li>
      </nav>
      <section class="home"></section>
      <section class="posts"></section>
      <section class="setting"></section>
      <section class="notFound"></section>
    `;
  }

  componentDidMount() {
    const router = new Router();

    router
      .addRoute("/", new Home($(".home")))
      .addRoute("/posts", new Posts($(".posts")))
      .addRoute("/setting", new Settings($(".setting")))
      .route();
  }
}
