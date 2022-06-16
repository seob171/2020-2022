import {$} from '../util/util.js';
import Components from '../core/Components.js';
import {counterStore} from '../store.js';
import {decrease, increase, setDiff} from '../modules/counter.js';

export default class Home extends Components {
	constructor(props) {
		super(props); // 추후에 하위로 컴포넌트를 런더링 할 때 필요한 부분
		// this.initialState(); // [ store 상태 관리 전 ] 초기값 설정
		counterStore.subscribe(this.render.bind(this));
	}

	// async initialState() {
	//   // [ store 상태 관리 전 ]
	//   this.setState({
	//     //   count: 0,
	//     //   diff: 1,
	//   });
	// }

	template() {
		const {diff, number} = counterStore.getState();
		console.log(diff, number);

		return `
      <div class="container">
        <h1>Counter</h1>
        <form class="setDiffForm">
            <input type="number" class="diffInput" value="${diff || 1}">
            <button class="diffSubmit">diff 설정</button>
        </form>
        <h2 class="counter">${number}</h2>
        <button class="increaseBtn">+1</button>
        <button class="decreaseBtn">-1</button>
      </div>
    `;
	}

	componentDidMount() {
		const {handleIncrease, handleDecrease, handleSubmit} = this;
		$('.increaseBtn').addEventListener('click', handleIncrease.bind(this));
		$('.decreaseBtn').addEventListener('click', handleDecrease.bind(this));
		$('.setDiffForm').addEventListener('submit', handleSubmit.bind(this));
	}

	handleIncrease() {
		// [ store 상태 관리 전 ]
		// this.setState({ ...this.state, count: this.state.count + this.state.diff });
		const diff = parseInt($('.diffInput').value);
		diff && counterStore.dispatch(increase());
	}

	handleDecrease() {
		// [ store 상태 관리 전 ]
		// this.setState({ ...this.state, count: this.state.count - this.state.diff });
		const diff = parseInt($('.diffInput').value);
		diff && counterStore.dispatch(decrease());
	}

	handleSubmit(event) {
		event.preventDefault;
		// [ store 상태 관리 전 ]
		// const diff = parseInt($(".diffInput").value);
		// this.setState({ ...this.state, diff: diff });
		const diff = parseInt($('.diffInput').value);
		console.log(diff);
		diff && counterStore.dispatch(setDiff(diff));
	}
}
