import Components from "../core/Component";
import { $, $ID } from "../util/util";
import { MEMO_ID } from "../constant";
import { memoStore } from "../store";
import { setItem } from "../modules/setMemo";
import { getNewMemoList } from "../util/memo";

/**************************************************
 * seob - 메모장 컴포넌트 하위 헤더 컴포넌트
 *
 * - 구성 엘리먼트 -
 * 메모장 헤더 h1 엘리먼트
 * close 버튼 엘리먼트
 *
 * - 기능 -
 * close 버튼에 click 이벤트로 wrap 컴포넌트 및 로컬스토리지에서 해당 메모 데이터 삭제
 ***************************************************/
export default class Header extends Components {
  async initialState() {
    this.setState({ index: this.props });
  }

  template() {
    const { index } = this.state;

    return `
        <h1 class="blind">메모장</h1>
        <button id="btn_close:${index}" class="btn_close">
          <span class="blind">닫기</span>
        </button>
    `;
  }

  async componentDidMount() {
    const { index } = this.state;

    const btn_close = $ID(`btn_close:${index}`);
    // close 버튼에 클릭 이벤트 추가
    btn_close.onclick = () => {
      const { index } = this.state;
      const { memo } = memoStore.getState();

      // 메모 타겟을 wrap 엘리먼트에서 제거
      const target = $ID(`${MEMO_ID}:${index}`);
      $(".wrap").removeChild(target);

      // 현재 타겟이 제거된 새 메모 리스트
      const newMemoList = getNewMemoList(memo, index).filter(
        (v) => v.index !== index
      );
      // 새로운 메모 리스트 set
      memoStore.dispatch(setItem(newMemoList));
    };
  }
}
