<template>
  <div class="page">
    <vheader/>
    <div class="maintainer">
      <div class="user-center">
        <div class="usertainer author">
          <div class="userimg"><img src="../assets/logo_brand.png"></div>
          <p class="nickname author">才不可以吃辣椒酱</p>
          <p class="occupation">
            自媒体作者
            <button class="follow_btn" v-show="!follow" @click="follow = true">
              <img src="../assets/follow/icon-follow.png"/>关注
              <div class="arrow"></div>
            </button>
            <button class="followed_btn" v-show="follow" @click="follow = false">
              <div class="arrow"></div>
              <img src="../assets/follow/icon-followed.png"/>已关注
            </button>
          </p>
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
      <div class="author_article">
        <div class="container">
          <div class="follow_list">
            <ul>
              <li>
                <div class="list-item">
                  <div class="medialist">
                    <div class="media">
                      <div class="media-left media-middle">
                        <div class="newimg_box">
                          <img src="../assets/media.jpg"/>
                          <div class="date_box">
                            <span class="day">22</span>
                            <span class="years">2018-05</span>
                          </div>
                        </div>
                      </div>
                      <div class="media-body">
                        <h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth
                          doing is worth</h4>
                        <p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing
                          is worth doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is
                          worth doing well, Whatever isworth doingis worth doing wel,</p>
                        <div class="media-bottom">
                          <ul>
                            <li>
                              <div class="userimg"><img src="../assets/follow/user_head.png"></div>
                              刘方平
                            </li>
                            <li>5月17日 18:17</li>
                          </ul>
                          <div class="tips">新闻</div>
                        </div>
                      </div>
                    </div>
                    <div class="media">
                      <div class="media-left media-middle">
                        <div class="newimg_box">
                          <div class="date_box">
                            <span class="day">22</span>
                            <span class="years">2018-05</span>
                          </div>
                        </div>
                      </div>
                      <div class="media-body">
                        <h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth
                          doing is worth</h4>
                        <p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing
                          is worth doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is
                          worth doing well, Whatever isworth doingis worth doing wel,</p>
                        <div class="media-bottom">
                          <ul>
                            <li>
                              <div class="userimg"><img src="../assets/logo_brand.png"></div>
                              刘方平
                            </li>
                            <li>5月17日 18:17</li>
                          </ul>
                          <div class="tips">新闻</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="loading_more">
            <button>加载更多</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vheader from '@/components/header.vue'

  export default {
    components: {
      vheader
    },
    data() {
      return {
        tabcontent: 'isContribute',
        follow: false
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

