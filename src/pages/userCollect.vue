<template>
  <div class="page project userCenter userCollect">
    <v2header/>
    <div class="v2maintainer">
      <div class="container v2container">
        <div class="user-banner">
          <div class="info">
            <div class="userimg"><img :src="user.img"></div>
            <p class="name">{{user.name}}</p>
            <p class="des">{{user.sign}}</p>
            <p class="candy">糖果 <span>{{user.candy}}</span></p>
          </div>
          <a href="javascript:;" class="signin" @click="$store.state.signInTips = true">签到</a>
        </div>
        <div class="user-main">
          <div class="leftnav">
            <ul>
              <li class="active">
                <a href="#" >
                  <div class="navicon"><img src="../assets/userCenter/l1.png"><img class="on" src="../assets/userCenter/l1-on.png"></div>
                  我的收藏
                </a>
              </li>
              <li>
                <a href="#" >
                  <div class="navicon"><img src="../assets/userCenter/l2.png"><img class="on" src="../assets/userCenter/l2-on.png"></div>
                  我的项目
                </a>
              </li>
              <li>
                <a href="#" >
                  <div class="navicon"><img src="../assets/userCenter/l3.png"><img class="on" src="../assets/userCenter/l3-on.png"></div>
                  账户信息
                </a>
              </li>
              <li>
                <a href="#" >
                  <div class="navicon"><img src="../assets/userCenter/l4.png"><img class="on" src="../assets/userCenter/l4-on.png"></div>
                  消息通知
                </a>
              </li>
            </ul>
          </div>
          <div class="rightcontent">
            <div class="follow_list serach_follow_list">
              <ul>
                <li>
                  <div class="list-item">
                    <div class="medialist">
                      <div class="media" v-for="(news, index) in newsList" :key="index">
                        <div class="media-left media-middle">
                          <div class="newimg_box" :data="news.result.title"
                               :name="'search_newimg_box_title_'+index" :id="'search_newimg_box_title_'+index"
                               @click="goArticle('/article',{sid:news.result.sid}, $event)">
                            <img :src="news.result.titlePicture===''?newsimg:news.result.titlePicture"/>
                            <span class="time" v-if="!news.result.titlePicture">{{news.result.urlDate | formatTime}}</span>
                          </div>
                        </div>
                        <div class="media-body">
                          <h4 class="media-heading">
                          <span class="tips"
                                :name="'search_tips_projectCategory_'+index"
                                :id="'search_tips_projectCategory_'+index"
                                v-if="news.result.projectCategory !==null && news.result.projectCategory !== '' && news.result.projectCategory !==undefined && news.result.projectCategory !=='NULL'"
                                @click="goProjectByName(news.result.projectCategory, $event), trackProject('搜索页文章的项目标签', news.result.projectCategory, '搜索页文章的项目标签没有项目ID', '搜索页文章的项目标签没有排行榜位置', '搜索页文章的项目标签没有项目总分')"
                                :data="news.result.projectCategory"
                          >
                            {{news.result.projectCategory | labelFormat}}
                          </span>
                            <span class="tit" :data="news.result.title" :title="news.result.title"
                                  :name="'search_media-heading_title_'+index"
                                  :id="'search_media-heading_title_'+index"
                                  @click="goArticle('/article',{sid:news.result.sid}, $event)"
                                  v-html="news.result.title"></span>
                          </h4>
                          <p class="media-words" v-html="news.result.content"></p>
                          <div class="media-bottom">
                            <ul>
                              <li
                                :name="'search_media-bottom_author_'+index"
                                :id="'search_media-bottom_author_'+index"
                                :data="news.result.siteName">
                                {{news.result.siteName}}
                              </li>
                              <li>{{news.result.urlTime}}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <div class="loading_more">
                  <p class="loading_more_tip" v-if="showloading===-1">{{loadingTip}}~</p>
                  <button :disabled="showloading" data="加载更多" value="加载更多" name="loading_more" id="loading_more"
                          @click.stop="getFollowList()" v-if="!(showloading===-1)">
                    <img v-if="showloading" :src="loading"/>
                    <span v-if="!showloading">加载更多</span>
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <v2footer/>
    </div>
  </div>
</template>

<script>
  let newsimg = require('../assets/search/news.png');
  let loading = require('../assets/login/loading.gif');

  export default {
    data() {
      return {
        newsimg: newsimg,
        newsList: [],
        pageSize: 10,
        loading: loading,
        showloading: true,
        nothing:false,
        index:0,
        user: {
          token: '',
          uid: '',
          img: '',
          name: '',
          sign: '',
          candy: ''
        }
      }
    },
    mounted() {
      this.getLocalStorageUserInfo();
      this.getFollowList();
    },
    methods: {
      getLocalStorageUserInfo () {
        this.user.token = localStorage.getItem('apelink_user_token');
        this.user.uid = localStorage.getItem('apelink_user_uid');
        this.user.img = localStorage.getItem('apelink_user_profileUrl');
        this.user.name = localStorage.getItem('apelink_user_nickName');
        this.user.sign = localStorage.getItem('apelink_user_synopsis');
        this.user.candy = localStorage.getItem('apelink_user_candies');
      },
      getFollowList() {
        let that = this;
        let token = localStorage.getItem('apelink_user_token');
        let uid = localStorage.getItem('apelink_user_uid');
        that.showloading = true;
        let url = '/api/individual/list?type=NEWS&pageSize=' + that.pageSize;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.newsList = res.data.content;
          if(that.newsList){
            that.nothing = true
          }else {
            that.nothing = false;
          }
          that.showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.showloading = -1
          }
          that.pageSize += 10;
        })
      },
    },
    filters: {
      formatRank (val) {
        if (val === 0) {
          return '--';
        }else{
          return val;
        }
      },
      formatRecommendProjects(val) {
        if (val !== null || val !== '') {
          return '( ' + val + ' )';
        } else {
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
        let time = obj.replace(/-/g, '/')
        let myDate = new Date(time);
        let day = myDate.getDate()
        if (day < 9) {
          day = '0' + (day + 1)
        }
        return day
      },
      showYear(obj) {
        let time = obj.replace(/-/g, '/')
        let myDate = new Date(time);
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
      },
      formatTime(val) {
        return val.replace(/\//g, "-");
        // return val;
      },
      rounding(val) {
        return parseInt(val);
      },
      formatDataForMark(val) {
        if (val) {
          if (val > 100000000) {
            let num = val / 100000000;
            return `${num.toFixed(2)} 亿`
          } else {
            if (val > 10000) {
              let num = val / 10000;
              return `${num.toFixed(2)} 万`
            } else {
              return val;
            }
          }
        } else {
          return '--'
        }
      }
    },
    computed: {
      // showSynopsis: function () {
      //   let obj = this.synopsis
      //   if (obj !== null && obj !== '' && obj !== undefined && obj !== 'null') {
      //     return obj
      //   } else {
      //     return '<font style="font-size: 16px">（此人很懒，什么都没留下）</font>'
      //   }
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.follow-show {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 36px 0 240px 0;
  img {
    display: block;
    margin: 0 auto;
    padding-bottom: 26px;
  }
  p {
    font-size: 16px;
    height: 16px;
    
    text-align: center;
    color: #898989;
  }
}
</style>

