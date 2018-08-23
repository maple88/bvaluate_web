<template>
  <div class="page">
    <div class="home-header">
      <div class="tophead">
        <div class="container">
          <p>APELINK</p>
          <span>中/EN</span>
        </div>
      </div>
      <div class="mainhead">
        <nav class="navbar navbar-default">
          <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                      data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <router-link to="/index" class="navbar-brand">
                <img src="../assets/logo-white.png" class="white">
                <img src="../assets/logo.png" class="blue">
              </router-link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <router-link tag="li" to="/index" active-class="active"><a>首页</a></router-link>
                <router-link tag="li" to="/recommend" active-class="active"><a>新闻</a></router-link>
                <router-link tag="li" to="/userCenter" active-class="active"><a>个人中心</a></router-link>
              </ul>
              <ul v-if="token" class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                    <div class="user"
                         :style="(profileUrl !==null && profileUrl !== '' && profileUrl !== 'NULL' && profileUrl !== undefined)
                       ?'background-image: url('+ profileUrl +')':'background-image: url('+ default_header +')'"
                    ></div>
                    <p>糖果数：{{candy}}</p>
                  </a>
                  <ul class="dropdown-menu">
                    <router-link tag="li" to="/my"><a>设置</a></router-link>
                    <!-- <li><a href="#">设置</a></li> -->
                    <li>
                      <a href="javascript:;" @click="logout()">退出</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul v-if="!token" class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <p>
                    <router-link to="/login" class="label_a">
                      登录
                    </router-link>
                    <span>/</span>
                    <router-link to="/login?page=register" class="label_a">
                      注册
                    </router-link>
                  </p>
                </li>
              </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
      </div>
    </div>
    <div class="maintainer home-maintainer" @scroll.passive="showheader" ref="box">
      <div class="home-banner">
        <img src="../assets/home/home-banner.jpg" class="bgimg">
        <div class="bannerwds">
          <img src="../assets/logo_brand.png">
          <span>+</span>
          APELINK
        </div>
      </div>
      <div class="df-container container home-newslist">
        <div class="section-head">
          <div class="headtit">新闻头条</div>
          <router-link to="/recommend" class="more">浏览更多</router-link>
        </div>
        <div class="df-row row newslist">

          <div class="df-col col-md-3 col-sm-4 col-xs-6" v-for="news in hostNews">
            <div class="item">
              <a>
                <div class="img-box" @click="goArticle('/article',{sid:news.sid})"><img :src="news.titlePicture">
                </div>
                <div class="info">
                  <p class="tips">
                     <span class="tips"
                           v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL'"
                           @click="goProjectByName(news.projectCategory)"
                     >
                    {{news.projectCategory | labelFormat}}
                  </span>
                    <span class="tips"
                          v-else-if="news.industryCategory !==null && news.industryCategory !== '' && news.industryCategory !==undefined && news.industryCategory !=='NULL'"
                          @click="goIndustryByIndustry(news.industryCategory)"
                    >
                    {{news.industryCategory | labelFormat}}
                  </span>
                    <span class="tips"
                          v-else="news.countryCategory !==null && news.countryCategory !== '' && news.countryCategory !==undefined && news.countryCategory !=='NULL'"
                          @click="goIndustryByCountry(news.countryCategory)"
                    >
                    {{news.countryCategory | labelFormat}}
                  </span>

                    <span>{{news.urlDate}}</span>
                  </p>
                  <p class="tit" :title="news.title" @click="goArticle('/article',{sid:news.sid})">
                    {{news.title}}
                  </p>
                  <p class="des">
                    {{news.content}}
                  </p>
                  <div class="bottom">
                    <div class="left">
                      <div class="userimg"
                           v-if="!(news.siteName!==null && news.siteName !== '' && news.siteName !== undefined && news.siteName!='NULL')">
                        <img src="../assets/logo_brand.png">
                      </div>
                      {{(news.siteName!==null && news.siteName !== '' && news.siteName !== undefined &&
                      news.siteName!='NULL')?news.siteName:news.author }}
                    </div>
                    <div class="right" @click="goArticle('/article',{sid:news.sid})">阅读全文</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
      <div class="df-container container hotindustry">
        <div class="row">
          <div class="section-head">
            <div class="headtit">推荐项目</div>
          </div>
          <div class="inlist" v-if="hottestProject.length>0">
            <ul>
              <li :class="index == prjAct ? 'on': ''" v-for="(item,index) in hottestProject"
                  @click="changeProject(item,index)">
                <img :src="item.logoSrc " class="inlistimg">
                <div class="mask">
                  <p>{{item.project}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="intabcontent" v-show="hottestProject.length>0">
            <div class="topban">
              <div class="info">
                <div class="toplist-item">
                  <div class="left">
                    <p class="tit">
                      <span class="title" @click.stop="goArticle('/project',{sid: showProject.sid}) ">
                        {{showProject.project}}
                      </span>
                      <i class="fa fa-heart" v-if="!isFollow" @click="setFollow()"></i>
                      <i class="fa fa-heart on" v-if="isFollow" @click="deleteFollow(showProject.collected)"></i>
                    </p>
                    <p class="smtit">{{showProject.introduction }}</p>
                    <p class="des">{{showProject.irAbstract }}</p>
                  </div>
                  <div class="right"><img :src="showProject.logoSrc"></div>
                </div>
                <div class="mid">
                  <p><span>代币</span>{{showProject.token }}</p>
                  <p><span>价格</span>{{showProject.price }}</p>
                </div>
                <div class="bottom">
                  <ul>
                    <li>follow us:</li>
                    <li><a :href="showProject.outerFaceBook "><img src="../assets/home/f1.png"></a></li>
                    <li><a :href="showProject.outerTwitter "><img src="../assets/home/f2.png"></a></li>
                    <li><a :href="showProject.outerTelegram "><img src="../assets/home/f3.png"></a></li>
                    <li><a :href="showProject.outerBitCoinTalk "><img src="../assets/home/f4.png"></a></li>
                    <li><a :href="showProject.outerInstagram "><img src="../assets/home/f5.png"></a></li>
                    <li><a :href="showProject.outerGitHub"><img src="../assets/home/f6.png"></a></li>
                    <li><a :href="showProject.outerMedium  "><img src="../assets/home/f8.png"></a></li>
                    <li><a :href="showProject.outerQuora "><img src="../assets/home/f9.png"></a></li>
                    <li><a :href="showProject.outerReddit "><img src="../assets/home/f10.png"></a></li>
                  </ul>
                  <div class="tips">评</div>
                </div>
              </div>
            </div>
            <div class="bottomflex">
              <div class="section1">
                <div class="head">团队</div>
                <div class="swiper-container" id="home-team">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in showProject.partner">
                      <div class="item" v-for="partner in item">
                        <img :src="partner.image">
                        <p class="name">{{partner.h3}}</p>
                        <p class="posi">{{partner.h4}}</p>
                        <div class="i" :class="partner.linkin?'on':''">
                          <a :href="partner.linkin" target="_blank">
                            <i class="fa fa-linkedin"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-pagination"></div>
                </div>
              </div>
              <div class="section2">
                <div class="head home-newstabs">
                  <a href="javascript:;" class="active">最新资讯</a>
                  <a href="javascript:;">推文</a>
                  <a href="javascript:;">微博</a>
                </div>
                <div class="swiper-container" id="home-news" style="width: 100%;">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <div class="swiper-container home_newslist_style" id="home-newslist1">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide">
                            <div class="item hasdate" v-for="icoNew in icoNews.content">
                              <div class="left" :class="(icoNew.titlePicture != ''&& icoNew.titlePicture )?'hasbg':'' ">
                                <img :src="icoNew.titlePicture ">
                                <p class="day">{{icoNew.urlTime | showDay }}</p>
                                <p>{{icoNew.urlTime | showYear}}</p>
                              </div>
                              <div class="right">
                                <p class="tit">
                                  <a href="javascript:;" @click="goArticle('/article',{sid:icoNew.sid})">
                                    {{icoNew.title }}
                                  </a>
                                </p>
                                <p class="des">
                                  {{icoNew.content }}
                                </p>
                                <div class="bottom">
                                  <div class="userinfo">
                                    <div class="user" v-if="icoNew.siteName">
                                      <!--<img src="../assets/logo_brand.png">-->
                                      <span>{{icoNew.siteName}}</span>
                                      <span class="usertime">{{icoNew.urlTime}}</span>
                                    </div>
                                    <div class="user" v-else>
                                      <img src="../assets/logo_brand.png">
                                      <span>{{icoNew.author }}{{!(icoNew.siteName)}}</span>
                                      <span class="usertime">{{icoNew.urlTime}}</span>
                                    </div>
                                  </div>
                                  <span class="tips cursor_style"
                                        v-if="icoNew.projectCategory !==null && icoNew.projectCategory !== '' && icoNew.projectCategory !==undefined && icoNew.projectCategory !=='NULL'"
                                        @click="goProjectByName(icoNew.projectCategory)"
                                  >
                                    {{icoNew.projectCategory | labelFormat}}
                                  </span>
                                  <span class="tips cursor_style"
                                        v-else-if="icoNew.industryCategory !==null && icoNew.industryCategory !== '' && icoNew.industryCategory !==undefined && icoNew.industryCategory !=='NULL'"
                                        @click="goIndustryByIndustry(icoNew.industryCategory)"
                                  >
                                    {{icoNew.industryCategory | labelFormat}}
                                  </span>
                                  <span class="tips cursor_style"
                                        v-else="icoNew.countryCategory !==null && icoNew.countryCategory !== '' && icoNew.countryCategory !==undefined && icoNew.countryCategory !=='NULL'"
                                        @click="goIndustryByCountry(icoNew.countryCategory)"
                                  >
                                    {{icoNew.countryCategory | labelFormat}}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-slide">
                      <div class="swiper-container home_newslist_style" id="home-newslist2">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide">
                            <div class="item" v-for="icoNew in icoNews.tuiwen">
                              <div class="left TorW">
                                <img :src="tuiwen ">
                                <p>{{icoNew.urlDate}}</p>
                              </div>
                              <!--<div class="left"><img src="../assets/home/nicon.png" :src="tuiwen"></div>-->
                              <div class="right">
                                <p class="des cursor_style" @click="goArticle('/article',{sid:icoNew.sid})">
                                  {{icoNew.content}}</p>
                                <div class="bottom">
                                  <span class="name">{{icoNew.author }}{{!(icoNew.siteName)}}</span>
                                  <span class="time">{{icoNew.urlDate}}</span>
                                  <span class="tips cursor_style"
                                        v-if="icoNew.projectCategory !==null && icoNew.projectCategory !== '' && icoNew.projectCategory !==undefined && icoNew.projectCategory !=='NULL'"
                                        @click="goProjectByName(icoNew.projectCategory)"
                                  >
                                    {{icoNew.projectCategory | labelFormat}}
                                  </span>
                                  <span class="tips cursor_style"
                                        v-else-if="icoNew.industryCategory !==null && icoNew.industryCategory !== '' && icoNew.industryCategory !==undefined && icoNew.industryCategory !=='NULL'"
                                        @click="goIndustryByIndustry(icoNew.industryCategory)"
                                  >
                                    {{icoNew.industryCategory | labelFormat}}
                                  </span>
                                  <span class="tips cursor_style"
                                        v-else="icoNew.countryCategory !==null && icoNew.countryCategory !== '' && icoNew.countryCategory !==undefined && icoNew.countryCategory !=='NULL'"
                                        @click="goIndustryByCountry(icoNew.countryCategory)"
                                  >
                                    {{icoNew.countryCategory | labelFormat}}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-slide">
                      <div class="swiper-container home_newslist_style" id="home-newslist3">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide">
                            <div class="item" v-for="icoNew in icoNews.weibo">
                              <div class="left TorW"
                                   :class="(icoNew.titlePicture != ''&& icoNew.titlePicture )?'hasbg':'' ">
                                <img :src="weibo ">
                                <p>{{icoNew.urlDate}}</p>
                              </div>
                              <div class="right">
                                <p class="des cursor_style" @click="goArticle('/article',{sid:icoNew.sid})">
                                  {{icoNew.content}}</p>
                                <div class="bottom">
                                  <span class="name">{{icoNew.author }}{{!(icoNew.siteName)}}</span>
                                  <span class="time">{{icoNew.urlDate}}</span>
                                  <span class="tips cursor_style"
                                        v-if="icoNew.projectCategory !==null && icoNew.projectCategory !== '' && icoNew.projectCategory !==undefined && icoNew.projectCategory !=='NULL'"
                                        @click="goProjectByName(icoNew.projectCategory)"
                                  >
                                    {{icoNew.projectCategory | labelFormat}}
                                  </span>
                                  <span class="tips cursor_style"
                                        v-else-if="icoNew.industryCategory !==null && icoNew.industryCategory !== '' && icoNew.industryCategory !==undefined && icoNew.industryCategory !=='NULL'"
                                        @click="goIndustryByIndustry(icoNew.industryCategory)"
                                  >
                                    {{icoNew.industryCategory | labelFormat}}
                                  </span>
                                  <span class="tips cursor_style"
                                        v-else="icoNew.countryCategory !==null && icoNew.countryCategory !== '' && icoNew.countryCategory !==undefined && icoNew.countryCategory !=='NULL'"
                                        @click="goIndustryByCountry(icoNew.countryCategory)"
                                  >
                                    {{icoNew.countryCategory | labelFormat}}
                                  </span>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="df-container container hotindustry2">
        <div class="row">
          <div class="section-head">
            <div class="headtit">热门行业</div>
            <router-link to="/recommend" class="more">浏览更多</router-link>
          </div>
          <div class="modulelist">
            <div class="item" v-for="item in hostIndustries">
              <div class="left"><img src="../assets/home/hi.jpg"></div>
              <div class="right">
                <p class="tit">{{item.categoryName}}</p>
                <p class="smtit">最新资讯</p>
                <ul class="list">
                  <li v-for="content in item.content">
                    <a :title="content.title" href="javascript:;" @click="goArticle('/article',{sid:content.sid})">{{content.title}}</a>
                  </li>
                </ul>
                <ul class="rtlist">
                  <li>相关项目</li>
                  <li v-for="project in item.project">
                    <a href="javascript:;" @click="goArticle('/project',{sid:project.sid})">{{project.project}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <vfooter/>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'

  let tuiwen = require('../assets/home/tuite.png')
  let weibo = require('../assets/home/weibo.png')
  let default_header = require('../assets/user/default-header.png');

  export default {
    data() {
      return {
        hottestProject: [],
        showProject: {},
        icoNews: {
          index: 1,
          content: [],
          tuiwen: [],
          weibo: []
        },
        hostNews: [],
        prjAct: 0,
        hostIndustries: [],
        candy: 0,
        tuiwen: tuiwen,
        weibo: weibo,
        isFollow: false,
        profileUrl: '',
        token: '',
        default_header: default_header,
        newsNo: 1,
        tuiwenNo: 1,
        weiboNo: 1,
      }
    },
    filters: {
      showDay(obj) {
        let myDate = new Date(obj);
        let day = myDate.getDate();
        if (day < 10) {
          day = '0' + day
        }
        return day
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
      labelFormat(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            return arr[0];
          }
          return obj;
        }
        return obj;
      },
      showLable(label1, label2, lable3) {
        if (label1 != null && label1 !== undefined && label1 !== '' && label1 !== 'NULL') {
          let has = label1.indexOf(';')
          if (has >= 0) {
            let arr = label1.split(';');
            return arr[0]
          } else {
            return label1
          }
        } else {
          if (label2 != null && label2 !== undefined && label2 !== '' && label2 !== 'NULL') {
            let has = label2.indexOf(';')
            if (has >= 0) {
              let arr = label2.split(';');
              return arr[0]
            } else {
              return label2
            }
          } else {
            if (lable3 != null && lable3 !== undefined && lable3 !== '' && lable3 !== 'NULL') {
              let has = lable3.indexOf(';')
              if (has >= 0) {
                let arr = lable3.split(';');
                return arr[0]
              } else {
                return lable3
              }
            } else {
              return '标签'
            }
          }
        }
      }
    },
    mounted() {
      new Swiper('#home-team', {
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      });
      let homeNewsSwiper = new Swiper('#home-news', {
        // effect : 'fade',
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionStart: function () {
            $(".home-newstabs .active").removeClass('active');
            $(".home-newstabs a").eq(this.activeIndex).addClass('active');
          }
        }
      });
      $(".home-newstabs a").on('click', function (e) {
        e.preventDefault();
        $(".home-newstabs .active").removeClass('active');
        $(this).addClass('active');
        homeNewsSwiper.slideTo($(this).index())
      });
      this.getHottestProject();
      this.iniHotIndustries();
      this.initHotNews();
      this.initCandy();
      this.scrollNews();
      this.scrollTuiwen();
      this.scrollWeibo();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initCandy();
        vm.getHottestProject();
      })
    },
    methods: {
      scrollNews() {
        let $this = document.getElementById('home-newslist1');
        let finished = true;
        $this.addEventListener('scroll', () => {
          let boxTop = $this.scrollTop;
          let boxHeight = $this.scrollHeight;
          let offsetHeight = $this.offsetHeight;
          if ((boxTop / (boxHeight - offsetHeight) >= 0.90) && finished) {
            finished = false;
            let that = this;
            that.$axios.get('/api/traditional/news?searchBy=' + that.showProject.project + '&categoryId=290001&pageNo=' + that.newsNo).then(function (res) {
              that.newsNo++;
              for (let i = 0; i < res.data.content.length; i++) {
                that.icoNews.content.push(res.data.content[i])
              }
              finished = true;
            });
          }
        });
      },
      scrollTuiwen() {
        let $this = document.getElementById('home-newslist2');
        let finished = true;
        $this.addEventListener('scroll', () => {
          let boxTop = $this.scrollTop;
          let boxHeight = $this.scrollHeight;
          let offsetHeight = $this.offsetHeight;
          if ((boxTop / (boxHeight - offsetHeight) >= 0.90) && finished) {
            finished = false;
            let that = this;
            that.$axios.get('/api/traditional/news?searchBy=' + that.showProject.project + '&categoryId=290002&pageNo=' + that.tuiwenNo).then(function (res) {
              that.tuiwenNo++;
              for (let i = 0; i < res.data.content.length; i++) {
                that.icoNews.tuiwen.push(res.data.content[i])
              }
              finished = true;
            });
          }
        });
      },
      scrollWeibo() {
        let $this = document.getElementById('home-newslist3');
        let finished = true;
        $this.addEventListener('scroll', () => {
          let boxTop = $this.scrollTop;
          let boxHeight = $this.scrollHeight;
          let offsetHeight = $this.offsetHeight;
          if ((boxTop / (boxHeight - offsetHeight) >= 0.90) && finished) {
            finished = false;
            let that = this;
            that.$axios.get('/api/traditional/news?searchBy=' + that.showProject.project + '&categoryId=290004&pageNo=' + that.weiboNo).then(function (res) {
              that.weiboNo++;
              for (let i = 0; i < res.data.content.length; i++) {
                that.icoNews.weibo.push(res.data.content[i])
              }
              finished = true;
            });
          }
        });
      },
      goProjectByName(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/project', query: {project: obj}});
        window.open(routeData.href, '_blank');
      },
      goIndustryByIndustry(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/recommend', query: {industry: obj}});
        window.open(routeData.href, '_blank');
      },
      goIndustryByCountry(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/recommend', query: {country: obj}});
        window.open(routeData.href, '_blank');
      },
      logout() {
        localStorage.removeItem('apelink_user_candies');
        localStorage.removeItem('apelink_user_email');
        localStorage.removeItem('apelink_user_expirationDate');
        localStorage.removeItem('apelink_user_nickName');
        localStorage.removeItem('apelink_user_phoneNumber');
        localStorage.removeItem('apelink_user_profileUrl');
        localStorage.removeItem('apelink_user_sex');
        localStorage.removeItem('apelink_user_signedIn');
        localStorage.removeItem('apelink_user_synopsis');
        localStorage.removeItem('apelink_user_token');
        localStorage.removeItem('apelink_user_uid');
        this.$router.push('/login');
      },
      goArticle(url, query) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');
      },
      setFollow() {
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/api/individual/add?type=ICO&sid=' + that.showProject.sid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              alert('关注成功');
              that.isFollow = true
            }
          })
        } else {
          alert('请先登录');
        }
      },
      deleteFollow(cid) {
        // let that = this
        // let token = localStorage.getItem('apelink_user_token');
        // if (token) {
        //   let uid = localStorage.getItem('apelink_user_uid');
        //   let url = '/api/individual/delete?cid=' + cid;
        //   let headers = {'uid': uid, 'Authorization': token};
        //   that.$axios({
        //     method: 'DELETE',
        //     url: url,
        //     headers: headers
        //   }).then(function (res) {
        //     if (res.data) {
        //       that.isFollow = true
        //     }
        //
        //   })
        // } else {
        //   alert('请先登录。')
        // }
      },
      getfollowboolean(project) {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let checkurl = '/api/individual/check?type=ICO&sidOrName=' + project;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'post',
          url: checkurl,
          headers: headers
        }).then(function (res) {
          if (res.data) {
            that.isFollow = true
          } else {
            that.isFollow = false
          }
        })
      },
      initIcoNews(obj) {
        let ico = obj.project;
        let that = this
        that.$axios.get('/api/traditional/news?searchBy=' + ico + '&categoryId=290001&pageNo=' + that.newsNo).then(function (res) {
          that.newsNo++;
          that.icoNews.content = res.data.content;
        })
      },
      initCandy() {
        this.candy = localStorage.getItem('apelink_user_candies');
        this.profileUrl = localStorage.getItem('apelink_user_profileUrl');
        this.token = localStorage.getItem('apelink_user_token');
      },
      inittuiwen(obj) {
        let ico = obj.project;
        let that = this
        that.$axios.get('/api/traditional/news?searchBy=' + ico + '&categoryId=290002&pageNo=' + that.tuiwenNo).then(function (res) {
          that.tuiwenNo++;
          that.icoNews.tuiwen = res.data.content;
        })
      },
      initweibo(obj) {
        let ico = obj.project;
        let that = this
        that.$axios.get('/api/traditional/news?searchBy=' + ico + '&categoryId=290004&pageNo=' + that.weiboNo).then(function (res) {
          that.weiboNo++;
          that.icoNews.weibo = res.data.content;
        })
      },
      initHotNews() {
        let categoryName = '首页-新闻列表';
        let that = this
        that.$axios.get('/api/traditional/list?categoryName=' + categoryName).then(function (res) {
          if (res.status === 200) {
            let content = res.data.content;
            for (let i = 0; (i < content.length && i < 8); i++) {
              that.hostNews.push(content[i])
            }
          }
        })
      },
      iniHotIndustries() {
        let that = this
        that.$axios.get('/api/ICO/hotestIndustries').then(function (res) {
          // that.hostIndustries = res.data
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            let Industry = {};
            Industry.categoryName = data[i];
            that.$axios.get('/api/ICO/relatedICO?categoryName=' + Industry.categoryName + '&pageSize=4').then(function (res) {
              Industry.project = res.data;
              that.$axios.get('/api/traditional/categoryList?categoryName=' + Industry.categoryName + '&pageSize=4').then(function (res) {
                Industry.content = res.data.content;
                that.hostIndustries.push(Industry);
              })
            })
          }
        })
      },
      showheader() {
        let arr = document.getElementsByClassName('home-header')
        if (this.$refs.box.scrollTop >= 10) {
          arr[0].classList.add('hasbg')
        } else {
          arr[0].classList.remove('hasbg')
        }
      },
      getHottestProject() {
        let that = this;
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/api/ICO/top5';
        let headers = {'uid': uid};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          if (res.status === 200) {
            that.hottestProject = res.data;
            if (res.data.length >= 1) {
              that.showProject = res.data[0]
            }
            let partner = JSON.parse(that.showProject.partner);
            that.showProject.partner = that.initPartner(partner);
            that.initIcoNews(that.showProject);
            that.inittuiwen(that.showProject);
            that.initweibo(that.showProject);
            // that.getfollowboolean(that.showProject.sid)
            if (that.showProject.collected) {
              that.isFollow = true
            } else {
              that.isFollow = false
            }
          }
        });
      },
      initPartner(obj) {
        let objArr = [];
        let arr = [];
        let num = 0;
        for (let i = 0; i < obj.length; i++) {
          num++;
          arr.push(obj[i]);
          if (i >= obj.length - 1) {
            num = 9
          }
          if (num > 8) {
            objArr.push(arr);
            arr = [];
            num = 0
          }
        }
        console.log(objArr);
        return objArr
      },
      changeProject(obj, index) {
        this.prjAct = index
        try {
          let partner = JSON.parse(obj.partner);
          obj.partner = this.initPartner(partner);
        } catch (e) {
        } finally {
          this.showProject = obj;
          this.initIcoNews(this.showProject);
          this.inittuiwen(this.showProject);
          this.initweibo(this.showProject);
          if (this.showProject.collected) {
            this.isFollow = true
          } else {
            this.isFollow = false
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

