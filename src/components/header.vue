<template>
  <div class="header" :class="scroll">
    <div class="tophead">
      <div class="container">
        <p>Bvaluate</p>
        <!--<span>中/EN</span>-->
      </div>
    </div>
    <div class="mainhead">
      <nav class="navbar navbar-default">
        <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false" data="导航按钮">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <button class="button open_search navbar-toggle" data="搜索按钮"><img src="../assets/search/search_b.png">
            </button>
            <router-link to="/list" class="navbar-brand" data="logo"><img src="../assets/logo.png"></router-link>
            <!-- <a class="navbar-brand"><img src="../assets/logo.png"></a> -->
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <!-- <router-link tag="li" to="/index" active-class="active"><a>首页</a></router-link> -->
              <!-- <router-link tag="li" to="/recommend" active-class="active"><a>新闻</a></router-link> -->
              <router-link tag="li" to="/list" active-class="active"><a data="榜单">榜单</a></router-link>
              <router-link tag="li" to="/follow" active-class="active" v-show="token"><a data="关注">关注</a></router-link>
              <li v-show="!token" @click="isLogin('/follow', '关注')"><a data="关注">关注</a></li>
              <router-link tag="li" to="/userCenter" active-class="active" v-show="token"><a data="个人中心">个人中心</a>
              </router-link>
              <li v-show="!token" @click="isLogin('/userCenter', '个人中心')"><a data="个人中心">个人中心</a></li>
              <li v-show="token"><a href="javascript:;" data="白皮书分析" @click="analysis()">白皮书分析</a></li>
              <li v-show="!token" @click="isLogin('', '白书皮分析')"><a href="javascript:;" data="白皮书分析">白皮书分析</a>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-if="token">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle header_name" data-toggle="dropdown" role="button" data="用户头像">
                  <div class="user"
                       :style="(profileUrl !==null && profileUrl !== '' && profileUrl !== 'NULL' && profileUrl !== undefined)
                       ?'background-image: url('+ profileUrl +')':'background-image: url('+ default_header +')'"
                  ></div>
                  <p>糖果数：{{candy}}</p>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a href="javascript:;" data="消息">消息</a>
                  </li>
                  <router-link tag="li" to="/my" data="设置"><a>设置</a></router-link>
                  <!-- <li><a href="#">设置</a></li> -->
                  <li>
                    <a href="javascript:;" data="退出" @click="logout()">退出</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul v-if="!token" class="nav navbar-nav navbar-right header_navbar">
              <li class="dropdown">
                <p>
                  <router-link to="/login" class="label_a" data="登录" @click="salogin($event)">
                    登录
                  </router-link>
                  <span>/</span>
                  <router-link to="/login?page=register" class="label_a" data="注册" @click="saregister($event)">
                    注册
                  </router-link>
                </p>
              </li>
            </ul>
            <div class="nav navbar-nav navbar-right nav-search gift_box">
              <button class="button" data="邀请有礼" @click="invitation"><img src="../assets/gift.png"></button>
              <h4>邀请有礼</h4>
            </div>
            <div class="nav navbar-nav navbar-right nav-search">
              <button class="button open_search" data="搜索按钮"><img src="../assets/search/search.png"></button>
            </div>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
        <div class="bottom_search">
          <div class="container">
            <div class="search_box">
              <div class="left">
                <div class="dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" id="searchType" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="true" data="选择搜索的分类">
                    {{searchType}}
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="searchType">
                    <li><a href="javascript:void(0);" data="文章搜索" @click="searchType = '文章'">文章</a></li>
                    <li><a href="javascript:void(0);" data="项目搜索" @click="searchType = '项目'">项目</a></li>
                  </ul>
                </div>
              </div>
              <div class="center">
                <input type="text" v-model="search" class="search_input" data="输入搜素内容" @keyup.enter="goSearch($event)">
              </div>
              <div class="right">
                <button class="search_submit" @click="goSearch($event), trackSearch(searchType, search)" data="搜索按钮">
                  <img src="../assets/search/search.png" alt="search"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="fixed_gift_box">
      <div class="gift_box_content">
        <button class="button" data="邀请有礼" @click="invitation"><img src="../assets/gift.png"></button>
        <h4>邀请有礼</h4>
      </div>
    </div>
    <v-login v-model="isShow" :success="refreshPage"></v-login>
    <v-analysis v-model="isWhitePaper" v-if="isWhitePaper"></v-analysis>
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import login from '../components/login';

  let default_header = require('../assets/user/default-header.png');
  export default {
    components: {
      'v-login': login
    },
    props: {
      parantProfileUrl: String
    },
    data() {
      return {
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
        path: ''
      }
    },
    mounted() {
      this.path = this.$router.history.current.path
      $(".nav.navbar-nav li a").on('click', function () {
        $('.collapse').removeClass('in');
      })
      window.addEventListener('scroll', this.handleScroll)
      this.initUser();
      let search_btn = $('.open_search');
      search_btn.click(function (e) {
        if ($('.bottom_search').hasClass('open')) {
          $('.bottom_search').removeClass('open')
        } else {
          $('.bottom_search').addClass('open')
        }
        $(document).click(function (e) {
          $('.bottom_search').removeClass('open');
        });
        $('.search_input').click(function (e) {
          e.stopPropagation()
        });
        $('.dropdown-menu').click(function (e) {
          $('.dropdown').removeClass('open');
          e.stopPropagation()
        });
        e.stopPropagation()
      });
    },
    watch: {
      '$route': 'initUser'
    },
    methods: {
      invitation() {
        let token = this.token;
        if (token) {
          this.$store.state.invitationTip = true;
        } else {
          this.isShow = true;
        }

      },
      trackSearch(category, content) {
        // 榜单，项目详情页，关注，个人中心，白皮书分析，行业国家资讯，文章详情，作者, 搜索页面
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
        this.isWhitePaper = true
      },
      goSearch(event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.search,
            searchType: this.searchType
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
      isLogin(url, name) {
        this.successGo = url;
        this.isShow = true;
        if (name == '关注') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '关注'
          });
        } else if (name == '个人中心') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '个人中心'
          });
        } else if (name == '白书皮分析') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '白书皮分析'
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
        this.$router.push('/login');
      },
      initUser() {
        this.candy = localStorage.getItem('apelink_user_candies');
        this.profileUrl = localStorage.getItem('apelink_user_profileUrl');
        this.token = localStorage.getItem('apelink_user_token');
        if (this.parantProfileUrl) {
          this.profileUrl = this.parantProfileUrl
        }
      },
      handleScroll(e) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 100) {
          this.scroll = 'scroll';
        } else {
          this.scroll = '';
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

