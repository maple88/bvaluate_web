<template>
  <div class="page search_page">
    <v2header/>
    <div class="v2maintainer">
      <div class="follow_content serach_content">
        <div class="container v2container">
          <div class="clearfix">
            <div class="center">
              <div class="follow_list serach_follow_list">
                <div class="label_box">
                  <a name="search_label_box_xinwen" id="search_label_box_xinwen" data="新闻" href="javascript:void(0);" :class="search.type === 'NEWS'?'active':''" @click="changeType('NEWS')">{{$t('News')}}</a>
                  <a name="search_label_box_Twitter" id="search_label_box_Twitter" data="Twitter" href="javascript:void(0);" :class="search.type === 'TWITTER'?'active':''" @click="changeType('TWITTER')">{{$t('Twitter')}}</a>
                  <a name="search_label_box_weibo" id="search_label_box_weibo" data="微博" href="javascript:void(0);" :class="search.type === 'WEIBO'?'active':''"
                  @click="changeType('WEIBO')">{{$t('Microblog')}}</a>
                  <a name="search_label_box_weixin" id="search_label_box_weixin" data="微信" href="javascript:void(0);" :class="search.type === 'WEIXIN'?'active':''"
                  @click="changeType('WEIXIN')">{{$t('WeChat')}}</a>
                </div>
                <ul v-if="search.show">
                  <li>
                    <div class="list-item">
                      <div class="medialist">
                        <div class="media" v-for="(news, index) in newsList" :key="index">
                          <div class="media-left media-middle"
                               v-if="news.dataType === 'NEWS' || news.dataType === 'WEIXIN'">
                            <div class="newimg_box" :data="news.title" 
                            :name="'search_newimg_box_title_'+index" :id="'search_newimg_box_title_'+index" 
                            @click="goArticle('/article',{sid:news.sid}, $event), 
                            trackArticle('搜索页', news.title, '搜索页的文章没有项目名称', '搜索页的文章没有项目ID', search.type, news.sid)">
                              <img :src="news.titlePicture===''||news.titlePicture===null?newsimg:news.titlePicture"/>
                              <span class="time" v-if="!news.titlePicture">{{news.urlDate | formatTime}}</span>
                            </div>
                          </div>
                          <div class="media-left media-middle"
                               v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'">
                            <div class="newimg_box" :data="news.title" 
                            :name="'search_newimg_boxTorW_title_'+index" :id="'search_newimg_boxTorW_title_'+index" 
                            @click="goArticle('/article',{sid:news.sid}, $event), 
                            trackArticle('搜索页', news.title, '搜索页的文章没有项目名称', '搜索页的文章没有项目ID', search.type, news.sid)">
                              <img :src="news.dataType === 'WEIBO'?weibo:tuiwen"/>
                              <span class="time">{{news.urlDate | formatTime}}</span>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading" v-if="!(news.dataType === 'WEIBO' || news.dataType === 'TWITTER')">
                              <span class="tips"
                              :name="'search_tips_projectCategory_'+index" :id="'search_tips_projectCategory_'+index" 
                              v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL' && news.dataType !== 'WEIBO' && news.dataType !== 'TWITTER'"
                              @click="goProjectByName(news.projectCategory, $event), trackProject('搜索页文章的项目标签', news.projectCategory, '搜索页文章的项目标签没有项目ID', '搜索页文章的项目标签没有排行榜位置', '搜索页文章的项目标签没有项目总分')"
                              :data="news.projectCategory"
                              >
                                {{news.projectCategory | labelFormat}}
                              </span>
                              <span class="tit" :data="news.title" :title="news.title" 
                              :name="'search_media-heading_title_'+index" :id="'search_media-heading_title_'+index" 
                              @click="goArticle('/article',{sid:news.sid}, $event), 
                              trackArticle('搜索页', news.title, '搜索页的文章没有项目名称', '搜索页的文章没有项目ID', search.type, news.sid)"
                              v-html="news.title"></span>
                            </h4>
                            <p class="media-words TorW" v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'" >
                              <span class="tips"
                              :name="'search_tips_projectCategory_'+index" :id="'search_tips_projectCategory_'+index" 
                              v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL'"
                              @click="goProjectByName(news.projectCategory, $event), trackProject('搜索页文章的项目标签', news.projectCategory, '搜索页文章的项目标签没有项目ID', '搜索页文章的项目标签没有排行榜位置', '搜索页文章的项目标签没有项目总分')"
                              :data="news.projectCategory"
                              >
                                {{news.projectCategory | labelFormat}}
                              </span>
                              <span :data="news.content" v-html="news.content" 
                              :name="'search_media-wordsTorW_content_'+index" :id="'search_media-wordsTorW_content_'+index" 
                              @click="goArticle('/article',{sid:news.sid}, $event), 
                              trackArticle('搜索页', news.content, '搜索页的文章没有项目名称', '搜索页的文章没有项目ID', search.type, news.sid)"></span>
                            </p>
                            <p class="media-words" v-else v-html="news.content">
                            </p>
                            <div class="media-bottom">
                              <ul>
                                <li
                                  v-if="!(news.siteName !== 'NULL' && news.siteName !== null && news.siteName !== '')"
                                  :name="'search_media-bottom_author_'+index" :id="'search_media-bottom_author_'+index" 
                                  @click="goArticle('/author',{author: news.author,type: 'author'}, $event)" :data="news.author">
                                  {{news.author}}
                                </li>
                                <li v-else :name="'search_media-bottom_siteName_'+index" :id="'search_media-bottom_siteName_'+index"  :data="news.siteName" @click="goArticle('/author',{author: news.siteName,type: 'siteName'}, $event)">
                                  {{news.siteName}}
                                </li>
                                <li>{{news.urlTime}}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div class="loading_more">
                    <p class="loading_more_tip" v-if="showloading===-1">{{loadingTip}}~</p>
                    <button :disabled="showloading" data="加载更多" value="加载更多" name="loading_more" id="loading_more" @click.stop="loadMoreNews" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">{{$t('Load more')}}</span>
                    </button>
                  </div>
                </ul>
                <div v-if="!search.show">
                  <div class="project_list_box" v-for="(project, index) in projectList" :key="index">
                    <div class="project-info">
                      <div class="head">
                        <div class="left">
                          <div class="logo_box" :data="project.project" :name="'search_logo_box_project_'+index" :id="'search_logo_box_project_'+index" @click="goProjectById(project.sid, $event)">
                            <img :src="project.logoSrc"/>
                          </div>
                          <div class="titinfo">
                            <h4>
                              <span v-html="project.project" :name="'search_h4span_project_'+index" :id="'search_h4span_project_'+index" :data="project.project" @click="goProjectById(project.sid, $event)"></span>
                            </h4>
                            <p v-html="project.introduction"></p>
                          </div>
                        </div>
                        <div class="right">
                          <div class="totalScore">
                            <h4>{{project.totalScore }}</h4>
                            <p>{{$t('Total score')}}</p>
                          </div>
                          <div class="follow-btn setFollow" v-if="!project.collected" @click="setFollow(project)">
                            <i class="fa fa-heart-o"></i> <span>{{$t('Focus')}}</span>
                          </div>
                          <div class="follow-btn" v-else>
                            <i class="fa fa-heart-o"></i> <span>{{$t('Followed')}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="detail_info" v-html="project.irAbstract"></div>
                    </div>
                  </div>
                  <div class="loading_more">
                    <p class="loading_more_tip" v-if="showloading===-1">{{loadingTip}}~</p>
                    <button :disabled="showloading" data="加载更多" value="加载更多" name="loading_more" id="loading_more" @click.stop="loadMoreICO" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">{{$t('Load more')}}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="right_item mgb-20">
                <div class="hot_title">
                  <h4>{{$t('News flash')}}</h4>
                </div>
                <div class="hot_content">
                  <ul class="scoll_style" id="scoll_scoll_style">
                    <li class="news_flash" v-for="(flash, index) in flashList" :key="index">
                      <div class="news_item">
                        <div class="radio_box">
                          <div class="radio_circle" :class="index===0?'first':''"></div>
                        </div>
                        <div class="item_time">
                          <span>{{flash.urlTime | dataFormat}}</span>
                        </div>
                        <div class="item_body">
                          <div class="info">
                            <h4 :data="flash.title" :name="'search_item_body_h4_'+index" :id="'search_item_body_h4_'+index" 
                            @click="goArticle('/article',{sid:flash.sid}, $event), 
                            trackArticle('搜索页', flash.title, '搜索页的文章没有项目名称', '搜索页的文章没有项目ID', '快讯', flash.sid)">{{flash.title}}</h4>
                            <p>{{flash.content}}</p>
                          </div>
                          <div class="img-box" v-if="flash.titlePicture" @click="goArticle('/article',{sid:flash.sid}, $event)">
                            <img :src="flash.titlePicture">
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="right_item">
                <div class="hot_title">
                  <h4>{{$t('Recommended project')}}</h4>
                </div>
                <div class="hot_content">
                  <div class="recommend-item" v-for="(project, index) in recommendProjects" :key="index">
                    <router-link :to="'/project?sid='+project.sid" target="_blank" :data="project.project">
                      <div class="left"><img :src="project.logoSrc"></div>
                      <div class="center">
                        <p class="r1">{{project.project}}</p>
                        <p class="r2">{{project.tokenCoin | formatRecommendProjects}}</p>
                        <p class="r3">{{project.introduction}}</p>
                      </div>
                      <div class="right">{{project.totalScore | showTatolCore}}</div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v2footer/>
    </div>

  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import Swiper from 'swiper';

  let img1 = require('../assets/follow/banner01.png');
  let img2 = require('../assets/follow/adv01.png');
  let img3 = require('../assets/media.jpg');
  let loading = require('../assets/login/loading.gif');
  let newsimg = require('../assets/search/news.png');
  let tuiwen = require('../assets/search/twitter.png');
  let weibo = require('../assets/search/weibo.png');


  export default {
    data() {
      return {
        colorList: ['red', 'yellow', 'gray', 'pink'],
        banner1: img1,
        img2: img2,
        img3: img3,
        labelMore: false,
        search: {
          class: '项目',
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
        newsimg: newsimg,
        tuiwen: tuiwen,
        weibo: weibo,
        recommendProjects: [],
        rightNewspageNo: 0
      }
    },
    filters: {
      formatRecommendProjects (val) {
        if (val !== null && val !== '' && val !== undefined) {
          // console.log(val)
          return  '( '+ val +' )';
        }else{
          return '--';
        }
      },
      showTatolCore(obj) {
        let num = parseFloat(obj).toFixed(2) + '';
        // console.log(num);
        if (num === '0.00') {
          num = 0
        }
        return num;
      },
      showDay(obj) {
        let time = obj.replace(/-/g,'/')
        let myDate = new Date(time);
        return myDate.getDate()
      },
      showYear(obj) {
        let time = obj.replace(/-/g,'/')
        let myDate = new Date(time);
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
      },
      formatTime (val) {
        return val.replace(/\//g, "-");
      }
    },
    // mounted() {
    //   this.initSearch();
    //   this.searchKeyWord();
    //   this.initRightNews('快讯', this.flashPageSize, res => {
    //     this.flashPageSize += 20;
    //     this.flashList = res;
    //   });
    //   this.scrollFlash();
    // },
    activated() {
      this.getRecommendProjects();
      this.initSearch();
      this.searchKeyWord();
      this.initRightNews('快讯', this.rightNewspageNo, res => {
        this.rightNewspageNo ++;
        this.flashList = res;
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
      getRecommendProjects () {
        this.$axios.get('http://119.254.68.8:10020/projectList/list?type=周榜&pageNo=0&pageSize=3')
        .then(res=>{
          this.recommendProjects = res.data
        })
      },
      init() {
        this.initSearch();
        this.searchKeyWord();
      },
      trackProject(entrance, name, project_id, index, score) {
        sensors.track('Project', {
          entrance: entrance,
          name: name,
          project_id: project_id,
          rank: index,
          score: score,
          attention_count: '接口没有关注量'
        });
      },
      trackArticle(entrance, article_title, name, project_id, category, article_id) {
        if (category == 'NEWS') {category = '新闻'}
        if (category == 'WEIXIN') {category = '微信'}
        if (category == 'WEIBO') {category = '微博'}
        if (category == 'TWITTER') {category = '推特'}
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
      trackSearch(category, content) {
        // 榜单，项目详情页，关注，个人中心，白皮书分析，行业国家资讯，文章详情，作者, 搜索页面
        sensors.track('Search', {
          entrance: '搜索页面',
          category: category,
          content: content
        });
      },
      //根据项目id跳转到对应的项目页
      goProjectById(sid) {
        let routeData = this.$router.resolve({path: '/project', query: {sid: sid}});
        window.open(routeData.href, '_blank');
      },
      //初始化搜索页
      initSearch() {
        this.search.class = this.$route.query.searchType;
        if (!this.search.class) {
          this.search.class = '项目';
        }
        this.search.keyword = this.$route.query.keyword;
        if (!this.search.keyword) {
          this.showloading = -1;
          this.loadingTip = '无搜索结果~';
          return false;
        }
      },
      //关注
      setFollow(project) {
        let that = this;
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let url = '/individual/add?type=ICO&sid=' + project.sid;
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
      goArticle(url, query, event) {
        let routeData = this.$router.resolve({path: url, query: query});
        sensors.quick('trackHeatMap', event.currentTarget);
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
      initRightNews(categoryName, pageNo, callback) {
        let that = this;
        that.categoryName = categoryName;
        let thisCallback = callback;
        // let url = '/traditional/categoryList?categoryName=' + categoryName + '&pageSize=' + pageSize
        let url = '/traditional/information?newsType=' + categoryName + '&pageNo=' + pageNo + '&pageSize=20';
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
            this.initRightNews('快讯', this.rightNewspageNo, res => {
              this.rightNewspageNo ++;
              this.flashList = this.flashList.concat(res);
              finished = true;
            });
          }
        });
      },
      searchKeyWord() {
        this.showloading = true;
        this.newsList = [];
        this.search.pageNo = 0;
        this.search.show = true;
        this.$axios.get('/traditional/information?newsType=' + this.search.type + '&pageNo=' + this.search.pageNo + '&pageSize=20').then(res => {
          this.showloading = false;
          this.newsList = res.data.content;
          if (res.data.content.length <= 0) {
            this.showloading = -1;
            this.loadingTip = '无更多数据~';
          }
        });
      },
      loadMoreNews() {
        this.showloading = true;
        this.search.pageNo++;
        this.$axios.get('/traditional/information?newsType=' + this.search.type + '&pageNo=' + this.search.pageNo + '&pageSize=20').then(res => {
          this.showloading = false;
          this.newsList = this.newsList.concat(res.data.content);
          if (res.data.content.length < 20) {
            this.showloading = -1;
            this.loadingTip = '无更多数据~';
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

