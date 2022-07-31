import Components from "./core/Component.js";
import Memo from "./components/Memo";
import { $, $ID } from "./util/util";
import { MEMO_ID } from "./constant";
import { memoStore } from "./store";
import { setItem } from "./modules/setMemo";

export default class App extends Components {
  template() {
    return `
      <div class="wrap"></div>
    `;
  }

  // 메모 속성을 전달받아 메모 엘리먼트 생성하는 함수
  handleCreateMemo(item) {
    const memo = document.createElement("div");
    memo.classList.add("memo");
    memo.setAttribute("id", `${MEMO_ID}:${item.index}`);
    memo.setAttribute(
      "style",
      `top:${item.position.top}px;left:${item.position.left}px;z-index:${item.order}`
    );
    $(".wrap").appendChild(memo);
    const newMemo = new Memo($ID(`${MEMO_ID}:${item.index}`), item.index);
    memoStore.subscribe(() => {
      newMemo.render();
    });
  }

  // 초기 렌더링시 로컬스토리지에 저장된 메모리스트를 불러와 화면에 렌더링하는 함수
  async handleLocalMemo() {
    const { memo } = memoStore.getState();
    for await (let item of memo) {
      this.handleCreateMemo(item);
    }
  }

  // 초기 메모 아이템 리턴함수
  getMemoItem(event, index) {
    // 로컬스토리지에 저장할 메모 아이템 정보
    return {
      index: index, // element id에 포함된 key
      contents: "", // 메모 내용
      // 메모 위치 (우클릭 위치)
      position: {
        top: event.clientY,
        left: event.clientX,
      },
      // 메모 크기 (기본 width:200px height:100px)
      size: {
        width: 200,
        height: 100,
      },
      order: index, // 스택 순서
    };
  }
  // const handleSetItem = (payload) => {
  //   memoStore.dispatch(setItem(payload));
  // };

  async componentDidMount() {
    const target = $(".wrap");
    // 템플릿이 렌더링 된 후 로컬스토리지에 저장된 이전 메모 렌더링
    await this.handleLocalMemo();

    // wrap 엘리먼트에 컨텍스트 메뉴 함수 추가
    target.oncontextmenu = (e) => {
      const { memo } = memoStore.getState();
      console.log(memo);
      e.preventDefault();

      // 마우스 우클릭 타겟이 회색 바탕화면이 아닌경우 return
      if (e.target !== target) return;

      // 전달할 memo 아이템
      const memoItem = this.getMemoItem(e, memo.length);
      memoStore.dispatch(setItem([...memo, memoItem]));
      this.handleCreateMemo(memoItem);
    };
  }
}
