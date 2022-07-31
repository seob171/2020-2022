import Components from "../core/Component";
import { $, $ID } from "../util/util";
import { MEMO_ID } from "../constant";
import { memoStore } from "../store";
import { setItem } from "../modules/setMemo";

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

  //
  deleteMemo() {
    const { index } = this.state;
    const { memo } = memoStore.getState();

    const target = $ID(`${MEMO_ID}:${index}`);
    console.log(target);
    $(".wrap").removeChild(target);

    const item = memo.find((v) => v.index === index);
    if (!item) return;
    const filtered = memo.filter((memo) => memo.index !== index);
    const ordered = filtered.map((memo) => {
      return {
        ...memo,
        ...(memo.order > item.order && { order: memo.order - 1 }),
      };
    });
    memoStore.dispatch(setItem(ordered));
  }

  async componentDidMount() {
    const { index } = this.state;

    // close 버튼
    const btn_close = $ID(`btn_close:${index}`);

    // close 버튼 클릭 이벤트 - index 에 해당하는 item 삭제
    btn_close.onclick = () => this.deleteMemo();
  }
}
