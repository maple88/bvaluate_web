<template>
  <transition name="fade">
    <div class="login_fixed register_tips" v-show="registerTip">
      <div class="login_bg"></div>
      <div class="loginbox register_tips">
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="bd">
          <div class="tips_title">
            <h4>注册送糖果</h4>
          </div>
          <div class="tips_content">
            <div class="content_default">
              <h4>新用户注册即送<span>888</span>糖果</h4>
            </div>
            <div class="tips_button">
              <button @click="goRegister" name="tips_button" id="tips_button">立即注册</button>
            </div>
            <div class="erCode_box">
              <img src="../assets/register/erCode.png" alt="">
            </div>
            <div class="content_tips">
              <p>更多活动资讯</p>
              <p>请关注我们的公众号</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import sensors from '../../static/sa-init.js'

  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      fn2() {
        this.$store.state.registerTip = false;
        let isCloseRegisterTip = sessionStorage.getItem('apelink_user_close_register_tip');
        if (!isCloseRegisterTip) {
          sessionStorage.setItem('apelink_user_close_register_tip', true);
        }
      },
      goRegister() {
        let isCloseRegisterTip = sessionStorage.getItem('apelink_user_close_register_tip');
        if (!isCloseRegisterTip) {
          sessionStorage.setItem('apelink_user_close_register_tip', true);
        }
        this.$store.state.registerTip = false;
        this.$store.commit('register');
      }
    },
    computed: {
      registerTip() {
        return this.$store.state.registerTip
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

