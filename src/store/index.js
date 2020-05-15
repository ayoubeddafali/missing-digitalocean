import Vue from "vue"
import Vuex from "vuex"

import {  createSharedMutations } from "vuex-electron"
import createPromiseAction from '../plugins/promise-action' 
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [createSharedMutations(), createPromiseAction()],
  strict: process.env.NODE_ENV !== "production"
})
