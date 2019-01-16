<template>
  <transition name="fade">
    <div class="login_fixed v2login" v-if="wechatPop">
      <div class="loginbox">
        <div class="close_box" @click="fn2">
          <i class="icon_close2"></i>
        </div>
        <div class="hd">
          <div class="loginlogo"><img src="../assets/loginlogo.png"></div>
          <div id="wechat"></div>
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
        
      }
    },
    mounted () {
      this.wechatCode();
      window.addEventListener('message', function(messageEvent) { 
        var data = messageEvent.data;
        // console.info('message from child:', data);
        this.getAccessToken(data)
      }, false);
    },
    computed: {
      wechatPop() {
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
          redirect_uri: "http://bvaluate.com.cn/user/passAuth",
          state: "",
          style: "black",
          href: ""
        });
      },
      getAccessToken (code) {
        this.$axios.get('/wechat/sns/oauth2/access_token?appid=wx67252f94be009c71&secret=63f3d2deb5836caca8105015f75c5c69&code='+ code +'&grant_type=authorization_code')
        .then(res=>{
          console.log(res.data);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

