import { MEMO_ID } from "../constant";

// 액션 타입 정의
const SET_ITEM = "SET_ITEM";

// 액션 생성 함수
export const setItem = (payload) => ({ type: SET_ITEM, payload });

// 초기화 코드
const initialState = {
  memo: JSON.parse(localStorage.getItem(MEMO_ID)) || [],
};

export default function memoReducer(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    case SET_ITEM:
      // 로컬스토리지 저장
      localStorage.setItem(MEMO_ID, JSON.stringify(action.payload));
      // 리듀서 저장
      return { ...state, memo: action.payload };

    default:
      return state;
  }
}
