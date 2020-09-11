import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Table from '../components/Table'

Vue.use(Router)
Vue.use(Element)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'Table',
      component: Table
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
