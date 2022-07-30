import Components from "../core/Component";
import { $, $ID } from "../util/util";
import Header from "./Header";
import Contents from "./Contents";

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

    new Header($ID(`header:${index}`), this.props);
    new Contents($ID(`content:${index}`), this.props);

    // header.onmousedown = (e) => {
    //   let shiftX = e.clientX - header.getBoundingClientRect().left;
    //   let shiftY = e.clientY - header.getBoundingClientRect().top;
    //
    //   // $(".wrap").append(header);
    //
    //   // 초기 이동을 고려한 좌표 (pageX, pageY)에서 메모이동
    //   function moveAt(pageX, pageY) {
    //     return {
    //       top: pageY - shiftY,
    //       left: pageX - shiftX,
    //     };
    //   }
    //
    //   const onMouseMove = (e) => {
    //     const position = moveAt(e.pageX, e.pageY);
    //     console.log(position);
    //     this.setState({
    //       ...this.state,
    //       memoAttr: {
    //         ...this.state.memoAttr,
    //         position,
    //       },
    //     });
    //   };
    //
    //   document.addEventListener("mousemove", onMouseMove);
    //   // 메모을 드롭하고, onmousemove 핸들러 제거
    //   header.onmouseup = function () {
    //     console.log("onmouseup!!!");
    //     header.removeEventListener("mousedown", onMouseMove);
    //     // header.removeEventListener("mousemove", onMouseMove);
    //     // header.onmousemove = null;
    //     header.onmouseup = null;
    //     return false;
    //   };
    // };
    //
    // header.ondragstart = function () {
    //   return false;
    // };
    //
    // header.ondragend = (e) => {
    //   console.log(e);
    // };

    // ------------------------------

    // const sizeBtn = $ID(`${MEMO_ID}:${index}`);
    // console.log(sizeBtn);
    //
    // function onTargetChange(event, index) {
    //   const localMemo = JSON.parse(localStorage.getItem(MEMO_ID)) || [];
    //   console.log("event-height:", event.target.clientHeight);
    //   console.log("event-width:", event.target.clientWidth);
    //
    //   const newLocalMemo = localMemo.map((memo) => {
    //     if (memo.index === index) {
    //       return {
    //         ...memo,
    //         size: {
    //           width: event.target.clientWidth,
    //           height: event.target.clientHeight,
    //         },
    //       };
    //     }
    //     return memo;
    //   });
    //   console.log("newLocalMemo:", newLocalMemo);
    //
    //   localStorage.setItem(MEMO_ID, JSON.stringify(newLocalMemo));
    // }
    // sizeBtn.addEventListener("mouseup", (event) =>
    //   onTargetChange(event, index)
    // );
  }
}
