import Vue from 'vue'
import App from './App.vue'
import store from './store'
import routes from './router'
import VueRouter from 'vue-router'
import {install} from './factory'

Vue.config.productionTip = false

install(Vue).then(() => {
  new Vue({
    store,
    router: new VueRouter({
      mode: 'hash',
      routes: [
        {
          path: '/',
          redirect: {
            name: 'AccountLogin'
          },
        },
        ...routes
      ]
    }),
    render: h => h(App)
  }).$mount('#app')
})

