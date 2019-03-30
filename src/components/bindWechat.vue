<template>
  <transition name="fade">
    <div class="login_fixed v2login" v-show="bindWechatPop">
      <div class="loginbox">
        <div class="close_box" @click="fn2">
          <i class="icon_close2"></i>
        </div>
        <div class="hd">
          <div class="loginlogo"><img src="../assets/loginlogo.png"></div>
          <div class="wechatBox">
            <div id="bindWechat"></div>
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
        showLoading: false,
        lock: true,
      }
    },
    props: {
      initUser: {
        type: Function,
        default: null
      }
    },
    computed: {
      bindWechatPop() {
        if (this.$store.state.bindWechatPop) {
          let isFist = this.$store.state.isFistOpenBindWeChatPop;
          this.wechatCode();
          if(isFist){
            this.$store.state.isFistOpenBindWeChatPop = false;
            window.addEventListener('message', messageEvent => {
              var data = messageEvent.data;
              if (data) {
                if (data.bvaluateUserCode) {
                  this.showLoading = true;
                  let uid = localStorage.getItem('apelink_user_uid');
                  let token = localStorage.getItem('apelink_user_token');
                  let url = '/api/user/bindwebWX?code=' + data.bvaluateUserCode + '&state=' + Math.random();
                  let headers = {'uid': uid, 'Authorization': token};
                  this.$axios({
                    method: 'post',
                    url: url,
                    headers: headers
                  })
                  .then(res => {
                    localStorage.setItem('apelink_user_unionid', res.data);
                    this.$store.state.unionid = res.data;
                    this.$store.state.bindWechatPop = false;
                  })
                }
              }
            }, false);
          }
          
        }
        return this.$store.state.bindWechatPop;
      },
    },
    methods: {
      headerInitUser() {
        if (this.initUser) {
          this.initUser();
        }
      },
      fn2() {
        this.$store.state.bindWechatPop = false;
      },
      wechatCode () {
        new WxLogin({
          self_redirect:true,
          id:"bindWechat", 
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

