// 액션 타입 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const SET_DIFF = 'SET_DIFF';

// 액션 생성 함수
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});
export const setDiff = (payload) => ({type: SET_DIFF, payload});

// 초기화 코드
const initialState = {
	diff: 1,
	number: 0,
};

export default function countReducer(state = initialState, action = {}) {
	console.log(action);
	switch (action.type) {
		case INCREASE:
			return {...state, number: state.number + state.diff};

		case DECREASE:
			return {...state, number: state.number - state.diff};

		case SET_DIFF:
			return {...state, diff: action.payload};

		default:
			return state;
	}
}
