<template>
  <div class="page follow_page">
    <vheader/>
    <div class="maintainer">
      <div class="follow_content">
        <div class="fish_container">
          <div class="clearfix">
            <div class="left">
              <ul class="menu_bar">
                <li @click="tabhide(), getxiangmu()" :class="{active: xiangmu}">项目</li>
                <li @click="tabhide(), gethangye()" :class="{active: hangye}">行业</li>
                <li @click="tabhide(), getguojia()" :class="{active: guojia}">国家</li>
                <li @click="tabhide(), getzuozhe()" :class="{active: zuozhe}">作者</li>
                <li @click="tabhide(), getwenzhang()" :class="{active: wenzhang}">收藏文章</li>
              </ul>
            </div>
            <div class="center">
              <div class="tab_item" v-if="xiangmu">
                <!-- <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>推荐</h4>
                  </div>
                  <div class="follow_list serach_follow_list">
                    <div class="project_list_box" v-for="project in tuijian_xiangmuList">
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
                </div> -->
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>已关注</h4>
                  </div>
                  <div class="follow_list serach_follow_list">
                    <div class="project_list_box" v-for="item in xiangmuList">
                      <div class="project_info">
                        <div class="left">
                          <div class="logo_box" @click="goProjectById(item.result.sid)">
                            <img :src="item.result.logoSrc"/>
                          </div>
                        </div>
                        <div class="right">
                          <div class="base_info">
                            <div class="left">
                              <h4>
                                <span v-html="item.result.project" @click="goProjectById(item.result.sid)"></span>
                                <i class="fa fa-heart" @click="deleteFollow(item.cid, 'xiangmu')"></i>
                              </h4>
                              <p>{{item.result.introduction }} </p>
                            </div>
                            <div class="right">
                              <h4>{{item.result.totalScore }}</h4>
                              <p>总分</p>
                            </div>
                          </div>
                          <div class="detail_info">
                            <p>{{item.result.irAbstract }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" @click.stop="getxiangmu()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">加载更多</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tab_item" v-if="hangye">
                <!-- <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>推荐</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="item in tuijian_hangyeList">
                        <p>{{item.project}}</p>
                        <i class="fa fa-heart-o" @click="setFollow(item.sid, 'hangye')"></i>
                      </li>
                    </ul>
                  </div>
                </div> -->
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>已关注</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="item in hangyeList">
                        <p>{{item.result}}</p>
                        <i class="fa fa-heart" @click="deleteFollow(item.cid, 'hangye')"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" @click.stop="gethangye()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">加载更多</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tab_item" v-if="guojia">
                <!-- <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>推荐</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li>
                        <p>代币</p>
                        <i class="fa fa-heart-o" v-if="true" @click="setFollow(even,project)"></i>
                        <i class="fa fa-heart" v-else></i>
                      </li>
                    </ul>
                  </div>
                </div> -->
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>已关注</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="item in guojiaList">
                        <p>{{item.result}}</p>
                        <i class="fa fa-heart" @click="deleteFollow(item.cid)"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" @click.stop="getguojia()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">加载更多</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tab_item" v-if="zuozhe">
                <!-- <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>推荐</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li>
                        <p>代币</p>
                        <i class="fa fa-heart-o" v-if="true" @click="setFollow(even,project)"></i>
                        <i class="fa fa-heart" v-else></i>
                      </li>
                    </ul>
                  </div>
                </div> -->
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>已关注</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="item in zuozheList">
                        <p>{{item.result}}</p>
                        <i class="fa fa-heart" @click="deleteFollow(item.cid, 'zuozhe')"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" @click.stop="getzuozhe()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">加载更多</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tab_item" v-if="wenzhang">
                <div class="follow_list">
                  <ul>
                    <li>
                      <div class="list-item">
                        <div class="medialist">
                          <div class="media" v-for="(item, index) in wenzhangList" :key="item.sid">
                            <div class="media-left media-middle"
                                 v-if="item.result.dataType === 'NEWS'||item.result.dataType === 'WEIXIN'">
                              <div class="newimg_box" @click="goArticle('/article',{sid:item.result.sid})">
                                <img v-if="item.result.titlePicture" :src="item.result.titlePicture"/>
                                <div class="date_box">
                                  <span class="day">{{item.result.urlTime | showDay}}</span>
                                  <span class="years">{{item.result.urlTime | showYear}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="media-body">
                              <h4 class="media-heading" @click="goArticle('/article',{sid:item.result.sid})">{{item.result.title}}</h4>
                              <p class="media-words">{{item.result.content}}</p>
                              <div class="media-bottom">
                                <ul>
                                  <li
                                    v-if="!(item.result.siteName !== 'NULL' && item.result.siteName !== null && item.result.siteName !== '')"
                                    @click="goArticle('/author',{author: item.result.author,type: 'author'})">
                                    <div class="userimg">
                                      <img src="../assets/follow/user_head.png">
                                    </div>
                                    <span class="author">{{item.result.author}}</span>
                                  </li>
                                  <li v-else @click="goArticle('/author',{author: item.result.siteName,type: 'siteName'})">
                                    <span class="author">{{item.result.siteName}}</span>
                                  </li>
                                  <li>{{item.result.urlDate | dataFormat}}</li>
                                  <li data-toggle="modal" data-target="#deleteModal" class="love" @click="deleteFollow(item.cid, 'wenzhang')">
                                    <i class="fa fa-heart"></i>已收藏
                                  </li>
                                </ul>
                                <div class="tips"
                                     v-if="item.result.projectCategory !==null && item.result.projectCategory !== '' && item.result.projectCategory !==undefined && item.result.projectCategory !=='NULL'"
                                     @click="goProjectByName(item.result.projectCategory)"
                                >
                                  {{item.result.projectCategory | labelFormat}}
                                </div>
                                <div class="tips"
                                     v-else-if="item.result.industryCategory !==null && item.result.industryCategory !== '' && item.result.industryCategory !==undefined && item.result.industryCategory !=='NULL'"
                                     @click="goIndustryByIndustry(item.result.industryCategory)"
                                >
                                  {{item.result.industryCategory | labelFormat}}
                                </div>
                                <div class="tips"
                                     v-else="item.result.countryCategory !==null && item.result.countryCategory !== '' && item.result.countryCategory !==undefined && item.result.countryCategory !=='NULL'"
                                     @click="goIndustryByCountry(item.result.countryCategory)"
                                >
                                  {{item.result.countryCategory | labelFormat}}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="loading_more" v-if="!(showloading === -1)">
                            <button :disabled="showloading" @click.stop="getwenzhang()">
                              <img v-if="showloading" :src="loading"/>
                              <span v-if="!showloading">加载更多</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
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
        xiangmu: true,
        hangye: false,
        guojia: false,
        zuozhe: false,
        wenzhang: false,
        colorList: ['red', 'yellow', 'gray', 'pink'],
        banner1: img1,
        img2: img2,
        img3: img3,
        labelMore: false,
        showloading: false,
        loading: loading,
        xiangmuList: [],
        hangyeList: [],
        guojiaList: [],
        zuozheList: [],
        wenzhangList: [],
        pageSize: 10,
        tuijian_xiangmuList: [],
        tuijian_hangyeList: [],
        tuijian_guojiaList: [],
        tuijian_zuozheList: [],
        tuijian_wenzhangList: [],
        tuijian_pageSize: 10,
        token: '',
        uid: ''
      }
    },
    mounted() {
      this.token = localStorage.getItem('apelink_user_token');
      this.uid = localStorage.getItem('apelink_user_uid');
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

      this.getxiangmu()
    },
    methods: {
      tabhide() {
        this.xiangmu = false
        this.hangye = false
        this.guojia = false
        this.zuozhe = false
        this.wenzhang = false
        this.pageSize = 10
        this.tuijian_pageSize = 10
      },
      getxiangmu() {
        this.xiangmu = true
        let that = this;
        that.showloading = true;
        let url = '/api/individual/list?type=ICO&pageSize=' + that.pageSize;
        let headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.xiangmuList = res.data.content;
          that.showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.showloading = -1
          }
          that.pageSize += 10;
        })
      },
      gethangye() {
        this.hangye = true
        let that = this;
        that.showloading = true;
        let url = '/api/individual/list?type=INDUSTRY&pageSize=' + that.pageSize;
        let headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.hangyeList = res.data.content;
          that.showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.showloading = -1
          }
          that.pageSize += 10;
        })
      },
      getguojia() {
        this.guojia = true
        let that = this;
        that.showloading = true;
        let url = '/api/individual/list?type=COUNTRY&pageSize=' + that.pageSize;
        let headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.guojiaList = res.data.content;
          that.showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.showloading = -1
          }
          that.pageSize += 10;
        })
      },
      getzuozhe() {
        this.zuozhe = true
        let that = this;
        that.showloading = true;
        let url = '/api/individual/list?type=AUTHOR&pageSize=' + that.pageSize;
        let headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.zuozheList = res.data.content;
          that.showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.showloading = -1
          }
          that.pageSize += 10;
        })
      },
      getwenzhang() {
        this.wenzhang = true
        let that = this;
        that.showloading = true;
        let url = '/api/individual/list?type=NEWS&pageSize=' + that.pageSize;
        let headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
          that.wenzhangList = res.data.content;
          that.showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.showloading = -1
          }
          that.pageSize += 10;
        })
      },
      setFollow() {
        let that = this;
        let url = '';
        let industry = this.$route.query.industry;
        let country = this.$route.query.country;
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid');
          if (country) {url = '/api/individual/add?type=COUNTRY&name=' + that.industry; console.log(1)}
          if (industry) {url = '/api/individual/add?type=INDUSTRY&name=' + that.industry; console.log(2)}
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              that.projectFollow = true;
              alert('关注成功');
            }
          });
        } else {
          alert('请先登录。');
        }
      },
      deleteFollow(cid, val) {
        let token = localStorage.getItem('apelink_user_token')
        if (token) {
          let uid = localStorage.getItem('apelink_user_uid')
          let that = this;
          let headers = {'uid': uid, 'Authorization': token};
          let deteleUrl = '/api/individual/delete?cid=' + cid;
          that.$axios({
            method: 'DELETE',
            url: deteleUrl,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              alert('已取消关注');
              if (val == 'xiangmu') {that.getxiangmu();}
              if (val == 'hangye') {that.gethangye();}
              if (val == 'guojia') {that.getguojia();}
              if (val == 'zuozhe') {that.getzuozhe();}
              if (val == 'wenzhang') {that.getwenzhang();}
            }
          })
        } else {
          alert('请先登录。')
        }
      }
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
<style lang="scss" scoped>
</style>

