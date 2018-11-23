<template>
  <transition name="fade">
    <div class="login_fixed signIn_tips" v-show="signInTips">
      <div class="login_bg"></div>
      <div class="loginbox signIn_tips">
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="bd">
          <div class="tips_title">
            <img src="../assets/signIn/title.png" alt="">
          </div>
          <div class="tips_content">
            <div class="content_default">
              <div class="sugar_list">
                <div class="sugar_item this_day">
                  <div class="sugar_box">
                    <img src="../assets/signIn/sugar.png" alt="">
                    <h4>+5</h4>
                  </div>
                  <div class="day_box">
                    <h4>第一天</h4>
                  </div>
                </div>
                <div class="sugar_item">
                  <div class="sugar_box">
                    <img src="../assets/signIn/sugar.png" alt="">
                    <h4>+5</h4>
                  </div>
                  <div class="day_box">
                    <h4>第二天</h4>
                  </div>
                </div>
                <div class="sugar_item">
                  <div class="sugar_box">
                    <img src="../assets/signIn/sugar.png" alt="">
                    <h4>+5</h4>
                  </div>
                  <div class="day_box">
                    <h4>第三天</h4>
                  </div>
                </div>
                <div class="sugar_item">
                  <div class="sugar_box">
                    <img src="../assets/signIn/sugar.png" alt="">
                    <h4>+5</h4>
                  </div>
                  <div class="day_box">
                    <h4>第四天</h4>
                  </div>
                </div>
                <div class="sugar_item">
                  <div class="sugar_box">
                    <img src="../assets/signIn/sugar.png" alt="">
                    <h4>+5</h4>
                  </div>
                  <div class="day_box">
                    <h4>第五天</h4>
                  </div>
                </div>
                <div class="sugar_item">
                  <div class="sugar_box">
                    <img src="../assets/signIn/sugar.png" alt="">
                    <h4>+5</h4>
                  </div>
                  <div class="day_box">
                    <h4>第六天</h4>
                  </div>
                </div>
                <div class="sugar_item">
                  <div class="sugar_box">
                    <img src="../assets/signIn/sugar.png" alt="">
                    <h4>+66</h4>
                  </div>
                  <div class="day_box">
                    <h4>第七天</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="tips_button">
              <button :class="clicked?'click_style':''" @click="receive"><span v-show="!clicked">点击领取</span><span
                v-show="clicked">已领取</span></button>
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
      return {
        clicked: false
      }
    },
    mounted() {
    },
    methods: {
      fn2() {
        this.$store.state.signInTips = false;
      },
      receive() {
        this.clicked = !this.clicked;
      }
    },
    computed: {
      signInTips() {
        return this.$store.state.signInTips
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

