<template>
  <transition name="fade">
    <div class="container">
      <div class="newmedia mt20">
        <button class="btn btn-primary" @click="creatArticle">新建</button>
      </div>
      <div class="medialist mt40">
        <div class="media" v-for="(item, index) in newsList" :key="item.sid">
          <div class="media-left media-middle">
            <img class="media-object" src="../../assets/media.jpg">
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{item.result.title}}</h4>
            <p class="media-words">{{item.result.content}}</p>
            <div class="media-bottom">
              <ul>
                <li
                  v-if="!(item.result.siteName !== 'NULL' && item.result.siteName !== null && item.result.siteName !== '')"
                  @click="goArticle('/author',{author: item.result.author,type: 'author'})">
                  <div class="userimg">
                    <img src="../../assets/follow/user_head.png">
                  </div>
                  {{item.result.author}}
                </li>
                <li v-else @click="goArticle('/author',{author: item.result.siteName,type: 'siteName'})">
                  {{item.result.siteName}}
                </li>
                <li>{{item.result.urlDate | dataFormat}}</li>
                <li data-toggle="modal" data-target="#deleteModal" class="love" @click="deleteCid = item.cid">
                  <i class="fa fa-heart"></i>已收藏
                </li>
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
        <div class="loading_more" v-if="!(showloading === -1)">
          <button :disabled="showloading" @click.stop="getFollowList()">
            <img v-if="showloading" :src="loading"/>
            <span v-if="!showloading">加载更多</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  let loading = require('../../assets/login/loading.gif');
  export default {
    data() {
      return {
        item: [],
        newsList: [],
        pageNo: 1,
        loading: loading,
        showloading: true,
      }
    },
    mounted() {
      this.getFollowList();
    },
    methods: {
      creatArticle() {
        this.$emit('toggleTab', 'creat')
      },
      getFollowList() {
        let that = this
        that.showloading = true;
        let nickName = localStorage.getItem('apelink_user_nickName');
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/traditional/authorRelatedNews?author=' + nickName + '&pageNo=' + that.pageNo;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.showloading = false;
          that.newsList = that.newsList.concat(res.data.content);
          if (that.pageNo === res.data.pageNo) {
            that.showloading = -1;
          }
          that.pageNo++;
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

