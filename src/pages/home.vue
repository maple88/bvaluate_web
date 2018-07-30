<template>
  <div class="page">
    <div class="home-header">
      <div class="tophead">
        <div class="container">
          <p>APELINk</p>
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
                <router-link tag="li" to="/follow" active-class="active"><a>关注</a></router-link>
                <router-link tag="li" to="/project" active-class="active"><a>项目</a></router-link>
                <router-link tag="li" to="/author" active-class="active"><a>作者</a></router-link>
                <router-link tag="li" to="/userCenter" active-class="active"><a>个人中心</a></router-link>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                    <div class="user"><img src="../assets/logo_brand.png"></div>
                    <p>糖果数：1450</p>
                  </a>
                  <ul class="dropdown-menu">
                    <router-link tag="li" to="/my"><a>设置</a></router-link>
                    <!-- <li><a href="#">设置</a></li> -->
                    <li><a href="#">退出</a></li>
                  </ul>
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
          APELINk
        </div>
      </div>
      <div class="df-container container home-newslist">
        <div class="section-head">
          <div class="headtit">新闻头条</div>
          <a href="#" class="more">浏览更多</a>
        </div>
        <div class="df-row row newslist">

          <div class="df-col col-md-3 col-sm-4 col-xs-6" v-for="(news,$index) in hostNews" :if="$index < 3">
            <div class="item">
              <a href="#">
                <div class="img-box"><img :src="news.titlePicture"></div>
                <div class="info">
                  <p class="tips">{{news.grouptName}}<span>{{news.urlDate}}</span></p>
                  <p class="tit">{{news.title}}</p>
                  <p class="des">
                    {{news.content}}
                  </p>
                  <div class="bottom">
                    <div class="left">
                      <div class="userimg"><img src="../assets/logo_brand.png"></div>
                      {{news.author}}
                    </div>
                    <div class="right">阅读全文</div>
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
            <div class="headtit">热门行业</div>
            <!-- <a href="#" class="more">浏览更多</a> -->
            <router-link to="/industry" class="more">浏览更多</router-link>
          </div>
          <div class="inlist">
            <ul>
              <li :class="index == prjAct ? 'on': ''" v-for="(item,index) in hottestProject"
                  @click="changeProject($even,item,index)">
                <img :src="'http://'+item.logoSrc " class="inlistimg">
                <div class="mask">
                  <p>{{item.project}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="intabcontent">
            <div class="topban">
              <div class="info">
                <div class="toplist-item">
                  <div class="left">
                    <p class="tit">{{showProject.project}}<i class="fa fa-heart"></i></p>
                    <p class="smtit">{{showProject.introduction }}</p>
                    <p class="des">{{showProject.irAbstract }}</p>
                  </div>
                  <div class="right"><img :src="'http://'+showProject.logoSrc"></div>
                </div>
                <div class="mid">
                  <p><span>代币</span>{{showProject.token }}</p>
                  <p><span>价格</span>{{showProject.price }}</p>
                </div>
                <div class="bottom">
                  <ul>
                    <li>folow us:</li>
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
                    <div class="swiper-slide" v-for="item in showProject.partner ">
                      <!--<div class="item">-->
                      <!--<img src="../assets/logo_brand.png">-->
                      <!--<p class="name">Deian roljic</p>-->
                      <!--<p class="posi">创始人加首席执行者</p>-->
                      <!--<div class="i"><i class="fa fa-linkedin"></i></div>-->
                      <!--</div>-->
                      <div class="item" v-for="partner in item">
                        <img :src="partner.image">
                        <p class="name">{{partner.h3}}</p>
                        <p class="posi">{{partner.h4}}</p>
                        <div class="i on"><a :href="partner.linkin"></a><i class="fa fa-linkedin"></i></div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-pagination"></div>
                </div>
              </div>
              <div class="section2">
                <div class="head home-newstabs">
                  <a href="#" class="active">最新资讯</a>
                  <a href="#">推文</a>
                  <a href="#">微博</a>
                </div>
                <div class="swiper-container" id="home-news">
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
                                  <a href="#">
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
                                    </div>
                                    <div class="user" v-else>
                                      <img src="../assets/logo_brand.png">
                                      <span>{{icoNew.author }}{{!(icoNew.siteName)}}</span>
                                    </div>
                                    <span class="usertime">{{icoNew.urlTime }}</span>
                                  </div>
                                  <span class="tips">{{icoNew.grouptName}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="item">
                              <div class="left"><img src="../assets/home/nicon.png"></div>
                              <div class="right">
                                <p class="des">Hey Andrew, We will be announcing release detailsin the coming weeks,
                                  stay tuned on our official hannels! t.me/vividtoken Hey Andrew, We will be
                                  announcing</p>
                                <div class="bottom">
                                  <span class="name">博主</span>
                                  <span class="time">2018-06-02    18:00</span>
                                  <span class="tips">新闻</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="swiper-scrollbar"></div>
                      </div>
                    </div>
                    <div class="swiper-slide">
                      <!--<div class="swiper-container home_newslist_style" id="home-newslist2">-->
                      <!--<div class="swiper-wrapper">-->
                      <!--<div class="swiper-slide">-->
                      <!--<div class="item hasdate" v-for="icoNew in icoNews.content">-->
                      <!--<div class="left" :class="(icoNew.titlePicture != ''&& icoNew.titlePicture )?'hasbg':'' ">-->
                      <!--<img :src="icoNew.titlePicture ">-->
                      <!--<p class="day">{{icoNew.urlTime | showDay }}</p>-->
                      <!--<p>{{icoNew.urlTime | showYear}}</p>-->
                      <!--</div>-->
                      <!--<div class="right">-->
                      <!--<p class="tit">-->
                      <!--<a href="#">-->
                      <!--{{icoNew.title }}-->
                      <!--</a>-->
                      <!--</p>-->
                      <!--<p class="des">-->
                      <!--{{icoNew.content }}-->
                      <!--</p>-->
                      <!--<div class="bottom">-->
                      <!--<div class="userinfo">-->
                      <!--<div class="user" :is="icoNew.siteName">-->
                      <!--&lt;!&ndash;<img src="../assets/logo_brand.png">&ndash;&gt;-->
                      <!--<span>{{icoNew.siteName}}</span>-->
                      <!--</div>-->
                      <!--<div class="user" :is="!icoNew.siteName">-->
                      <!--<img src="../assets/logo_brand.png">-->
                      <!--<span>{{icoNew.author }}</span>-->
                      <!--</div>-->
                      <!--<span class="usertime">{{icoNew.urlTime }}</span>-->
                      <!--</div>-->
                      <!--<span class="tips">{{icoNew.grouptName}}</span>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--<div class="item">-->
                      <!--<div class="left"><img src="../assets/home/nicon.png"></div>-->
                      <!--<div class="right">-->
                      <!--<p class="des">Hey Andrew, We will be announcing release detailsin the coming weeks,-->
                      <!--stay tuned on our official hannels! t.me/vividtoken Hey Andrew, We will be-->
                      <!--announcing</p>-->
                      <!--<div class="bottom">-->
                      <!--<span class="name">博主</span>-->
                      <!--<span class="time">2018-06-02    18:00</span>-->
                      <!--<span class="tips">新闻</span>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--<div class="swiper-scrollbar"></div>-->
                      <!--</div>-->
                    </div>
                    <div class="swiper-slide">
                      <!--<div class="swiper-container home_newslist_style" id="home-newslist3">-->
                      <!--<div class="swiper-wrapper">-->
                      <!--<div class="swiper-slide">-->
                      <!--<div class="item hasdate" v-for="icoNew in icoNews.content">-->
                      <!--<div class="left" :class="(icoNew.titlePicture != ''&& icoNew.titlePicture )?'hasbg':'' ">-->
                      <!--<img :src="icoNew.titlePicture ">-->
                      <!--<p class="day">{{icoNew.urlTime | showDay }}</p>-->
                      <!--<p>{{icoNew.urlTime | showYear}}</p>-->
                      <!--</div>-->
                      <!--<div class="right">-->
                      <!--<p class="tit">-->
                      <!--<a href="#">-->
                      <!--{{icoNew.title }}-->
                      <!--</a>-->
                      <!--</p>-->
                      <!--<p class="des">-->
                      <!--{{icoNew.content }}-->
                      <!--</p>-->
                      <!--<div class="bottom">-->
                      <!--<div class="userinfo">-->
                      <!--<div class="user" :is="icoNew.siteName">-->
                      <!--&lt;!&ndash;<img src="../assets/logo_brand.png">&ndash;&gt;-->
                      <!--<span>{{icoNew.siteName}}</span>-->
                      <!--</div>-->
                      <!--<div class="user" :is="!icoNew.siteName">-->
                      <!--<img src="../assets/logo_brand.png">-->
                      <!--<span>{{icoNew.author }}</span>-->
                      <!--</div>-->
                      <!--<span class="usertime">{{icoNew.urlTime }}</span>-->
                      <!--</div>-->
                      <!--<span class="tips">{{icoNew.grouptName}}</span>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--<div class="item">-->
                      <!--<div class="left"><img src="../assets/home/nicon.png"></div>-->
                      <!--<div class="right">-->
                      <!--<p class="des">Hey Andrew, We will be announcing release detailsin the coming weeks,-->
                      <!--stay tuned on our official hannels! t.me/vividtoken Hey Andrew, We will be-->
                      <!--announcing</p>-->
                      <!--<div class="bottom">-->
                      <!--<span class="name">博主</span>-->
                      <!--<span class="time">2018-06-02    18:00</span>-->
                      <!--<span class="tips">新闻</span>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--<div class="swiper-scrollbar"></div>-->
                      <!--</div>-->
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
            <router-link to="/industry" class="more">浏览更多</router-link>
          </div>
          <div class="modulelist">
            <div class="item">
              <div class="left"><img src="../assets/home/hi.jpg"></div>
              <div class="right">
                <p class="tit">平台</p>
                <p class="smtit">最新资讯</p>
                <ul class="list">
                  <li><a href="#">伊利诺伊州区块链法案“腹死胎中”伊利诺伊州区块链法案“腹死胎中”</a></li>
                  <li><a href="#">LongHash孵化项目 everiTokenLongHash孵化项目</a></li>
                  <li><a href="#">比特币谷歌搜索量急剧下降 区块比特币谷歌搜索量急剧下降</a></li>
                  <li><a href="#">傻瓜版的数字货币？sopay你还傻瓜版的数字货币？sopay你还</a></li>
                </ul>
                <ul class="rtlist">
                  <li>相关项目</li>
                  <li><a href="#">EOS</a></li>
                  <li><a href="#">Datablockchain</a></li>
                  <li><a href="#">0x</a></li>
                  <li><a href="#">Paymon</a></li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="left"><img src="../assets/home/hi.jpg"></div>
              <div class="right">
                <p class="tit">平台</p>
                <p class="smtit">最新资讯</p>
                <ul class="list">
                  <li><a href="#">伊利诺伊州区块链法案“腹死胎中”伊利诺伊州区块链法案“腹死胎中”</a></li>
                  <li><a href="#">LongHash孵化项目 everiTokenLongHash孵化项目</a></li>
                  <li><a href="#">比特币谷歌搜索量急剧下降 区块比特币谷歌搜索量急剧下降</a></li>
                  <li><a href="#">傻瓜版的数字货币？sopay你还傻瓜版的数字货币？sopay你还</a></li>
                </ul>
                <ul class="rtlist">
                  <li>相关项目</li>
                  <li><a href="#">EOS</a></li>
                  <li><a href="#">Datablockchain</a></li>
                  <li><a href="#">0x</a></li>
                  <li><a href="#">Paymon</a></li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="left"><img src="../assets/home/hi.jpg"></div>
              <div class="right">
                <p class="tit">平台</p>
                <p class="smtit">最新资讯</p>
                <ul class="list">
                  <li><a href="#">伊利诺伊州区块链法案“腹死胎中”伊利诺伊州区块链法案“腹死胎中”</a></li>
                  <li><a href="#">LongHash孵化项目 everiTokenLongHash孵化项目</a></li>
                  <li><a href="#">比特币谷歌搜索量急剧下降 区块比特币谷歌搜索量急剧下降</a></li>
                  <li><a href="#">傻瓜版的数字货币？sopay你还傻瓜版的数字货币？sopay你还</a></li>
                </ul>
                <ul class="rtlist">
                  <li>相关项目</li>
                  <li><a href="#">EOS</a></li>
                  <li><a href="#">Datablockchain</a></li>
                  <li><a href="#">0x</a></li>
                  <li><a href="#">Paymon</a></li>
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

  export default {
    data() {
      return {
        hottestProject: [],
        showProject: {},
        icoNews: {
          index: 1,
          content: []
        },
        hostNews: [],
        prjAct: 0
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
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionStart: function () {
            $(".home-newstabs .active").removeClass('active');
            $(".home-newstabs a").eq(this.activeIndex).addClass('active');
          }
        }
      })
      $(".home-newstabs a").on('click', function (e) {
        e.preventDefault()
        $(".home-newstabs .active").removeClass('active')
        $(this).addClass('active')
        homeNewsSwiper.slideTo($(this).index())
      })
      new Swiper('#home-newslist1', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true,
        observer: true,
        observeParents: true
      })
      new Swiper('#home-newslist2', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true,
        observer: true,
        observeParents: true
      })
      new Swiper('#home-newslist3', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true,
        observer: true,
        observeParents: true
      })
      this.getHottestProject()
      // this.iniHotIndustries()
      // this.initHotNews()
      this.initHotNews()
    },
    methods: {
      initIcoNews(obj) {
        let ico = obj.project;
        let dataType = 'NEWS';
        let that = this
        that.$axios.get('/api/ICO/icoLatestNews?ico=' + ico + '&dataType=' + dataType).then(function (res) {
          console.log(res)
          that.icoNews.content = res.data.content
        })
      },
      initHotNews() {
        let categoryId = 100001;
        let that = this
        that.$axios.get('/api/traditional/list?categoryId=' + categoryId).then(function (res) {
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
          console.log(res)
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
        that.$axios.get('/api/ICO/top5').then(function (res) {
          if (res.status === 200) {
            that.hottestProject = res.data
            if (res.data.length >= 1) {
              that.showProject = res.data[0]
            }
            let partner = JSON.parse('[' + that.showProject.partner + ']')
            that.showProject.partner = that.initPartner(partner)
            that.initIcoNews(that.showProject)
          }
        })
      },
      initPartner(obj) {
        let objArr = []
        let arr = []
        let num = 0
        for (let i = 0; i < obj.length; i++) {
          num++
          arr.push(obj[i])
          if (i >= obj.length - 1) {
            num = 9
          }
          if (num > 8) {
            objArr.push(arr)
            arr = []
            num = 0
          }
        }
        return objArr
      },
      changeProject(e, obj, index) {
        this.prjAct = index
        try {
          let partner = JSON.parse('[' + obj.partner + ']');
          obj.partner = this.initPartner(partner);
        } catch (e) {
        } finally {
          this.showProject = obj;
          this.initIcoNews(this.showProject)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

