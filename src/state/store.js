import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,

  // Enable strict mode to get a warning when mutation the state outside of a
  // mutation (only in dev mode)
  strict: process.env.NODE_ENV !== "production",

  actions: {
    reset({ dispatch }) {
      // Run the `reset` action for every module if it exists
      for (const moduleName of Object.keys(modules)) {
        if (modules[moduleName].actions && modules[moduleName].actions.reset) {
          dispatch(`${moduleName}/reset`);
        }
      }
    },
  },
});

// Automatically run the `init` action for every module if it exists
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`);
  }
}

export default store;
