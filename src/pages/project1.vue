<template>
  <div class="page project1">
    <vheader/>
    <div class="maintainer">
      <!-- content here -->
      <div class="project1-topmain">
        <div class="projectTop">
          <div class="img-box"><img src="../assets/project/recommend.jpg"></div>
          <div class="textRight">
            <div class="title">
              <a href="#" target="_blank">Zilliqa</a>
              <div class="followbtn" v-if="!isFollow" data="关注项目">+ 关注</div>
              <div class="followbtn on" v-if="isFollow" data="取消关注项目"><i class="fa fa-check"></i> 已关注</div>
              <div class="followbtn on share_button" @click.stop="shareButton = !shareButton">
                <i class="fa fa-share-alt"></i>
                <transition name="fade">
                  <div class="share_box" v-show="shareButton">
                    <div class="arrow"></div>
                    <div class="share_item" @click.stop="weChatQrCodeShow">
                      <img src="../assets/project/wechat.png" alt="">
                      <transition name="fade">
                        <div class="qrCode_box" ref="wechat_qrCode" v-show="wechatQrCode"></div>
                      </transition>
                    </div>
                    <div class="share_item" @click.stop="qqQrCodeShow">
                      <img src="../assets/project/QQ.png" alt="">
                      <transition name="fade">
                        <div class="qrCode_box" ref="qq_qrCode" v-show="qqQrCode"></div>
                      </transition>
                    </div>
                    <div class="share_item" @click.stop="weiboQrCodeShow">
                      <img src="../assets/project/weibo.png" alt="">
                      <transition name="fade">
                        <div class="qrCode_box" ref="weibo_qrCode" v-show="weiboQrCode"></div>
                      </transition>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <p class="des">Scalable blockchain platform with througput of thousands of TX/s</p>
          </div>
        </div>
      </div>
      <vfooter/>
    </div>

  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import Swiper from 'swiper'

  let loading = require('../assets/login/loading.gif');
  let nicon = require('../assets/home/tuite.png');
  let weibo = require('../assets/home/weibo.png');
  let banner = require('../assets/project/probanner.jpg');

  export default {
    data() {
      return {

      }
    },
    mounted() {
      
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

