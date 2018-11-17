import Vue from 'vue'
import Vuex from 'vuex'
import { isCompletionStatement } from 'babel-types';

Vue.use(Vuex)

let state = {
  home_state: 1,
  loggued: false,
  nb_notifs: 0,
  visits: [],
  likes: [],
  matchs: [],
  unmatchs: [],
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
  SET_NB_NOTIFS (state, nb) {
    state.nb_notifs = nb;
  },
  LOAD_NOTIFS (state, { type, notifs }) {
    state[type] = notifs;
  },
  ADD_NOTIF (state, { type, notif }) {
    state[type].unshift(notif);
  },
  COUNT_NOTIF (state, add) {
    state.nb_notifs += add;
  }
}

let getters = {
  home_state (state) { return state.home_state },
  is_loggued (state) { return state.loggued },
  popup (state) { return state.popup },
  nb_notifs (state) { return state.nb_notifs},
  visits (state) { return state.visits },
  likes (state) { return state.likes },
  matchs (state) { return state.matchs },
  unmatchs (state) { return state.unmatchs }
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
  },
  socket_notification({ commit }, notification) {
    console.log('notif from actions');
    //commit('ADD_NOTIFICATION', notification);
  },
  set_nb_notifs({ commit }, nb) {
    commit('SET_NB_NOTIFS', nb);
  },
  load_visits({ commit }, visits) {
    commit('LOAD_NOTIFS', { type: 'visits', notifs: visits });
  },
  load_likes({ commit }, likes) {
    commit('LOAD_NOTIFS', { type: 'likes', notifs: likes });
  },
  load_matchs({ commit }, matchs) {
    commit('LOAD_NOTIFS', { type: 'matchs', notifs: matchs });
  },
  load_unmatchs({ commit }, unmatchs) {
    commit('LOAD_NOTIFS', { type: 'unmatchs', notifs: unmatchs });
  },
  add_visits({ commit }, visit) {
    commit('ADD_NOTIF', { type: 'visits', notif: visit });
    commit('COUNT_NOTIF', 1);
  },
  add_likes({ commit }, like) {
    commit('ADD_NOTIF', { type: 'likes', notif: like });
    commit('COUNT_NOTIF', 1);
  },
  add_matchs({ commit }, match) {
    commit('ADD_NOTIF', { type: 'matchs', notif: match });
    commit('COUNT_NOTIF', 1);
  },
  add_unmatchs({ commit }, unmatch) {
    commit('ADD_NOTIF', { type: 'unmatchs', notif: unmatch });
    commit('COUNT_NOTIF', 1);
  },
  decrease_nb_notif({ commit }) {
    commit('COUNT_NOTIF', -1);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
