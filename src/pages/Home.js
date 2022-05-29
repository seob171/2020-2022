import Nav from "../components/Nav.js";
const nav = new Nav();

class Home {
  constructor() {
    document.title = "Home";
  }
  async getHtml() {
    return `
            ${await nav.getHtml()}
            <h1>Home</h1>
        `;
  }
}
export default Home;
