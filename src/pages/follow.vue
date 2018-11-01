<template>
  <div class="page follow_page">
    <vheader/>
    <div class="maintainer">
      <div class="follow_content">
        <div class="fish_container">
          <div class="clearfix">
            <div class="left">
              <ul class="menu_bar">
                <li class="active">项目</li>
                <li>行业</li>
                <li>国家</li>
                <li>作者</li>
                <li>收藏文章</li>
              </ul>
            </div>
            <div class="center">
              <div class="tab_item" v-show="false">
                <div class="follow_list">
                  <ul>
                    <li>
                      <div class="list-item">
                        <div class="medialist">
                          <div class="media">
                            <div class="media-left media-middle">
                              <div class="newimg_box">
                                <img :src="img3"/>
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
              <div class="tab_item">
                <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>推荐</h4>
                  </div>
                  <div class="follow_list serach_follow_list">
                    <div class="project_list_box" v-for="project in projectList">
                      <div class="project_info">
                        <div class="left">
                          <div class="logo_box" @click="goProjectById(project.sid)">
                            <img :src="project.logoSrc"/>
                          </div>
                        </div>
                        <div class="right">
                          <div class="base_info">
                            <div class="left">
                              <h4>
                                <span v-html="project.project" @click="goProjectById(project.sid)"></span>
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
                </div>
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>已关注</h4>
                  </div>
                  <div class="follow_list serach_follow_list">
                    <div class="project_list_box" v-for="project in projectList">
                      <div class="project_info">
                        <div class="left">
                          <div class="logo_box" @click="goProjectById(project.sid)">
                            <img :src="project.logoSrc"/>
                          </div>
                        </div>
                        <div class="right">
                          <div class="base_info">
                            <div class="left">
                              <h4>
                                <span v-html="project.project" @click="goProjectById(project.sid)"></span>
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
                    <button :disabled="showloading" @click.stop="loadMoreICO" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">加载更多</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <vfooter/>
    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper';

  let img1 = require('../assets/follow/banner01.png')
  let img2 = require('../assets/follow/adv01.png')
  let img3 = require('../assets/media.jpg')
  let loading = require('../assets/login/loading.gif');

  export default {
    data() {
      return {
        colorList: ['red', 'yellow', 'gray', 'pink'],
        banner1: img1,
        img2: img2,
        img3: img3,
        labelMore: false,
        showloading: false,
        loading: loading,
        projectList: [
          {
            logoSrc: 'https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/657030de-ffaa-4dde-b707-e753c7c6b854.jpg',
            project: 'ICO',
            introduction: 'Interconnecting blockchain network',
            totalScore: '9.5',
            irAbstract: 'ICON is an interconnecting blockchain network. ICON can connect independent blockchains without the use of additional third-party intermediaries. Various blockchains can communicate with each other through the ICON platform. By '
          },
          {
            logoSrc: 'https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/657030de-ffaa-4dde-b707-e753c7c6b854.jpg',
            project: 'ICO',
            introduction: 'Interconnecting blockchain network',
            totalScore: '9.5',
            irAbstract: 'ICON is an interconnecting blockchain network. ICON can connect independent blockchains without the use of additional third-party intermediaries. Various blockchains can communicate with each other through the ICON platform. By '
          },
          {
            logoSrc: 'https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/657030de-ffaa-4dde-b707-e753c7c6b854.jpg',
            project: 'ICO',
            introduction: 'Interconnecting blockchain network',
            totalScore: '9.5',
            irAbstract: 'ICON is an interconnecting blockchain network. ICON can connect independent blockchains without the use of additional third-party intermediaries. Various blockchains can communicate with each other through the ICON platform. By '
          }
        ]
      }
    },
    mounted() {
      new Swiper('#top_banner', {
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          disableOnInteraction: false,
        },
      })
      new Swiper('#adv_banner', {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

