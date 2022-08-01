import Components from "../core/Component";
import { $, $ID } from "../util/util";
import Header from "./Header";
import Contents from "./Contents";
import { MEMO_ID } from "../constant";
import { memoStore } from "../store";
import { setItem } from "../modules/setMemo";

export default class Memo extends Components {
  async initialState() {
    this.setState({ index: this.props });
  }

  template() {
    const { index } = this.state;

    return `
        <div id="header:${index}" class="header"></div>
        <div id="content:${index}" class="content"></div>
    `;
  }

  async componentDidMount() {
    const { index } = this.state;

    const header = $ID(`header:${index}`);
    const content = $ID(`content:${index}`);

    if (!header || !content) return;
    const { memo } = memoStore.getState();
    const target = memo.find((v) => v.index === index);
    const { size, order } = target;

    content.setAttribute(
      "style",
      `width:${size.width}px;height:${size.height}px`
    );
    content.style.overflow = "auto";
    content.style.resize = "both";

    new Header($ID(`header:${index}`), this.props);
    new Contents($ID(`content:${index}`), this.props);

    const currentMemo = $ID(`${MEMO_ID}:${index}`);
    currentMemo.style.zIndex = order;

    function dragElement(element) {
      let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      let position = { top: 0, left: 0 };
      if (header) {
        // if present, the header is where you move the DIV from:
        header.onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        // element.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        currentMemo.style.zIndex = memo.length;
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

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        console.log(position);
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
              order: memo.length - 1,
              position: position,
            };
          }
          // item의 order가 현재 클릭한 타겟 order보다 작은경우 그대로 리턴한다.
          else {
            return item;
          }
        });
        memoStore.dispatch(setItem(ordered));
      }
    }
    dragElement(currentMemo);

    content.onmouseup = (e) => {
      if (e.target !== content) return;
      const style = content.getAttribute("style");
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
      memoStore.dispatch(setItem(ordered));
    };
  }
}
