<template>
  <div class="page search_page">
    <v2header/>
    <div class="v2maintainer">
      <div class="label_div" v-if="search.show">
        <div class="fish_container">
          <div class="label_box newsList_page">
            <a href="javascript:void(0);" :class="'active'">{{industry}}</a>
            <button name="newsList_follow_button" id="newsList_follow_button" 
            class="follow" v-show="!projectFollow" data="关注" @click="setFollow(), trackAttention('', industry)">+ 关注</button>
            <button name="newsList_followed_button" id="newsList_followed_button" 
            class="followed" v-show="projectFollow" data="取消关注" @click="deleteFollow(industry)">已关注</button>
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
                        <div class="media" v-for="(news, index) in newsList" :key="index">
                          <div class="media-left media-middle" v-if="news.dataType === 'NEWS'||news.dataType === 'WEIXIN'">
                            <div class="newimg_box" :data="news.title" 
                            :name="'newsList_newimg_box_img_'+index" :id="'newsList_newimg_box_img_'+index" 
                            @click="goArticle('/article',{sid:news.sid}, $event), 
                            trackArticle('资讯列表页的文章', news.title, '资讯列表页的文章没有项目名称', '资讯列表页的文章没有项目ID', '资讯列表文章', news.sid)">
                              <img v-if="news.titlePicture" :src="news.titlePicture"/>
                              <div class="date_box">
                                <span class="day">{{news.urlTime | showDay}}</span>
                                <span class="years">{{news.urlTime | showYear}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="media-left media-middle" v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'">
                            <div class="newimg_box TorW" :data="news.title" 
                            :name="'newsList_newimg_boxTorW_img_'+index" :id="'newsList_newimg_boxTorW_img_'+index" 
                            @click="goArticle('/article',{sid:news.sid}, $event), 
                            trackArticle('资讯列表页的文章', news.title, '资讯列表页的文章没有项目名称', '资讯列表页的文章没有项目ID', '资讯列表文章', news.sid)">
                              <img :src="news.dataType === 'WEIBO'?weibo:tuiwen"/>
                              <span class="day">{{news.urlDate }}</span>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading" :title="news.title" :data="news.title" 
                            :name="'newsList_media-heading_title_'+index" :id="'newsList_media-heading_title_'+index" 
                            @click="goArticle('/article',{sid:news.sid}, $event), 
                            trackArticle('资讯列表页的文章', news.title, '资讯列表页的文章没有项目名称', '资讯列表页的文章没有项目ID', '资讯列表文章', news.sid)" v-if="!(news.dataType === 'WEIBO' || news.dataType === 'TWITTER')" v-html="news.title">
                            </h4>
                            <p class="media-words TorW" v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'" 
                            :name="'newsList_media-wordsTorW_content_'+index" :id="'newsList_media-wordsTorW_content_'+index" 
                            @click="goArticle('/article',{sid:news.sid}, $event), 
                            trackArticle('资讯列表页的文章', news.title, '资讯列表页的文章没有项目名称', '资讯列表页的文章没有项目ID', '资讯列表文章', news.sid)" v-html="news.content" :data="news.title">
                            </p>
                            <p class=" media-words" v-else v-html="news.content">
                            </p>
                            <div class="media-bottom">
                              <ul>
                                <li
                                  :name="'newsList_media-bottom_userimg_'+index" :id="'newsList_media-bottom_userimg_'+index" 
                                  @click="goArticle('/author',{author: news.author,type: 'author'}, $event)" :data="news.author">
                                  <div class="userimg">
                                    <img src="../assets/follow/user_head.png">
                                  </div>
                                  {{news.author}}
                                </li>
                                <li>{{news.urlTime}}</li>
                              </ul>
                              <div class="tips"
                                   :name="'newsList_tips_projectCategory_'+index" :id="'newsList_tips_projectCategory_'+index" 
                                   v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL'"
                                   @click="goProjectByName(news.projectCategory, $event), trackProject('资讯列表页文章的项目标签', news.projectCategory, '资讯列表页文章的项目标签没有项目ID', '资讯列表页文章的项目标签没有排行榜位置', '资讯列表页文章的项目标签没有项目总分')"
                                   :data="news.projectCategory">
                                {{news.projectCategory | labelFormat}}
                              </div>
                              <div class="tips"
                                   :name="'newsList_tips_industryCategory_'+index" :id="'newsList_tips_industryCategory_'+index" 
                                   v-else-if="news.industryCategory !==null && news.industryCategory !== '' && news.industryCategory !==undefined && news.industryCategory !=='NULL'"
                                   @click="goIndustryByIndustry(news.industryCategory, $event)"
                                   :data="news.industryCategory">
                                {{news.industryCategory | labelFormat}}
                              </div>
                              <div class="tips"
                                   :name="'newsList_tips_countryCategory_'+index" :id="'newsList_tips_countryCategory_'+index" 
                                   v-else="news.countryCategory !==null && news.countryCategory !== '' && news.countryCategory !==undefined && news.countryCategory !=='NULL'"
                                   @click="goIndustryByCountry(news.countryCategory, $event)"
                                   :data="news.countryCategory">
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
                <button :disabled="showloading" data="加载更多" value="加载更多" name="loading_more" id="loading_more" @click.stop="reloadMore(industry,newsType)" v-if="!(showloading===-1)">
                  <img v-if="showloading" :src="loading"/>
                  <span v-if="!showloading">加载更多</span>
                </button>
              </div>
            </div>
            <div class="center" v-if="!search.show">
              <div class="follow_list serach_follow_list">
                <div class="project_list_box" v-for="(project, index) in projectList" :key="index">
                  <div class="project_info">
                    <div class="left">
                      <div class="logo_box" :data="project.project" :name="'newsList_logo_box_'+index" :id="'newsList_logo_box_'+index" @click="goProjectById(project.sid, $event)">
                        <img :src="project.logoSrc"/>
                      </div>
                    </div>
                    <div class="right">
                      <div class="base_info">
                        <div class="left">
                          <h4>
                            <span v-html="project.project" :data="project.project" :name="'newsList_h4span_project_'+index" :id="'newsList_h4span_project_'+index" @click="goProjectById(project.sid, $event)"></span>
                            <i class="fa fa-heart-o" v-if="!project.collected" @click="setFollow(even,project)"></i>
                            <i class="fa fa-heart" v-else></i>
                          </h4>
                          <p>{{project.introduction }} </p>
                        </div>
                        <div class="right">
                          <h4>{{project.totalScore }}</h4>
                          <p>总分</p>
                        </div>
                      </div>
                      <div class="detail_info">
                        <p>{{project.irAbstract }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="loading_more">
                <p class="loading_more_tip" v-if="showloading===-1">{{loadingTip}}~</p>
                <button :disabled="showloading" data="加载更多" value="加载更多" name="loading_more2" id="loading_more2" @click.stop="loadMoreICO" v-if="!(showloading===-1)">
                  <img v-if="showloading" :src="loading"/>
                  <span v-if="!showloading">加载更多</span>
                </button>
              </div>
            </div>
            <div class="right">
              <div class="right_item">
                <div class="hot_title">
                  <div class="title_icon">
                    <img src="../assets/follow/hot_text.png"/>
                  </div>
                  <h4>24小时热文</h4>
                </div>
                <div class="hot_content">
                  <ul class="long_ul">
                    <li v-for="(item, index) in hotNews" :key="item.sid">
                      <div class="list_item">
                        <div class="item_left" v-if="item.titlePicture">
                          <img :src="item.titlePicture"/>
                        </div>
                        <div class="item_body" :class="item.titlePicture?'':'noPicture'">
                          <h4 :data="item.title" 
                          :name="'newsList_item_body_h4_'+index" :id="'newsList_item_body_h4_'+index"
                          @click="goArticle('/article',{sid:item.sid}, $event), 
                          trackArticle('资讯列表页的24小时热文', item.title, '资讯列表页的文章没有项目名称', '资讯列表页的24小时热文没有项目ID', '24小时热文', item.sid)">{{item.title}}</h4>
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
        hotNews: [],
        pageSize: 20,
        projectFollow: false,
        industry: '',
        newsType: ''
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
        let myMin = myDate.getMinutes();
        let nowMin = nowDate.getMinutes();
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
          let month = myDate.getMonth();
          if (month < 9) {
            month = '0' + month
          }
          return month + '-' + mydata
        }
      },
      labelFormat(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';');
            return arr[0];
          } else {
            return obj;
          }
        }
        return obj;
      },
      showLable(label1, label2, lable3) {
        if (label1 != null && label1 !== undefined && label1 !== '' && label1 !== 'NULL') {
          let arr = label1.split(';');
          return arr[0]
        } else {
          if (label2 != null && label2 !== undefined && label2 !== '' && label2 !== 'NULL') {
            let arr = label1.split(';');
            return arr[0]
          } else {
            if (lable3 != null && lable3 !== undefined && lable3 !== '' && lable3 !== 'NULL') {
              let arr = label1.split(';');
              return arr[0]
            } else {
              return '标签'
            }
          }
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let industry = this.$route.query.industry;
        let country = this.$route.query.country;
        if (industry) {
          this.industry = industry;
          this.initNewsList(this.industry);
          this.getfollowboolean(this.industry);
        } else if (country) {
          this.industry = country;
          this.newsType = 'country';
          this.initNewsList(null, this.industry);
          this.getfollowboolean(this.industry, this.newsType);
        } else {
          this.industry = '平台';
          this.initNewsList(this.industry);
          this.getfollowboolean(this.industry);
        }
        this.getHotnews(this.industry);
      },
      trackAttention(category, name) {
        let urlArr = this.$route.query;
        if(urlArr.hasOwnProperty('country')) {category = '国家';}
        if(urlArr.hasOwnProperty('industry')) {category = '行业';}
        sensors.track('Attention', {
          attention_category: category,
          attention_name: name
        });
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
      getfollowboolean() {
        let that = this;
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let checkurl = '/individual/check?type=INDUSTRY&sidOrName=' + that.industryName;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: checkurl,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.projectFollow = true
            } else {
              that.projectFollow = false
            }
          })
        }
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
      setFollow() {
        let that = this;
        let url = '';
        let industry = this.$route.query.industry;
        let country = this.$route.query.country;
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          if (country) {url = '/individual/add?type=COUNTRY&name=' + that.industry;}
          if (industry) {url = '/individual/add?type=INDUSTRY&name=' + that.industry;}
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.projectFollow = true;
              alert('关注成功');
            }
          });
        } else {
          alert('请先登录。');
        }
      },
      deleteFollow(industry) {
        // this.projectFollow = false;
        let token = localStorage.getItem('apelink_user_token')
        let i = this.$route.query.industry;
        let c = this.$route.query.country;
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid')
          let that = this;
          let url = '/individual/list?type=INDUSTRY'; 
          if (c) {url = '/individual/list?type=COUNTRY';}
          if (i) {url = '/individual/list?type=INDUSTRY';}
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'get',
            url: url,
            headers: headers
          }).then(res => {
            let list = res.data.content;
            let cid = '';
            for (let i = 0; i < list.length; i++) {
              let industryName = list[i].result;
              if (industry === industryName) {
                cid = list[i].cid;
                break
              }
            }
            if (cid !== '') {
              console.log(cid);
              let deteleUrl = '/individual/delete?cid=' + cid;
              that.$axios({
                method: 'DELETE',
                url: deteleUrl,
                headers: headers
              }).then(function (res) {
                if (res.data) {
                  that.projectFollow = false;
                  alert('已取消关注');
                }
              })
            }
          })
        } else {
          alert('请先登录。')
        }
      },
      getfollowboolean(industryName, type) {
        let that = this;
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          let checkurl = '/individual/check?type=INDUSTRY&sidOrName=' + industryName;
          if (type === 'country') {
            checkurl = '/individual/check?type=COUNTRY&sidOrName=' + industryName;
          }
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: checkurl,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.projectFollow = true;
            } else {
              that.projectFollow = false;
            }
          })
        }
      },
      getHotnews(industryName) {
        let that = this;
        that.$axios.get('/traditional/hotNews?industryName=' + industryName + '&pageSize=10').then(function (res) {
          that.hotNews = res.data.content
        })
      },
      initNewsList(categoryName, search) {
        let that = this;
        that.categoryName = categoryName;
        let url = '/traditional/categoryList?categoryName=' + categoryName + '&pageSize=' + this.pageSize;
        if (search !== null && search !== '' && search !== undefined) {
          url += '&search=' + search;
        }
        that.$axios.get(url).then(function (res) {
          that.newsList = res.data.content;
          if (search !== null && search !== '' && search !== undefined) {
            let allData = that.newsList;
            for (let i = 0; i < allData.length; i++) {
              allData[i].title = that.replaceAll(allData[i].title, search, '<font color="red">' + search + '</font>');
              allData[i].content = that.replaceAll(allData[i].content, search, '<font color="red">' + search + '</font>');
            }
          }
          that.showloading = false;
        }).catch(function (res) {
          that.showloading = false;
        })
      },
      reloadMore(categoryName, type) {
        if (categoryName === '关注') {
          this.getAllFollowList()
        } else {
          this.showloading = true;
          this.pageSize += 10;
          if (type === 'country') {
            this.initNewsList('', categoryName);
          } else {
            this.initNewsList(categoryName);
          }
        }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

