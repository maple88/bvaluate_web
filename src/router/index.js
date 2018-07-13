import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import userCenter from '@/pages/userCenter/userCenter'
import myProfile from '@/pages/myProfile'
import follow from '@/pages/follow'

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
    },
    {
      path: '/follow',
      component: follow
    }
  ]
})
