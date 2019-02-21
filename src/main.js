// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'swiper/dist/css/swiper.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import v2header from '@/components/v2header.vue'
import v2footer from '@/components/v2footer.vue'
import tip from '@/components/tip.vue'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios'
import '@/styles/main.scss'
import 'es6-promise/auto'
import Vuex from 'vuex'
import sensors from 'sa-sdk-javascript/sensorsdata.min.js'
import VueI18n from 'vue-i18n'
import VueTour from 'vue-tour'
import 'vue-tour/dist/vue-tour.css'
import cn from '@/lang/cn.js'
import en from '@/lang/en.js'
import hk from '@/lang/hk.js'

// axios.defaults.baseURL = 'http://119.254.68.8:10020';
// axios.defaults.baseURL = 'http://test.bvaluate.com.cn/api';
axios.defaults.baseURL = 'http://api.bvaluate.com.cn/api';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.withCredentials = true
// axios.defaults.timeout = 30000;

Vue.prototype.$axios = axios;
Vue.prototype.$sugar = 12;
Vue.config.productionTip = false;
Vue.component('v2header', v2header);
Vue.component('v2footer', v2footer);
Vue.component('vtips', tip);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueTour);

Vue.prototype.$toast = function(msg){
  layui.use('layer', function(){
    var layer = layui.layer;
    layer.msg(msg);
  });
}

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

layui.use('layer', function(){
  var layer = layui.layer;
  
  try{
    axios.interceptors.response.use(
      response => {
        if (response.status === 200) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      // 服务器状态码不是200的情况
      error => {
        if (error.response.status) {
          switch (error.response.status) {
            case 403:
              localStorage.removeItem('apelink_user_candies');
              localStorage.removeItem('apelink_user_email');
              localStorage.removeItem('apelink_user_expirationDate');
              localStorage.removeItem('apelink_user_nickName');
              localStorage.removeItem('apelink_user_phoneNumber');
              localStorage.removeItem('apelink_user_profileUrl');
              localStorage.removeItem('apelink_user_sex');
              localStorage.removeItem('apelink_user_signedIn');
              localStorage.removeItem('apelink_user_synopsis');
              localStorage.removeItem('apelink_user_token');
              localStorage.removeItem('apelink_user_uid');
              sensors.registerPage({
                platform_type: 'web',
                is_login: false,
                is_register: true
              });
              layer.msg('请重新登录');

              setTimeout(()=>{
                this.$router.push('/login');
              }, 3100);
            case 500:
              layer.msg(error.response.data.message);
              break;
            case 502:
              layer.msg('服务器错误，请刷新后重试！');
              break;
            // 其他错误，直接抛出错误提示   
            default:
              console.error(error.response.data.message);
          }
          return Promise.reject(error.response);
        }
      }
    );
  }catch(err) {
    console.log(err)
  }
});

let token = localStorage.getItem('apelink_user_token');
let uid = localStorage.getItem('apelink_user_uid');
let isTour = localStorage.getItem('isTour');

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
    wechatPop: false,
    bindPhonePop: false,
    token: token,
    uid: uid,
    isTour: true
  },
  mutations: {
    register(state) {
      state.loginPop = true;
      state.registerPop = true;
    }
  }
});

// axios.interceptors.request.use(
//   config => {
//     // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//     const token = store.state.token;
//     const uid = store.state.uid;
//     // console.log(token);
//     // console.log(uid);
//     token && (config.headers.Authorization = token);
//     uid && (config.headers.uid = uid);
//     // config.headers = {
//     //   'Content-Type': 'application/json' // 设置很关键
//     // }
//     return config;
//   },
//   error => {
//     return Promise.error(error);
//   }
// );

let messages = {
  cn: cn,
  en: en,
  hk: hk
};

//获取选择语言
let lang = localStorage.getItem('bvaluate-lang');

let i18n = new VueI18n({
  //定义默认语言
  locale: lang || 'cn',
  messages
});


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   i18n,
//   components: {App},
//   template: '<App/>'
// })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')