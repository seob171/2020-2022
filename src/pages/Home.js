import { $ } from "../util/util.js";
import Components from "../core/Components.js";

export default class Home extends Components {
  constructor(props) {
    super(props); // 추후에 하위로 컴포넌트를 런더링 할 때 필요한 부분
    this.initialState(); // 초기값 설정
  }

  async initialState() {
    this.setState({
      count: 0,
      diff: 1,
    });
  }

  template() {
    return `
      <div class="container">
        <h1>Counter</h1>
        <form class="setDiffForm">
            <input type="number" class="diffInput" value="${
              this.state.diff || 1
            }">
            <button class="diffSubmit">diff 설정</button>
        </form>
        <h2 class="counter">${this.state.count}</h2>
        <button class="increaseBtn">+1</button>
        <button class="decreaseBtn">-1</button>
      </div>
    `;
  }

  componentDidMount() {
    const { handleIncrease, handleDecrease, handleSubmit } = this;
    $(".increaseBtn").addEventListener("click", handleIncrease.bind(this));
    $(".decreaseBtn").addEventListener("click", handleDecrease.bind(this));
    $(".setDiffForm").addEventListener("submit", handleSubmit.bind(this));
  }

  handleIncrease() {
    this.setState({ ...this.state, count: this.state.count + this.state.diff });
  }

  handleDecrease() {
    this.setState({ ...this.state, count: this.state.count - this.state.diff });
  }

  handleSubmit(event) {
    event.preventDefault;
    const diff = parseInt($(".diffInput").value);
    this.setState({ ...this.state, diff: diff });
  }
}
