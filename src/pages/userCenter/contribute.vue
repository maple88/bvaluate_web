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
                <li>
                  <div class="userimg"
                       v-if="(item.result.author !== 'NULL' && item.result.author !== null && item.result.author !== '')">
                    <img src="../../assets/follow/user_head.png">
                  </div>
                  {{
                  (item.result.siteName !== 'NULL'
                  && item.result.siteName !== null
                  && item.result.siteName !== '')?item.result.siteName:item.result.author
                  }}
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
        <!-- <div class="media">
          <div class="media-left media-middle">
            <img class="media-object" src="../../assets/media.jpg">
          </div>
          <div class="media-body">
            <h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth doing is worth</h4>
            <p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing is worth
              doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is worth doing well, Whatever
              isworth doingis worth doing wel,</p>
            <div class="media-bottom">
              <ul>
                <li>
                  <div class="userimg"><img src="../../assets/logo_brand.png"></div>
                  刘方平
                </li>
                <li>5个小时前</li>
                <li class="love"><i class="fa fa-heart"></i>已收藏</li>
              </ul>
              <div class="tips">新闻</div>
            </div>
          </div>
        </div> -->
      </div>
      <!--<div class="medialist mt20">-->
      <!--<div class="media">-->
      <!--<div class="dropdown">-->
      <!--<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">-->
      <!--<i class="fa fa-angle-down"></i>-->
      <!--</button>-->
      <!--<ul class="dropdown-menu dropdown-menu-right">-->
      <!--<li><a href="#">删除</a></li>-->
      <!--<li><a href="#">置顶</a></li>-->
      <!--<li><a href="#">转为仅自己可见</a></li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div class="media-left media-middle">-->
      <!--<img class="media-object" src="../../assets/media.jpg">-->
      <!--</div>-->
      <!--<div class="media-body">-->
      <!--<h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth doing is worth</h4>-->
      <!--<p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing is worth-->
      <!--doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is worth doing well, Whatever-->
      <!--isworth doingis worth doing wel,</p>-->
      <!--<div class="media-bottom">-->
      <!--<ul>-->
      <!--<li>-->
      <!--<div class="userimg"><img src="../../assets/logo_brand.png"></div>-->
      <!--刘方平-->
      <!--</li>-->
      <!--<li>5个小时前</li>-->
      <!--</ul>-->
      <!--<div class="tips"-->
      <!--v-if="item.projectCategory !==null && item.projectCategory !== '' && item.projectCategory !==undefined && item.projectCategory !=='NULL'"-->
      <!--@click="goProjectByName(item.projectCategory)"-->
      <!--&gt;-->
      <!--{{item.projectCategory | labelFormat}}-->
      <!--</div>-->
      <!--<div class="tips"-->
      <!--v-else-if="item.industryCategory !==null && item.industryCategory !== '' && item.industryCategory !==undefined && item.industryCategory !=='NULL'"-->
      <!--@click="goIndustryByIndustry(item.industryCategory)"-->
      <!--&gt;-->
      <!--{{item.industryCategory | labelFormat}}-->
      <!--</div>-->
      <!--<div class="tips"-->
      <!--v-else="item.countryCategory !==null && item.countryCategory !== '' && item.countryCategory !==undefined && item.countryCategory !=='NULL'"-->
      <!--@click="goIndustryByCountry(item.countryCategory)"-->
      <!--&gt;-->
      <!--{{item.countryCategory | labelFormat}}-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </transition>
</template>

<script>

  export default {
    data() {
      return {
        item: [],
        newsList: []
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
        let nickName = localStorage.getItem('apelink_user_nickName');
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/api/traditional/authorRelatedNews?author=' + nickName;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.newsList = res.data.content
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

