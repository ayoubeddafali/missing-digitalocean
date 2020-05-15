import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import store from '../store/index'
import Toasted from 'vue-toasted';

import("./assets/style.css")

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueResource);
Vue.use(Toasted)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  store,
  router,
  template: '<App/>',
  vuetify: new Vuetify()
}).$mount('#app')
