import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";


Vue.use(Vuetify)
Vue.use(VueResource);

Vue.use(ElementUI, {
  locale
});

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  template: '<App/>',
  vuetify: new Vuetify()
}).$mount('#app')

