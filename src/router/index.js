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
import pdfShow from '@/pages/pdfShow'
import download from '@/pages/download'
import wechatCode from '@/pages/wechatCode'
import privacy from '@/pages/privacy'

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/list',
      meta: {
        pageTitle: '榜单'
      },
    },
    {
      path: '/wechatCode',
      name: 'wechatCode',
      component: wechatCode,
    },
    {
      path: '/login',
      component: login,
      meta: {
        pageTitle: '登录'
      },
    },
    {
      path: '/list',
      component: list,
      meta: {
        pageTitle: '榜单'
      },
    },
    {
      path: '/userCenter',
      component: userCenter,
      meta: {
        pageTitle: '个人中心'
      },
    },
    {
      path: '/my',
      component: my,
      meta: {
        pageTitle: '设置'
      },
    },
    {
      path: '/follow',
      component: follow,
      meta: {
        pageTitle: '关注'
      },
    },
    {
      path: '/index',
      component: home,
      meta: {
        pageTitle: '综合'
      },
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
      component: article,
      meta: {
        pageTitle: '文章详情页'
      }
    },
    {
      path: '/project',
      component: project,
      meta: {
        pageTitle: '项目详情页'
      }
    },
    {
      path: '/projectTest',
      component: projectTest
    },
    {
      path: '/author',
      component: author,
      meta: {
        pageTitle: '作者详情页'
      }
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/newsList',
      component: newsList
    },
    {
      path: '/pdfShow',
      component: pdfShow
    },
    {
      path: '/download',
      component: download
    },
    {
      path: '/privacy',
      component: privacy
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
