<template>
  <transition name="fade">
    <div class="container">
      <div class="medialist mt40 mb50">
        <div class="media" v-for="(item, index) in newsList" :key="item.sid">
          <!--<div class="media-left media-middle">-->
          <!--<img class="media-object" src="../../assets/media.jpg">-->
          <!--</div>-->
          <div class="media-left media-middle"
               v-if="item.result.dataType === 'NEWS'||item.result.dataType === 'WEIXIN'">
            <div class="newimg_box" :data="item.result.title" 
            :name="'collection_newimg_box_img_'+index" :id="'collection_newimg_box_img_'+index" 
            @click="goArticle('/article',{sid:item.result.sid, pageTitle:item.result.title}), 
            trackArticle('个人中心页收藏文章', item.result.title, '个人中心页内收藏文章没有项目名称', '个人中心页内收藏文章没有项目ID', '收藏文章', item.result.sid)">
              <img v-if="item.result.titlePicture" :src="item.result.titlePicture"/>
              <div class="date_box">
                <span class="day">{{item.result.urlTime | showDay}}</span>
                <span class="years">{{item.result.urlTime | showYear}}</span>
              </div>
            </div>
          </div>
          <div class="media-body">
            <h4 class="media-heading" :data="item.result.title" 
            :name="'collection_media-heading_title_'+index" :id="'collection_media-heading_title_'+index" 
            @click="goArticle('/article',{sid:item.result.sid, pageTitle:item.result.title}, $event), 
            trackArticle('个人中心页收藏文章', item.result.title, '个人中心页内收藏文章没有项目名称', '个人中心页内收藏文章没有项目ID', '收藏文章', item.result.sid)">{{item.result.title}}</h4>
            <p class="media-words">{{item.result.content}}</p>
            <div class="media-bottom">
              <ul>
                <li
                  :name="'collection_media-bottom_author_'+index" :id="'collection_media-bottom_author_'+index"
                  @click="goArticle('/author',{author: item.result.author,type: 'author', pageTitle:item.result.author}, $event)"
                  :data="item.result.author">
                  <div class="userimg">
                    <img src="../../assets/follow/user_head.png">
                  </div>
                  <span class="author">{{item.result.author}}</span>
                </li>
                <li>{{item.result.urlDate | dataFormat}}</li>
                <li data-toggle="modal" data-target="#deleteModal" class="love" @click="deleteCid = item.cid">
                  <i class="fa fa-heart"></i>已收藏
                </li>
              </ul>
              <div class="tips"
                   :name="'collection_tips_projectCategory_'+index" :id="'collection_tips_projectCategory_'+index"
                   v-if="item.result.projectCategory !==null && item.result.projectCategory !== '' && item.result.projectCategory !==undefined && item.result.projectCategory !=='NULL'"
                   @click="goProjectByName(item.result.projectCategory, $event), trackProject('个人中心页收藏文章的项目标签', item.result.projectCategory, '个人中心页收藏文章的项目标签没有项目ID', '个人中心页收藏文章的项目标签没有排行榜位置', '个人中心页收藏文章的项目标签没有项目总分')"
                   :data="item.result.projectCategory"
              >
                {{item.result.projectCategory | labelFormat}}
              </div>
              <div class="tips"
                   :name="'collection_tips_industryCategory_'+index" :id="'collection_tips_industryCategory_'+index"
                   v-else-if="item.result.industryCategory !==null && item.result.industryCategory !== '' && item.result.industryCategory !==undefined && item.result.industryCategory !=='NULL'"
                   @click="goIndustryByIndustry(item.result.industryCategory, $event)"
                   :data="item.result.industryCategory"
              >
                {{item.result.industryCategory | labelFormat}}
              </div>
              <div class="tips"
                   :name="'collection_tips_countryCategory_'+index" :id="'collection_tips_countryCategory_'+index"
                   v-else="item.result.countryCategory !==null && item.result.countryCategory !== '' && item.result.countryCategory !==undefined && item.result.countryCategory !=='NULL'"
                   @click="goIndustryByCountry(item.result.countryCategory, $event)"
                   :data="item.result.countryCategory"
              >
                {{item.result.countryCategory | labelFormat}}
              </div>
            </div>
          </div>
        </div>
        <div class="loading_more" v-if="!(showloading === -1)">
          <button :disabled="showloading" @click.stop="getFollowList()" data="加载更多">
            <img v-if="showloading" :src="loading"/>
            <span v-if="!showloading">加载更多</span>
          </button>
        </div>
      </div>

      <div class="modal fade collection-modal" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button data="关闭模态框" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">取消收藏</h4>
            </div>
            <div class="modal-body collection-modal-text">
              <i class="fa fa-question-circle"></i>确定要取消收藏吗？
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" name="collection_default_button_cancel" id="collection_default_button_cancel" data="取消操作" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" name="collection_primary_button_ok" id="collection_primary_button_ok" data="取消收藏文章" @click="setUnfollow(deleteCid)">确定</button>
            </div>
          </div>
        </div>
      </div><!-- /.modal -->
    </div>
  </transition>
</template>

<script>
  import sensors from '../../../static/sa-init.js'
  let loading = require('../../assets/login/loading.gif');
  export default {
    data() {
      return {
        deleteCid: '',
        newsList: [],
        pageSize: 5,
        loading: loading,
        showloading: true,
      }
    },
    mounted() {
      this.getFollowList()
    },
    methods: {
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
      goProjectByName(obj, $event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/project', query: {project: obj, pageTitle: obj}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goIndustryByIndustry(obj, $event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {industry: obj, pageTitle: obj}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goIndustryByCountry(obj, $event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {country: obj, pageTitle: obj}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goArticle(url, query) {
        let routeData = this.$router.resolve({path: url, query: query});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
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
          that.showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.showloading = -1
          }
          that.pageSize += 5;
        })
      },
      setUnfollow(cid) {
        let that = this;
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/api/individual/delete?cid=' + cid;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'DELETE',
          url: url,
          headers: headers
        }).then(function (res) {
          $('#deleteModal').modal('hide')
          if (res.data) {
            that.getFollowList()
          }
        })
      }
    },
    filters: {
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
      dataFormat(obj) {
        let myDate = new Date(obj);
        let mydata = myDate.getDate();
        let nowDate = new Date();
        let nowdata = nowDate.getDate();
        let myhour = myDate.getHours();
        let nowhour = nowDate.getHours();
        let myMin = myDate.getMinutes()
        let nowMin = nowDate.getMinutes()
        if (nowdata - mydata < 7 && nowdata - mydata > 1) {
          return nowdata - mydata + '天前'
        } else if (nowdata - mydata <= 1 && Math.abs(myhour - nowhour) > 1 && Math.abs(myhour - nowhour) < 24) {
          return Math.abs(myhour - nowhour) + '小时前'
        } else if (Math.abs(myhour - nowhour) <= 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) > 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) < 60) {
          return Math.abs(myDate.getMinutes() - nowDate.getMinutes()) + '分钟前'
        } else if (Math.abs(myDate.getMinutes() - nowDate.getMinutes()) <= 1) {
          return Math.abs(myDate.getSeconds() - nowDate.getSeconds()) + '秒前'
        } else {
          let month = myDate.getMonth()
          if (month < 9) {
            month = '0' + month
          }
          return month + '-' + mydata
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

