<template>
  <div class="v2header" :class="scroll">
    <div class="tophead">
      <div class="container v2container">
        <div class="flexbox">
          <ul>
            <li><span>项目总量：</span><span>{{tophead.totalProject}}</span></li>
            <li><span>项目相关人员总数：</span><span>{{tophead.totalRelatedProjectPerson}}</span></li>
            <li><span>白皮书收录总数：</span><span>{{tophead.totalWhitePaper}}</span></li>
          </ul>
          <div class="appdownload">
            <a href="https://api.bvaluate.com.cn/apk/bvaluate.apk">
              <img src="../assets/tdownload.png">
              <span>APP下载</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mainhead">
      <nav class="navbar navbar-default" :class="{ hasbg:hasbg }">
        <div class="container v2container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false" data="导航按钮" name="search_submit" id="navbar-toggle">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="navbar-toggle navbar-header-user" v-if="token">
              <div class="hicon" data-toggle="dropdown">
                <img src="../assets/usericon.png">
              </div>
              <ul class="dropdown-menu header-dropdown-menu">
                <router-link tag="li" to="/userCenter" active-class="active"><a data="个人中心">个人中心</a></router-link>
                <!-- <li>
                  <a href="javascript:;" data="消息" @click="$store.state.messagePop = true">消息</a>
                </li> -->
                <router-link tag="li" to="/my" active-class="active"><a data="设置">设置</a></router-link>
                <li>
                  <a href="javascript:;" data="退出" @click="logout()">退出</a>
                </li>
              </ul>
            </div>
            <div class="navbar-toggle navbar-header-remind" v-if="token">
              <img src="../assets/remind.png" @click="$store.state.messagePop = true">
              <!-- <span class="remind-num">10</span> --><!-- ··· -->
            </div>
            <div class="navbar-toggle open_search navbar-header-search" data-toggle="collapse" data-target="#out-search-box"><img src="../assets/hsearch.png"></div>
            <router-link to="/home" class="navbar-brand" data="logo"><img src="../assets/logo2.png"></router-link>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <router-link tag="li" to="/home" active-class="active"><a data="首页">首页</a></router-link>
              <router-link tag="li" to="/list" active-class="active"><a data="榜单">榜单</a></router-link>
              <router-link tag="li" to="/news" active-class="active"><a data="资讯">资讯</a></router-link>
              <li v-show="token"><a href="javascript:;" data="新增项目" @click="analysis()">新增项目</a></li>
              <li v-show="!token" @click="isLogin('新增项目')"><a data="新增项目">新增项目</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <router-link tag="li" to="/follow" active-class="active" v-show="token"><a data="我的关注">我的关注</a></router-link>
              <li v-show="!token" @click="isLogin('我的关注')"><a data="我的关注">我的关注</a></li>
              <li class="header-token hsearch">
                <div class="open_search">
                  <img src="../assets/hsearch.png">
                </div>
              </li>
              <li class="header-token hidden-xs" v-if="token">
                <div class="hicon" @click="$store.state.messagePop = true">
                  <img src="../assets/remind.png">
                  <!-- <span class="remind-num">10</span> --><!-- ··· -->
                </div>
              </li>
              <li class="header-token hidden-xs" v-if="token">
                <div class="hicon" data-toggle="dropdown">
                  <img src="../assets/usericon.png">
                </div>
                <div class="htips icon-htips" @click="invitation">邀请有礼</div>
                <ul class="dropdown-menu header-dropdown-menu">
                  <router-link tag="li" to="/userCenter" active-class="active"><a data="个人中心">个人中心</a></router-link>
                  <!-- <li>
                    <a href="javascript:;" data="消息" @click="$store.state.messagePop = true">消息</a>
                  </li> -->
                  <router-link tag="li" to="/my" active-class="active"><a data="设置">设置</a></router-link>
                  <li>
                    <a href="javascript:;" data="退出" @click="logout()">退出</a>
                  </li>
                </ul>
              </li>
              <li class="hidden-xs" v-if="!token">
                <!-- <router-link to="/login" class="header-btn" data="登录" @click="salogin($event)">登录</router-link> -->
                <a href="javascript:;" class="header-btn" data="登录" @click="isLogin('登录按钮')">登录</a>
              </li>
              <li class="hidden-xs" v-if="!token">
                <!-- <router-link to="/login?page=register" class="header-btn blue" data="注册" @click="saregister($event)">注册</router-link> -->
                <a href="javascript:;" class="header-btn blue" data="注册" @click="isLogin('注册按钮')">注册</a>
                <div class="htips" @click="registerTip">送糖果</div>
              </li>
              <li class="sbs-btn visible-xs" v-if="!token">
                <router-link to="/login" class="header-btn" data="登录" @click="salogin($event)">登录</router-link>
                <router-link to="/login?page=register" class="header-btn blue" data="注册" @click="saregister($event)">注册</router-link>
              </li>
            </ul>
            <transition name="fade">
              <div class="search-box" v-show="showSearch">
                <div class="center">
                  <input type="text" placeholder="请输入关键词" v-model="search" class="search_input" data="输入搜素内容" name="no_content" id="input_search_input" @keyup.enter="goSearch($event)">
                </div>
                <div class="right">
                  <button class="search_submit" @click="goSearch($event), trackSearch(searchType, search)" name="no_content" id="search_submit" data="搜索按钮">
                    <img src="../assets/search.png" alt="search"/>
                  </button>
                </div>
              </div>
            </transition>
          </div>
          <div class="collapse out-search-box" id="out-search-box">
            <div class="container v2container">
              <div class="search-box">
                <div class="right">
                  <button class="search_submit" @click="goSearch($event), trackSearch(searchType, search)" name="no_content" id="search_submit" data="搜索按钮">
                    <img src="../assets/search.png" alt="search"/>
                  </button>
                </div>
                <div class="center">
                  <input type="text" placeholder="请输入关键词" v-model="search" class="search_input" data="输入搜素内容" name="no_content" id="out_search_input" @keyup.enter="goSearch($event)">
                </div>
              </div>
              <div class="close-search">取消</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <v-login></v-login>
    <v-analysis></v-analysis>
    <v-message></v-message>
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import login from '@/components/login';
  import message from '@/components/message';
  import analysis from '@/components/analysis';
  import Bus from '../bus.js'

  let default_header = require('../assets/user/default-header.png');
  export default {
    components: {
      'v-login': login,
      'v-analysis': analysis,
      'v-message': message
    },
    props: {
      parantProfileUrl: String
    },
    data() {
      return {
        tophead: [],
        candy: 100,
        profileUrl: '',
        token: '',
        default_header: default_header,
        scroll: '',
        searchType: '文章',
        search: '',
        isShow: false,
        successGo: '',
        isWhitePaper: false,
        path: '',
        showSearch: false,
        hasbg: false
      }
    },
    mounted() {
      this.path = this.$router.history.current.path
      $(".nav.navbar-nav li a").on('click', function () {
        $('.collapse').removeClass('in');
      });
      this.is_header_scroll();
      this.initUser();
      this.getTophead();

      $(".open_search").on("click", function(){
        $(".out-search-box").collapse('show');
        $(".out-search-box input").focus();
        $(".out-search-box").css('top', '0');
      })
      $(".close-search").on("click", function(){
        $(".out-search-box").collapse('hide');
        $(".out-search-box").css('top', '-100%');
      })
    },
    watch: {
      '$route': function () {
        this.initUser();
        this.is_header_scroll();
      }
    },
    computed: {
      sugarNum() {
        return this.$store.state.sugar;
      }
    },
    methods: {
      // 头部数量
      getTophead() {
        let that = this;
        that.$axios.get('/api/ICO/icoRank?type=周榜&pageNo=0&pageSize=3').then(function (res) {
          that.tophead = res.data;
          Bus.$emit('val', res.data.topProject);
        });
      },
      invitation() {
        let token = this.token;
        if (token) {
          this.$store.state.invitationTip = true;
        } else {
          this.$store.state.loginPop = true;
        }
      },
      registerTip () {
        this.$store.state.registerTip = true;
      },
      trackSearch(category, content) {
        // 榜单，项目详情页，我的关注，个人中心，白皮书分析，行业国家资讯，文章详情，作者, 搜索页面
        let that = this
        let path = [
          {name: '/list', val: '榜单'},
          {name: '/project', val: '项目详情页'},
          {name: '/userCenter', val: '个人中心'},
          {name: '/newsList', val: '行业国家资讯'},
          {name: '/article', val: '文章详情'},
          {name: '/author', val: '作者'},
          {name: '/search', val: '搜索页面'}
        ]
        let index = path.findIndex(function (x) {
          return x.name === that.path;
        })
        let entrance;
        if (index !== -1) {
          entrance = path[index].val
        } else {
          entrance = '找不到入口位置'
        }
        sensors.track('Search', {
          entrance: path[index].val,
          category: category,
          content: content
        });
      },
      refreshPage() {
        window.location.reload();
      },
      analysis() {
        this.$store.state.analysisPop = true
      },
      goSearch(event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        let pageTitle
        if (this.search == '') {
          layui.use('layer', function(){
            var layer = layui.layer;
            layer.msg('关键词不能为空！');
          });
          return false;
        }
        if (this.searchType === '文章') {
          pageTitle = '文章搜索结果'
        }
        if (this.searchType === '项目') {
          pageTitle = '项目搜索结果'
        }
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.search,
            searchType: this.searchType,
            pageTitle: pageTitle
          }
        })
      },
      salogin(event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        sensors.track("Registerstart", {
          entrance: '列表页',
          operate: '登录button'
        });
      },
      saregister(event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        sensors.track("Registerstart", {
          entrance: '列表页',
          operate: '注册button'
        });
      },
      isLogin(name) {
        if(name === '注册按钮'){
          this.$store.commit('register');
        }else{
          this.$store.state.loginPop = true;
        }
        if (name === '我的关注') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '我的关注'
          });
        } else if (name === '个人中心') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '个人中心'
          });
        } else if (name === '白书皮分析') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '白书皮分析'
          });
        } else if (name === '新增项目') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '新增项目'
          });
        }
      },
      logout() {
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
        // sensors.logout();
        layui.use('layer', function(){
          var layer = layui.layer;
          let load = layer.load(2);
          setTimeout(() => {
            layer.close(load);
            window.location.reload();
          }, 1000);
        });
      },
      initUser() {
        this.profileUrl = localStorage.getItem('apelink_user_profileUrl');
        this.token = localStorage.getItem('apelink_user_token');
        if (this.parantProfileUrl) {
          this.profileUrl = this.parantProfileUrl
        }
      },
      is_header_scroll () {
        window.addEventListener('scroll', this.handleScroll);
        let router = this.$router.history.current;
        if (router.name == 'home') {
          this.showSearch = false;
          this.hasbg = false;
        }else{
          this.showSearch = true;
          this.hasbg = true;
        }
        if (router.name == 'list') {
          this.hasbg = false;
        }else{
          this.hasbg = true;
        }
      },
      handleScroll(e) {
        let router = this.$router.history.current;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 100) {
          this.scroll = 'scroll';
        } else {
          this.scroll = '';
        }
        if (router.name == 'home') {
          if (scrollTop > 360) {
            this.showSearch = true;
          } else {
            this.showSearch = false;
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

