import Vue from "vue"
import Vuex from "vuex"

import { createPersistedState, createSharedMutations } from "vuex-electron"

import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== "production"
})