class Settings {
  constructor() {
    document.title = "Settings";
  }
  async getHtml() {
    return `
            <h1>Settings</h1>
        `;
  }
}
export default Settings;
