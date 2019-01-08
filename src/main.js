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
import v2header from '@/components/v2header.vue'
import v2footer from '@/components/v2footer.vue'
import tip from '@/components/tip.vue'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios'
import '@/styles/main.scss'
import 'es6-promise/auto'
import Vuex from 'vuex'
import sensors from 'sa-sdk-javascript/sensorsdata.min.js'

// axios.defaults.timeout = 30000;

Vue.prototype.$axios = axios;
Vue.prototype.$sugar = 12;
Vue.config.productionTip = false;
Vue.component('vheader', header);
Vue.component('vfooter', footer);
Vue.component('v2header', v2header);
Vue.component('v2footer', v2footer);
Vue.component('vtips', tip);
Vue.use(Vuex);

// 页面标题
router.beforeEach((to, from, next) => {
  if (lock) {
    start_time = new Date();
  }
  if (to.meta.pageTitle) {
    window.document.title = "Bvaluate - "+to.meta.pageTitle;
  }else if (to.query.pageTitle) {
    window.document.title = "Bvaluate - "+to.query.pageTitle;
  }else{
    window.document.title = "Bvaluate";
  }
  next()
})

router.afterEach((to,from) => {
  var end_time = "";
  if (lock) {
    Vue.nextTick(() => {
      end_time = new Date();
      sensors.quick("autoTrackSinglePage", {
        load_time: end_time.getTime() - start_time.getTime()
      });
    });
  }
  window.onload = function () {
    end_time = new Date();
    Vue.nextTick(() => {
      sensors.quick("autoTrackSinglePage", {
        load_time: end_time.getTime() - start_time.getTime()
      });
      lock = true;
    });
  };
});

// try{
//   axios.interceptors.response.use(
//     response => {
//       if (response.status === 200) {
//         return Promise.resolve(response);
//       } else {
//         return Promise.reject(response);
//       }
//     },
//     // 服务器状态码不是200的情况
//     error => {
//       if (error.response.status) {
//         switch (error.response.status) {
//           case 500:
//             alert("服务器错误，请刷新后重试！");
//             break;
//           // 其他错误，直接抛出错误提示   
//           default:
//             alert(error.response.data.message);
//         }
//         return Promise.reject(error.response);
//       }
//     }
//   );
// }catch(err) {
//   console.log(err)
// }

const store = new Vuex.Store({
  state: {
    registerTip: false,
    invitationTip: false,
    signInTips: false,
    sugar: 0,
    loginPop: false,
    analysisPop: false,
    registerPop: false,
    messagePop: false,
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
