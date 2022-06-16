import Components from '../core/Components.js';

export default class Posts extends Components {
  constructor(props) {
    super(props); // 추후에 하위로 컴포넌트를 런더링 할 때 필요한 부분
    this.initialState(); // 초기값 설정
  }

  async initialState() {
    this.setState({});
  }

  template() {
    return `
      <div class="container">
        <h1>Posts</h1>
      </div>
    `;
  }

  componentDidMount() {}
}
