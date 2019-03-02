<template>
  <div class="page project userCenter userInfo">
    <v2header/>
    <div class="v2maintainer">
      <div class="container v2container">
        <div class="user-banner">
          <div class="info">
            <div class="userimg"><img :src="user.img"></div>
            <p class="name">{{user.nickName}}</p>
            <p class="des">{{user.sign}}</p>
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
              <li class="active">
                <router-link to="/userInfo">
                  <div class="navicon"><img src="../assets/userCenter/l3.png"><img class="on" src="../assets/userCenter/l3-on.png"></div>
                  账户信息
                </router-link>
              </li>
              <li>
                <router-link to="/userNotice">
                  <div class="navicon"><img src="../assets/userCenter/l4.png"><img class="on" src="../assets/userCenter/l4-on.png"></div>
                  消息通知
                </router-link>
              </li>
            </ul>
          </div>
          <div class="rightcontent">
            <div class="userBox">
              <div class="user-header">账户信息</div>
              <div class="user-flexbox">
                <div class="leftinfo">
                  <div class="inforow">
                    <div class="left">昵称<span></span></div>
                    <div class="center">
                      <div v-show="!editName" class="nickname">{{user.nickName}}</div>
                      <div v-show="editName" class="editName">
                        <input type="text" maxlength="8" name="no_content" id="input_nickName" v-model="user.nickName" data="输入新昵称" @keyup.enter="editNickName(editName, $event)">
                      </div>
                    </div>
                    <div class="right">
                      <div v-show="!editName" @click="editName = true" class="editbtn">修改</div>
                      <div v-show="editName" @click="editNickName(editName, $event)" class="editbtn ok">完成</div>
                    </div>
                  </div>
                </div>
                <div class="rightimg">
                  <div class="userimg"><img src="../assets/user/userimg.jpg"></div>
                  <div class="changeBtn">更换头像</div>
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
  import sensors from '../../static/sa-init.js'
  let newsimg = require('../assets/search/news.png');
  let loading = require('../assets/login/loading.gif');

  export default {
    data() {
      return {
        editName: false,
        user: {
          token: '',
          uid: '',
          img: '',
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
        this.user.token = localStorage.getItem('apelink_user_token');
        this.user.uid = localStorage.getItem('apelink_user_uid');
        this.user.img = localStorage.getItem('apelink_user_profileUrl');
        this.user.nickName = localStorage.getItem('apelink_user_nickName');
        this.user.sign = localStorage.getItem('apelink_user_synopsis');
        this.user.candy = localStorage.getItem('apelink_user_candies');
      },
      editNickName(obj, event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        let json = {
          nickName: this.user.nickName
        };
        let that = this
        that.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_nickName', that.user.nickName);
            sensors.setProfile({nickname: that.user.nickName});
            that.editName = false;
          } else {
            that.editName = false;
          }
        })
      },
      editInfor(json, callback, error) {
        let that = this;
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        let url = '/api/user/modify';
        let headers = {'uid': uid, 'Authorization': token};
        let thatCallback = callback;
        let thatError = error;
        that.$axios({
          method: 'put',
          url: url,
          headers: headers,
          data: json
        }).then(function (res) {
          thatCallback(res)
        })
      }
    },
    filters: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
// .follow-show {
//   width: 100%;
//   height: 100%;
//   background-color: #fff;
//   padding: 36px 0 240px 0;
//   img {
//     display: block;
//     margin: 0 auto;
//     padding-bottom: 26px;
//   }
//   p {
//     font-size: 16px;
//     height: 16px;
    
//     text-align: center;
//     color: #898989;
//   }
// }
</style>

