import Components from "./core/Component.js";
import Memo from "./components/Memo";
import { $, $ID } from "./util/util";
import { MEMO_ID } from "./constant";
import { memoStore } from "./store";
import { setItem } from "./modules/setMemo";
import { initialMemo } from "./util/memo";

export default class App extends Components {
  template() {
    return `
      <div class="wrap"></div>
    `;
  }

  // 메모 속성을 전달받아 메모 엘리먼트 생성하는 함수
  handleCreateMemo(item) {
    console.log(item);
    // memo 엘리먼트 생성
    const memo = document.createElement("div");
    // style 사용을 위한 memo 클래스 추가
    memo.classList.add("memo");
    // 각각의 메모를 구분하기 위한 memo id 추가
    memo.setAttribute("id", `${MEMO_ID}:${item.index}`);
    // memo 엘리먼트에 메모 위치 및 스택 순서 설정
    memo.setAttribute(
      "style",
      `top:${item.position.top}px;left:${item.position.left}px;z-index:${item.order}`
    );
    // wrap 엘리먼트에 memo 엘리먼트 추가
    $(".wrap").appendChild(memo);
    // 생성한 element를 Memo 클래스의 target으로 설정
    const newMemo = new Memo($ID(`${MEMO_ID}:${item.index}`), item.index);
    // redux store 데이터 변경시 리렌더링을 위한 newMemo 컴포넌트 subscribe
    memoStore.subscribe(() => {
      newMemo.render();
    });
  }

  // src/modules/setMemo.js 의 memo state에 저장된 초기 로컬스토리지 데이터를 읽어와 각 데이터 기반 메모 컴포넌트 생성
  async handleLocalMemo() {
    const { memo } = memoStore.getState();
    console.log(memo);
    for await (let prevMemo of memo) {
      this.handleCreateMemo(prevMemo);
    }
  }

  async componentDidMount() {
    const wrapElement = $(".wrap");
    // 템플릿이 렌더링 된 후 로컬스토리지에 저장된 이전 메모 렌더링
    await this.handleLocalMemo();

    // wrap 엘리먼트에 컨텍스트 메뉴 함수 추가
    wrapElement.oncontextmenu = (e) => {
      const { memo } = memoStore.getState();
      console.log(memo);
      e.preventDefault();

      // 마우스 우클릭 타겟이 회색 바탕화면이 아닌경우 return
      if (e.target !== wrapElement) return;

      // 전달할 memo 아이템
      const newMemo = initialMemo({
        index: memo.length,
        position: { top: e.clientY, left: e.clientX },
      });
      // this.getMemoItem(e, memo.length);
      memoStore.dispatch(setItem([...memo, newMemo]));
      this.handleCreateMemo(newMemo);
    };
  }
}
