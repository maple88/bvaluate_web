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
      <div class="tool_bar">
        <div class="fish_container">
          <div class="clearfix">
            <div class="search_bar">
              <input type="text" id="keyword"/>
              <div class="search-btn">
                <i class="fa fa-search"></i>
              </div>
            </div>
            <div class="label_bar">
              <div class="news_box">
                <div class="news_title">
                  <span>最新动态</span>
                </div>
                <p>作为新杭州人的你是否也在困扰，买车容易送车难，不可能不送车~</p>
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
                <li :class="index == classShow?'active':''" v-for="(classfy,index) in newsClassfy"
                    v-if="classfy.showInList" @click="changeClassfy(index)">
                  {{classfy.categoryName}}
                </li>
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
                        <div class="media" v-for="news in newsList">
                          <div class="media-left media-middle">
                            <div class="newimg_box">
                              <img v-if="news.titlePicture" :src="news.titlePicture"/>
                              <div class="date_box">
                                <span class="day">{{news.urlTime | showDay}}</span>
                                <span class="years">{{news.urlTime | showYear}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading">
                              {{news.title }}
                            </h4>
                            <p class="media-words">
                              {{news.content }}
                            </p>
                            <div class="media-bottom">
                              <ul>
                                <li>
                                  <div class="userimg">
                                    <img src="../assets/follow/user_head.png">
                                  </div>
                                  {{news.author }}
                                </li>
                                <li>{{news.urlTime}}</li>
                              </ul>
                              <div class="tips">{{news.grouptName}}</div>
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
              <div class="link_box">
                <div class="item">
                  <i class="fa fa-facebook"></i>
                  <p>Facebook</p>
                </div>
                <div class="item">
                  <i class="fa fa-twitter"></i>
                  <p>Twitter</p>
                </div>
                <div class="item">
                  <i class="fa fa-instagram"></i>
                  <p>Instagram</p>
                </div>
                <div class="item">
                  <i class="fa fa-google-plus"></i>
                  <p>Google</p>
                </div>
                <div class="item">
                  <i class="fa fa-pinterest"></i>
                  <p>Pinterest</p>
                </div>
              </div>
              <div class="right_item">
                <div class="hot_title">
                  <div class="title_icon">
                    <img src="../assets/follow/news_flash.png"/>
                  </div>
                  <h4>快讯</h4>
                  <span class="look_more">查看更多</span>
                </div>
                <div class="hot_content">
                  <ul>
                    <li class="news_flash">
                      <div class="news_item">
                        <div class="radio_box">
                          <div class="radio_circle first"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
                        </div>
                      </div>
                    </li>
                    <li class="news_flash">
                      <div class="news_item">
                        <div class="radio_box">
                          <div class="radio_circle"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
                        </div>
                      </div>
                    </li>
                    <li class="news_flash">
                      <div class="news_item">
                        <div class="radio_box">
                          <div class="radio_circle"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right_item margin_top">
                <div class="hot_title">
                  <div class="title_icon">
                    <img src="../assets/follow/real_time.png"/>
                  </div>
                  <h4>国家时事</h4>
                  <span class="look_more">查看更多</span>
                </div>
                <div class="hot_content current">
                  <ul>
                    <li class="news_flash">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle first"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
                        </div>
                      </div>
                    </li>
                    <li class="news_flash">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body hasImg">
                          <div class="content">
                            <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                            <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                              worth doing is worth doing</p>
                          </div>
                          <div class="content_img">
                            <img :src="img3"/>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="news_flash">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
                        </div>
                      </div>
                    </li>
                    <li class="news_flash">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
                        </div>
                      </div>
                    </li>
                    <li class="news_flash">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
                        </div>
                      </div>
                    </li>
                    <li class="news_flash">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle"></div>
                        </div>
                        <div class="item_time">
                          <span>4分钟前</span>
                        </div>
                        <div class="item_body">
                          <h4>Whatever is worth doing is worth doing Whatever is worth</h4>
                          <p>Whatever is worth doing is worth doing Whatever is worth doing is worth doing Whatever is
                            worth doing is worth doing</p>
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
        img3: img3,
        isActive: true,
        newsClassfy: [],
        classShow: 0,
        newsList: []
      }
    },
    filters: {
      showDay(obj) {
        let myDate = new Date(obj);
        return myDate.getDate()
      },
      showYear(obj) {
        let myDate = new Date(obj);
        let month = myDate.getMonth()
        if (month < 9) {
          month = '0' + (month + 1)
        } else {
          month = month + 1
        }
        return myDate.getFullYear() + '-' + month
      }
    },
    methods: {
      getNewsClassfy() {
        let that = this
        that.$axios.get('/api/traditional/categories').then(function (res) {
          that.newsClassfy = res.data;
          if (that.newsClassfy.length > 0) {
            that.initNewsList(that.newsClassfy[0].categoryId)
          }
        })
      },
      changeClassfy(index) {
        this.classShow = index;
      },
      initNewsList(categoryId) {
        let that = this;
        let url = '/api/traditional/categoryList?category=' + categoryId
        that.$axios.get(url).then(function (res) {
          that.newsList = res.data.content;
        })
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
      });
      new Swiper('#adv_banner', {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
      this.getNewsClassfy()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

