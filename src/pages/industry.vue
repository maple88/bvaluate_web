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
                <span class="name">Bvaluate</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide" :style="'background-image: url('+banner1+')'"></div>
          <div class="swiper-slide" :style="'background-image: url('+banner1+')'"></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="tool_bar">
        <div class="fish_container">
          <div class="clearfix">
            <div class="search_bar">
              <input type="text" id="keyword" placeholder="腾讯回应抖音起诉">
              <div class="search-btn">
                <i class="fa fa-search"></i>
              </div>
            </div>
            <div class="label_bar">
              <div class="follow_box">
                <div class="swiper-container" id="follow_swiper">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <ul class="clearfix">
                        <li>
                          <div class="item_box">platform</div>
                        </li>
                        <li>
                          <div class="item_box">标签</div>
                        </li>
                        <li>
                          <div class="item_box">标签</div>
                        </li>
                        <li>
                          <div class="item_box">标签</div>
                        </li>
                        <li>
                          <div class="item_box">标签</div>
                        </li>
                        <li>
                          <div class="item_box">标签</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- 如果需要滚动条 -->
                  <!--<div class="swiper-scrollbar"></div>-->
                </div>
                <div class="follow_btn">
                  <div class="follow"><i class="fa fa-plus"></i>关注</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="follow_content">
        <div class="fish_container">
          <div class="clearfix">
            <div class="left">
              <ul class="menu_box">
                <li class="active">推荐</li>
                <li>推荐</li>
                <li>推荐</li>
                <li>推荐</li>
                <li>推荐</li>
                <li>推荐</li>
                <li>推荐</li>
              </ul>
            </div>
            <div class="center">
              <div class="adv_box">
                <div class="swiper-container" id="adv_banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" :style="'background-image: url('+img2+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img2+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img2+')'"></div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-button-prev"></div><!--左箭头-->
                  <div class="swiper-button-next"></div><!--右箭头-->
                </div>
                <div class="adv_infor">
                  <h4>宝马中国</h4>
                  <button>了解更多</button>
                </div>
              </div>
              <div class="follow_list">
                <ul>
                  <li>
                    <div class="list-item">
                      <div class="medialist">
                        <div class="media">
                          <div class="media-left media-middle">
                            <div class="newimg_box">
                              <img :src="img3"/>
                              <div class="date_box">
                                <span class="day">22</span>
                                <span class="years">2018-05</span>
                              </div>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth
                              doing is worth</h4>
                            <p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing
                              is worth doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is
                              worth doing well, Whatever isworth doingis worth doing wel,</p>
                            <div class="media-bottom">
                              <ul>
                                <li>
                                  <div class="userimg"><img src="../assets/follow/user_head.png"></div>
                                  刘方平
                                </li>
                                <li>5月17日 18:17</li>
                              </ul>
                              <div class="tips">新闻</div>
                            </div>
                          </div>
                        </div>
                        <div class="media">
                          <div class="media-left media-middle">
                            <div class="newimg_box">
                              <div class="date_box">
                                <span class="day">22</span>
                                <span class="years">2018-05</span>
                              </div>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth
                              doing is worth</h4>
                            <p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing
                              is worth doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is
                              worth doing well, Whatever isworth doingis worth doing wel,</p>
                            <div class="media-bottom">
                              <ul>
                                <li>
                                  <div class="userimg"><img src="../assets/logo_brand.png"></div>
                                  刘方平
                                </li>
                                <li>5月17日 18:17</li>
                              </ul>
                              <div class="tips">新闻</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="loading_more">
                <button>加载更多</button>
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
              <div class="right_item margin_top">
                <div class="hot_title">
                  <div class="title_icon">
                    <img src="../assets/follow/tweet.png"/>
                  </div>
                  <h4>
                    <span class="tab" :class="{active:isActive}" @click="isActive = true">
                      推文
                    </span>
                    <span class="vertical">|</span>
                    <span class="tab" :class="{active:!isActive}" @click="isActive = false">
                      微博
                    </span>
                  </h4>
                  <span class="look_more">查看更多</span>
                </div>
                <div class="hot_content">
                  <ul>
                    <li>
                      <div class="list_item">
                        <div class="item_left tweet">
                          <img src="../assets/follow/tweet_header.png"/>
                        </div>
                        <div class="item_body tweet">
                          <p class="tweet">Whatever is worth doing is worth doing Whatever is worth doing Whatever is
                            worth doing is worth doing Whatever is worth doing</p>
                          <div class="body_bottom">
                            <p>博主</p>
                            <p class="time">2018-05-26</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="list_item">
                        <div class="item_left tweet">
                          <img src="../assets/follow/tweet_header.png"/>
                        </div>
                        <div class="item_body tweet">
                          <p class="tweet">Whatever is worth doing is worth doing Whatever is worth doing Whatever is
                            worth doing is worth doing Whatever is worth doing</p>
                          <div class="body_bottom">
                            <p>博主</p>
                            <p class="time">2018-05-26</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="list_item">
                        <div class="item_left tweet">
                          <img src="../assets/follow/tweet_header.png"/>
                        </div>
                        <div class="item_body tweet">
                          <p class="tweet">Whatever is worth doing is worth doing Whatever is worth doing Whatever is
                            worth doing is worth doing Whatever is worth doing</p>
                          <div class="body_bottom">
                            <p>博主</p>
                            <p class="time">2018-05-26</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="list_item">
                        <div class="item_left tweet">
                          <img src="../assets/follow/tweet_header.png"/>
                        </div>
                        <div class="item_body tweet">
                          <p class="tweet">Whatever is worth doing is worth doing Whatever is worth doing Whatever is
                            worth doing is worth doing Whatever is worth doing</p>
                          <div class="body_bottom">
                            <p>博主</p>
                            <p class="time">2018-05-26</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <vfooter></vfooter>
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
        img3: img3,
        isActive: true
      }
    },
    methods: {},
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
      new Swiper('#follow_swiper', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
      });

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

