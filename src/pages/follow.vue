<template>
  <div class="page">
    <vheader/>
    <div class="maintainer">
      <div class="swiper-container" id="top_banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :style="'background-image: url('+banner1+')'">
            <div class="banner_div">
              <div class="show_box">
                <img src="../assets/follow/apelink.png"/>
                <span class="plus">+</span>
                <span class="name">APELINK</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide" :style="'background-image: url('+banner1+')'"></div>
          <div class="swiper-slide" :style="'background-image: url('+banner1+')'"></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="footer">
      <!-- <div class="top">
                <div class="container">
                    <div class="flexbox">
                        <ul>
                            <li>APELINK</li>
                            <li><a href="#">Stats & facts</a></li>
                            <li><a href="#">Media</a></li>
                            <li><a href="#">API</a></li>
                            <li><a href="#">Mobile app (Android)</a></li>
                            <li><a href="#">Chrome Eidget</a></li>
                            <li><a href="#">Firefox Widget</a></li>
                            <li><a href="#">Benchy</a></li>
                        </ul>
                        <ul>
                            <li>APELINK</li>
                            <li>
                                <ul class="network">
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f1.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f2.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f3.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f4.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f5.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f6.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f7.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f8.png)"></div></a></li>
                                    <li><a href="#"><div style="background-image: url(../assets/footer/f10.png)"></div></a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>For ICOs</li>
                            <li><a href="#">Publish new ICO</a></li>
                            <li><a href="#">ICO Analyzre</a></li>
                            <li><a href="#">Premium Listing</a></li>
                            <li><a href="#">Widgets</a></li>
                            <li><a href="#">For al</a></li>
                        </ul>
                        <ul>
                            <li>For ALL</li>
                            <li><a href="#">ICO Listing</a></li>
                            <li><a href="#">People of Blockchsin</a></li>
                            <li><a href="#">ICO Whitelist</a></li>
                            <li><a href="#">Agencies</a></li>
                            <li><a href="#">Exchanges</a></li>
                            <li><a href="#">Experts</a></li>
                            <li><a href="#">ROL calculator</a></li>
                        </ul>
                    </div>
                </div>
            </div> -->
      <div class="bottom">aaaa</div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';

  let img1 = require('../assets/follow/banner01.png')

  export default {
    data() {
      return {
        colorList: ['red', 'yellow', 'gray', 'pink'],
        banner1: img1
      }
    },
    mounted() {
      new Swiper('#top_banner', {
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../node_modules/swiper/dist/css/swiper.min.css';
</style>

