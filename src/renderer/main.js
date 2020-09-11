import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import sisoApi from './api/siso'
import ftqq from './api/ftqq'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.sisoApi = sisoApi
Vue.prototype.ftqq = ftqq

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
