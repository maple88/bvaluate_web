<template>
  <transition name="fade">
    <div class="login_fixed v2login" v-show="wechatPop">
      <div class="loginbox">
        <div class="close_box" @click="fn2">
          <i class="icon_close2"></i>
        </div>
        <div class="hd">
          <div class="loginlogo"><img src="../assets/loginlogo.png"></div>
          <div class="wechatBox">
            <div id="wechat"></div>
            <div class="Loginloading" v-show="showLoading">
              <img :src="loading">
            </div>
          </div>
        </div>
        <!-- <div class="bd">
          
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
  import sensors from '../../static/sa-init.js'

  let loading = require('../assets/login/loading.gif');
  export default {
    data() {
      return {
        loading: loading,
        showLoading: false
      }
    },
    computed: {
      wechatPop() {
        if (this.$store.state.wechatPop) {
          this.wechatCode();
          window.addEventListener('message', messageEvent => {
            var data = messageEvent.data;
            if (data) {
              // console.log(data.bvaluateUserCode);
              if (data.bvaluateUserCode) {
                this.showLoading = true;
                this.$axios.get('/user/passAuth?code=' + data.bvaluateUserCode + '&state=' + Math.random())
                .then(res => {
                  if(res.data.phoneNumber){
                    let that = this;
                    localStorage.setItem('apelink_user_uid', res.data.uid);
                    localStorage.setItem('apelink_user_token', res.data.token);
                    localStorage.setItem('apelink_user_phoneNumber', phoneNumber);
                    let url = '/user/info';
                    let headers = {'uid': res.data.uid, 'Authorization': res.data.token};
                    that.$axios({
                      method: 'get',
                      url: url,
                      headers: headers
                    }).then(function (res) {
                      that.aplinkUser = res.data;
                      localStorage.setItem('apelink_user_candies', res.data.candies);
                      localStorage.setItem('apelink_user_nickName', res.data.nickName);
                      sensors.setProfile({nickname: res.data.nickName});
                      localStorage.setItem('apelink_user_signedIn', res.data.signedIn);
                      let synopsis = res.data.synopsis;
                      let profileUrl = res.data.profileUrl;
                      let email = res.data.email;
                      let sex = res.data.sex;
                      if (!(synopsis != null && synopsis !== undefined && synopsis !== '' && synopsis !== 'null')) {
                        synopsis = ''
                      }
                      if (!(profileUrl != null && profileUrl !== undefined && profileUrl !== '' && profileUrl !== 'null')) {
                        profileUrl = ''
                      }
                      if (!(email != null && email !== undefined && email !== '' && email !== 'null')) {
                        email = ''
                      }
                      if (sex < 1) {
                        sex = 1
                      }
                      localStorage.setItem('apelink_user_synopsis', synopsis);
                      localStorage.setItem('apelink_user_profileUrl', profileUrl);
                      localStorage.setItem('apelink_user_email', email);
                      sensors.setProfile({Email: email});
                      localStorage.setItem('apelink_user_sex', sex);
                      if (sex === '2') {
                        sensors.setProfile({gender: '男'});
                      } else if (sex === '3') {
                        sensors.setProfile({gender: '女'});
                      }
                      sensors.registerPage({
                        platform_type: 'web',
                        is_login: true,
                        is_register: true
                      });
                      sensors.login(uid);
                      sensors.track("Loginresult", {
                        is_true: true,
                        false_reason: '登录成功'
                      });
                      window.location.reload();
                    })
                  }else{
                    // 弹绑定手机
                    this.$store.state.loginPop = false;
                    this.$store.state.wechatPop = false;
                    this.$store.state.bindPhonePop = true;
                  }
                })
              }
            }
          }, false);
        }
        return this.$store.state.wechatPop;
      },
    },
    methods: {
      fn2() {
        this.$store.state.wechatPop = false;
      },
      wechatCode () {
        new WxLogin({
          self_redirect:true,
          id:"wechat", 
          appid: "wx67252f94be009c71", 
          scope: "snsapi_login", 
          redirect_uri: "http%3a%2f%2ftest.bvaluate.com.cn%2f%23%2fwechatCode",
          state: "",
          style: "black",
          href: ""
        });
        // let temp = 0;
        // let wechat = document.getElementById('wechat');
        // let iframe = wechat.getElementsByTagName('iframe')[0].contentWindow;
        // let src = iframe.document.location.href;
        // console.log(iframe.src)
        // let clearTime = setInterval(()=>{
        //   console.log(src)
        //   let newSrc = iframe.location.href;
        //   if(newSrc !== src){
        //       console.log(newSrc)
        //       clearInterval(clearTime);
        //   }
        // },200)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

