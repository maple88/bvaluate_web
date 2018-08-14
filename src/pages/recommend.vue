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
              <input type="text" id="keyword" v-model="searchKey"
                     @keyup.enter="changeClassfy(searchKey,-1)"/>
              <div class="search-btn">
                <i class="fa fa-search" @click="changeClassfy(searchKey,-1)"></i>
              </div>
            </div>
            <div class="label_bar">
              <!-- <keep-alive> -->
              <transition name="fade">
                <div v-show="newType === 1 || newType === -1" class="news_box">
                  <div class="news_title">
                    <span>最新动态</span>
                  </div>
                  <div class="swiper-container" id="news_swiper">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="news in rollingNew" :title="news.title"
                           @click="goArticle('/article',{sid:news.sid})"
                      >
                        <p>{{news.title}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              <!-- </keep-alive> -->
              <keep-alive>
                <transition name="fade">
                  <div v-if="newType == 2" class="label_box">
                    <ul class="clearfix" :class="labelMore?'open':''">
                      <li><span class="active">全部</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                      <li><span>标签</span></li>
                    </ul>
                    <img src="../assets/follow/down.png" class="open_label" :class="labelMore?'open':''"
                         @click="labelMore = !labelMore"/>
                  </div>
                </transition>
              </keep-alive>
              <keep-alive>
                <transition name="fade">
                  <div v-if="newType == 3" class="follow_box">
                    <span class="item_box">{{industryName}}</span>
                    <button class="follow" checked>
                      <i class="fa fa-plus"></i>
                      <i class="fa fa-check"></i>
                      <span>关注</span>
                      <span>已关注</span>
                    </button>
                  </div>
                </transition>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
      <div class="follow_content">
        <div class="fish_container">
          <div class="clearfix">
            <div class="left">
              <ul class="menu_box">
                <li ref="left_menu" class="left_menu" :class="index === classShow?'active':''"
                    v-for="(classfy,index) in newsClassfy"
                    v-if="classfy" @click="changeClassfy(classfy,index)">
                  {{classfy}}
                </li>
              </ul>
            </div>
            <div class="center">
              <div class="adv_box">
                <div class="swiper-container" id="adv_banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" :style="'background-image: url('+banner1+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+banner1+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+banner1+')'"></div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-button-prev"></div><!--左箭头-->
                  <div class="swiper-button-next"></div><!--右箭头-->
                </div>
                <div class="adv_infor">
                  <h4>广告位</h4>
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
                            <div class="newimg_box" @click="goArticle('/article',{sid:news.sid})">
                              <img v-if="news.titlePicture" :src="news.titlePicture"/>
                              <div class="date_box">
                                <span class="day">{{news.urlTime | showDay}}</span>
                                <span class="years">{{news.urlTime | showYear}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading" :title="news.title" @click="goArticle('/article',{sid:news.sid})">
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
                              <div class="tips"
                                   v-if="news.industryCategory !==null && news.industryCategory !== '' && news.industryCategory !==undefined && news.industryCategory !=='NULL'"
                                   @click="goIndustryByIndustry(news.industryCategory)"
                              >
                                {{news.industryCategory | labelFormat}}
                              </div>
                              <div class="tips"
                                   v-else-if="news.countryCategory !==null && news.countryCategory !== '' && news.countryCategory !==undefined && news.countryCategory !=='NULL'"
                                   @click="goIndustryByCountry(news.countryCategory)"
                              >
                                {{news.countryCategory | labelFormat}}
                              </div>
                              <div class="tips"
                                   v-else="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL'"
                                   @click="goProjectByName(news.projectCategory)"
                              >
                                {{news.projectCategory | labelFormat}}
                              </div>
                              <!--<div class="tips" v-html="news.industryCategory">-->
                              <!--{{news.industryCategory | showLable(news.countryCategory,news.projectCategory)}}-->
                              <!--</div>-->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="loading_more">
                <button :disabled="showloading" @click.stop="reloadMore(categoryName)">
                  <img v-if="showloading" :src="loading"/>
                  <span v-if="!showloading">加载更多</span>
                </button>
              </div>
            </div>
            <transition name="fade">
              <div v-if="newType == 1 || newType==-1" class="right">
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
                  </div>
                  <div class="hot_content">
                    <ul class="scoll_style">
                      <li class="news_flash" v-for="(flash,index) in flashList">
                        <div class="news_item">
                          <div class="radio_box">
                            <div class="radio_circle" :class="index==0?'first':''"></div>
                          </div>
                          <div class="item_time">
                            <span>{{flash.urlTime | dataFormat}}</span>
                          </div>
                          <div class="item_body">
                            <h4 @click="goArticle('/article',{sid:flash.sid})">{{flash.title}}</h4>
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
                              <h4 @click="goArticle('/article',{sid:affair.sid})">{{affair.title}}</h4>
                              <p>{{affair.content}}</p>
                            </div>
                            <div class="content_img" v-if="affair.titlePicture"
                                 @click="goArticle('/article',{sid:affair.sid})">
                              <img :src="affair.titlePicture"/>
                            </div>
                            <h4 v-if="!affair.titlePicture" @click="goArticle('/article',{sid:affair.sid})">
                              {{affair.title}}</h4>
                            <p v-if="!affair.titlePicture">{{affair.content}}</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div v-if="newType == 2" class="right">
                <div class="right_item">
                  <div class="hot_title">
                    <div class="title_icon">
                      <img src="../assets/follow/hot_text.png"/>
                    </div>
                    <h4>24小时热文</h4>
                  </div>
                  <div class="hot_content">
                    <ul>
                      <li v-for="(item, index) in hotNews" :key="item.sid">
                        <div class="list_item">
                          <div class="item_left" v-if="item.titlePicture"
                               @click="goArticle('/article',{sid:item.sid})">
                            <img :src="item.titlePicture"/>
                          </div>
                          <div class="item_body" :class="item.titlePicture?'':'noPicture'">
                            <h4 @click="goArticle('/article',{sid:item.sid})">{{item.title}}</h4>
                            <p>{{item.content}}</p>
                          </div>
                        </div>
                        <div class="item_bottom">
                          <p>{{item.urlDate}}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div v-if="newType == 3" class="right">
                <div class="right_item">
                  <div class="hot_title">
                    <div class="title_icon">
                      <img src="../assets/follow/hot_text.png"/>
                    </div>
                    <h4>24小时热文</h4>
                  </div>
                  <div class="hot_content">
                    <ul>
                      <li v-for="(item, index) in hotNews" :key="item.sid">
                        <div class="list_item">
                          <div class="item_left" v-if="item.titlePicture">
                            <img :src="item.titlePicture"/>
                          </div>
                          <div class="item_body" :class="item.titlePicture?'':'noPicture'">
                            <h4 @click="goArticle('/article',{sid:item.sid})">{{item.title}}</h4>
                            <p>{{item.content}}</p>
                          </div>
                        </div>
                        <div class="item_bottom">
                          <p>{{item.urlDate}}</p>
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
                    <span class="tab" :class="{active:isActive}"
                          @click="isActive = true, getNews('280001'), show_news_img = tuiwen">
                      推文
                    </span>
                      <span class="vertical">|</span>
                      <span class="tab" :class="{active:!isActive}"
                            @click="isActive = false, getNews('280002'), show_news_img = weibo">
                      微博
                    </span>
                    </h4>
                  </div>
                  <div class="hot_content">
                    <ul>
                      <li v-for="(item, index) in news" :key="item.sid">
                        <div class="list_item">
                          <div class="item_left tweet">
                            <img :src="show_news_img"/>
                          </div>
                          <div class="item_body tweet">
                            <p class="tweet" @click="goArticle('/article',{sid:item.sid})">{{item.content}}</p>
                            <div class="body_bottom">
                              <p>{{item.author}}</p>
                              <p class="time">{{item.urlDate}}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </transition>
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
  let tuiwen = require('../assets/home/nicon.png');
  let weibo = require('../assets/home/weibo.png');

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
        pageSize: 20,
        categoryName: 0,
        flashList: [],
        affairList: [],
        testDate: '2018-07-31 15:16:00',
        labelMore: false,
        newType: 1,
        industryName: "",
        hotNews: [],
        news: [],
        tuiwen: tuiwen,
        weibo: weibo,
        show_news_img: tuiwen,
        rollingNew: [],
        searchKey: '',
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
      },
      labelFormat(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            return arr[0];
          } else {
            return obj;
          }
        }
        return obj;
      },
      showLable(label1, label2, lable3) {
        if (label1 != null && label1 !== undefined && label1 !== '' && label1 != 'NULL') {
          let arr = label1.split(';')
          return arr[0]
        } else {
          if (label2 != null && label2 !== undefined && label2 !== '' && label2 != 'NULL') {
            let arr = label1.split(';')
            return arr[0]
          } else {
            if (lable3 != null && lable3 !== undefined && lable3 !== '' && lable3 != 'NULL') {
              let arr = label1.split(';')
              return arr[0]
            } else {
              return '标签'
            }
          }
        }
      }
    },
    watch: {
      '$route': 'initPageDate'
    },
    methods: {
      setFollow() {
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        let uid = localStorage.getItem('apelink_user_uid');
        let url = '/api/individual/add?type=INDUSTRY&name=' + that.industryName;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'post',
          url: url,
          headers: headers
        }).then(function (res) {
          console.log(res)
          if (res.data) {

          }
        })
      },
      goProjectByName(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        this.$router.push('/project?project=' + obj);
      },
      goIndustryByIndustry(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        this.$router.push('/recommend?industry=' + obj);
      },
      goIndustryByCountry(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        this.$router.push('/recommend?country=' + obj);
      },
      goArticle(url, query) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');
      },
      goUrl(url, query) {
        this.$router.push({path: url, query: query});
      },
      getRollingNew() {
        let that = this;
        let categoryName = '最新动态';
        let url = '/api/traditional/categoryList?categoryName=' + categoryName + '&pageSize=5';
        that.$axios.get(url).then(function (res) {
          that.rollingNew = res.data.content;
          that.$nextTick(() => {  // 下一个UI帧再初始化swiper
            that.initSwiper();
          });
        })
      },
      getNewsClassfy(show, categoryName, showpage) {
        let that = this
        that.$axios.get('/api/traditional/categories').then(function (res) {
          let arr = ['推荐', '关注'];
          that.newsClassfy = arr.concat(res.data);
          let industry = that.$route.query.industry;
          if (industry !== null && industry !== '' && industry !== undefined && industry !== 'NULL') {
            categoryName = industry;
            let newsClass = that.newsClassfy;
            for (let i = 0; i < newsClass.length; i++) {
              if (newsClass[i] === industry) {
                showpage = i;
              }
            }
            show = false;
          }
          that.changeClassfy(categoryName, showpage);
          if (that.newsClassfy.length > 0 && show) {
            that.initNewsList(that.newsClassfy[0])
          }
        })
      },
      getHotnews(industryName) {
        let that = this
        that.$axios.get('/api/traditional/hotNews?industryName=' + industryName + '&pageSize=10').then(function (res) {
          if (that.newsClassfy.length > 0) {
            that.hotNews = res.data.content
          }
        })
      },
      getNews(newsnum) {
        let that = this
        that.$axios.get('/api/traditional/news?searchBy=' + this.industryName + '&categoryId=' + newsnum + '&pageSize=10').then(function (res) {
          if (that.newsClassfy.length > 0) {
            that.news = res.data.content
          }
        })
      },
      changeClassfy(categoryName, index) {
        this.categoryName = categoryName;
        if (categoryName === '关注') {
          this.newType = 2;
        } else if (categoryName === '推荐') {
          this.newType = 1;
          //获取最新动态
          this.getRollingNew();
          //获取国家资讯
          this.initRightNews('国家时事', 10, res => {
            this.affairList = res;
          });
          this.initRightNews('快讯', 20, res => {
            this.flashList = res;
          });
        } else {
          this.newType = 3;
        }
        if (index === -1) {
          this.newType = index;
          let that = this;
          this.initRightNews('国家时事', 10, function (res) {
            that.affairList = res;
          });
          this.initRightNews('快讯', 20, function (res) {
            that.flashList = res;
          })
          this.initNewsList('', categoryName);
          this.getRollingNew();
        } else {
          this.initNewsList(categoryName);
        }
        this.industryName = categoryName;
        this.showloading = true;
        this.classShow = index;
        this.newsList = [];
        this.pageSize = 20;
        this.getHotnews(categoryName);
        this.getNews('280001');
      },
      initNewsList(categoryName, search) {
        let that = this;
        that.categoryName = categoryName;
        let url = '/api/traditional/categoryList?categoryName=' + categoryName + '&pageSize=' + this.pageSize;
        if (search !== null && search !== '' && search !== undefined) {
          url += '&search=' + search;
        }
        that.$axios.get(url).then(function (res) {
          that.newsList = res.data.content;
          that.showloading = false;
        })
      },
      reloadMore(categoryName) {
        this.showloading = true;
        this.pageSize += 10;
        this.initNewsList(categoryName);
      },
      initRightNews(categoryName, pageSize, callback) {
        let that = this;
        that.categoryName = categoryName;
        let thisCallback = callback;
        let url = '/api/traditional/categoryList?categoryName=' + categoryName + '&pageSize=' + pageSize
        that.$axios.get(url).then(function (res) {
          thisCallback(res.data.content);
        })
      },
      initSwiper() {
        let newsSwiper = new Swiper('#news_swiper', {
          autoplay: {
            delay: 1500,
            disableOnInteraction: false
          },
          direction: 'vertical',
          observer: true,
          observeParents: true,
          loop: true,
          slidesPerView: 'auto',
        });
        newsSwiper.el.onmouseover = function () {
          newsSwiper.autoplay.stop();
        };
        newsSwiper.el.onmouseout = function () {
          newsSwiper.autoplay.start();
        }
      },
      initPageDate() {
        let path = this.$route.path;
        if (path === '/recommend') {
          let that = this;
          let categoryName = '推荐';
          let showpage = 0;
          let showActive = false;
          let country = this.$route.query.country;
          if (country !== null && country !== '' && country !== undefined && country !== 'NULL') {
            categoryName = country;
            showpage = -1;
          } else {
            showActive = true;
          }
          this.getNewsClassfy(showActive, categoryName, showpage);
        }
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
      this.initPageDate()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

