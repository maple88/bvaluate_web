<template>
  <div class="page">
    <div class="download_page">
      <div class="logo_box">
        <img src="../assets/download/logo.png" alt="Bvaluate">
      </div>
      <div class="button_box">
        <button @click="downloading_android">
          <img src="../assets/download/android.png" alt="android"/>
          下载
        </button>
        <button class="ios" @click="downloading_ios">
          <img src="../assets/download/iphone.png" alt="ios"/>
          下载
        </button>
      </div>
      <transition name="fade">
        <div class="tip_box" v-if="showTip">
          <div class="b_bg" @click="cancelTip"></div>
          <h4>点击右上角选择浏览器打开</h4>
          <img src="../assets/download/tip_line.png" alt="tip_line"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showTip: false
      }
    },
    mounted() {
    },
    methods: {
      downloading_android() {
        if (this.isWeiXin()) {
          this.showTip = true;
        } else {
          window.location.href = "https://api.bvaluate.com.cn/apk/bvaluate.apk"
        }
      },
      downloading_ios() {
        if (this.isWeiXin()) {
          this.showTip = true;
        } else {
          window.location.href = "https://api.bvaluate.com.cn/apk/bvaluate_ios.ipa"
        }
      },
      cancelTip() {
        this.showTip = false;
      },
      isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .page {

  }

  .download_page {
    position: fixed;
    background-image: url("../assets/download/bg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    .logo_box {
      position: fixed;
      bottom: 25%;
      width: 100%;
      left: 0;
      text-align: center;
      > img {
        width: 206px;
      }
    }
    .button_box {
      position: fixed;
      bottom: 10%;
      width: 100%;
      left: 0;
      text-align: center;
      display: flex;
      > button {
        > img {
          height: 23px;
          width: 20px;
          margin-right: 10px;
        }
        font-size: 17px;
        font-weight: 500;
        color: rgba(9, 189, 140, 1);
        line-height: 11px;
        border-radius: 20px;
        border: none;
        padding: 6px 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        background-color: #fff;
        outline: none;
        &.ios{
          color: #3e60dc;
          img{
            width: 22px;
            margin-right: 8px;
          }
        }
      }
    }
    .tip_box {
      position: fixed;
      top: 30px;
      right: 24px;
      text-align: right;
      h4 {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        line-height: 9px;
        position: relative;
        z-index: 1;
      }
      > img {
        padding-top: 10px;
        padding-right: 13px;
        height: 104px;
        width: 77px;
        position: relative;
        z-index: 1;
      }
      .b_bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
      }
    }
  }

</style>

