import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import sisoPkg from './pkg/siso'
import ftqqPkg from './pkg/ftqq'
import storePkg from './pkg/store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.sisoPkg = sisoPkg
Vue.prototype.ftqqPkg = ftqqPkg
Vue.prototype.storePkg = storePkg

/* eslint-disable no-new */
new Vue({
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
