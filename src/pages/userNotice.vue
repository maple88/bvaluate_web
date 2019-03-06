<template>
  <div class="page project userCenter userNotice">
    <v2header/>
    <div class="v2maintainer">
      <div class="container v2container">
        <div class="user-banner">
          <div class="info">
            <div class="userimg"><img :src="user.profileUrl"></div>
            <p class="name">{{user.nickName}}</p>
            <p class="des">{{user.synopsis}}</p>
            <p class="candy">{{$t('candies')}} <span>{{user.candy}}</span></p>
          </div>
          <a href="javascript:;" class="signin" @click="$store.state.signInTips = true">{{$t('Check in')}}</a>
        </div>
        <div class="user-main">
          <div class="leftnav">
            <ul>
              <li>
                <router-link to="/userCollect">
                  <div class="navicon"><img src="../assets/userCenter/l1.png"><img class="on" src="../assets/userCenter/l1-on.png"></div>
                  {{$t('My collection')}}
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <div class="navicon"><img src="../assets/userCenter/l2.png"><img class="on" src="../assets/userCenter/l2-on.png"></div>
                  {{$t('My project')}}
                </router-link>
              </li>
              <li>
                <router-link to="/userInfo">
                  <div class="navicon"><img src="../assets/userCenter/l3.png"><img class="on" src="../assets/userCenter/l3-on.png"></div>
                  {{$t('Account information')}}
                </router-link>
              </li>
              <li class="active">
                <router-link to="/userNotice">
                  <div class="navicon"><img src="../assets/userCenter/l4.png"><img class="on" src="../assets/userCenter/l4-on.png"></div>
                  {{$t('notification')}}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="rightcontent">
            <div class="noticeBox">
              <div class="headtab">
                <div class="item" :class="showBox === 0?'on':''" @click="showList(0)">{{$t('All')}}</div>
                <div class="item" :class="showBox === 1?'on':''" @click="showList(1)">{{$t('Unread news')}}</div>
              </div>
              <div class="noticeList">
                <div class="item" v-for="(item, index) in messageList" :key="index">
                  <div class="left">{{$t('notice')}}</div>
                  <div class="center">{{item.content}}</div>
                  <div class="right">{{item.createdTime}}</div>
                </div>
                <!-- <div class="loadmore" v-if="showLoadMore" @click="">{{$t('Load more')}}<i class="moreimg"></i></div> -->
                <!-- 无消息 -->
                <div class="notmore" v-if="showMessage">
                    <div class="not-box">
                        <img src="../assets/user/message.png" alt="">
                        <p>暂无消息</p>
                    </div>
                </div>
              </div>
            </div>
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
        showLoadMore: true,
        messageList: [],
        open: -1,
        unReadList: [],
        allList: [],
        showBox: 0,
        showMessage:false,
      }
    },
    activated () {
      this.getLocalStorageUserInfo();
    },
    mounted() {
      this.initMessage();
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
      initMessage() {
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let headers = {'uid': uid, 'Authorization': token};
          let url = '/api/notify/getUserNotify';
          this.$axios({
            method: 'get',
            url: url,
            headers: headers
          }).then(res => {
            this.messageList = res.data;
            this.allList = res.data;
          });
        }
      },
      showList(type) {
        if (type===0) {
          if(this.showBox !== type){
            this.showBox = 0;
            this.initMessage();
          }
          this.showMessage = false;
        } else {
          if(this.showBox !== type){
            let uid = localStorage.getItem('apelink_user_uid');
            let token = localStorage.getItem('apelink_user_token');
            if (token) {
              let headers = {'uid': uid, 'Authorization': token};
              let url = '/api/notify/getUserNotify?readFlag=unread';
              this.$axios({
                method: 'get',
                url: url,
                headers: headers
              }).then(res => {
                this.unReadList = res.data;
                this.messageList = this.unReadList;
                this.showBox = 1;
                if(res.data.length === 0){
                  this.showMessage = true;
                }
              }).catch(res => {
                this.messageList = []
                this.showBox = 1;
              });
            }
          }
        }
      }
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

