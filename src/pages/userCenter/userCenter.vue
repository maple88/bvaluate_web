<template>
  <div class="page">
    <vheader/>
    <div class="maintainer">
      <div class="user-center">
        <div class="usertainer">
          <div class="userimg"><img src="../../assets/logo_brand.png"></div>
          <p class="nickname">才不可以吃辣椒酱<span><img src="../../assets/authen.png">个人</span></p>
          <p class="sign">后海有树的院子，夏代有工的玉，此时此刻的云，二十来岁的你--可遇不可求的事。</p>
          <ul class="datalist">
            <li>
              <p>46</p>
              <p>糖果数</p>
            </li>
            <li>
              <p>120万</p>
              <p>粉丝</p>
            </li>
            <li>
              <p>6000人</p>
              <p>关注</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="usernav">
        <div class="container">
          <ul>
            <li @click="toggleTab('contribute'), num = 1" :class="{active: num === 1}">投稿<span>25</span></li>
            <li @click="toggleTab('read'), num = 2" :class="{active: num === 2}">阅读<span>122</span></li>
            <li @click="toggleTab('collection'), num = 3" :class="{active: num === 3}">收藏<span>120</span></li>
          </ul>
        </div>
      </div>
      <prince v-on:toggleTab="toggleTab" :is="currentTab"></prince>
    </div>
  </div>
</template>

<script>
  import vheader from '@/components/header.vue'
  import contribute from '@/pages/userCenter/contribute'
  import read from '@/pages/userCenter/read'
  import collection from '@/pages/userCenter/collection'
  import creat from '@/pages/userCenter/creat'

  export default {
    components: {
      vheader,
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
        currentTab: 'contribute',
        num: 1
      }
    },
    methods: {
      toggleTab: function (tab) {
        this.currentTab = tab;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

