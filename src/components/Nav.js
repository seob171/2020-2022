class Nav {
    constructor() {}
    async getHtml() {
        return `
            <nav>
                <button route="/" data-link>Home</button>
                <button route="/posts" data-link>Posts</button>
                <button route="/settings" data-link>Settings</button>
            </nav>
        `;
    }
}

export default Nav;
