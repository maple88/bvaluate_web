<template>
  <div class="page">
    <vheader/>
    <div class="maintainer">
      <div class="follow_content" id="article">
        <div class="fish_container">
          <div class="row">
            <div class="span6">
              <ul class="breadcrumb">
                <li>
                  <a href="#">首页</a> <span class="divider"></span>
                </li>
                <li>
                  <a href="#">行业</a> <span class="divider"></span>
                </li>
                <li class="active">正文</li>
              </ul>
            </div>
          </div>
          <div class="clearfix">
            <div class="center">
              <div class="article_box">
                <div class="article_title">
                  <h4>区块链价值经济学分析：区块链价值生态是什么？大数据教你看懂区块链！</h4>
                </div>
              </div>

            </div>
            <div class="right">
              <div class="right_item">
                <div class="hot_title">
                  <div class="title_icon">
                    <img src="../assets/follow/hot_text.png"/>
                  </div>
                  <h4>24小时热文</h4>
                </div>
                <div class="hot_content">
                  <ul>
                    <li>
                      <div class="list_item">
                        <div class="item_left">
                          <img :src="img3"/>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing well</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing</p>
                        </div>
                      </div>
                      <div class="item_bottom">
                        <p>2018-05-26</p>
                      </div>
                    </li>
                    <li>
                      <div class="list_item">
                        <div class="item_left">
                          <img :src="img3"/>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing well</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing</p>
                        </div>
                      </div>
                      <div class="item_bottom">
                        <p>2018-05-26</p>
                      </div>
                    </li>
                    <li>
                      <div class="list_item">
                        <div class="item_left">
                          <img :src="img3"/>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing well</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing</p>
                        </div>
                      </div>
                      <div class="item_bottom">
                        <p>2018-05-26</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="top">
          <div class="fish_container">
            <div class="flexbox clearfix">
              <ul>
                <li class="apelink_logo">
                  APELINK
                  <img src="../assets/follow/bottom_logo.png"/>
                </li>
                <li><a href="#">Stats & facts</a></li>
                <li><a href="#">Media</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Mobile app (Android)</a></li>
                <li><a href="#">Chrome Eidget</a></li>
                <li><a href="#">Firefox Widget</a></li>
                <li><a href="#">Benchy</a></li>
              </ul>
              <ul class="logo_box">
                <li>APELINK</li>
                <li>
                  <ul class="network clearfix">
                    <li>
                      <a href="#">
                        <div class="icon1"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon2"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon3"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon4"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon5"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon6"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon7"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon8"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon9"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="icon10"></div>
                      </a>
                    </li>

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
        </div>
        <div class="bottom">
          <p>备案号</p>
          <p>版权信息</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper';

  let img1 = require('../assets/follow/banner01.png')
  let img2 = require('../assets/follow/adv01.png')
  let img3 = require('../assets/media.jpg')


  export default {
    data() {
      return {
        colorList: ['red', 'yellow', 'gray', 'pink'],
        banner1: img1,
        img2: img2,
        img3: img3
      }
    },
    mounted() {
      new Swiper('#top_banner', {
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          disableOnInteraction: false,
        },
      })
      new Swiper('#adv_banner', {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

