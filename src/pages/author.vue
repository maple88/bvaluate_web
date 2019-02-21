<template>
  <div class="page">
    <v2header/>
    <div class="v2maintainer">
      <div class="user-center" :style="'background-image: url('+userbg+')'">
        <div class="usertainer author">
          <div class="userimg"><img src="../assets/logo_brand.png"></div>

          <p class="occupation">
            <!--自媒体作者-->
            <span class="nickname author">{{author}}</span>
            <button name="author_follow_btn_author" id="author_follow_btn_author" 
            class="follow_btn" v-show="!follow" data="关注作者" @click="setAuthorFollow($event), trackAttention('作者', author)">
              <img src="../assets/follow/icon-follow.png"/>{{$t('Focus')}}
              <div class="arrow"></div>
            </button>
            <button name="author_followed_btn_author" id="author_followed_btn_author" 
            class="followed_btn" v-show="follow" data="取消关注作者" @click="deleteFollow($event)">
              <div class="arrow"></div>
              <img src="../assets/follow/icon-followed.png"/>{{$t('Followed')}}
            </button>
          </p>
          <p class="sign">后海有树的院子，夏代有工的玉，此时此刻的云，二十来岁的你--可遇不可求的事。</p>
          <ul class="datalist">
            <li>
              <p>{{candy}}</p>
              <p>{{$t('Number of candy')}}</p>
            </li>
            <li>
              <p>0</p>
              <p>{{$t('Followers')}}</p>
            </li>
            <li>
              <p>0</p>
              <p>{{$t('Focus')}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="author_article">
        <div class="container">
          <div class="follow_list">
            <ul>
              <li>
                <div class="list-item">
                  <div class="medialist">
                    <div class="media" v-for="(news, index) in newsForAuthor" :key="index">
                      <div class="media-left media-middle"
                           v-if="news.dataType === 'NEWS'||news.dataType === 'WEIXIN'">
                        <div class="newimg_box" :data="news.title" 
                        :name="'author_newimg_box_img_'+index" :id="'author_newimg_box_img_'+index" 
                        @click="goArticle('/article',{sid:news.sid}, $event), 
                        trackArticle('个人中心页收藏文章', news.title, '个人中心页内收藏文章没有项目名称', '个人中心页内收藏文章没有项目ID', '收藏文章', news.sid)">
                          <img v-if="news.titlePicture" :src="news.titlePicture"/>
                          <div class="date_box">
                            <span class="day">{{news.urlTime | showDay}}</span>
                            <span class="years">{{news.urlTime | showYear}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="media-left media-middle"
                           v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'">
                        <div class="newimg_box TorW" :data="news.title" 
                        :name="'author_newimg_boxTorW_img_'+index" :id="'author_newimg_boxTorW_img_'+index" 
                        @click="goArticle('/article',{sid:news.sid}, $event), 
                        trackArticle('个人中心页收藏文章', news.title, '个人中心页内收藏文章没有项目名称', '个人中心页内收藏文章没有项目ID', '收藏文章', news.sid)">
                          <img :src="news.dataType === 'WEIBO'?weibo:tuiwen"/>
                          <span class="day">{{news.urlDate }}</span>
                        </div>
                      </div>
                      <div class="media-body">
                        <h4 class="media-heading" :name="'author_media-heading_title_'+index" :id="'author_media-heading_title_'+index" :title="news.title" :data="news.title" @click="goArticle('/article',{sid:news.sid}, $event)"
                            v-if="!(news.dataType === 'WEIBO' || news.dataType === 'TWITTER')" v-html="news.title ">
                        </h4>
                        <p class="media-words TorW" v-if="news.dataType === 'WEIBO' || news.dataType === 'TWITTER'"
                           :name="'author_media-wordsTorW_content_'+index" :id="'author_media-wordsTorW_content_'+index"
                           @click="goArticle('/article',{sid:news.sid}, $event)" v-html="news.content " :data="news.content">
                        </p>
                        <p class=" media-words" v-else v-html="news.content ">
                        </p>
                        <div class="media-bottom">
                          <ul>
                            <li
                              :name="'author_media-bottom_author_'+index" :id="'author_media-bottom_author_'+index"
                              @click="goArticle('/author',{author: news.author,type: 'author'}, $event)" :data="news.author">
                              <div class="userimg">
                                <img src="../assets/follow/user_head.png">
                              </div>
                              <span class="author">{{news.author}}</span>
                            </li>
                            <li>{{news.urlTime}}</li>
                          </ul>
                          <div class="tips"
                               :name="'author_tips_projectCategory_'+index" :id="'author_tips_projectCategory_'+index"
                               v-if="news.projectCategory !==null && news.projectCategory !== '' && news.projectCategory !==undefined && news.projectCategory !=='NULL'"
                               @click="goProjectByName(news.projectCategory, $event), trackProject('个人中心页收藏文章的项目标签', news.projectCategory, '个人中心页收藏文章的项目标签没有项目ID', '个人中心页收藏文章的项目标签没有排行榜位置', '个人中心页收藏文章的项目标签没有项目总分')"
                               :data="news.projectCategory"
                          >
                            {{news.projectCategory | labelFormat}}
                          </div>
                          <div class="tips"
                               :name="'author_tips_industryCategory_'+index" :id="'author_tips_industryCategory_'+index"
                               v-else-if="news.industryCategory !==null && news.industryCategory !== '' && news.industryCategory !==undefined && news.industryCategory !=='NULL'"
                               @click="goIndustryByIndustry(news.industryCategory, $event)"
                               :data="news.industryCategory"
                          >
                            {{news.industryCategory | labelFormat}}
                          </div>
                          <div class="tips"
                               :name="'author_tips_countryCategory_'+index" :id="'author_tips_countryCategory_'+index"
                               v-else="news.countryCategory !==null && news.countryCategory !== '' && news.countryCategory !==undefined && news.countryCategory !=='NULL'"
                               @click="goIndustryByCountry(news.countryCategory, $event)"
                               :data="news.countryCategory"
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
            <button :disabled="showloading" name="loading_more" id="loading_more" data="加载更多" value="加载更多" @click.stop="getNewsForAuthor()">
              <img v-if="showloading" :src="loading"/>
              <span v-if="!showloading">{{$t('Load more')}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <v2footer/>
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  let loading = require('../assets/login/loading.gif');
  let tuiwen = require('../assets/home/tuite.png');
  let weibo = require('../assets/home/weibo.png');
  let userbg = require('../assets/userbg.jpg');
  export default {
    data() {
      return {
        tabcontent: 'isContribute',
        follow: false,
        author: '',
        authorType: '',
        pageSize: 20,
        tuiwen: tuiwen,
        weibo: weibo,
        newsForAuthor: [],
        loading: loading,
        showloading: true,
        userbg: userbg
      }
    },
    mounted() {
      this.initAuthor()
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
    },
    methods: {
      trackAttention(category, name) {
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
          let checkurl = '/api/individual/check?type=AUTHOR&sidOrName=' + this.author;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: checkurl,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.follow = true
            } else {
              that.follow = false
            }
          })
        }
      },
      deleteFollow() {
        // this.projectFollow = false;
        let token = localStorage.getItem('apelink_user_token')
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid')
          let that = this;
          let url = '/api/individual/list?type=AUTHOR';
          let headers = {'uid': uid, 'Authorization': token};
          sensors.quick('trackHeatMap', event.currentTarget);
          that.$axios({
            method: 'get',
            url: url,
            headers: headers
          }).then(res => {
            let list = res.data.content;
            let cid = '';
            for (let i = 0; i < list.length; i++) {
              let industryName = list[i].result;
              if (that.author === industryName) {
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
            }
          })
        } else {
          alert('请先登录。')
        }
      },
      setAuthorFollow() {
        let that = this;
        let token = localStorage.getItem('apelink_user_token')
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid')
          let url = '/api/individual/add?type=AUTHOR&name=' + that.author;
          let headers = {'uid': uid, 'Authorization': token};
          sensors.quick('trackHeatMap', event.currentTarget);
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            that.follow = true;
          });
        } else {
          alert('请先登录。')
        }
      },
      initAuthor() {
        this.author = this.$route.query.author;
        this.authorType = this.$route.query.type;
        this.getNewsForAuthor();
        this.getfollowboolean();
      },
      getNewsForAuthor() {
        let that = this;
        this.showloading = true;
        that.$axios.get('/api/traditional/authorRelatedNews?author=' + this.author + '&pageSize=' + this.pageSize).then(function (res) {
          that.showloading = false;
          that.pageSize += 10;
          that.newsForAuthor = res.data.content;
        })
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
      goArticle(url, query) {
        let routeData = this.$router.resolve({path: url, query: query});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

