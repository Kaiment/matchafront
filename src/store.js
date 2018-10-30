import Vue from 'vue'
import Vuex from 'vuex'
import { isCompletionStatement } from 'babel-types';

Vue.use(Vuex)

let state = {
  home_state: 1,
  loggued: false,
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
  }
}

let getters = {
  home_state (state) { return state.home_state },
  is_loggued (state) { return state.loggued },
  popup (state) { return state.popup }
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
