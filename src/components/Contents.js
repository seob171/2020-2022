import Components from "../core/Component";
import { $ID } from "../util/util";
import { memoStore } from "../store";
import { setItem } from "../modules/setMemo";

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
      <button id="btn_size:${index}" class="btn_size">
          <span class="blind">메모장 크기 조절</span>
      </button>
    `;
  }

  async componentDidMount() {
    const { index } = this.state;
    const { memo } = memoStore.getState();
    const item = memo.find((v) => v.index === index);
    const { order, size, contents } = item;

    const textarea = $ID(`textarea:${index}`);

    textarea.setAttribute(
      "style",
      `width:${size.width}px;height:${size.height}px`
    );
    textarea.innerText = contents;

    let timer = null;
    const debounce = (fn, delay) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };

    const setContents = (e) => {
      const { memo } = memoStore.getState();
      const ordered = memo.map((memo) => {
        if (memo.index === index)
          return { ...memo, contents: e.target.innerText, order: 1 };
        return {
          ...memo,
          ...(memo.order < order && { order: memo.order + 1 }),
        };
      });
      memoStore.dispatch(setItem(ordered));
    };

    textarea.onkeydown = (e) => {
      debounce(() => setContents(e), 500);
    };

    const size_btn = $ID(`btn_size:${index}`);
  }
}
