/**************************************************
 * seob - 옵저버 패턴을 이용하여 리덕스 구현
 ***************************************************/
export function createStore(reducer) {
  let state;
  const listeners = new Set();

  // 현재 state를 읽는 함수
  const getState = () => ({ ...state });

  // 리듀서 state를 업데이트 하는 함수
  const dispatch = (action) => {
    state = reducer(state, action);
    console.log("update state");
    publish();
  };

  // 컴포넌트 구독 함수
  const subscribe = (fn) => listeners.add(fn);
  // 구독한 컴포넌트를 dispatch 발생시 렌더링
  const publish = () => listeners.forEach((fn) => fn());

  return {
    getState,
    dispatch,
    subscribe,
  };
}
