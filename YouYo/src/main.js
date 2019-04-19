// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { Uploader } from 'vant';
import { Swipe, SwipeItem  } from 'vant';

// Vue.use(Icon);
Vue.use(Uploader);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.HOST = 'http://localhost:3000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
