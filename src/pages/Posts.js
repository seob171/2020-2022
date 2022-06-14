class Posts {
  constructor() {
    document.title = "Posts";
  }
  async getHtml() {
    return `
            <h1>Posts</h1>
        `;
  }
}
export default Posts;
