<template>
  <transition name="fade">
    <div class="login_fixed register_tips v2register_tips" v-show="registerTip">
      <div class="login_bg"></div>
      <div class="loginbox register_tips">
        <div class="bd">
          <div class="close_box" @click="fn2">
            <i class="icon_close2"></i>
          </div>
          <div class="tips_title">
            <h4>{{$t('Register for free candy')}}</h4>
          </div>
          <div class="tips_content">
            <div class="tips_button">
              <div class="register-btn" @click="goRegister">{{$t('New users  sign up will get')}}<span>888</span>{{$t('candies')}}<i class="goicon"></i></div>
            </div>
            <div class="erCode_box">
              <img src="../assets/register/erCode.png" alt="">
            </div>
            <div class="content_tips">
              <p>{{$t('For more information')}}</p>
              <p>{{$t('Please follow our official account')}}</p>
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

