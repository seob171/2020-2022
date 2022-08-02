/**************************************************
 * seob - 초기 메모 아이템을 리턴하는 함수
 ***************************************************/
export const initialMemo = ({ index, contents, position, size, order }) => {
  return {
    index: index, // element id에 포함된 key
    // 메모 위치 (우클릭 위치)
    position: {
      top: position?.top || 0,
      left: position?.left || 0,
    },
    contents: contents || "", // 메모 내용
    // 메모 크기 (기본 width:200px height:100px)
    size: {
      width: size?.width || 200,
      height: size?.height || 100,
    },
    order: order || index, // 스택 순서
  };
};

/**************************************************
 * seob - {width:100px;height:200px;...} 형태의 객체를 key-value로 변경하여 리턴하는 함수
 ***************************************************/
export const styleToObj = (style) => {
  return style.split(";").reduce((prev, next) => {
    if (next === "") return prev;
    const [key, value] = next.split(":");
    return { ...prev, [key.trim()]: value.trim() };
  }, {});
};

/**************************************************
 * seob - 정규식에 해당되는 문자열을 to 파라미터 값으로 변경하는 함수
 ***************************************************/
export const replaceByRegex = (regex, target, to) => {
  return target.replace(regex, to);
};

/**************************************************
 * seob - index에 해당하는 아이템의 order를 최상단으로 설정하고 해당 아이템의 속성을 변경하여 리턴하는 함수
 ***************************************************/
export const getNewMemoList = (array, index, value = {}) => {
  return array.map((item) => {
    const target = array.find((v) => v.index === index);

    // item의 order가 현재 클릭한 타겟의 order보다 큰 경우 현재 타겟을 최상위로 올려야 하므로 order를 -1씩 감소한다.
    if (item.order > target.order) {
      return { ...item, order: item.order - 1 };
    }
    // item이 현재 타겟이면 order를 현재 배열 아이템중 최상위로 설정한다.
    else if (item.index === index) {
      return {
        ...item,
        order: array.length - 1,
        ...value,
      };
    }
    // item의 order가 현재 클릭한 타겟 order 보다 작은경우 그대로 리턴한다.
    else {
      return item;
    }
  });
};

/**************************************************
 * seob - 드래그 타겟, 드래그 포인트로 타겟 드래그 및 콜백으로 position 제공하는 함수
 ***************************************************/
export const dragElement = (element, dragPointEle, excludeEventTarget, fn) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let position = null;
  dragPointEle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    // 타겟이 닫기 버튼인 경우 close 기능 처리를 위해 return
    if (excludeEventTarget.includes(e.target)) return;
    element.style.zIndex = 99999;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    const top = element.offsetTop - pos2;
    const left = element.offsetLeft - pos1;
    element.style.top = top + "px";
    element.style.left = left + "px";

    position = { top, left };
  }

  // 드래그 이벤트 종료시 부여했던 이벤트 제거
  function closeDragElement(e) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    console.log(position);
    fn(position);
  }
};

/**************************************************
 * seob - 디바운스 클래스
 ***************************************************/
export class Debounce {
  timer = null;
  constructor() {}

  debounce(fn, delay) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(fn, delay);
  }
}
