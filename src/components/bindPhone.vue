<template>
  <transition name="fade">
    <div class="login_fixed v2login bindPhone" v-show="bindPhonePop">
      <div class="loginbox">
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="hd">
          <div class="loginlogo"><img src="../assets/loginlogo.png"></div>
          <ul>
            <li>绑定手机号</li>
          </ul>
        </div>
        <div class="bd">
          <div class="inputInner">
            <div class="input-group">
              <div class="input-group-addon">+86</div>
              <input type="text" class="form-control" v-model="phoneNumber" placeholder="请输入手机号" data="输入手机号"
              name="no_content" id="input_bindPhone_phoneNumber">
              <!-- <span class="help-block" v-if="errorMsg.phoneNumber">
                {{errorMsg.phoneNumber}}
              </span> -->
            </div>
            <div class="input-group code">
              <input type="text" v-model="code" placeholder="输入验证码" data="输入验证码"
              name="no_content" id="input_login_code">
              <!-- <span class="help-block" v-if="errorMsg.registerUser.code">
                {{errorMsg.registerUser.code}}
              </span> -->
              <button class="code-btn" :disabled="bindPhoneSendBtn" name="login_code-btn" id="login_code-btn" data="获取验证码" @click.stop="sendCode">
                <img :src="loading" v-show="bindPhoneShowloading"/>
                {{bindPhoneSendBtnText}}
              </button>
            </div>
            <div class="input-group submit-group">
              <button type="button" class="btn ok-btn" data="确定" name="login_register" id="login_register" @click.stop="bindPhoneSubmit">确定</button>
            </div>
          </div>
        </div>
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
        phoneNumber: '',
        code: '',
        bindPhoneSendBtn: true,
        bindPhone_time: 60,
        bindPhoneSendBtnText: '获取验证码',
        bindPhoneShowloading: false
      }
    },
    mounted () {
    },
    computed: {
      bindPhonePop() {
        return this.$store.state.bindPhonePop;
      },
    },
    methods: {
      fn2() {
        this.$store.state.bindPhonePop = false;
      },
      bindPhoneSubmit () {
        layer.msg('敬请期待');
      },
      sendCode () {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

