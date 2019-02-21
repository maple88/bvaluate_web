<template>
  <div class="page">
    <v2header/>
    <div class="v2maintainer">
      <div class="user-center" :style="'background-image: url('+userbg+')'">
        <div class="usertainer">
          <div class="userimg">
            <div class="user_header"
                 :style="(profileUrl !==null && profileUrl !== '' && profileUrl !== 'NULL' && profileUrl !== undefined)
                       ?'background-image: url('+ profileUrl +')':'background-image: url('+ default_header +')'"
            ></div>
          </div>
          <p class="nickname">{{nickName}}
            <span>
              <!--<img src="../../assets/authen.png">-->
              个人
            </span>
          </p>
          <p class="sign" v-html="showSynopsis"></p>
          <ul class="datalist">
            <li>
              <p>{{candy}}</p>
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
      <div class="usernav">
        <div class="container">
          <ul>
            <!-- <li @click="toggleTab('contribute'), num = 1" :class="{active: num === 1}">
              投稿<span>{{myNewsList}}</span></li> -->
            <!--<li @click="toggleTab('read'), num = 2" :class="{active: num === 2}">阅读<span>122</span></li>-->
            <li @click="toggleTab('collection'), num = 3" :class="{active: num === 3}">
              收藏<span>{{newsList}}</span></li>
          </ul>
        </div>
      </div>
      <prince v-on:toggleTab="toggleTab" :is="currentTab"></prince>

      <v2footer/>
    </div>
  </div>
</template>

<script>
  import sensors from '../../../static/sa-init.js'
  import contribute from '@/pages/userCenter/contribute';
  import read from '@/pages/userCenter/read';
  import collection from '@/pages/userCenter/collection';
  import creat from '@/pages/userCenter/creat';

  let default_header = require('../../assets/user/default-header.png');
  let userbg = require('../../assets/userbg.jpg');

  export default {
    components: {
      contribute,
      read,
      collection,
      creat
    },
    data() {
      return {
        isContribute: true,
        isRead: false,
        isCollection: false,
        tabcontent: 'isContribute',
        currentTab: 'collection',
        num: 3,
        candy: 0,
        phoneNumber: 0,
        nickName: '',
        synopsis: '',
        profileUrl: '',
        default_header: default_header,
        newsList: 0,
        myNewsList: 0,
        userbg: userbg,
      }
    },
    mounted() {
      this.initCandy();
      this.getFollowList();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initCandy()
      })
    },
    methods: {
      toggleTab: function (tab) {
        this.currentTab = tab;
      },
      getFollowList() {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/traditional/authorRelatedNews?author=' + this.nickName;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.myNewsList = res.data.totalElements
        })
      },
      getFollowList() {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/individual/list?type=NEWS';
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.newsList = res.data.totalElements
          sensors.setProfile({collect_count: that.newsList});
        })
      },
      initCandy() {
        let token = localStorage.getItem('apelink_user_token');
        if (token !== null && token !== '' && token !== undefined) {
          this.candy = localStorage.getItem('apelink_user_candies')
          let nickName = localStorage.getItem('apelink_user_nickName');
          let phoneNumber = localStorage.getItem('apelink_user_phoneNumber');
          let synopsis = localStorage.getItem('apelink_user_synopsis');
          this.profileUrl = localStorage.getItem('apelink_user_profileUrl');
          this.phoneNumber = phoneNumber;
          this.nickName = nickName;
          this.synopsis = synopsis;
        } else {
          this.$router.push('/login')
        }
      }
    },
    computed: {
      showSynopsis: function () {
        let obj = this.synopsis
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'null') {
          return obj
        } else {
          return '<font style="font-size: 16px">（此人很懒，什么都没留下）</font>'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

