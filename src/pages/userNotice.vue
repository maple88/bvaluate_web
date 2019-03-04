<template>
  <div class="page project userCenter userCollect">
    <v2header/>
    <div class="v2maintainer">
      <div class="container v2container">
        <div class="user-banner">
          <div class="info">
            <div class="userimg"><img :src="user.profileUrl"></div>
            <p class="name">{{user.nickName}}</p>
            <p class="des">{{user.synopsis}}</p>
            <p class="candy">糖果 <span>{{user.candy}}</span></p>
          </div>
          <a href="javascript:;" class="signin" @click="$store.state.signInTips = true">签到</a>
        </div>
        <div class="user-main">
          <div class="leftnav">
            <ul>
              <li>
                <router-link to="/userCollect">
                  <div class="navicon"><img src="../assets/userCenter/l1.png"><img class="on" src="../assets/userCenter/l1-on.png"></div>
                  我的收藏
                </router-link>
              </li>
              <li>
                <router-link to="/userProject">
                  <div class="navicon"><img src="../assets/userCenter/l2.png"><img class="on" src="../assets/userCenter/l2-on.png"></div>
                  我的项目
                </router-link>
              </li>
              <li>
                <router-link to="/userInfo">
                  <div class="navicon"><img src="../assets/userCenter/l3.png"><img class="on" src="../assets/userCenter/l3-on.png"></div>
                  账户信息
                </router-link>
              </li>
              <li class="active">
                <router-link to="/userNotice">
                  <div class="navicon"><img src="../assets/userCenter/l4.png"><img class="on" src="../assets/userCenter/l4-on.png"></div>
                  消息通知
                </router-link>
              </li>
            </ul>
          </div>
          <div class="rightcontent">
            
          </div>
        </div>
      </div>

      <v2footer/>
    </div>
  </div>
</template>

<script>
  let newsimg = require('../assets/search/news.png');
  let loading = require('../assets/login/loading.gif');

  export default {
    data() {
      return {
        user: {
          token: '',
          uid: '',
          sign: '',
          candy: '',
          nickName: '',
          synopsis: '',
          phoneNumber: '',
          oldPassword: '',
          newPassword: '',
          ensurePwd: '',
          profileUrl: '',
          email: '',
          newEmail: '',
          oldSex: '',
          sex: '',
          emailCode: ''
        },
      }
    },
    mounted() {
      this.getLocalStorageUserInfo();
    },
    methods: {
      getLocalStorageUserInfo () {
        let token = localStorage.getItem('apelink_user_token');
        if (token !== null && token !== '' && token !== undefined) {
          this.user.token = localStorage.getItem('apelink_user_token');
          this.user.uid = localStorage.getItem('apelink_user_uid');
          this.user.nickName = localStorage.getItem('apelink_user_nickName');
          this.user.candy = localStorage.getItem('apelink_user_candies');
          this.user.phoneNumber = localStorage.getItem('apelink_user_phoneNumber');
          this.user.synopsis = localStorage.getItem('apelink_user_synopsis');
          this.user.profileUrl = localStorage.getItem('apelink_user_profileUrl');
          this.user.email = localStorage.getItem('apelink_user_email');
          this.user.sex = localStorage.getItem('apelink_user_sex');
          this.user.oldSex = localStorage.getItem('apelink_user_sex');
        } else {
          this.$router.push('/home')
        }
      },
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.follow-show {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 36px 0 240px 0;
  img {
    display: block;
    margin: 0 auto;
    padding-bottom: 26px;
  }
  p {
    font-size: 16px;
    height: 16px;
    
    text-align: center;
    color: #898989;
  }
}
</style>

