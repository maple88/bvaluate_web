// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'swiper/dist/css/swiper.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import header from '@/components/header.vue'
import footer from '@/components/footer.vue'
import tip from '@/components/tip.vue'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios'
import '@/styles/main.scss'
import 'es6-promise/auto'
import Vuex from 'vuex'

Vue.prototype.$axios = axios;
Vue.prototype.$sugar = 12;
Vue.config.productionTip = false;
Vue.component('vheader', header);
Vue.component('vfooter', footer);
Vue.component('vtips', tip);
Vue.use(Vuex);

// 页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.pageTitle) {
    window.document.title = "Bvaluate - "+to.meta.pageTitle;
  }else if (to.query.pageTitle) {
    window.document.title = "Bvaluate - "+to.query.pageTitle;
  }else{
    window.document.title = "Bvaluate";
  }
  next()
})

const store = new Vuex.Store({
  state: {
    registerTip: false,
    invitationTip: false,
    signInTips: false,
    sugar: 0,
    loginPop: false,
    analysisPop: false,
    registerPop: false,
  },
  mutations: {
    register(state) {
      state.loginPop = true;
      state.registerPop = true;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
