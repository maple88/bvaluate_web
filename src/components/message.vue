<template>
  <transition name="fade">
    <div class="login_fixed" v-if="messagePop">
      <div class="login_bg" @click="fn2"></div>
      <div class="loginbox whitePaper">
        <div class="whitehead"><img src="../assets/white-head.png"></div>
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="hd whitePaperTitle">
          <p>消息中心</p>
        </div>
        <div class="bd">
          123
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import sensors from '../../static/sa-init.js'

  export default {
    data() {
      return {
        filename: '',
        tipText: '',
        showTip: false,
        fileTips: '',
        uploadBtn: true,
        pdf: '',
        uploadstate: false,
        uploadword: '',
        uploadtime: 0,
        project: {
          projectName: '',
          projectNameErr: '',
          officialAddress: '',
          officialAddressErr: '',
          tokenName: ''
        }

      }
    },
    mounted() {

    },
    computed: {
      messagePop() {
        return this.$store.state.messagePop;
      }
    },
    methods: {
      fn2() {
        this.$store.state.messagePop = false;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

