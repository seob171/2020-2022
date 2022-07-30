import { createStore } from "./core/Redux.js";

import memoReducer from "./modules/setMemo.js";

const memoStore = createStore(memoReducer);
memoStore.dispatch();

export { memoStore };
