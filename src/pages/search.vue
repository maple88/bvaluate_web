<template>
  <div class="page search_page">
    <vheader/>
    <div class="maintainer">
      <div class="search_div">
        <div class="fish_container">
          <div class="search_box">
            <div class="left">
              <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="searchType" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                  {{search.class}}
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li><a href="javascript:void(0);" @click="changSearchClass('文章')">文章</a></li>
                  <li><a href="javascript:void(0);" @click="changSearchClass('项目')">项目</a></li>
                </ul>
              </div>
            </div>
            <div class="center">
              <input type="text" v-model="search.keyword" class="search_input" @keyup.enter="searchKeyWord">
            </div>
            <div class="right">
              <button class="search_submit" @click="searchKeyWord()">
                <img src="../assets/search/search.png" alt="search"/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="label_div" v-if="search.show">
        <div class="fish_container">
          <div class="label_box">
            <a href="javascript:void(0);" :class="search.type === 'NEWS'?'active':''" @click="changeType('NEWS')">新闻</a>
            <a href="javascript:void(0);" :class="search.type === 'WEIXIN'?'active':''"
               @click="changeType('WEIXIN')">微信</a>
            <a href="javascript:void(0);" :class="search.type === 'WEIBO'?'active':''"
               @click="changeType('WEIBO')">微博</a>
            <a href="javascript:void(0);" :class="search.type === 'TWITTER'?'active':''" @click="changeType('TWITTER')">Twitter</a>
          </div>
        </div>
      </div>
      <div class="follow_content serach_content" :class="!search.show?'margin_top90':''">
        <div class="fish_container">
          <div class="clearfix">
            <div class="center" v-if="search.show">
              <div class="follow_list serach_follow_list">
                <ul>
                  <li>
                    <div class="list-item">
                      <div class="medialist">
                        <div class="media" v-for="news in newsList">
                          <div class="media-left media-middle"
                               v-if="news.dataType === 'NEWS'||news.dataType === 'WEIXIN'">
                            <div class="newimg_box" @click="goArticle('/article',{sid:news.sid})">
                              <img v-if="news.titlePicture" :src="news.titlePicture"/>
                              <div class="date_box">
                                <span class="day">{{news.urlTime | showDay}}</span>
                                <span class="years">{{news.urlTime | showYear}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="media-left media-middle"
                               v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'">
                            <div class="newimg_box TorW" @click="goArticle('/article',{sid:news.sid})">
                              <img :src="news.dataType === 'WEIBO'?weibo:tuiwen"/>
                              <span class="day">{{news.urlDate }}</span>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading" :title="news.title" @click="goArticle('/article',{sid:news.sid})"
                                v-if="!(news.dataType === 'WEIBO' || news.dataType === 'TWITTER')" v-html="news.title ">
                            </h4>
                            <p class="media-words TorW" v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'"
                               @click="goArticle('/article',{sid:news.sid})" v-html="news.content ">
                            </p>
                            <p class=" media-words" v-else v-html="news.content ">
                            </p>
                            <div class="media-bottom">
                              <ul>
                                <li
                                  v-if="!(news.siteName !== 'NULL' && news.siteName !== null && news.siteName !== '')"
                                  @click="goArticle('/author',{author: news.author,type: 'author'})">
                                  <div class="userimg">
                                    <img src="../assets/follow/user_head.png">
                                  </div>
                                  {{news.author}}
                                </li>
                                <li v-else @click="goArticle('/author',{author: news.siteName,type: 'siteName'})">
                                  {{news.siteName}}
                                </li>
                                <li>{{news.urlTime}}</li>
                              </ul>
                              <div class="tips"
                                   v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL'"
                                   @click="goProjectByName(news.projectCategory)"
                              >
                                {{news.projectCategory | labelFormat}}
                              </div>
                              <div class="tips"
                                   v-else-if="news.industryCategory !==null && news.industryCategory !== '' && news.industryCategory !==undefined && news.industryCategory !=='NULL'"
                                   @click="goIndustryByIndustry(news.industryCategory)"
                              >
                                {{news.industryCategory | labelFormat}}
                              </div>
                              <div class="tips"
                                   v-else="news.countryCategory !==null && news.countryCategory !== '' && news.countryCategory !==undefined && news.countryCategory !=='NULL'"
                                   @click="goIndustryByCountry(news.countryCategory)"
                              >
                                {{news.countryCategory | labelFormat}}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="loading_more">
                <p class="loading_more_tip" v-if="showloading===-1">{{loadingTip}}~</p>
                <button :disabled="showloading" @click.stop="loadMoreNews" v-if="!(showloading===-1)">
                  <img v-if="showloading" :src="loading"/>
                  <span v-if="!showloading">加载更多</span>
                </button>
              </div>
            </div>
            <div class="center" v-if="!search.show">
              <div class="follow_list serach_follow_list">
                <div class="project_list_box" v-for="project in projectList">
                  <div class="project_info">
                    <div class="left">
                      <div class="logo_box" @click="goProjectById(project.sid)">
                        <img :src="project.logoSrc"/>
                      </div>
                    </div>
                    <div class="right">
                      <div class="base_info">
                        <div class="left">
                          <h4>
                            <span v-html="project.project" @click="goProjectById(project.sid)"></span>
                            <i class="fa fa-heart-o" v-if="!project.collected" @click="setFollow(project)"></i>
                            <i class="fa fa-heart" v-else></i>
                          </h4>
                          <p v-html="project.introduction"></p>
                        </div>
                        <div class="right">
                          <h4>{{project.totalScore }}</h4>
                          <p>总分</p>
                        </div>
                      </div>
                      <div class="detail_info">
                        <p v-html="project.irAbstract"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="loading_more">
                <p class="loading_more_tip" v-if="showloading===-1">{{loadingTip}}~</p>
                <button :disabled="showloading" @click.stop="loadMoreICO" v-if="!(showloading===-1)">
                  <img v-if="showloading" :src="loading"/>
                  <span v-if="!showloading">加载更多</span>
                </button>
              </div>
            </div>
            <div class="right">
              <div class="right_item">
                <div class="hot_title">
                  <div class="title_icon">
                    <img src="../assets/follow/news_flash.png"/>
                  </div>
                  <h4>快讯</h4>
                </div>
                <div class="hot_content">
                  <ul class="scoll_style" id="scoll_scoll_style">
                    <li class="news_flash" v-for="(flash,index) in flashList">
                      <div class="news_item">
                        <div class="radio_box">
                          <div class="radio_circle" :class="index===0?'first':''"></div>
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
                  <ul class="long_ul">
                    <li class="news_flash" v-for="(affair,index) in affairList">
                      <div class="news_item nolink">
                        <div class="radio_box">
                          <div class="radio_circle" :class="index === 0 ? 'first':''"></div>
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
          </div>
        </div>
      </div>
      <vfooter/>
    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper';

  let img1 = require('../assets/follow/banner01.png');
  let img2 = require('../assets/follow/adv01.png');
  let img3 = require('../assets/media.jpg');
  let loading = require('../assets/login/loading.gif');
  let tuiwen = require('../assets/home/tuite.png');
  let weibo = require('../assets/home/weibo.png');


  export default {
    data() {
      return {
        colorList: ['red', 'yellow', 'gray', 'pink'],
        banner1: img1,
        img2: img2,
        img3: img3,
        labelMore: false,
        search: {
          class: '文章',
          type: 'NEWS',
          keyword: '',
          pageNo: 0,
          show: true
        },
        loadingTip: '',
        newsList: [],
        projectList: [],
        flashPageSize: 20,
        flashList: [],
        affairList: [],
        loading: loading,
        showloading: true,
        tuiwen: tuiwen,
        weibo: weibo,
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
        //
        if (nowdata - mydata < 7 && nowdata - mydata >= 1) {
          return nowdata - mydata + '天前'
        } else if (nowdata - mydata < 1 && Math.abs(myhour - nowhour) >= 1 && Math.abs(myhour - nowhour) < 24) {
          return Math.abs(myhour - nowhour) + '小时前'
        } else if (Math.abs(myhour - nowhour) < 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) >= 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) < 60) {
          return Math.abs(myDate.getMinutes() - nowDate.getMinutes()) + '分钟前'
        } else if (Math.abs(myDate.getMinutes() - nowDate.getMinutes()) < 1) {
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
    mounted() {
      this.initSearch();
      this.searchKeyWord();
      this.initRightNews('快讯', this.flashPageSize, res => {
        this.flashPageSize += 20;
        this.flashList = res;
      });
      this.initRightNews('国家时事', 10, res => {
        this.affairList = res;
      });
      this.scrollFlash();
    },
    activated() {
      this.initSearch();
      this.searchKeyWord();
      this.initRightNews('快讯', this.flashPageSize, res => {
        this.flashPageSize += 20;
        this.flashList = res;
      });
      this.initRightNews('国家时事', 10, res => {
        this.affairList = res;
      });
      this.scrollFlash();
    },
    beforeRouteUpdate(to, from, next) {
      let keyword = to.query.keyword;
      let searchType = to.query.searchType;
      this.search.class = searchType;
      this.search.keyword = keyword;
      this.searchKeyWord();
      next();
    },
    methods: {
      init() {
        this.initSearch();
        this.searchKeyWord();
      },
      //根据项目id跳转到对应的项目页
      goProjectById(sid) {
        let routeData = this.$router.resolve({path: '/project', query: {sid: sid}});
        window.open(routeData.href, '_blank');
      },
      //初始化搜索页
      initSearch() {
        this.search.class = this.$route.query.searchType;
        this.search.keyword = this.$route.query.keyword;
      },
      //关注
      setFollow(project) {
        let that = this;
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/api/individual/add?type=ICO&sid=' + project.sid;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              alert('关注成功');
              project.collected = true;
            }
          })
        } else {
          alert('请先登录');
        }
      },

      replaceAll(text, FindText, RepText) {
        let regExp = new RegExp(FindText, "g");
        return text.replace(regExp, RepText);
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
        let routeData = this.$router.resolve({path: '/newsList', query: {industry: obj}});
        window.open(routeData.href, '_blank');
      },
      goIndustryByCountry(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {country: obj}});
        window.open(routeData.href, '_blank');
      },
      goArticle(url, query) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');
      },
      goUrl(url, query) {
        this.$router.push({path: url, query: query});
      },
      changeType(type) {
        this.search.type = type;
        this.searchKeyWord();
      },
      changSearchClass(name) {
        this.search.class = name;
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
      scrollFlash() {
        let $this = document.getElementById('scoll_scoll_style');
        let finished = true;
        $this.addEventListener('scroll', () => {
          let boxTop = $this.scrollTop;
          let boxHeight = $this.scrollHeight;
          let offsetHeight = $this.offsetHeight;
          if ((boxTop / (boxHeight - offsetHeight) >= 0.80) && finished) {
            finished = false;
            this.initRightNews('快讯', this.flashPageSize, res => {
              this.flashPageSize += 20;
              this.flashList = res;
              finished = true;
            });
          }
        });
      },
      searchKeyWord() {
        this.showloading = true;
        this.newsList = [];
        this.search.pageNo = 0;
        if (this.search.class === '文章') {
          this.search.show = true;
          this.$axios.get('/api/traditional/search?newsType=' + this.search.type + '&search=' + this.search.keyword + '&pageNo=' + this.search.pageNo + '&pageSize=20').then(res => {
            this.showloading = false;
            let allData = res.data.content;
            for (let i = 0; i < allData.length; i++) {
              allData[i].title = this.replaceAll(allData[i].title, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
              allData[i].content = this.replaceAll(allData[i].content, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
            }
            this.newsList = allData;
            if (res.data.content.length <= 0) {
              this.showloading = -1;
              this.loadingTip = '无搜索结果~';
            }
          });
        } else if (this.search.class === '项目') {
          this.search.show = false;
          let uid = localStorage.getItem('apelink_user_uid');
          this.$axios.get('/api/ICO/search?search=' + this.search.keyword + '&pageNo=' + this.search.pageNo + '&pageSize=20', {
            headers: {uid: uid}
          }).then(res => {
            this.showloading = false;
            let allData = res.data.content;
            for (let i = 0; i < allData.length; i++) {
              allData[i].introduction = this.replaceAll(allData[i].introduction, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
              allData[i].project = this.replaceAll(allData[i].project, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
              allData[i].irAbstract = this.replaceAll(allData[i].irAbstract, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
            }
            this.projectList = res.data.content;
            if (res.data.content.length <= 0) {
              this.showloading = -1;
              this.loadingTip = '无搜索结果~';
            }
          });
        }
      },
      loadMoreNews() {
        this.showloading = true;
        this.search.pageNo++;
        this.$axios.get('/api/traditional/search?newsType=' + this.search.type + '&search=' + this.search.keyword + '&pageNo=' + this.search.pageNo + '&pageSize=20').then(res => {
          this.showloading = false;
          let allData = res.data.content;
          for (let i = 0; i < allData.length; i++) {
            allData[i].title = this.replaceAll(allData[i].title, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
            allData[i].content = this.replaceAll(allData[i].content, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
          }
          this.newsList = this.newsList.concat(allData);
          if (res.data.content.length < 20) {
            this.showloading = -1;
            this.loadingTip = '无更多数据~';
          }
        });
      },
      loadMoreICO() {
        this.showloading = true;
        this.search.pageNo++;
        this.$axios.get('/api/ICO/search?search=' + this.search.keyword + '&pageNo=' + this.search.pageNo + '&pageSize=20').then(res => {
          this.showloading = false;
          let allData = res.data.content;
          for (let i = 0; i < allData.length; i++) {
            allData[i].introduction = this.replaceAll(allData[i].introduction, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
            allData[i].project = this.replaceAll(allData[i].project, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
            allData[i].irAbstract = this.replaceAll(allData[i].irAbstract, this.search.keyword, '<font color="red">' + this.search.keyword + '</font>');
          }
          this.projectList = this.projectList.concat(allData);
          if (res.data.content.length < 20) {
            this.showloading = -1;
            this.loadingTip = '无更多数据~';
          }
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

