<template>
  <div class="page">
    <v2header/>
    <div class="v2maintainer">
      <div class="follow_content v2article" id="article">
        <div class="fish_container container v2container">
          <div class="clearfix">
            <div class="center">
              <div class="article_box">
                <div class="article_title">
                  <h4>{{articleContent.title}}</h4>
                </div>
                <div class="label_box">
                  <div v-if="articleContent.projectCategory !== 'NULL' && articleContent.projectCategory !== null && articleContent.projectCategory !== '' && articleContent.projectCategory !==undefined" 
                       class="label_item"
                       name="article_label_box_projectCategory" id="article_label_box_projectCategory"
                       @click="goProjectByName(articleContent.projectCategory, $event)"
                       :data="articleContent.projectCategory">
                    {{articleContent.projectCategory | showLable}}
                  </div>
                  <div v-if="articleContent.industryCategory !== 'NULL' && articleContent.industryCategory !== null && articleContent.industryCategory !== '' && articleContent.industryCategory !==undefined"
                       class="label_item disabled"
                       name="article_label_box_industryCategory" id="article_label_box_industryCategory"
                       :data="articleContent.industryCategory">
                    {{articleContent.industryCategory | showLable}}
                  </div>
                  <div v-if="articleContent.countryCategory !== 'NULL' && articleContent.countryCategory !== null && articleContent.countryCategory !== '' && articleContent.countryCategory !==undefined" 
                       class="label_item disabled"
                       name="article_label_box_countryCategory" id="article_label_box_countryCategory"
                       :data="articleContent.countryCategory">
                    {{articleContent.countryCategory | showLable}}
                  </div>
                </div>
                <div class="article_tool">
                  <div class="article_left">
                    <span class="user_name"
                          name="article_user_name_author" id="article_user_name_author"
                          v-if="!(articleContent.siteName !== 'NULL' && articleContent.siteName !== null && articleContent.siteName !== '')"
                          @click="goArticle('/author',{author: articleContent.author,type: 'author'}, $event)"
                          :data="articleContent.author">
                      {{articleContent.author}}
                    </span>
                    <span class="user_name" v-else
                          name="article_user_name_siteName" id="article_user_name_siteName"
                          @click="goArticle('/author',{author: articleContent.siteName,type: 'siteName'}, $event)"
                          :data="articleContent.siteName">
                      {{articleContent.siteName}}
                    </span>
                    <a :href="articleContent.urlName" name="article_publish_data_urlTime"
                       id="article_publish_data_urlTime" class="publish_data" :data="articleContent.urlTime">{{articleContent.urlTime}}</a>
                    <!-- <span class="publish_time">13:20</span> -->
                  </div>
                  <div class="article_right">
                    <span class="look_count"><img class="aticon" src="../assets/article/eye.png">0人</span>
                    <a href="javascript:;" class="look" name="article_right_more" id="article_right_more" data="查看全文" @click="showArticle = !showArticle">查看原文</a>
                    <!--<span class="share" @click.stop="showAllShare($event)"><i class="fa fa-share-alt"></i></span>-->
                    <span class="follow">
                      <!-- <i class="fa fa-heart" v-show="!isFollow" @click="setFollow()"></i>
                      <i class="fa fa-heart followed" v-show="isFollow" @click="deleteFollow(articleContent.collected)"></i> -->

                      <span v-if="!isFollow" @click="setFollow()"><img class="aticon" src="../assets/article/collect.png">收藏</span>
                      <span class="on" v-if="isFollow" @click="deleteFollow(articleContent.collected)">
                        <img class="aticon" src="../assets/article/collect-on.png">已收藏
                      </span>
                    </span>
                    <div class="followbtn on share_button" @click.stop="shareButton = !shareButton">
                      <span><img class="aticon" src="../assets/article/share.png">分享</span>
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
                </div>
                <div class="article_content">
                  <p>{{articleContent.content}}</p>
                </div>
                <div class="article_original">
                  <transition name="fade">
                    <div class="title" v-if="showArticle">原文</div>
                  </transition>
                  <transition name="fade">
                    <div class="original" v-if="showArticle">
                      <h4>{{articleContent.title}}</h4>
                      <p>{{articleContent.content}}</p>
                    </div>
                  </transition>
                </div>
                <!--<div class="article_statement">-->
                <!--<p>声明：本文系<span>{{articleContent.siteName}}</span>原创稿件，版权属<span>{{articleContent.siteName}}</span>所有，未经授权不得转载，已经协议授权的媒体下载使用时须注明"稿件来源：<span>{{articleContent.siteName}}</span>"，违者将依法追究责任。-->
                <!--</p>-->
                <!--</div>-->
              </div>
            </div>
            <div class="right">
              <div class="adv_swiper">
                <div class="swiper-container" id="right_swiper">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <a target="_blank" href="https://mp.weixin.qq.com/s/k8mMDvOQYiwxzgS9WsSbaA"><img src="../assets/bangdan1.jpg"></a>
                    </div>
                    <div class="swiper-slide">
                      <a target="_blank" href="https://mp.weixin.qq.com/s/KjKyZQlQbOaoKZtW824MeQ"><img src="../assets/bangdan2.jpg"></a>
                    </div>
                    <div class="swiper-slide">
                      <a target="_blank" href="http://www.bvaluate.yibencaijing.com/?from=singlemessage&isappinstalled=0"><img src="../assets/bangdan3.jpg"></a>
                    </div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-button-prev"></div><!--左箭头-->
                  <div class="swiper-button-next"></div><!--右箭头-->
                  <div class="swiper-pagination"></div>
                </div>
              </div>
              <div class="right_item margin_top">
                <div class="hot_title">
                  <!-- <div class="title_icon">
                    <img src="../assets/follow/hot_text.png"/>
                  </div> -->
                  <h4>相关资讯</h4>
                </div>
                <div class="hot_content">
                  <ul class="long_ul">
                    <li v-for="(item, index) in hotNews" :key="item.sid" :data="item.title"
                        :name="'article_long_ul_li_'+index" :id="'article_long_ul_li_'+index"
                        @click="goArticle('/article',{sid:item.sid}, $event),
                    trackArticle('文章详情页内24小时热文', item.title, '文章详情页内文章没有项目名称', '文章详情页内文章没有项目ID', '24小时热文', item.sid)">
                      <!-- <div class="item_left" v-if="item.titlePicture">
                        <img :src="item.titlePicture"/>
                      </div> -->
                      <div class="item_left">
                        <img src="../assets/search/news.png"/>
                      </div>
                      <div class="item_info">
                        <div class="list_item">
                          <div class="item_body" :class="item.titlePicture?'':'noPicture'">
                            <h4>{{item.title}}</h4>
                            <p>{{item.content}}</p>
                          </div>
                        </div>
                        <div class="item_bottom">
                          <p><span>{{item.author}}</span><span>{{item.urlDate}}</span></p>
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
      <v2footer/>
    </div>
    <!--<div class="popover fade bottom in" role="tooltip" id="popover91482">-->
    <!--<div class="arrow" style="left: 50%;"></div>-->
    <!--<div class="popover-content">-->
    <!--<ul>-->
    <!--<li class="wechat"><i class="fa fa-wechat"></i></li>-->
    <!--<li class="weibo"><i class="fa fa-weibo"></i></li>-->
    <!--<li class="qq"><i class="fa fa-qq"></i></li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import Swiper from 'swiper';
  import QRCode from 'qrcodejs2'

  let img1 = require('../assets/follow/banner01.png');
  let img2 = require('../assets/follow/adv01.png');
  let img3 = require('../assets/media.jpg');


  export default {
    data() {
      return {
        weiboQrCode: false,
        qqQrCode: false,
        wechatQrCode: false,
        shareButton: false,
        qrCodeBox: false,
        colorList: ['red', 'yellow', 'gray', 'pink'],
        banner1: img1,
        img2: img2,
        img3: img3,
        follow: false,
        articleContent: {},
        hotNews: [],
        industryName: "",
        isFollow: false,
        showArticle: false,
        newsForAuthor: []
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
        },
        pagination: {                   //分页器
          el: '.swiper-pagination',
          clickable :true               //允许点击分页器切换
        }
      })
      this.getDetailData();
      this.getHotnewsData();
      let hrefUrl = window.location.href;
      hrefUrl = hrefUrl.split('?')[0];
      hrefUrl = `${hrefUrl}?sid=${this.$route.query.sid}`;
      let qrcode1 = new QRCode(this.$refs.wechat_qrCode, {
        width: 125,
        height: 125, // 高度
        text: hrefUrl
      });
      let qrcode2 = new QRCode(this.$refs.qq_qrCode, {
        width: 125,
        height: 125, // 高度
        text: hrefUrl
      });
      let qrcode3 = new QRCode(this.$refs.weibo_qrCode, {
        width: 125,
        height: 125, // 高度
        text: hrefUrl
      });
    },
    methods: {
      weiboQrCodeShow() {
        if (this.weiboQrCode) {
          this.weiboQrCode = false;
        } else {
          this.weiboQrCode = true;
          this.qqQrCode = false;
          this.wechatQrCode = false;
        }
      },
      qqQrCodeShow() {
        if (this.qqQrCode) {
          this.qqQrCode = false;
        } else {
          this.weiboQrCode = false;
          this.qqQrCode = true;
          this.wechatQrCode = false;
        }
      },
      weChatQrCodeShow() {
        if (this.wechatQrCode) {
          this.wechatQrCode = false;
        } else {
          this.weiboQrCode = false;
          this.qqQrCode = false;
          this.wechatQrCode = true;
        }
      },
      trackAttention(category, name) {
        sensors.track('Attention', {
          attention_category: category,
          attention_name: name
        });
      },
      trackArticle(entrance, article_title, name, project_id, category, article_id) {
        sensors.track('Article', {
          entrance: entrance,
          article_title: article_title,
          name: name,
          project_id: project_id,
          category: category,
          article_id: article_id,
          collect_count: '接口没有返回文章收藏量'
        });
      },
      goProjectByName(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/project', query: {project: obj}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goIndustryByIndustry(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {industry: obj, pageTitle: '行业文章列表'}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goIndustryByCountry(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {country: obj, pageTitle: '国家文章列表'}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goProjectByName2(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/project', query: {project: obj}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href);
      },
      goIndustryByIndustry2(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {industry: obj, pageTitle: '行业文章列表'}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href);
      },
      goIndustryByCountry2(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {country: obj, pageTitle: '国家文章列表'}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href);
      },
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
            let getDetailUrl = '/api/traditional/detail?sid=' + sid
            that.$axios({
              method: 'get',
              url: getDetailUrl,
              headers: headers
            }).then(function (res) {
              that.articleContent = res.data
              that.getNewsForAuthor(that.articleContent);
              if (that.articleContent.collected) {
                that.isFollow = true
              } else {
                that.isFollow = false
              }
              that.industryName = res.data.industryCategory;
              if (token !== null && token !== '' && token !== undefined) {
                // let checkurl = '/api/individual/check?type=NEWS&sidOrName=' + that.articleContent.sid;
                // that.$axios({
                //   method: 'post',
                //   url: checkurl,
                //   headers: headers
                // }).then(function (res) {
                //   console.log(res.data);
                //   if (res.data) {
                //     that.isFollow = true
                //   } else {
                //     that.isFollow = false
                //   }
                // });
                let checkAuthorurl = ''
                if (that.articleContent.author) {
                  checkAuthorurl = '/api/individual/check?type=AUTHOR&sidOrName=' + that.articleContent.author;
                }
                if (that.articleContent.siteName) {
                  checkAuthorurl = '/api/individual/check?type=AUTHOR&sidOrName=' + that.articleContent.siteName;
                }
                that.$axios({
                  method: 'post',
                  url: checkAuthorurl,
                  headers: headers
                }).then(function (res) {
                  if (res.data) {
                    that.follow = true
                  } else {
                    that.follow = false
                  }
                });
              }
            });
            // that.$axios.get('/api/traditional/detail?sid=' + sid).then(function (res) {
            //   that.articleContent = res.data
            //   that.getNewsForAuthor(that.articleContent.author);
            //   that.industryName = res.data.industryCategory;
            //   if (token !== null && token !== '' && token !== undefined) {
            //     let checkurl = '/api/individual/check?type=NEWS&sidOrName=' + that.articleContent.sid;
            //     that.$axios({
            //       method: 'post',
            //       url: checkurl,
            //       headers: headers
            //     }).then(function (res) {
            //       console.log(res.data);
            //       if (res.data) {
            //         that.isFollow = true
            //       } else {
            //         that.isFollow = false
            //       }
            //     });
            //     let checkAuthorurl = '/api/individual/check?type=AUTHOR&sidOrName=' + that.articleContent.author;
            //     that.$axios({
            //       method: 'post',
            //       url: checkAuthorurl,
            //       headers: headers
            //     }).then(function (res) {
            //       console.log(res.data);
            //       if (res.data) {
            //         that.follow = true
            //       } else {
            //         that.follow = false
            //       }
            //     });
            //   }
            // })
          } else {
            this.$router.push('/home');
          }
        }
      },
      deleteFollow(cid) {
        let that = this;
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/individual/delete?cid=' + cid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'DELETE',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.isFollow = false;
            }
          })
        } else {
          alert('请先登录。')
        }
      },
      deleteAuthorFollow(author) {
        // this.projectFollow = false;
        let token = localStorage.getItem('apelink_user_token')
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid')
          let that = this;
          let url = '/api/individual/list?type=AUTHOR';
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'get',
            url: url,
            headers: headers
          }).then(res => {
            let list = res.data.content;
            let cid = '';
            for (let i = 0; i < list.length; i++) {
              let authorName = list[i].result;
              if (author === authorName) {
                cid = list[i].cid;
                break
              }
            }
            if (cid !== '') {
              console.log(cid);
              let deteleUrl = '/api/individual/delete?cid=' + cid;
              that.$axios({
                method: 'DELETE',
                url: deteleUrl,
                headers: headers
              }).then(function (res) {
                if (res.data) {
                  that.follow = false;
                  alert('已取消关注');
                }
              })
            } else {
              alert('你没有关注此作者。')
            }
          })
        } else {
          alert('请先登录。')
        }
      },
      getHotnewsData() {
        let that = this
        that.$axios.get('/api/traditional/hotNews?ndustryName=' + that.industryName + '&pageSize=10').then(function (res) {
          that.hotNews = res.data.content
        })
      },
      goArticle(url, query, event) {
        let routeData = this.$router.resolve({path: url, query: query});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      setFollow() {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid')
          let url = '/api/individual/add?type=NEWS&sid=' + that.articleContent.sid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            // that.isFollow = true
            that.getDetailData();
          });
        } else {
          alert('请先登录。')
        }
      },
      setAuthorFollow() {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid')
          let url = ''
          if (that.articleContent.author) {
            url = '/api/individual/add?type=AUTHOR&name=' + that.articleContent.author;
          }
          if (that.articleContent.siteName) {
            url = '/api/individual/add?type=AUTHOR&name=' + that.articleContent.siteName;
          }
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            that.follow = true
            that.getDetailData();
          });
        } else {
          alert('请先登录。')
        }
      },
      getNewsForAuthor(obj) {
        let author = '';
        (obj.siteName && obj.siteName !== 'NULL') ? author = obj.siteName : author = obj.author;
        let that = this
        that.$axios.get('/api/traditional/authorRelatedNews?author=' + author + '&pageSize=5').then(function (res) {
          that.newsForAuthor = res.data.content;
        })
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getDetailData()
      })
    },
    filters: {
      showLable(value) {
        value = value + '';
        let has = value.indexOf(';');
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

