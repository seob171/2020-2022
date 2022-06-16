export default class Components {
  $target;
  props;
  stete;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  initialState() {
    // 초기 state 영역
    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render();
    console.log('setState : ', this.state);
  }

  template() {
    // JSX와 같이 해당 컴포넌트의 UI를 정의하는 부분
    return ``;
  }

  render() {
    // 실제 브라우저에 뿌려주는 기능
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  componentDidMount() {
    // 이벤트 등록 및 관련 컴포넌트 생성
  }
}
