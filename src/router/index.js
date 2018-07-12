import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import userCenter from '@/pages/userCenter/userCenter'
import myProfile from '@/pages/myProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/userCenter',
      component: userCenter
    },
    {
      path: '/myProfile',
      component: myProfile
    }
  ]
})
