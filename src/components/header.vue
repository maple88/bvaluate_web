<template>
  <div class="header">
    <div class="tophead">
      <div class="container">
        <p>APELINk</p>
        <span>中/EN</span>
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
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                  <div class="user" :style="'background-image: url('+ profileUrl +')'"></div>
                  <p>糖果数：{{candy}}</p>
                </a>
                <ul class="dropdown-menu">
                  <router-link tag="li" to="/my"><a>设置</a></router-link>
                  <!-- <li><a href="#">设置</a></li> -->
                  <li><a href="#">退出</a></li>
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
  export default {
    props: {
      parantProfileUrl: String
    },
    data() {
      return {
        candy: 100,
        profileUrl: '',
        token: ''
      }
    },
    mounted() {
      this.initUser()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initUser()
      })
    },
    methods: {
      initUser() {
        this.candy = localStorage.getItem('apelink_user_candies')
        this.profileUrl = localStorage.getItem('apelink_user_profileUrl')
        this.token = localStorage.getItem('apelink_user_token')
        console.log('外面:' + this.parantProfileUrl)
        if (this.parantProfileUrl) {
          console.log('进来')
          this.profileUrl = this.parantProfileUrl
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

