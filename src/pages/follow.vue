<template>
  <div class="page follow_page">
    <v2header/>
    <div class="v2maintainer">
      <div class="follow_content">
        <div class="fish_container">
          <div class="clearfix">
            <div class="left">
              <ul class="menu_bar">
                <li @click="tabhide(), getxiangmu()" :class="{active: xiangmu}">{{$t('Project')}}</li>
                <li @click="tabhide(), gethangye()" :class="{active: hangye}">{{$t('Industry')}}</li>
                <li @click="tabhide(), getguojia()" :class="{active: guojia}">{{$t('Nation')}}</li>
                <li @click="tabhide(), getzuozhe()" :class="{active: zuozhe}">{{$t('The author')}}</li>
                <li @click="tabhide(), getwenzhang()" :class="{active: wenzhang}">{{$t('Collect articles')}}</li>
              </ul>
            </div>
            <div class="center">
              <div class="tab_item" v-if="xiangmu">
                <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>{{$t('Recommend')}}</h4>
                  </div>
                  <div class="follow_list serach_follow_list">
                    <div class="project_list_box" v-for="(item, index) in tuijian_xiangmuList" :key="index">
                      <div class="project_info">
                        <div class="left">
                          <div class="logo_box" :data="item.project" 
                          :name="'follow_xiangmu_logo_box_'+index" :id="'follow_xiangmu_logo_box_'+index" 
                          @click="goArticle('/project',{sid: item.sid}, $event), 
                                  trackProject('关注页推荐项目', item.project, item.sid, '推荐项目没有排行榜位置', item.totalScore)">
                            <img :src="item.logoSrc"/>
                          </div>
                        </div>
                        <div class="right">
                          <div class="base_info">
                            <div class="left">
                              <h4>
                                <span v-html="item.project" :data="item.project" 
                                :name="'follow_xiangmu_h4span_'+index" :id="'follow_xiangmu_h4span_'+index" 
                                @click="goArticle('/project',{sid: item.sid}, $event), 
                                        trackProject('关注页推荐项目', item.project, item.sid, '推荐项目没有排行榜位置', item.totalScore)"></span>
                                <i class="fa fa-heart-o" @click="setFollow(item.sid, 'xiangmu'), trackAttention('项目', item.project)"></i>
                              </h4>
                              <p>{{item.introduction }} </p>
                            </div>
                            <div class="right">
                              <h4>{{item.totalScore }}</h4>
                              <p>{{$t('Total score')}}</p>
                            </div>
                          </div>
                          <div class="detail_info">
                            <p>{{item.irAbstract }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>{{$t('Followed')}}</h4>
                  </div>
                  <div class="follow_list serach_follow_list">
                    <div class="project_list_box" v-for="(item, index) in xiangmuList" :key="index">
                      <div class="project_info">
                        <div class="left">
                          <div class="logo_box" :data="item.result.project" 
                          :name="'follow_xiangmu2_logo_box_'+index" :id="'follow_xiangmu2_logo_box_'+index" 
                          @click="goArticle('/project',{sid: item.result.sid}, $event), 
                          trackProject('关注页已关注项目', item.result.project, item.result.sid, '已关注项目没有排行榜位置', item.result.totalScore)">
                            <img :src="item.result.logoSrc"/>
                          </div>
                        </div>
                        <div class="right">
                          <div class="base_info">
                            <div class="left">
                              <h4>
                                <span v-html="item.result.project" :data="item.result.project" 
                                :name="'follow_xiangmu2_h4span_'+index" :id="'follow_xiangmu2_h4span_'+index" 
                                @click="goArticle('/project',{sid: item.result.sid}, $event), 
                                        trackProject('关注页已关注项目', item.result.project, item.result.sid, '已关注项目没有排行榜位置', item.result.totalScore)"></span>
                                <i class="fa fa-heart" @click="deleteFollow(item.cid, 'xiangmu')"></i>
                              </h4>
                              <p>{{item.result.introduction }} </p>
                            </div>
                            <div class="right">
                              <h4>{{item.result.totalScore }}</h4>
                              <p>{{$t('Total score')}}</p>
                            </div>
                          </div>
                          <div class="detail_info">
                            <p>{{item.result.irAbstract }}</p>
                          </div>
                        </div>
                         <!-- 没有数据加载样式 -->
                        <div class="notmore" v-if="showNotMore">
                            <div class="not-box">
                                <img src="../assets/list/shuju.png" alt="">
                                <p>暂无数据，请<span @click="aginLoad">重新加载</span></p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" data="加载更多" value="加载更多" name="xiangmu_loading_more" id="xiangmu_loading_more" @click.stop="getxiangmu()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">{{$t('Load more')}}</span>
                    </button>
                  </div>
                  
                </div>
              </div>
              <div class="tab_item" v-if="hangye">
                <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>{{$t('Recommend')}}</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="(item, index) in tuijian_hangyeList" :key="index">
                        <p :name="'follow_hangye_item_'+index" :id="'follow_hangye_item_'+index" :data="item" @click="goIndustryByIndustry(item, $event)">{{item}}</p>
                        <i class="fa fa-heart-o" @click="setFollow('', 'hangye', item), trackAttention('行业', item)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>{{$t('Followed')}}</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="(item, index) in hangyeList" :key="index">
                        <p :name="'follow_hangye2_item_'+index" :id="'follow_hangye2_item_'+index" :data="item.result" @click="goIndustryByIndustry(item.result, $event)">{{item.result}}</p>
                        <i class="fa fa-heart" @click="deleteFollow(item.cid, 'hangye')"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" data="加载更多" value="加载更多" name="hangye_loading_more" id="hangye_loading_more" @click.stop="gethangye()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">{{$t('Load more')}}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tab_item" v-if="guojia">
                <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>{{$t('Recommend')}}</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="(item, index) in tuijian_guojiaList" :key="index">
                        <p :name="'follow_guojia_item_'+index" :id="'follow_guojia_item_'+index" :data="item" @click="goIndustryByCountry(item, $event)">{{item}}</p>
                        <i class="fa fa-heart-o" @click="setFollow('', 'guojia', item), trackAttention('国家', item)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>{{$t('Followed')}}</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="(item, index) in guojiaList" :key="index">
                        <p :name="'follow_guojia2_item_'+index" :id="'follow_guojia2_item_'+index" :data="item.result" @click="goIndustryByCountry(item.result, $event)">{{item.result}}</p>
                        <i class="fa fa-heart" @click="deleteFollow(item.cid, 'guojia')"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" data="加载更多" value="加载更多" name="guojia_loading_more" id="guojia_loading_more" @click.stop="getguojia()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">{{$t('Load more')}}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="tab_item" v-if="zuozhe">
                <div class="item_list_top">
                  <div class="item_list_title">
                    <h4>{{$t('Recommend')}}</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="(item, index) in tuijian_zuozheList" :key="index">
                        <p :name="'follow_zuozhe_item_'+index" :id="'follow_zuozhe_item_'+index" :data="item" @click="goArticle('/author',{author: item,type: 'author'}, $event)">{{item}}</p>
                        <i class="fa fa-heart-o" @click="setFollow('', 'zuozhe', item), trackAttention('作者', item)"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="item_list_bottom">
                  <div class="item_list_title">
                    <h4>{{$t('Followed')}}</h4>
                  </div>
                  <div class="follow-industry-recommend">
                    <ul>
                      <li v-for="(item, index) in zuozheList" :key="index">
                        <p :name="'follow_zuozhe2_item_'+index" :id="'follow_zuozhe2_item_'+index" :data="item.result" @click="goArticle('/author',{author: item.result,type: 'author'}, $event)">{{item.result}}</p>
                        <i class="fa fa-heart" @click="deleteFollow(item.cid, 'zuozhe')"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="loading_more">
                    <button :disabled="showloading" data="加载更多" value="加载更多" name="zuozhe_loading_more" id="zuozhe_loading_more" @click.stop="getzuozhe()" v-if="!(showloading===-1)">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">{{$t('Load more')}}</span>
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
                              <div class="newimg_box" :data="item.result.title" 
                              :name="'follow_wenzhang_newimg_box_'+index" :id="'follow_wenzhang_newimg_box_'+index" 
                              @click="goArticle('/article',{sid:item.result.sid}, $event), 
                              trackArticle('关注页收藏文章', item.result.title, '关注页内收藏文章没有项目名称', '关注页内收藏文章没有项目ID', '收藏文章', item.result.sid)">
                                <img v-if="item.result.titlePicture" :src="item.result.titlePicture"/>
                                <div class="date_box">
                                  <span class="day">{{item.result.urlTime | showDay}}</span>
                                  <span class="years">{{item.result.urlTime | showYear}}</span>
                                </div>
                              </div>
                            </div>
                            <div class="media-body">
                              <h4 class="media-heading" :data="item.result.title" 
                              :name="'follow_wenzhang_media-heading_'+index" :id="'follow_wenzhang_media-heading_'+index" 
                              @click="goArticle('/article',{sid:item.result.sid}, $event), 
                              trackArticle('关注页收藏文章', item.result.title, '关注页内收藏文章没有项目名称', '关注页内收藏文章没有项目ID', '收藏文章', item.result.sid)">{{item.result.title}}</h4>
                              <p class="media-words">{{item.result.content}}</p>
                              <div class="media-bottom">
                                <ul>
                                  <li
                                    :name="'follow_wenzhang_author_'+index" :id="'follow_wenzhang_author_'+index" 
                                    :data="item.result.author">
                                    <div class="userimg">
                                      <img src="../assets/follow/user_head.png">
                                    </div>
                                    <span class="author">{{item.result.author}}</span>
                                  </li>
                                  <li>{{item.result.urlDate | dataFormat}}</li>
                                  <li data-toggle="modal" data-target="#deleteModal" class="love" @click="deleteFollow(item.cid, 'wenzhang')">
                                    <i class="fa fa-heart"></i>已收藏
                                  </li>
                                </ul>
                                <div class="tips"
                                     :name="'follow_wenzhang_projectCategory_'+index" :id="'follow_wenzhang_projectCategory_'+index" 
                                     v-if="item.result.projectCategory !==null && item.result.projectCategory !== '' && item.result.projectCategory !==undefined && item.result.projectCategory !=='NULL'"
                                     @click="goProjectByName(item.result.projectCategory, $event), trackProject('关注页收藏文章的项目标签', item.result.projectCategory, '关注页收藏文章的项目标签没有项目ID', '关注页收藏文章的项目标签没有排行榜位置', '关注页收藏文章的项目标签没有项目总分')"
                                     :data="item.result.projectCategory"
                                >
                                  {{item.result.projectCategory | labelFormat}}
                                </div>
                                <div class="tips"
                                     :name="'follow_wenzhang_industryCategory_'+index" :id="'follow_wenzhang_industryCategory_'+index" 
                                     v-else-if="item.result.industryCategory !==null && item.result.industryCategory !== '' && item.result.industryCategory !==undefined && item.result.industryCategory !=='NULL'"
                                     @click="goIndustryByIndustry(item.result.industryCategory, $event)"
                                     :data="item.result.industryCategory"
                                >
                                  {{item.result.industryCategory | labelFormat}}
                                </div>
                                <div class="tips"
                                     :name="'follow_wenzhang_countryCategory_'+index" :id="'follow_wenzhang_countryCategory_'+index" 
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
                            <button :disabled="showloading" data="加载更多" value="加载更多" name="wenzhang_loading_more" id="wenzhang_loading_more" @click.stop="getwenzhang()">
                              <img v-if="showloading" :src="loading"/>
                              <span v-if="!showloading">{{$t('Load more')}}</span>
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
      <transition name="fade">
        <vtips :tipText="tipText" v-if="showTip"/>
      </transition>
      <v2footer/>
    </div>

  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
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
        loading: loading,
        xiangmuList: [],
        hangyeList: [],
        guojiaList: [],
        zuozheList: [],
        wenzhangList: [],
        pageSize: 5,
        tuijian_xiangmuList: [],
        tuijian_hangyeList: [],
        tuijian_guojiaList: [],
        tuijian_zuozheList: [],
        tuijian_wenzhangList: [],
        tuijian_pageSize: 5,
        showloading: false,
        tuijian_showloading: false,
        token: '',
        uid: '',
        tipText: '',
        showTip: false
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
      trackAttention(category, name) {
        sensors.track('Attention', {
          attention_category: category,
          attention_name: name
        });
      },
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
      tabhide() {
        this.xiangmu = false
        this.hangye = false
        this.guojia = false
        this.zuozhe = false
        this.wenzhang = false
        this.pageSize = 5
        this.tuijian_pageSize = 5
      },
      getxiangmu() {
        this.xiangmu = true
        let that = this;
        that.showloading = true;
        // 已关注
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
          that.pageSize += 5;
        })
        // 推荐
        let tuijian_url = '/api/individual/recommend?type=ICO&pageSize=' + that.tuijian_pageSize;
        let tuijian_headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: tuijian_url,
          headers: tuijian_headers
        }).then(function (res) {
          that.tuijian_xiangmuList = res.data.slice(0,3);
          that.tuijian_showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.tuijian_showloading = -1
          }
          that.tuijian_pageSize += 5;
        })
      },
      gethangye() {
        this.hangye = true
        let that = this;
        that.showloading = true;
        // 已关注
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
          that.pageSize += 5;
        })
        // 推荐
        let tuijian_url = '/api/individual/recommend?type=INDUSTRY&pageSize=' + that.tuijian_pageSize;
        let tuijian_headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: tuijian_url,
          headers: tuijian_headers
        }).then(function (res) {
          that.tuijian_hangyeList = res.data.slice(0,5);
          that.tuijian_showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.tuijian_showloading = -1
          }
          that.tuijian_pageSize += 5;
        })
      },
      getguojia() {
        this.guojia = true
        let that = this;
        that.showloading = true;
        // 已关注
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
          that.pageSize += 5;
        })
        // 推荐
        let tuijian_url = '/api/individual/recommend?type=COUNTRY&pageSize=' + that.tuijian_pageSize;
        let tuijian_headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: tuijian_url,
          headers: tuijian_headers
        }).then(function (res) {
          that.tuijian_guojiaList = res.data.slice(0,5);
          that.tuijian_showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.tuijian_showloading = -1
          }
          that.tuijian_pageSize += 5;
        })
      },
      getzuozhe() {
        this.zuozhe = true
        let that = this;
        that.showloading = true;
        // 已关注
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
          that.pageSize += 5;
        })
        // 推荐
        let tuijian_url = '/api/individual/recommend?type=AUTHOR&pageSize=' + that.tuijian_pageSize;
        let tuijian_headers = {'uid': that.uid, 'Authorization': that.token};
        that.$axios({
          method: 'get',
          url: tuijian_url,
          headers: tuijian_headers
        }).then(function (res) {
          that.tuijian_zuozheList = res.data.slice(0,5);
          that.tuijian_showloading = false;
          if (that.pageSize >= res.data.totalElements) {
            that.tuijian_showloading = -1
          }
          that.tuijian_pageSize += 5;
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
          that.pageSize += 5;
        })
      },
      setFollow(sid, val, name) {
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let url = ''
          let uid = localStorage.getItem('apelink_user_uid');
          let arr = [
            {name: 'xiangmu', url: '/individual/add?type=ICO&sid=', type: 1},
            {name: 'hangye', url: '/individual/add?type=INDUSTRY&name=', type: 0},
            {name: 'guojia', url: '/individual/add?type=COUNTRY&name=', type: 0},
            {name: 'zuozhe', url: '/individual/add?type=AUTHOR&name=', type: 0},
          ]
          arr.forEach(function(item, index) {
            if(val == item.name ) {
              url = item.url + ((item.type) ? sid : name);
              let headers = {'uid': uid, 'Authorization': token};
              that.$axios({
                method: 'post',
                url: url,
                headers: headers
              }).then(function (res) {
                if (res.data) {
                  that.showTip = true;
                  that.tipText = '收藏成功';
                  setTimeout(() => {
                    that.showTip = false;
                    that.tipText = '';
                  }, 1300);
                  if (item.name == 'xiangmu') {that.getxiangmu();}
                  if (item.name == 'hangye') {that.gethangye();}
                  if (item.name == 'guojia') {that.getguojia();}
                  if (item.name == 'zuozhe') {that.getzuozhe();}
                }else{
                  that.showTip = true;
                  that.tipText = res.data;
                  setTimeout(() => {
                    that.showTip = false;
                    that.tipText = '';
                  }, 1300);
                }
              }).catch(function (error) {
                // layui.use('layer', function(){
                //   var layer = layui.layer;
                //   layer.msg(error.data.message);
                // });
                console.error(error.data.message);
              })
            }
          })
        } else {
          alert('请先登录');
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
      },
      goArticle(url, query, event) {
        let routeData = this.$router.resolve({path: url, query: query});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goProjectByName(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/project', query: {project: obj}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href, '_blank');
      },
      goIndustryByIndustry(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {industry: obj, pageTitle: '行业文章列表'}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href);
      },
      goIndustryByCountry(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {country: obj, pageTitle: '国家文章列表'}});
        sensors.quick('trackHeatMap', event.currentTarget);
        window.open(routeData.href);
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
<style lang="scss" scoped>
</style>

