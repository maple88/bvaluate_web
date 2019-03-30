<template>
  <transition name="fade">
    <div class="login_fixed signIn_tips" v-if="signInTips">
      <div class="login_bg"></div>
      <div class="loginbox signIn_tips">
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="bd">
          <!-- <div class="tips_title">
            <img src="../assets/signIn/title.png" alt="">
          </div> -->
          <div class="candy-title">
            <p>{{$t('Daily sign in to send candy')}}</p>
            <p v-if="$i18n.locale === 'cn'">连续签满<span class="candy-day">7天</span>送<span class="candy-num">66</span>糖果</p>
            <p v-if="$i18n.locale === 'en'">Continuously sign<span class="candy-day">7 days</span>to send<span class="candy-num">66</span>candy</p>
            <p v-if="$i18n.locale === 'hk'">連續簽滿<span class="candy-day">7天</span>送<span class="candy-num">66</span>糖果</p>
            <p v-if="$i18n.locale === 'cn'">已连续签到 <span>{{signedInNum}}</span> 天</p>
            <p v-if="$i18n.locale === 'en'">Signed in for {{signedInNum}} day in a row</p>
            <p v-if="$i18n.locale === 'hk'">已連續簽到 <span>{{signedInNum}}</span> 天</p>
          </div>
          <div class="tips_content">
            <div class="content_default">
              <!-- <div class="sugar_list">
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
              </div> -->
              <div class="candy-list">
                <ul>
                  <li v-for="item in initSignInData" :class="checkState(item.state)">
                    <p class="candyName">{{item.name}}</p>
                    <div class="sugar" :class="{active:item.state===2 || item.state === 3}">
                      <img v-show="!(item.state===2 || item.state === 3)" src="../assets/signIn/candy.png" alt="">
                      <img v-show="(item.state===2 || item.state === 3)" src="../assets/signIn/candy.png" alt="">
                    </div>
                    <p v-show="!(item.state===2 || item.state === 3)" class="candyOne">+{{item.sugar}}</p>
                    <p v-show="(item.state===2 || item.state === 3)" class="candyTwo">+{{item.sugar}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tips_button">
              <button :class="clicked?'click_style':''" name="tips_button_get" id="tips_button_get" @click="signIn">
                <span v-show="!clicked">{{$t('Click to receive')}}</span>
                <span v-show="clicked">{{$t('Received')}}</span></button>
            </div>
          </div>
          <!-- <div class="bg1"><img src="../assets/signIn/signinbg1.png"></div> -->
          <!-- <div class="bg2"><img src="../assets/signIn/signinbg2.png"></div> -->
          <!-- <div class="bg3"><img src="../assets/signIn/signinbg3.png"></div> -->
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
            name: this.$t('Day 1')
          },
          {
            sugar: 5,
            state: 0,
            name: this.$t('Day 2')
          },
          {
            sugar: 5,
            state: 0,
            name: this.$t('Day 3')
          },
          {
            sugar: 5,
            state: 0,
            name: this.$t('Day 4')
          },
          {
            sugar: 5,
            state: 0,
            name: this.$t('Day 5')
          },
          {
            sugar: 5,
            state: 0,
            name: this.$t('Day 6')
          },
          {
            sugar: 66,
            state: 0,
            name: this.$t('Day 7')
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

        // this.clicked = localStorage.getItem('apelink_user_signedIn');
        // this.signedInNum = localStorage.getItem('apelink_user_signedInNum');
        // this.initData(this.clicked, this.signedInNum);
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
<style lang="scss" scoped>
.content_default{
  margin: 52px 0;
  @media (max-width: 575px) {
    margin: 10px 0;
  }
}
.login_fixed.signIn_tips .signIn_tips .bd .tips_content .tips_button {
  padding-bottom: 29px;
  padding-top: 0;
  @media (max-width: 575px) {
    padding-bottom: 10px;
  }
  button{
    @media (max-width: 575px) {
      font-size: 14px;
      padding: 8px 30px;
    }
  }
}
.bd {
  .candy-title {
    p {
      text-align: center;
      margin: 0;
      &:first-child {
        padding: 33px 0 28px 0;
        font-size: 28px;
        color: #2b57fe;
        font-weight: bold;
        box-sizing: border-box;
        @media (max-width: 575px) {
          padding: 20px 0 10px;
          font-size: 20px;
        }
      }
      &:nth-child(2){
        font-size: 16px;
        color: #000;
        @media (max-width: 575px) {
          font-size: 14px;
        }
        .candy-day {
          color: #2b57fe;
          padding:0 6px;
        }
        .candy-num {
          font-size: 18px;
          color: #ec9651;
          padding: 0 10px;
        }
      }
      &:last-child{
        font-size: 14px;
        color: #666;
        @media (max-width: 575px) {
          font-size: 12px;
        }
      }
    }
  }
  .candy-list {
    max-width: 712px;
    width: 100%;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      li{
        justify-content: center;
        text-align: center;
        align-items: center;
        margin: 0 20px;
        @media (max-width: 767px) {
          margin: 0 15px;
        }
        .candyName {
          color: #737373;
          @media (max-width: 575px) {
            margin: 0;
            font-size: 12px;
          }
        }
        .sugar {
          width: 60px;
          height: 60px;
          margin: 0 auto;
          background-color: #cacaca;
          border: 4px solid #eee;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          @media (max-width: 767px) {
            width: 45px;
            height: 45px;
            img{
              width: 40px;
            }
          }
          &.active {
            background-color: #3e60dc !important;
            border-color: #bec8f3 !important;
          
          }
          img {
            display: block;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
            
          }
        }
        .candyOne {
          color: #999;
          margin-top: 10px;
          @media (max-width: 575px) {
            margin: 0;
            font-size: 12px;
          }
        }
         .candyTwo {
          color: #768cfe;
          margin-top: 10px;
          @media (max-width: 575px) {
            margin: 0;
            font-size: 12px;
          }
        }
        &.this_day{
          .sugar{
            background: #90a8ff;
          }
        }
      }
    }
  }
}
.login_fixed .loginbox {
  padding: 0;
}
.login_fixed.signIn_tips .signIn_tips .bd {
//  background-image: url();
  // background-color: #fff;
  padding: 0;
}
.login_fixed.signIn_tips .signIn_tips  {
  background-image: url("../assets/signIn/qiandao.jpg");
  border-radius: 0;
  background-size: cover;
  overflow: hidden;
}
.login_fixed .loginbox .close_box{
  top: 5px;
  right: 5px;
}
.login_fixed.signIn_tips .signIn_tips .close_box .icon_close{
  box-shadow: none;
  background-color: transparent;
  border: 0;
}


</style>

