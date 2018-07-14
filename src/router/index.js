import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import userCenter from '@/pages/userCenter/userCenter'
import my from '@/pages/myProfile'
import follow from '@/pages/follow'
import home from '@/pages/home'

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
      path: '/my',
      component: my
    },
    {
      path: '/follow',
      component: follow
    },
    {
      path: '/index',
      component: home
    }
  ]
})
