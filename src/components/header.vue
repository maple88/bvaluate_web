<template>
  <div class="header" :class="scroll">
    <div class="tophead">
      <div class="container">
        <p>APELINk</p>
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
            <router-link to="/index" class="navbar-brand"><img src="../assets/logo.png"></router-link>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <router-link tag="li" to="/index" active-class="active"><a>首页</a></router-link>
              <router-link tag="li" to="/recommend" active-class="active"><a>新闻</a></router-link>
              <router-link tag="li" to="/userCenter" active-class="active"><a>个人中心</a></router-link>
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
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    </div>
  </div>
</template>

<script>
  let default_header = require('../assets/user/default-header.png');
  export default {
    props: {
      parantProfileUrl: String
    },
    data() {
      return {
        candy: 100,
        profileUrl: '',
        token: '',
        default_header: default_header,
        scroll: ''
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      this.initUser();
    },
    watch: {
      '$route': 'initUser'
    },

    methods: {
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

