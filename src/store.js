import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  home_state: 0,
  loggued: false,
  popup: {
    type: 0,
    message: 'placeholder',
    time: 1000
  }
}

let mutations = {
  AUTH_FORM_SWITCH (state, select) {
    state.home_state = select;
  },
  LOG (state, log) {
    state.loggued = log;
  },
  POP_NOTIF (state, { type, message, time }) {
    // if (state.popup.type)
    //   state.popup.type = 0;
    state.popup.type = type;
    state.popup.message = message;
    if (time)
      state.popup.time = time;
  }
}

let getters = {
  home_state (state) { return state.home_state },
  is_loggued (state) { return state.loggued },
  popup (state) { return state.popup }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
