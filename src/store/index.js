import { initState } from "./observer.js";

// 초기값 설정 => key 반환
export const textState = initState({
  key: "textState",
  defaultValue: "hello world",
});
