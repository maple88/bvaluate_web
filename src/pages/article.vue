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
                  <h4>{{articleContent.title}}</h4>
                </div>
                <div class="article_tool">
                  <div class="article_left">
                    <span class="user_name">{{articleContent.author}}</span>
                    <a :href="articleContent.urlName" class="publish_data">{{articleContent.urlTime}}</a>
                    <!-- <span class="publish_time">13:20</span> -->
                  </div>
                  <div class="article_right">
                    <a :href="articleContent.urlName" class="look">查看全文</a>
                    <span class="look_count"><i class="fa fa-eye"></i>1000人</span>
                    <span class="share" @click.stop="showAllShare($event)"><i class="fa fa-share-alt"></i></span>
                    <span class="follow">
                      <i class="fa fa-heart" v-show="!isFollow" @click="setFollow()"></i>
                      <i class="fa fa-heart followed" v-show="isFollow" @click="isFollow = false"></i>
                    </span>
                  </div>
                </div>
                <div class="label_box">
                  <div v-if="articleContent.countryCategory !== 'NULL'" class="label_item">
                    {{articleContent.countryCategory | showLable}}
                  </div>
                  <div v-if="articleContent.industryCategory !== 'NULL'" class="label_item">
                    {{articleContent.industryCategory | showLable}}
                  </div>
                  <div v-if="articleContent.projectCategory !== 'NULL'" class="label_item">
                    {{articleContent.projectCategory | showLable}}
                  </div>
                </div>
                <div class="article_content">
                  <p>{{articleContent.content}}</p>
                </div>
                <div class="article_original">
                  <div class="title">原文</div>
                  <div class="original">
                    <h4>{{articleContent.title}}</h4>
                    <p>{{articleContent.content}}</p>
                  </div>
                </div>
                <div class="article_statement">
                  <p>声明：本文系<span>{{articleContent.siteName}}</span>原创稿件，版权属<span>{{articleContent.siteName}}</span>所有，未经授权不得转载，已经协议授权的媒体下载使用时须注明"稿件来源：<span>{{articleContent.siteName}}</span>"，违者将依法追究责任。
                  </p>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="author_infor">
                <div class="author_box">
                  <div class="author_left">
                    <img src="../assets/follow/apelink.png" alt="">
                  </div>
                  <div class="author_right">
                    <h4>才不可以吃辣椒酱</h4>
                    <button class="follow_btn" v-if="!follow" @click="follow = true">
                      <img src="../assets/follow/icon-follow.png"/>关注
                      <div class="arrow"></div>
                    </button>
                    <button class="followed_btn" v-if="follow" @click="follow = false">
                      <div class="arrow"></div>
                      <img src="../assets/follow/icon-followed.png"/>已关注
                    </button>
                  </div>
                </div>
                <div class="author_news">
                  <ul class="news_ul">
                    <li class="news_li">
                      <p>
                        作为新杭州人的你是否也在困扰，买车容易，车牌摇号+车位伤不起？
                      </p>
                      <p class="time">2018-04-09</p>
                    </li>
                    <li class="news_li">
                      <p>
                        作为新杭州人的你是否也在困扰，买车容易，车牌摇号+车位伤不起？
                      </p>
                      <p class="time">2018-04-09</p>
                    </li>
                    <li class="news_li">
                      <p>
                        作为新杭州人的你是否也在困扰，买车容易，车牌摇号+车位伤不起？
                      </p>
                      <p class="time">2018-04-09</p>
                    </li>
                    <li class="news_li">
                      <p>
                        作为新杭州人的你是否也在困扰，买车容易，车牌摇号+车位伤不起？
                      </p>
                      <p class="time">2018-04-09</p>
                    </li>
                  </ul>
                  <p></p>
                </div>
              </div>
              <div class="adv_swiper">
                <div class="swiper-container" id="right_swiper">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-button-prev"></div><!--左箭头-->
                  <div class="swiper-button-next"></div><!--右箭头-->
                </div>
              </div>
              <div class="right_item margin_top">
                <div class="hot_title">
                  <div class="title_icon">
                    <img src="../assets/follow/hot_text.png"/>
                  </div>
                  <h4>24小时热文</h4>
                </div>
                <div class="hot_content">
                  <ul>
                    <li v-for="(item, index) in hotNews" :key="item.sid" @click="goToArticle(item.sid)">
                      <div class="list_item">
                        <div class="item_left" v-if="item.titlePicture">
                          <img :src="item.titlePicture"/>
                        </div>
                        <div class="item_body" :class="item.titlePicture?'':'noPicture'">
                          <h4>{{item.title}}</h4>
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
    <div class="popover fade bottom in" role="tooltip" id="popover91482">
      <div class="arrow" style="left: 50%;"></div>
      <div class="popover-content">
        <ul>
          <li class="wechat"><i class="fa fa-wechat"></i></li>
          <li class="weibo"><i class="fa fa-weibo"></i></li>
          <li class="qq"><i class="fa fa-qq"></i></li>
          <li class="more">更多分享</li>
        </ul>
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
        follow: false,
        articleContent: {},
        hotNews: [],
        industryName: "",
        isFollow: false
      }
    },
    methods: {
      showAllShare(obj) {
        let $this = $(obj.target);
        let Hwith = $this.offset().left - ($('#popover91482').width() / 2);
        let Htop = $this.offset().top + $this.height();
        if (Hwith + $('#popover91482').width() > $(document).width()) {
          let arrowWidth = $(document).width() - $('#popover91482').width();
          arrowWidth = $this.offset().left - arrowWidth;
          $('#popover91482').css({
            right: 15,
            top: Htop,
            display: 'block',
            left: 'auto'
          })
          $('#popover91482').find('.arrow').css({
            left: arrowWidth + 24
          })
        } else {
          $('#popover91482').css({
            left: Hwith,
            top: Htop,
            display: 'block'
          })
          $('#popover91482').find('.arrow').css({
            left: '50%'
          })
        }
        obj.stopPropagation()
        $(document).bind('click', function () {
          $('#popover91482').css('display', 'none');
        });
        $('#popover91482').click(function (e) {
          e.stopPropagation()
        })
      },
      getDetailData() {
        let path = this.$route.path
        if (path === '/article') {
          let that = this
          let sid = this.$route.query.sid
          let token = localStorage.getItem('apelink_user_token')
          let uid = localStorage.getItem('apelink_user_uid')
          let url = '/api/individual/add?type=NEWS&sid=' + that.articleContent.sid;
          let headers = {'uid': uid, 'Authorization': token};
          if (sid !== null && sid !== '' && sid !== undefined) {
            that.$axios.get('/api/traditional/detail?sid=' + sid).then(function (res) {
              that.articleContent = res.data
              that.industryName = res.data.industryCategory
              if (token !== null && token !== '' && token !== undefined) {
                let checkurl = '/api/individual/check?type=NEWS&sidOrName=' + that.articleContent.sid;
                that.$axios({
                  method: 'post',
                  url: checkurl,
                  headers: headers
                }).then(function (res) {
                  console.log(res.data)
                  if (res.data) {
                    that.isFollow = true
                  } else {
                    that.isFollow = false
                  }
                })
              }
            })
          }
        }

      },
      getHotnewsData() {
        let that = this
        that.$axios.get('/api/traditional/hotNews?ndustryName=' + that.industryName + '&pageSize=3').then(function (res) {
          console.log(res)
          that.hotNews = res.data.content
        })
      },
      goToArticle(sid) {
        this.$router.push('/article?sid=' + sid)
      },
      setFollow() {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/api/individual/add?type=NEWS&sid=' + that.articleContent.sid;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'post',
          url: url,
          headers: headers
        }).then(function (res) {
          that.isFollow = true
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
      })
      new Swiper('#right_swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
      this.getDetailData();
      this.getHotnewsData()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getDetailData()
      })
    },
    filters: {
      showLable(value) {
        let has = value.indexOf(';')
        if (has >= 0) {
          let arr = value.split(';');
          return arr[0]
        } else {
          return value
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

