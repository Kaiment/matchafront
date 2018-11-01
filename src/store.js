import Vue from 'vue'
import Vuex from 'vuex'
import { isCompletionStatement } from 'babel-types';

Vue.use(Vuex)

let state = {
  home_state: 1,
  loggued: false,
  notif: 0,
  notif_test: {
    visit: 0,
    like: 0,
    match: 0,
    unmatch: 0
  },
  popup: {
    type: 0,
    message: 'placeholder',
    time: 3000
  }
}

let mutations = {
  AUTH_FORM_SWITCH (state, select) {
    state.home_state = select;
  },
  LOG (state, log) {
    state.loggued = log;
  },
  POP_NOTIF (state, { type, message }) {
    state.popup.type = type;
    state.popup.message = message;
  },
  ADD_NOTIF (state, toggle) {
    state.notif += toggle;
  },
  PLUS_NOTIF(state, type) {
    state.notif_test[type] += 1;
  }
}

let getters = {
  home_state (state) { return state.home_state },
  is_loggued (state) { return state.loggued },
  popup (state) { return state.popup },
  notif (state) { return state.notif },
  notif_test (state) { return state.notif_test }
}

let actions = {
  notifSuccess({ commit }, message) {
    commit('POP_NOTIF', { type: 'is-success', message });
  },
  notifDanger({ commit }, message) {
    commit('POP_NOTIF', { type: 'is-danger', message });
  },
  notifWarning({ commit }, message) {
    commit('POP_NOTIF', { type: 'is-warning', message });
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
