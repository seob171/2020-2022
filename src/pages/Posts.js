import Nav from '../components/Nav.js';
const nav = new Nav();

class Posts {
    constructor() {
        document.title = 'Posts';
    }
    async getHtml() {
        return `
            ${await nav.getHtml()}
            <h1>Posts</h1>
        `;
    }
}
export default Posts;
