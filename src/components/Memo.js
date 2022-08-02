import Components from "../core/Component";
import { $, $ID } from "../util/util";
import Header from "./Header";
import Contents from "./Contents";
import { MEMO_ID } from "../constant";
import { memoStore } from "../store";
import { setItem } from "../modules/setMemo";
import {
  getNewMemoList,
  replaceByRegex,
  styleToObj,
  dragElement,
} from "../util/memo";

/**************************************************
 * seob - 메모장 컴포넌트
 *
 * - 구성 -
 * 메모장 헤더 컴포넌트
 * 메모장 컨텐츠 컴포넌트
 *
 * - 기능 -
 * 메모장, 헤더에 mousedown, mousemove, mouseup 이벤트로 DND 구현
 * 컨텐츠에 css로 사이즈 변경 및 mouseup 이벤트로 마지막 size 저장
 ***************************************************/
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
    const { size } = target;

    // 초기 style 설정
    content.setAttribute(
      "style",
      `width:${size.width}px;height:${size.height}px;overflow:auto;resize:both`
    );

    // header, contents 엘리먼트에 컴포넌트 템플릿 연결
    new Header($ID(`header:${index}`), this.props);
    new Contents($ID(`content:${index}`), this.props);

    // 메모와 헤더에 드래그 이벤트 연결
    const memoElement = $ID(`${MEMO_ID}:${index}`);
    dragElement(
      memoElement,
      header,
      [$ID(`btn_close:${index}`)],
      (position) => {
        if (position) {
          const { memo } = memoStore.getState();
          // 드래그가 종료된 위치 및 드래그 시 최상위로 변경된 order를 적용하기 위한 newMemoList 생성
          const newMemoList = getNewMemoList(memo, index, {
            position: position,
          });
          memoStore.dispatch(setItem(newMemoList));
        }
      }
    );

    // 컨텐츠 영역에서 mouseup 이벤트 발생시
    content.onmouseup = (e) => {
      if (e.target !== content) return;

      // 컨텐츠의 style 을 읽어온 뒤 {key:value,...} 형태로 전환
      const style = content.getAttribute("style");
      const { width, height } = styleToObj(style);

      // 숫자를 제외한 나머지 정규식
      const regex = /[^0-9]/g;
      const resWidth = replaceByRegex(regex, width, "");
      const resHeight = replaceByRegex(regex, height, "");

      const newMemoList = getNewMemoList(memo, index, {
        size: { width: parseInt(resWidth), height: parseInt(resHeight) },
      });

      memoStore.dispatch(setItem(newMemoList));
    };
  }
}
