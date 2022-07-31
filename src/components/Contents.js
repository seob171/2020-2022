import Components from "../core/Component";
import { $ID } from "../util/util";
import { memoStore } from "../store";
import { setItem } from "../modules/setMemo";
import { MEMO_ID } from "../constant";

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
    const { index } = this.state;
    const { memo } = memoStore.getState();

    const target = memo.find((v) => v.index === index);
    if (!target) return;
    console.log(target);
    const { size, contents } = target;

    const textarea = $ID(`textarea:${index}`);

    textarea.setAttribute(
      "style",
      `width:${size.width}px;height:${size.height}px`
    );
    textarea.style.overflow = "auto";
    textarea.style.resize = "both";
    textarea.innerText = contents;

    let timer = null;
    const debounce = (fn, delay) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };

    const setContents = (e) => {
      const { memo } = memoStore.getState();
      const target = memo.find((v) => v.index === index);

      const ordered = memo.map((item) => {
        // item의 order가 현재 클릭한 타겟의 order보다 큰 경우 현재 타겟을 최상위로 올려야 하므로 order를 -1씩 감소한다.
        if (item.order > target.order) {
          return { ...item, order: item.order - 1 };
        }
        // item이 현재 타겟이면 order를 현재 배열 아이템중 최상위로 설정한다.
        else if (item.index === target.index) {
          return {
            ...item,
            contents: e.target.innerText,
            order: memo.length - 1,
          };
        }
        // item의 order가 현재 클릭한 타겟 order보다 작은경우 그대로 리턴한다.
        else {
          return item;
        }
      });
      memoStore.dispatch(setItem(ordered));
    };

    // textarea에 keydown 이벤트 시 디바운스로 contents, order 변경 처리
    textarea.onkeydown = (e) => {
      debounce(() => setContents(e), 500);
    };

    // textarea에 포커스 이벤트 발생시 z-index를 현재 리스트중에서 가장 높은 값으로 설정
    textarea.onfocus = (e) => {
      const currentMemo = $ID(`${MEMO_ID}:${index}`);
      console.log(e.currentTarget);
      const { memo } = memoStore.getState();
      currentMemo.style.zIndex = memo.length;
    };

    // textarea에 블러 이벤트 발생시 z-index를 마지막에 설정된 order로 변경
    textarea.onblur = (e) => {
      const currentMemo = $ID(`${MEMO_ID}:${index}`);
      const { memo } = memoStore.getState();
      const item = memo.find((value) => value.index === index);
      if (item) currentMemo.style.zIndex = item.order;
    };

    textarea.onmouseup = (e) => {
      const style = textarea.getAttribute("style");
      const styleObj = style.split(";").reduce((prev, next) => {
        if (next === "") return prev;
        const [key, value] = next.split(":");
        return { ...prev, [key.trim()]: value.trim() };
      }, {});
      console.log(styleObj);
      const regex = /[^0-9]/g;

      const width = styleObj.width.replace(regex, "");
      const height = styleObj.height.replace(regex, "");

      console.log(parseInt(width), parseInt(height));

      const ordered = memo.map((item) => {
        const { memo } = memoStore.getState();
        const target = memo.find((v) => v.index === index);

        // item의 order가 현재 클릭한 타겟의 order보다 큰 경우 현재 타겟을 최상위로 올려야 하므로 order를 -1씩 감소한다.
        if (item.order > target.order) {
          return { ...item, order: item.order - 1 };
        }
        // item이 현재 타겟이면 order를 현재 배열 아이템중 최상위로 설정한다.
        else if (item.index === target.index) {
          return {
            ...item,
            order: memo.length - 1,
            size: { width: parseInt(width), height: parseInt(height) },
          };
        }
        // item의 order가 현재 클릭한 타겟 order보다 작은경우 그대로 리턴한다.
        else {
          return item;
        }
      });
      // memoStore.dispatch(setItem(ordered));
    };
  }
}
