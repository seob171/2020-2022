import Nav from '../components/Nav.js';
const nav = new Nav();

class Settings {
    constructor() {
        document.title = 'Settings';
    }
    async getHtml() {
        return `
            ${await nav.getHtml()}
            <h1>Settings</h1>
        `;
    }
}
export default Settings;
