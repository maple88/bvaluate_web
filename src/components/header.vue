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
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <button class="button open_search navbar-toggle"><img src="../assets/search/search_b.png"></button>
            <router-link to="/index" class="navbar-brand"><img src="../assets/logo.png"></router-link>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <router-link tag="li" to="/index" active-class="active"><a>首页</a></router-link>
              <router-link tag="li" to="/recommend" active-class="active"><a>新闻</a></router-link>
              <router-link tag="li" to="/list" active-class="active"><a>榜单</a></router-link>
              <router-link tag="li" to="/userCenter" active-class="active" v-show="token"><a>个人中心</a></router-link>
              <li v-show="!token" @click="isLogin('/userCenter')"><a>个人中心</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-if="token">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle header_name" data-toggle="dropdown" role="button">
                  <div class="user"
                       :style="(profileUrl !==null && profileUrl !== '' && profileUrl !== 'NULL' && profileUrl !== undefined)
                       ?'background-image: url('+ profileUrl +')':'background-image: url('+ default_header +')'"
                  ></div>
                  <p>糖果数：{{candy}}</p>
                </a>
                <ul class="dropdown-menu">
                  <router-link tag="li" to="/my"><a>设置</a></router-link>
                  <!-- <li><a href="#">设置</a></li> -->
                  <li>
                    <a href="javascript:;" @click="logout()">退出</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul v-if="!token" class="nav navbar-nav navbar-right header_navbar">
              <li class="dropdown">
                <p>
                  <router-link to="/login" class="label_a">
                    登录
                  </router-link>
                  <span>/</span>
                  <router-link to="/login?page=register" class="label_a">
                    注册
                  </router-link>
                </p>
              </li>
            </ul>
            <div class="nav navbar-nav navbar-right nav-search">
              <button class="button open_search"><img src="../assets/search/search.png"></button>
            </div>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
        <div class="bottom_search">
          <div class="container">
            <div class="search_box">
              <div class="left">
                <div class="dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" id="searchType" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="true">
                    {{searchType}}
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="searchType">
                    <li><a href="javascript:void(0);" @click="searchType = '文章'">文章</a></li>
                    <li><a href="javascript:void(0);" @click="searchType = '项目'">项目</a></li>
                  </ul>
                </div>
              </div>
              <div class="center">
                <input type="text" v-model="search" class="search_input" @keyup.enter="goSearch">
              </div>
              <div class="right">
                <button class="search_submit" @click="goSearch">
                  <img src="../assets/search/search.png" alt="search"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <v-login v-model="isShow" :goUrl="successGo"></v-login>
  </div>
</template>

<script>
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
        successGo: ''
      }
    },
    mounted() {
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
      goSearch() {
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.search,
            searchType: this.searchType
          }
        })
      },
      isLogin(url) {
        this.successGo = url;
        this.isShow = true;
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

