<template>
  <transition name="fade">
    <div class="login_fixed signIn_tips" v-if="signInTips">
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
                <div class="sugar_item" :class="checkState(item.state)" v-for="item in initSignInData">
                  <div class="sugar_box">
                    <img v-show="!(item.state===2 || item.state === 3)" src="../assets/signIn/sugar.png" alt="">
                    <h4 v-show="!(item.state===2 || item.state === 3)">+{{item.sugar}}</h4>
                    <img v-show="item.state===2 || item.state === 3" class="check_on" src="../assets/signIn/check.png"
                         alt="">
                  </div>
                  <div class="day_box">
                    <h4>{{item.name}}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="tips_button">
              <button :class="clicked?'click_style':''" name="tips_button_get" id="tips_button_get" @click="signIn"><span v-show="!clicked">点击领取</span><span
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
        clicked: false,
        signedIn: false,
        signedInNum: 0,
        click: false,
        this_day: 0,
        initSignInData: [
          {
            sugar: 5,
            state: 0,
            name: '第一天'
          },
          {
            sugar: 5,
            state: 0,
            name: '第二天'
          },
          {
            sugar: 5,
            state: 0,
            name: '第三天'
          },
          {
            sugar: 5,
            state: 0,
            name: '第四天'
          },
          {
            sugar: 5,
            state: 0,
            name: '第五天'
          },
          {
            sugar: 5,
            state: 0,
            name: '第六天'
          },
          {
            sugar: 66,
            state: 0,
            name: '第七天'
          }
        ]
      }
    },
    mounted() {

    },
    methods: {
      checkState(state, index) {
        if (state === 1) {
          return 'this_day'
        } else if (state === 2) {
          return 'checked'
        } else if (state === 3) {
          return 'checked this_day'
        }
      },
      initData(signedIn, signedInNum) {
        let this_day = 0;
        if (signedInNum >= 1) {
          signedInNum = signedInNum - 1;
          if (signedIn) {
            this_day = signedInNum
          } else {
            this_day = signedInNum + 1
          }
        } else {
          signedInNum = 0;
          this_day = 0;
        }
        this.this_day = this_day;
        for (let i = 0; i < this.initSignInData.length; i++) {
          if (i < this_day) {
            this.initSignInData[i].state = 2;
          } else if (i === this_day) {
            this.initSignInData[i].state = 1;
            if (signedIn) {
              this.initSignInData[i].state = 3;
            }
          } else {
            this.initSignInData[i].state = 0;
          }
        }
      },
      fn2() {
        this.click = true;
        this.$store.state.signInTips = false;
        sessionStorage.setItem('apelink_user_close_sign_tip', true);
      },
      receive() {
        this.clicked = !this.clicked;
      },
      initSignInTips() {
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        if (!token) {
          return false;
        }
        let url = '/api/user/info';
        let headers = {'uid': uid, 'Authorization': token};
        this.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(res => {
          this.clicked = res.data.signedIn;
          this.signedInNum = parseInt(res.data.signedInNum);
          this.initData(this.clicked, this.signedInNum);
        })
      },
      signIn() {
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        let headers = {'uid': uid, 'Authorization': token};
        let url = '/api/user/signIn';
        this.$axios({
          method: 'post',
          url: url,
          headers: headers
        }).then(res => {
          if (res.data) {
            this.initSignInData[this.this_day].state = 3;
            this.$store.state.sugar += this.initSignInData[this.this_day].sugar;
            this.clicked = true;
            localStorage.setItem('apelink_user_signedIn', true);
            localStorage.setItem('apelink_user_candies', this.$store.state.sugar);
          }
        })
      }
    },
    computed: {
      signInTips() {
        if (this.$store.state.signInTips) {
          this.initSignInTips();
        }
        return this.$store.state.signInTips
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

