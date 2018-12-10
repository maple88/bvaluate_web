<template>
  <div class="page project1">
    <vheader/>
    <div class="maintainer">
      <!-- content here -->
      <div class="project1-topmain">
        <button class="whitepaper">白皮书</button>
        <div class="topmaintainer">
          <div class="projectTop">
            <div class="img-box"><img src="../assets/project/recommend.jpg"></div>
            <div class="textRight">
              <div class="title">
                <a href="#" target="_blank" class="atitle">Zilliqa</a>
                <div class="followbtn" v-if="!isFollow"><i class="fa fa-plus wicon"></i> 关注</div>
                <div class="followbtn on" v-if="isFollow"><i class="fa fa-check wicon"></i> 已关注</div>
                <div class="followbtn on share_button">
                  <i class="fa fa-share-alt wicon"></i> 分享
                </div>
              </div>
              <p class="des">Scalable blockchain platform with througput of thousands of TX/s</p>
            </div>
          </div>
          <p class="describe">Zilliqa is a new blockchain platform that is designed to scale in an open, permission-less distributed network securely. The core feature that makes Zilliqa scalable is sharding — dividing the network into several smaller component networks (called shards) capable of processing transactions in parallel.</p>
          <div class="hangyeTips">
            <p class="title">行业标签</p>
            <ul>
              <li>
                <p class="top">众筹</p>
                <p class="bottom">平均评分<span>3.6</span></p>
              </li>
              <li>
                <p class="top">众筹</p>
                <p class="bottom">平均评分<span>3.6</span></p>
              </li>
              <li>
                <p class="top">众筹</p>
                <p class="bottom">平均评分<span>3.6</span></p>
              </li>
            </ul>
          </div>
          <ul class="projectBottom">
            <li><a href="#"><img src="../assets/project/f1.png"></a></li>
            <li><a href="#"><img src="../assets/project/f2.png"></a></li>
            <li><a href="#"><img src="../assets/project/f3.png"></a></li>
            <li><a href="#"><img src="../assets/project/f4.png"></a></li>
            <li><a href="#"><img src="../assets/project/f5.png"></a></li>
          </ul>
        </div>
      </div>
      <div class="project1-main">
        <div class="leftmain">
          <div class="tophead">
            <div class="item">价格<img src="../assets/project/up.png"><span>3.23%</span></div>
            <div class="item">
              <p class="t">市值</p>
              <p class="b">$21,452,131,642</p>
            </div>
            <div class="item">
              <p class="t">流通市值</p>
              <p class="b">$21,452,131,642</p>
            </div>
            <div class="item">
              <p class="t">大单交易笔数</p>
              <p class="b">$21,452,131,642</p>
            </div>
          </div>
        </div>
        <div class="rightmain"></div>
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

