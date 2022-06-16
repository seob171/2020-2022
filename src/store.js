import { createStore } from "./core/redux.js";

import countReducer from "./modules/counter.js";

const counterStore = createStore(countReducer);
counterStore.dispatch();

export { counterStore };
