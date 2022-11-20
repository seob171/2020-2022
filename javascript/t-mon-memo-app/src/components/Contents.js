import Components from "../core/Component";
import { $ID } from "../util/util";
import { memoStore } from "../store";
import { setItem } from "../modules/setMemo";
import { MEMO_ID } from "../constant";
import { Debounce, getNewMemoList } from "../util/memo";

/**************************************************
 * seob - 메모장 컴포넌트의 하위 컨텐츠 컴포넌트
 *
 * - 구성 컴포넌트 -
 * 컨텐츠 div 엘리먼트
 *
 * - 기능 -
 * keydown 이벤트로 컨텐츠 컴포넌트 내용 변경 기능
 * focus 이벤트로 포커스시 컴포넌트 order를 최상단으로 변경
 * blur 이벤트로 블러시 마지막으로 설정된 order로 변경
 ***************************************************/
export default class Contents extends Components {
  async initialState() {
    this.setState({ index: this.props });
  }

  template() {
    const { index } = this.state;

    return `
      <div
        id="textarea:${index}"
        class="textarea"
        contentEditable="true"
      >
      </div>
    `;
  }

  async componentDidMount() {
    const Debouncer = new Debounce();
    const { index } = this.state;
    const { memo } = memoStore.getState();

    const target = memo.find((v) => v.index === index);
    if (!target) return;

    // 초기 스타일 및 컨텐츠 삽입
    const { contents } = target;
    const textarea = $ID(`textarea:${index}`);
    textarea.setAttribute("style", `width:100%;height:100%`);
    textarea.innerText = contents;

    // 리덕스에 컨텐츠 저장
    const setContents = (e) => {
      const { memo } = memoStore.getState();

      const newMemoList = getNewMemoList(memo, index, {
        contents: e.target.innerText,
      });
      memoStore.dispatch(setItem(newMemoList));
    };

    // 로컬스토리지에 컨텐츠 저장
    const saveContents = (e) => {
      const { memo } = memoStore.getState();
      console.log(e.target.innerText);
      const newMemoList = getNewMemoList(memo, index, {
        contents: e.target.innerText,
      });
      localStorage.setItem(MEMO_ID, JSON.stringify(newMemoList));
    };

    // textarea에 keydown 이벤트 시 디바운스로 contents, order 변경 처리
    textarea.onkeydown = (e) => {
      Debouncer.debounce(() => saveContents(e), 200);
    };

    // textarea에 포커스 이벤트 발생시 z-index를 현재 리스트중에서 가장 높은 값으로 설정
    textarea.onfocus = (e) => {
      const currentMemo = $ID(`${MEMO_ID}:${index}`);
      const { memo } = memoStore.getState();
      currentMemo.style.zIndex = memo.length;
    };

    // textarea에 블러 이벤트 발생시 z-index를 마지막에 설정된 order로 변경
    textarea.onblur = (e) => {
      const currentMemo = $ID(`${MEMO_ID}:${index}`);
      const { memo } = memoStore.getState();
      const item = memo.find((value) => value.index === index);
      if (item) currentMemo.style.zIndex = item.order;
      setContents(e);
    };
  }
}
