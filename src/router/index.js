import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import userCenter from '@/pages/userCenter/userCenter'
import my from '@/pages/myProfile'
import follow from '@/pages/follow'
import home from '@/pages/home'
import industry from '@/pages/industry'
import recommend from '@/pages/recommend'
import article from '@/pages/article'
import project from '@/pages/project'
import projectTest from '@/pages/projectTest'
import author from '@/pages/author'
import list from '@/pages/list'
import search from '@/pages/search'
import newsList from '@/pages/newsList'

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/list',
      component: list
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
    },
    {
      path: '/industry',
      component: industry
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/article',
      component: article
    },
    {
      path: '/project',
      component: project
    },
    {
      path: '/projectTest',
      component: projectTest
    },
    {
      path: '/author',
      component: author
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/newsList',
      component: newsList
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
