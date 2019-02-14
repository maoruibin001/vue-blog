import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import {
  loadFilters
} from 'lib/filters'
import './assets/css/index.scss'

loadFilters()

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.http.options.emulateHTTP = false

Vue.http.interceptors.push((request, next) => {
  if (window.localStorage.getItem('token')) {
    request.headers.set('authorization', 'Bearer ' + window.localStorage.getItem('token'))
  }
  next((response) => {
    if (response.status === 401) {
      store.commit('unset_user')
      router.go({
        name: 'login'
      })
    }
    if (response.status === 200) {
      return Object.assign({}, response.body, {
        ok: true,
      })
    }

    return response

  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
