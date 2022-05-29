// 전역 상태관리를 위한 state
const globalState = {};

// observer 는 렌더링되는 대상 (상태변화를 감지하여 그에 맞게 렌더링 되는 관찰자)
const subscribe = (key, observer) => globalState[key]._observers.add(observer);

// 넣어뒀던 observer를 렌더링 시켜주는 함수
const _notify = (key) =>
  globalState[key]._observers.forEach((observer) => observer());

// 초기상태 설정
const initState = ({ key, defaultValue }) => {
  if (key in globalState) throw Error("이미 존재하는 key값 입니다.");
  globalState[key] = {
    _state: defaultValue,
    _observers: new Set(), // 렌더링 대상을 담을 공간
  };
  return key; // key를 리턴
};

// 현재 state를 가져오는 함수
const getState = (key) => {
  if (!(key in globalState)) throw Error("존재하지 않는 key값 입니다.");
  return globalState[key]._state;
};

// state를 변경하고 렌더링 시켜주는 함수
const setState = (key) => (newState) => {
  if (!(key in globalState)) throw Error("존재하지 않는 key값 입니다.");
  // 상태값이 변경되지 않은경우 렌더링 방지
  if (globalState[key]._state === newState) return;
  globalState[key]._state = newState;
  // 렌더링!
  _notify(key);
};

export { subscribe, initState, getState, setState };
