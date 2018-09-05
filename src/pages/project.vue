<template>
  <div class="page">
    <vheader/>
    <div class="maintainer">
      <!-- content here -->
      <div class="project-banner" :style="'background: url('+banner+')'">
        <div class="container">
          <div class="left">{{project.totalScore | showTatolCore}}</div>
          <div class="right">
            <div class="top">
              <div class="imgbrand"><img :src="project.logoSrc "></div>
              <div class="info">
                <div class="tit">
                  <a :href="project.outer" target="_blank"> {{project.project}}</a>
                  <div class="followbtn" v-if="!isFollow" @click="setFollow()">+ 关注</div>
                  <div class="followbtn on" v-if="isFollow" @click="deleteFollow(project.collected)">√ 已关注</div>
                </div>
                <p class="smtit">{{project.introduction }}</p>
              </div>
            </div>
            <p class="des">
              {{project.irAbstract }}
            </p>
          </div>
        </div>
      </div>
      <div class="container flexlayout">
        <div class="leftlayout">
          <div class="section1">
            <div class="sectiontabs">
              <a href="javascript:;" :class="atvNewOrGrade==1?'active':''"
                 @click.stop="iniNewOrGrade(project.project,'290001') , atvNewOrGrade=1,NGewOrGrade = '290001',NewOrGradeNo=2">新闻</a>
              <a href="javascript:;" :class="atvNewOrGrade==2?'active':''"
                 @click.stop="iniNewOrGrade(project.project,'290000') , atvNewOrGrade=2,NGewOrGrade = '290000',NewOrGradeNo=2">评级文章</a>
            </div>
            <div class="swiper-container section-swiper" id="newOrGradeSwiper">
              <div class="loading_box" v-if="showLoading1">
                <img style="width: 50px" :src="loading"/>
              </div>
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="media" v-for="item in NewOrGrade">
                    <div class="media-left media-middle">
                      <div class="newimg_box">
                        <img v-if="item.titlePicture" :src="item.titlePicture"/>
                        <div class="date_box">
                          <span class="day">{{item.urlTime | showDay}}</span>
                          <span class="years">{{item.urlTime | showYear}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading" :title="item.title" @click="goArticle('/article',{sid:item.sid})">
                        {{item.title }}
                      </h4>
                      <p class="media-words">
                        {{item.content }}
                      </p>
                      <div class="media-bottom">
                        <ul>
                          <li>
                            <div class="userimg"
                                 v-if="!(item.siteName !== 'NULL' && item.siteName !== null && item.siteName !== '')">
                              <img src="../assets/follow/user_head.png">
                            </div>
                            {{
                            (item.siteName !== 'NULL'
                            && item.siteName !== null
                            && item.siteName !== '')?item.siteName:item.author
                            }}
                          </li>
                          <li>{{item.urlTime}}</li>
                        </ul>
                        <div class="tips"
                             v-if="item.projectCategory !==null && item.projectCategory !== '' && item.projectCategory !==undefined && item.projectCategory !=='NULL'"
                             @click="goProjectByName(item.projectCategory)"
                        >
                          {{item.projectCategory | labelFormat}}
                        </div>
                        <div class="tips"
                             v-else-if="item.industryCategory !==null && item.industryCategory !== '' && item.industryCategory !==undefined && item.industryCategory !=='NULL'"
                             @click="goIndustryByIndustry(item.industryCategory)"
                        >
                          {{item.industryCategory | labelFormat}}
                        </div>
                        <div class="tips"
                             v-else="item.countryCategory !==null && item.countryCategory !== '' && item.countryCategory !==undefined && item.countryCategory !=='NULL'"
                             @click="goIndustryByCountry(item.countryCategory)"
                        >
                          {{item.countryCategory | labelFormat}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="swiper-scrollbar"></div>-->
            </div>
          </div>
          <div class="section2">
            <div class="sectiontabs">
              <div class="headtit">团队</div>
            </div>
            <div class="swiper-container section-swiper orther_swiper" id="partnerSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="col4" v-for="partner in project.partner">
                    <div class="item">
                      <img :src="partner.image">
                      <p class="name">{{partner.h3}}</p>
                      <p class="posi">{{partner.h4}}</p>
                      <div class="i" :class="partner.linkin?'on':''">
                        <a :href="partner.linkin" target="_blank">
                          <i class="fa fa-linkedin"></i>
                        </a>
                      </div>
                      <!--<div class="i"><a :href="partner.u"><i class="fa fa-linkedin"></i></a></div>-->
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="swiper-scrollbar"></div>-->
            </div>
          </div>
          <div class="section3">
            <div class="sectiontabs">
              <div class="headtit">项目信息</div>
            </div>
            <div class="infohead">
              <div class="left">
                <img src="../assets/project/head.png">
                <div class="info">
                  <p class="num">{{project.totalScore | showTatolCore}}</p>
                  <!--<p>{{project.experts}}位专家评级</p>-->
                </div>
              </div>
              <div class="right">
                <div class="numitem">
                  <p class="num">{{project.teamScore | showTatolCore}}</p>
                  <p>团队评分</p>
                </div>
                <div class="numitem">
                  <p class="num">{{project.fundamentalScore | showTatolCore }}</p>
                  <p>基本面</p>
                </div>
                <div class="numitem">
                  <p class="num">{{project.marketScore | showTatolCore}}</p>
                  <p>市场</p>
                </div>
                <div class="numitem">
                  <p class="num">{{project.fundSupervisionScore | showTatolCore}}</p>
                  <p>资金监管</p>
                </div>
                <div class="numitem">
                  <p class="num">{{project.technicalAnalysisScore |showTatolCore }}</p>
                  <p>技术</p>
                </div>
              </div>
            </div>
            <div class="swiper-container section-swiper orther_swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="col4" v-if="project.preICOStartDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x1.png"></div>
                      <div class="right">
                        <p class="tit">开始时间</p>
                        <p class="time">{{project.preICOStartDate}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.preICOEndDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x2.png"></div>
                      <div class="right">
                        <p class="tit">结束时间</p>
                        <p class="time">{{project.preICOEndDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.token">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x3.png"></div>
                      <div class="right">
                        <p class="tit">代币</p>
                        <p class="time">{{project.token }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.price">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x4.png"></div>
                      <div class="right">
                        <p class="tit">价格</p>
                        <p class="time price">{{project.price }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.bonus">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x5.png"></div>
                      <div class="right">
                        <p class="tit">花红</p>
                        <p class="time">{{project.bonus }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.bounty">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x6.png"></div>
                      <div class="right">
                        <p class="tit">奖励金</p>
                        <p class="time">{{project.bounty }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.platform">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x7.png"></div>
                      <div class="right">
                        <p class="tit">平台</p>
                        <p class="time">{{project.platform }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.accepting">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x8.png"></div>
                      <div class="right">
                        <p class="tit">接受投资的币种</p>
                        <p class="time">{{project.accepting }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.softCap">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x9.png"></div>
                      <div class="right">
                        <p class="tit">启动最小值</p>
                        <p class="time">{{project.softCap }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.hardCap">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x10.png"></div>
                      <div class="right">
                        <p class="tit">启动最大值</p>
                        <p class="time">{{project.hardCap }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.country">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x11.png"></div>
                      <div class="right">
                        <p class="tit">所属国家</p>
                        <p class="time">{{project.country }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.whiteListKYC">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x12.png"></div>
                      <div class="right">
                        <p class="tit">名单</p>
                        <p class="time">{{project.whiteListKYC }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.restrictAreas">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x13.png"></div>
                      <div class="right">
                        <p class="tit">限制区域</p>
                        <p class="time">{{project.restrictAreas }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.minimumInvestment">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x14.png"></div>
                      <div class="right">
                        <p class="tit">单笔交易最低额度</p>
                        <p class="time">{{project.minimumInvestment }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.pricePreICO">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x15.png"></div>
                      <div class="right">
                        <p class="tit">PREICO价格</p>
                        <p class="time price">{{project.pricePreICO }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.priceICO">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x15.png"></div>
                      <div class="right">
                        <p class="tit">ICO价格</p>
                        <p class="time price">{{project.priceICO }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.preICOStartDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x16.png"></div>
                      <div class="right">
                        <p class="tit">PREICO开始日期</p>
                        <p class="time">{{project.preICOStartDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.preICOEndDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x17.png"></div>
                      <div class="right">
                        <p class="tit">PREICO截止日期</p>
                        <p class="time">{{project.preICOEndDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.icoStartDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x16.png"></div>
                      <div class="right">
                        <p class="tit">ICO开始日期</p>
                        <p class="time">{{project.icoStartDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.icoEndDate">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x17.png"></div>
                      <div class="right">
                        <p class="tit">ICO截止日期</p>
                        <p class="time">{{project.icoEndDate }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col4" v-if="project.baishupi">
                    <div class="item">
                      <div class="left"><img src="../assets/project/x18.png"></div>
                      <div class="right">
                        <p class="tit">白皮书原创度</p>
                        <p class="time">{{project.baishupi}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="swiper-scrollbar"></div>-->
            </div>
          </div>
          <div class="section4">
            <div class="sectiontabs">
              <a href="javascript:;" :class="atvTwitterOrWeibo==1?'active':''"
                 @click.stop="iniTwitterOrWeibo(project.project,'290002') , atvTwitterOrWeibo=1 , showIcon = nicon ,TWewOrGrade = '290004',TWewOrGradeNo=2">推文</a>
              <a href="javascript:;" :class="atvTwitterOrWeibo==2?'active':''"
                 @click.stop="iniTwitterOrWeibo(project.project,'290004') , atvTwitterOrWeibo=2 , showIcon = weibo,TWewOrGrade = '290004',TWewOrGradeNo=2">微博</a>
            </div>
            <div class="swiper-container section-swiper" id="twitterOrWeiboSwiper">
              <div class="loading_box" v-if="showLoading2">
                <img style="width: 50px" :src="loading"/>
              </div>
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="item" v-for="item in TwitterOrWeibo">
                    <div class="left TorW">
                      <img :src="showIcon"/>
                      <span class="day">{{item.urlDate }}</span>
                    </div>
                    <div class="right">
                      <p class="des" @click="goArticle('/article',{sid:item.sid})">{{item.content }}</p>
                      <div class="bottom">
                        <span class="name">{{item.author}}</span>
                        <span class="time">{{item.urlTime}}</span>
                        <span class="tips"
                              v-if="item.projectCategory !==null && item.projectCategory !== '' && item.projectCategory !==undefined && item.projectCategory !=='NULL'"
                              @click="goProjectByName(item.projectCategory)"
                        >
                          {{item.projectCategory | labelFormat}}
                        </span>
                        <span class="tips"
                              v-else-if="item.industryCategory !==null && item.industryCategory !== '' && item.industryCategory !==undefined && item.industryCategory !=='NULL'"
                              @click="goIndustryByIndustry(item.industryCategory)"
                        >
                          {{item.industryCategory | labelFormat}}
                        </span>
                        <span class="tips"
                              v-else="item.countryCategory !==null && item.countryCategory !== '' && item.countryCategory !==undefined && item.countryCategory !=='NULL'"
                              @click="goIndustryByCountry(item.countryCategory)"
                        >
                          {{item.countryCategory | labelFormat}}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="swiper-scrollbar"></div>-->
            </div>
          </div>
        </div>
        <div class="rightlayout">
          <div class="section5">
            <div class="rightlayouthead">FOLLOW US</div>
            <div class="swiper-container section-swiper orther_swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="col4" v-if="project.outerFaceBook">
                    <a :href="project.outerFaceBook  ">
                      <div class="item">
                        <img src="../assets/project/f1.png">
                        <p>Facebook</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerTwitter">
                    <a :href="project.outerTwitter ">
                      <div class="item">
                        <img src="../assets/project/f2.png">
                        <p>Twitter</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerTelegram">
                    <a :href="project.outerTelegram ">
                      <div class="item">
                        <img src="../assets/project/f3.png">
                        <p>telegram</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerBitCoinTalk">
                    <a :href="project.outerBitCoinTalk ">
                      <div class="item">
                        <img src="../assets/project/f4.png">
                        <p>bitcointalk</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerDiscord">
                    <a :href="project.outerDiscord ">
                      <div class="item">
                        <img src="../assets/project/f5.png">
                        <p>Discord</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerGitHub">
                    <a :href="project.outerGitHub ">
                      <div class="item">
                        <img src="../assets/project/f6.png">
                        <p>Github</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerInstagram">
                    <a :href="project.outerInstagram ">
                      <div class="item">
                        <img src="../assets/project/f7.png">
                        <p>Instagram</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerMedium">
                    <a :href="project.outerMedium ">
                      <div class="item">
                        <img src="../assets/project/f8.png">
                        <p>Medium</p>
                      </div>
                    </a>
                  </div>
                  <div class="col4" v-if="project.outerReddit">
                    <a :href="project.outerReddit ">
                      <div class="item">
                        <img src="../assets/project/f9.png">
                        <p>reddit</p>
                      </div>
                    </a>
                  </div>

                </div>
              </div>
              <!--<div class="swiper-scrollbar"></div>-->
            </div>
            <div class="swiper-container advert-swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../assets/project/advert.jpg"></div>
                <div class="swiper-slide"><img src="../assets/project/advert.jpg"></div>
                <div class="swiper-slide"><img src="../assets/project/advert.jpg"></div>
              </div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-prev"><i class="fa fa-angle-left"></i></div>
              <div class="swiper-button-next"><i class="fa fa-angle-right"></i></div>
            </div>
          </div>
          <div class="section6" v-if="recommendProjects">
            <div class="rightlayouthead">项目推荐</div>
            <div class="item" v-for="project in recommendProjects">
              <router-link :to="'/project?sid='+project.sid">
                <div class="ibanner"><img src="../assets/project/recommend-banner.jpg"></div>
                <div class="info">
                  <div class="left"><img :src="project.logoSrc"></div>
                  <div class="right">
                    <div class="head">
                      <p class="tit">{{project.project}}</p>
                      <p class="smtit">{{project.introduction}}</p>
                    </div>
                    <p class="num">{{project.totalScore | showTatolCore}} <i class="fa fa-angle-right"></i></p>
                  </div>
                </div>
              </router-link>
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

  let loading = require('../assets/login/loading.gif');
  let nicon = require('../assets/home/tuite.png');
  let weibo = require('../assets/home/weibo.png');
  let banner = require('../assets/project/probanner.jpg');

  export default {
    data() {
      return {
        isFollow: false,
        project: {},
        NewOrGrade: [],
        TwitterOrWeibo: [],
        atvNewOrGrade: 1,
        atvTwitterOrWeibo: 1,
        loading: loading,
        showLoading1: true,
        showLoading2: true,
        nicon: nicon,
        weibo: weibo,
        showIcon: nicon,
        recommendProjects: {},
        newSwiper: {},
        tWSwiper: {},
        NewOrGradeNo: 2,
        NGewOrGrade: '290001',
        TWewOrGradeNo: 2,
        TWewOrGrade: '290002',
        banner: banner
      }
    },
    mounted() {
      let that = this;
      new Swiper('.orther_swiper', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        observer: true,
        observeParents: true
      });
      new Swiper('.advert-swiper', {
        autoplay: {
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true,
        observeParents: true,
      });
      this.initProject();
      this.scrollNewOrGrade();
      this.scrollTWewOrGrade();
    },
    filters: {
      showTatolCore(obj) {
        let num = parseFloat(obj).toFixed(2) + '';
        console.log(num);
        if (num === '0.00') {
          num = 0
        }
        return num;
      },
      showDay(obj) {
        let myDate = new Date(obj);
        let day = myDate.getDate()
        if (day < 9) {
          day = '0' + (day + 1)
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
      '$route': 'initProject'
    },
    methods: {
      scrollNewOrGrade() {
        let $this = document.getElementById('newOrGradeSwiper');
        let finished = true;
        $this.addEventListener('scroll', () => {
          let boxTop = $this.scrollTop;
          let boxHeight = $this.scrollHeight;
          let offsetHeight = $this.offsetHeight;
          if ((boxTop / (boxHeight - offsetHeight) >= 0.90) && finished) {
            finished = false;
            let that = this;
            that.$axios.get('/api/traditional/news?searchBy=' + that.project.project + '&categoryId=' + that.NGewOrGrade + '&pageNo=' + that.NewOrGradeNo).then(function (res) {
              that.NewOrGradeNo++;
              if (res.data.content.length < 10) {

              }
              for (let i = 0; i < res.data.content.length; i++) {
                that.NewOrGrade.push(res.data.content[i])
              }
              finished = true;
            });
          }
        });
      },
      scrollTWewOrGrade() {
        let $this = document.getElementById('twitterOrWeiboSwiper');
        let finished = true;
        $this.addEventListener('scroll', () => {
          let boxTop = $this.scrollTop;
          let boxHeight = $this.scrollHeight;
          let offsetHeight = $this.offsetHeight;
          if ((boxTop / (boxHeight - offsetHeight) >= 0.90) && finished) {
            finished = false;
            let that = this;
            that.$axios.get('/api/traditional/news?searchBy=' + that.project.project + '&categoryId=' + that.TWewOrGrade + '&pageNo=' + that.TWewOrGradeNo).then(function (res) {
              that.TWewOrGradeNo++;
              for (let i = 0; i < res.data.content.length; i++) {
                that.TwitterOrWeibo.push(res.data.content[i])
              }
              finished = true;
            });
          }
        });
      },
      setFollow() {
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/api/individual/add?type=ICO&sid=' + that.project.sid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.initProject();
            }
          })
        } else {
          alert('请先登录');
        }
      },
      deleteFollow(cid) {
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/api/individual/delete?cid=' + cid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'DELETE',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.isFollow = false
            }

          })
        } else {
          alert('请先登录。')
        }
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
      goArticle(url, query) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');
      },
      initProject() {
        let path = this.$route.path;
        if (path === '/project') {
          let that = this;
          let sid = this.$route.query.sid;
          let project = this.$route.query.project;
          if (sid != null && sid !== '' && sid !== undefined) {
            let uid = localStorage.getItem('apelink_user_uid')
            let url = '/api/ICO/id/' + sid;
            let headers = {'uid': uid};
            that.$axios({
              method: 'get',
              url: url,
              headers: headers
            }).then(function (res) {
              that.project = res.data;
              let partner = that.project.partner;
              partner = JSON.parse(partner);
              that.project.partner = partner;
              that.$nextTick(() => {  // 下一个UI帧再初始化swiper
                new Swiper('#partnerSwiper', {
                  direction: 'vertical',
                  slidesPerView: 'auto',
                  freeMode: true,
                  scrollbar: {
                    el: '.swiper-scrollbar',
                  },
                  mousewheel: true,
                  observer: true,
                  observeParents: true
                });
              });
              if (that.project.collected) {
                that.isFollow = true
              } else {
                that.isFollow = false
              }
              that.iniNewOrGrade(that.project.project, '290001');
              that.iniTwitterOrWeibo(that.project.project, '290002');
              let categoryNameList = that.project.industryCategory;
              if (categoryNameList != null && categoryNameList !== '' && categoryNameList !== undefined) {
                let arr = categoryNameList.split(';');
                let categoryName = arr[0];
                that.initRecommendProjects(categoryName);
              }
            });
          } else if (project != null && project !== '' && project !== undefined) {
            let uid = localStorage.getItem('apelink_user_uid')
            let url = '/api/ICO/name/' + project;
            let headers = {'uid': uid};
            that.$axios({
              method: 'get',
              url: url,
              headers: headers
            }).then(function (res) {
              that.project = res.data;
              let partner = that.project.partner;
              partner = JSON.parse(partner);
              that.project.partner = partner;
              that.$nextTick(() => {  // 下一个UI帧再初始化swiper
                new Swiper('#partnerSwiper', {
                  direction: 'vertical',
                  slidesPerView: 'auto',
                  freeMode: true,
                  scrollbar: {
                    el: '.swiper-scrollbar',
                  },
                  mousewheel: true,
                  observer: true,
                  observeParents: true
                });
              });
              if (that.project.collected) {
                that.isFollow = true
              } else {
                that.isFollow = false
              }
              that.iniNewOrGrade(that.project.project, '290001');
              that.iniTwitterOrWeibo(that.project.project, '290002');
              let categoryNameList = that.project.industryCategory;
              if (categoryNameList != null && categoryNameList !== '' && categoryNameList !== undefined) {
                let arr = categoryNameList.split(';');
                let categoryName = arr[0];
                that.initRecommendProjects(categoryName);
              }
            });
          } else {
            // that.$router.push('/index')
          }
        }
      },
      iniNewOrGrade(projectName, categoryId) {
        this.NewOrGrade = []
        this.showLoading1 = true;
        let that = this;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId).then(function (res) {
          that.NewOrGrade = res.data.content;
          that.showLoading1 = false;
        })
      },
      iniTwitterOrWeibo(projectName, categoryId) {
        this.TwitterOrWeibo = []
        this.showLoading2 = true;
        let that = this;
        that.$axios.get('/api/traditional/news?searchBy=' + projectName + '&categoryId=' + categoryId).then(function (res) {
          that.TwitterOrWeibo = res.data.content;
          that.showLoading2 = false;
        })
      },
      initRecommendProjects(categoryName) {
        let that = this;
        that.$axios.get('/api/ICO/relatedICO?categoryName=' + categoryName).then(function (res) {
          that.recommendProjects = res.data
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

