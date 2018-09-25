<template>
  <div class="page">
    <vheader/>
    <div class="maintainer">
      <div class="user-center" :style="'background-image: url('+userbg+')'">
        <div class="usertainer author">
          <div class="userimg"><img src="../assets/logo_brand.png"></div>

          <p class="occupation">
            <!--自媒体作者-->
            <span class="nickname author">{{author}}</span>
            <button class="follow_btn" v-show="!follow" @click="setAuthorFollow()">
              <img src="../assets/follow/icon-follow.png"/>关注
              <div class="arrow"></div>
            </button>
            <button class="followed_btn" v-show="follow" @click="deleteFollow()">
              <div class="arrow"></div>
              <img src="../assets/follow/icon-followed.png"/>已关注
            </button>
          </p>
          <p class="sign">后海有树的院子，夏代有工的玉，此时此刻的云，二十来岁的你--可遇不可求的事。</p>
          <ul class="datalist">
            <li>
              <p>0</p>
              <p>糖果数</p>
            </li>
            <li>
              <p>0</p>
              <p>粉丝</p>
            </li>
            <li>
              <p>0人</p>
              <p>关注</p>
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
                    <div class="media" v-for="news in newsForAuthor">
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
                              <span class="author">{{news.author}}</span>
                            </li>
                            <li v-else @click="goArticle('/author',{author: news.siteName,type: 'siteName'})">
                              <span class="author">{{news.siteName}}</span>
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
            <button :disabled="showloading" @click.stop="getNewsForAuthor()">
              <img v-if="showloading" :src="loading"/>
              <span v-if="!showloading">加载更多</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script>
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
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

