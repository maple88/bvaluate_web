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
              <div class="label_box">
                <button class="all_btn">全部</button>
                <ul class="clearfix">
                  <li><span>标签</span></li>
                  <li><span>标签</span></li>
                  <li><span>标签</span></li>
                  <li><span>标签</span></li>
                  <li><span>标签</span></li>
                </ul>
                <img class="open_label" src="../assets/follow/down.png"/>
              </div>
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
                    v-if="classfy.showInList" @click="changeClassfy(classfy.categoryId,index)">
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
                        <div class="media" v-for="news in newsList"
                             @click="$router.push('/article?sid=' + news.sid)">
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
                            <h4 class="media-heading" :title="news.title">
                              {{news.title }}
                            </h4>
                            <p class="media-words">
                              {{news.content }}
                            </p>
                            <div class="media-bottom">
                              <ul>
                                <li>
                                  <div class="userimg"
                                       v-if="(news.author !== 'NULL' && news.author !== null && news.author !== '')">
                                    <img src="../assets/follow/user_head.png">
                                  </div>
                                  {{
                                  (news.author !== 'NULL'
                                  && news.author !== null
                                  && news.author !== '')?news.author:news.siteName
                                  }}
                                </li>
                                <li>{{news.urlTime}}</li>
                              </ul>
                              <div class="tips">{{news.channel}}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="loading_more">
                <button :disabled="showloading" @click.stop="reloadMore(categoryId)">
                  <img v-if="showloading" :src="loading"/>
                  <span v-if="!showloading">加载更多</span>
                </button>
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
                    <li class="news_flash" v-for="(flash,index) in flashList">
                      <div class="news_item">
                        <div class="radio_box">
                          <div class="radio_circle" :class="index==0?'first':''"></div>
                        </div>
                        <div class="item_time">
                          <span>{{flash.urlTime | dataFormat}}</span>
                        </div>
                        <div class="item_body">
                          <h4 @click.stop="$router.push('/article?sid=' + flash.sid)">{{flash.title}}</h4>
                          <p>{{flash.content}}</p>
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
                    <li class="news_flash" v-for="(affair,index) in affairList">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle" :class="index == 0 ? 'first':''"></div>
                        </div>
                        <div class="item_time">
                          <span>{{affair.urlTime | dataFormat}}</span>
                        </div>
                        <div class="item_body" :class="affair.titlePicture ? 'hasImg' : ''">
                          <div class="content" v-if="affair.titlePicture">
                            <h4 @click.stop="$router.push('/article?sid=' + affair.sid)">{{affair.title}}</h4>
                            <p>{{affair.content}}</p>
                          </div>
                          <div class="content_img" v-if="affair.titlePicture">
                            <img :src="affair.titlePicture"/>
                          </div>
                          <h4 v-if="!affair.titlePicture">{{affair.title}}</h4>
                          <p v-if="!affair.titlePicture">{{affair.content}}</p>
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

  let img1 = require('../assets/follow/banner01.png');
  let img2 = require('../assets/follow/adv01.png');
  let img3 = require('../assets/media.jpg');
  let loading = require('../assets/login/loading.gif');


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
        newsList: [],
        loading: loading,
        showloading: true,
        pageSize: 10,
        categoryId: 0,
        flashList: [],
        affairList: [],
        testDate: '2018-07-31 15:16:00'
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
      },
      dataFormat(obj) {
        let myDate = new Date(obj);
        let mydata = myDate.getDate();
        let nowDate = new Date();
        let nowdata = nowDate.getDate();
        let myhour = myDate.getHours();
        let nowhour = nowDate.getHours();
        let myMin = myDate.getMinutes()
        let nowMin = nowDate.getMinutes()
        if (nowdata - mydata < 7 && nowdata - mydata > 1) {
          return nowdata - mydata + '天前'
        } else if (nowdata - mydata <= 1 && Math.abs(myhour - nowhour) > 1 && Math.abs(myhour - nowhour) < 24) {
          return Math.abs(myhour - nowhour) + '小时前'
        } else if (Math.abs(myhour - nowhour) <= 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) > 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) < 60) {
          return Math.abs(myDate.getMinutes() - nowDate.getMinutes()) + '分钟前'
        } else if (Math.abs(myDate.getMinutes() - nowDate.getMinutes()) <= 1) {
          return Math.abs(myDate.getSeconds() - nowDate.getSeconds()) + '秒前'
        } else {
          let month = myDate.getMonth()
          if (month < 9) {
            month = '0' + month
          }
          return month + '-' + mydata
        }
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
      changeClassfy(categoryId, index) {
        this.showloading = true;
        this.classShow = index;
        this.newsList = [];
        this.pageSize = 10;
        this.initNewsList(categoryId)
      },
      initNewsList(categoryId) {
        let that = this;
        that.categoryId = categoryId;
        let url = '/api/traditional/categoryList?category=' + categoryId + '&pageSize=' + this.pageSize
        that.$axios.get(url).then(function (res) {
          that.newsList = res.data.content;
          that.showloading = false;
        })
      },
      reloadMore(categoryId) {
        this.showloading = true;
        this.pageSize += 5;
        this.initNewsList(categoryId);
      },
      initRightNews(categoryId, pageSize, callback) {
        let that = this;
        that.categoryId = categoryId;
        let thisCallback = callback;
        let url = '/api/traditional/categoryList?category=' + categoryId + '&pageSize=' + pageSize
        that.$axios.get(url).then(function (res) {
          thisCallback(res.data.content);
        })
      },
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
      let that = this;
      this.getNewsClassfy();
      //获取最新资讯
      this.initRightNews('285141', 3, function (res) {
        that.flashList = res;
      })
      //获取国家资讯
      this.initRightNews('269953', 5, function (res) {
        that.affairList = res;
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

