<template>
  <div class="page" id="list_page">
    <vheader/>
    <div class="maintainer">
      <div class="follow_content" id="article">
        <div class="fish_container list_container">
          <div class="clearfix">
            <div class="center">
              <div class="topbangdan">
                <div class="trow">
                  <div class="item">
                    <p class="itit">项目总量</p>
                    <p class="inum">{{topbangdan.totalProject}}</p>
                  </div>
                </div>
                <div class="trow">
                  <div class="item">
                    <p class="itit">项目相关人员总数</p>
                    <p class="inum">{{topbangdan.totalRelatedProjectPerson}}</p>
                  </div>
                </div>
                <div class="trow">
                  <div class="item">
                    <p class="itit">白皮书收录总数</p>
                    <p class="inum">{{topbangdan.totalWhitePaper}}</p>
                  </div>
                </div>
              </div>
              <div class="topproduct">
                <div class="pcol" v-for="(item, index) in topbangdan.topProject" :key="index">
                  <div class="prod">
                    <div class="picon" :data="item.project" :name="'no_content_'+index" :id="'list_prod_logo_'+index" :value="item.project"
                    @click="goArticle('/project',{sid: item.sid}, $event),
                            trackUtmproject('榜单页', item.project, item.sid, parseInt(index+1))">
                      <img src="../assets/media.jpg" :src="item.logoSrc">
                    </div>
                    <span class="pname" :data="item.project" :name="'list_prod_spanTitle_'+index" :id="'list_prod_spanTitle_'+index"
                          @click="goArticle('/project',{sid: item.sid}, $event), trackProject('榜单页广告位', item.project, item.sid, '广告位没有排行榜位置', '接口没有项目总分')">{{item.project}}</span>
                  </div>
                </div>
              </div>
              <div class="listBox">
                <div class="listBox_top">
                  <h4 class="list_title">全球项目榜单</h4>
                  <div class="tabBtn">
                    <button class="btnStyle" data="查看周榜" name="zhoubang" id="zhoubang" :class="type==='周榜'?'active':''" @click="changeList('周榜')">周榜
                    </button>
                    <button class="btnStyle" data="查看月榜" name="yuebang" id="yuebang" :class="type==='月榜'?'active':''" @click="changeList('月榜')">月榜
                    </button>
                  </div>
                </div>
                <div class="listBox_content">
                  <div class="table-responsive">
                    <table class="table table-striped table-hover">
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>项目名称</th>
                        <th>
                          总分
                          <img src="../assets/help.png" alt="帮助"
                               title="总分最高为5分。"/>
                        </th>
                        <th>
                          团队真实性
                          <img src="../assets/help.png" alt="帮助"
                               title="Bvaluate自建知识库通过LinkedIn等各国职场社交应用及项目方提供的团队信息等，以文本挖掘及图像识别技术提取并关联相关信息，以构建知识图谱并进行多维比对交叉验真工作。本项最高0.9625分。">
                        </th>
                        <th>
                          团队社交活跃度
                          <img src="../assets/help.png" alt="帮助"
                               title="Bvaluate全面采集全球垂直新闻媒体及自媒体数据，分析项目及团队核心成员的热度。本项最高0.2625分。"/>
                        </th>
                        <th>
                          团队关联度
                          <img src="../assets/help.png" alt="帮助"
                               title="基于Bvaluate人物库及行业相关信息，通过已构建的知识图谱，分析各项目团队间关联关系。本项最高0.175分。"/>
                        </th>
                        <th>
                          团队完整性
                          <img src="../assets/help.png" alt="帮助"
                               title="基于团队成员架构并应用命名实体识别技术，提取其团队的组织架构，判断其完整性。本项最高0.35分。"/>
                        </th>
                        <th>
                          白书皮
                          <img src="../assets/help.png" alt="帮助"
                               title="在Bvaluate全球最大的项目白皮书数据库中，所有项目白皮书均应用NLP技术进行全库文本比对，并对其重复率、完整性、版本迭代等进行综合分析。本项最高1.05分。"/>
                        </th>
                        <th>
                          行业热度
                          <img src="../assets/help.png" alt="帮助"
                               title="Bvaluate基于全球行业相关新闻及自媒体数据采集，通过文本内容实时分析并匹配行业热度。本项最高0.45分。"/>
                        </th>
                        <th>
                          媒体关注度
                          <img src="../assets/help.png" alt="帮助"
                               title="Bvaluate基于全球行业相关新闻及自媒体数据采集，通过文本内容实时分析并匹配行业热度。本项最高0.45分。"/>
                        </th>
                        <th>
                          宣传力度
                          <img src="../assets/help.png" alt="帮助"
                               title="通过Bvaluate对全球多语种信息采集内容的归纳，分析每个项目实时的媒体/自媒体覆盖度。本项最高0.15分。"/>
                        </th>
                        <th>
                          市场情绪
                          <img src="../assets/help.png" alt="帮助"
                               title="通过市场反馈对项目团队、产品、推广、通证价格，以及所属行业、地域等进行调性综合分析。本项最高0.45分。"/>
                        </th>
                        <th>
                          钱包监控
                          <img src="../assets/help.png" alt="帮助"
                               title="通过对项目通证场外流转情况进行活跃度、大额交易动态占比、交易所流向占比等进行综合分析。本项最高0.5分。"/>
                        </th>
                        <th>
                          代码活跃度
                          <img src="../assets/help.png" alt="帮助"
                               title="实时追踪所有开源项目的代码更新情况，如频率、贡献度等。Bvaluate专家团队在不断研究代码内容分析方法。本项最高0.5分。"/>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr class="tr_default" v-for="(item,index) in list">
                        <td v-if="index === 0" class="tr_first"><span>{{index + 1 }}</span></td>
                        <td v-else-if="index === 1" class="tr_second"><span>{{index + 1 }}</span></td>
                        <td v-else-if="index === 2" class="tr_third"><span>{{index + 1 }}</span></td>
                        <td v-else><span>{{index + 1 }}</span></td>
                        <td class="tr_first cursor_style" :data="item.project" :name="'list_tr_default_td_'+index" :id="'list_tr_default_td_'+index"
                            @click.stop="goArticle('/project',{sid: item.sid}, $event), trackProject('排行榜', item.project, item.sid, parseInt(index+1), item.rankingTotalScore)">
                          <h4 :title="item.project">{{item.project}}</h4>
                        </td>
                        <td>{{item.rankingTotalScore }}</td>
                        <td>{{item.teamAuthenticity }}</td>
                        <td>{{item.teamIntegrity }}</td>
                        <td>{{item.teamSocialActivity }}</td>
                        <td>{{item.projectTeamRelation }}</td>
                        <td>{{item.whitpaperAnalysis }}</td>
                        <td>{{item.industryAnalysis }}</td>
                        <td>{{item.mediaAttention }}</td>
                        <td>{{item.advertisingDegree }}</td>
                        <td>{{item.negativeImpact }}</td>
                        <td>{{item.walletSupervision }}</td>
                        <td>{{item.githubActivity }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="moreBox" v-if="!(showloading === -1)">
                    <button :disabled="showloading" class="relaodMore" @click="reMore()" name="search_submit" id="moreBox" value="加载更多" data="加载更多">
                      <img v-if="showloading" :src="loading"/>
                      <span v-if="!showloading">加载更多</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="adv_swiper" id="list_page_adv">
                <div class="swiper-container" id="right_swiper">
                  <div class="swiper-wrapper">
                    <!-- <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div>
                    <div class="swiper-slide" :style="'background-image: url('+img3+')'"></div> -->
                    <div class="swiper-slide"><img src="../assets/bangdan1.jpg"></div>
                    <div class="swiper-slide"><img src="../assets/bangdan2.jpg"></div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <div class="swiper-button-prev"></div><!--左箭头-->
                  <div class="swiper-button-next"></div><!--右箭头-->
                </div>
              </div>
              <div class="letf_list_up">
                <div class="listBox_top">
                  <h4 class="list_title">涨幅排行</h4>
                  <div class="tabBtn">
                    <h4>CNY</h4>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>货币名称</th>
                      <th>成交额（一天）</th>
                      <th>价格</th>
                      <th>涨幅</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tr_default" v-for="(item,index) in upList">
                      <td v-if="index === 0" class="tr_first"><span>{{index + 1 }}</span></td>
                      <td v-else-if="index === 1" class="tr_second"><span>{{index + 1 }}</span></td>
                      <td v-else-if="index === 2" class="tr_third"><span>{{index + 1 }}</span></td>
                      <td v-else><span>{{index + 1 }}</span></td>
                      <td class="tr_first cursor_style">
                        <h4 :title="item.name">{{item.name}}</h4>
                      </td>
                      <td>{{item.turnover1day}}</td>
                      <td>{{item.price}}</td>
                      <td>{{item.increase}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="letf_list_down">
                <div class="listBox_top">
                  <h4 class="list_title">跌幅排行</h4>
                  <div class="tabBtn">
                    <h4>CNY</h4>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>货币名称</th>
                      <th>成交额（一天）</th>
                      <th>价格</th>
                      <th>跌幅</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tr_default" v-for="(item,index) in downList">
                      <td v-if="index === 0" class="tr_first"><span>{{index + 1 }}</span></td>
                      <td v-else-if="index === 1" class="tr_second"><span>{{index + 1 }}</span></td>
                      <td v-else-if="index === 2" class="tr_third"><span>{{index + 1 }}</span></td>
                      <td v-else><span>{{index + 1 }}</span></td>
                      <td class="tr_first cursor_style">
                        <h4 :title="item.name">{{item.name}}</h4>
                      </td>
                      <td>{{item.turnover1day}}</td>
                      <td>{{item.price}}</td>
                      <td>{{item.increase}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <vfooter/>
    </div>
    <!--<div class="popover fade bottom in" role="tooltip" id="popover91482">-->
    <!--<div class="arrow" style="left: 50%;"></div>-->
    <!--<div class="popover-content">-->
    <!--<ul>-->
    <!--<li class="wechat"><i class="fa fa-wechat"></i></li>-->
    <!--<li class="weibo"><i class="fa fa-weibo"></i></li>-->
    <!--<li class="qq"><i class="fa fa-qq"></i></li>-->
    <!--<li class="more">更多分享</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import Swiper from 'swiper';

  let img1 = require('../assets/follow/banner01.png');
  let img2 = require('../assets/follow/adv01.png');
  let img3 = require('../assets/media.jpg');
  let loading = require('../assets/login/loading.gif');


  export default {
    data() {
      return {
        list: [],
        banner1: img1,
        img2: img2,
        img3: img3,
        showloading: true,
        loading: loading,
        type: '周榜',
        upList: [],
        downList: [],
        pageSize: 50,
        isShow: false,
        successGo: '',
        topbangdan: []
      }
    },
    mounted() {
      new Swiper('#right_swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
      this.getUpList();
      this.getDate();
      this.getDownList();
      this.getTopBangdan();
    },
    methods: {
      success() {
        // console.log(123456)
      },
      isLogin(url) {
        this.$store.state.loginPop = true;
      },
      goArticle(url, query, event) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');

        sensors.quick('trackHeatMap', event.currentTarget);
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
      trackUtmproject(title, name, project_id, order) {
        sensors.track('Utmproject', {
          title: title,
          name: name,
          project_id: project_id,
          order: order
        });
      },
      getDate() {
        let that = this;
        that.showloading = true;
        that.$axios.get('/api/hotICO/list?type=' + that.type + '&pageSize=' + that.pageSize).then(function (res) {
          that.showloading = false;
          that.list = res.data;
          if (that.pageSize >= 100) {
            that.showloading = -1;
          }
          that.pageSize += 50;
        });
      },
      reMore() {
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          this.getDate()
        } else {
          this.isLogin(null);
        }
      },
      getUpList() {
        let that = this;
        that.$axios.get('/api/hotICO/priceList?type=inc&pageSize=15').then(function (res) {
          that.upList = res.data;
        });
      },
      getDownList() {
        let that = this;
        that.$axios.get('/api/hotICO/priceList?type=dec&pageSize=15').then(function (res) {
          that.downList = res.data;
        });
      },
      changeList(type) {
        this.pageSize = 50;
        this.type = type;
        this.list = [];
        this.getDate();
      },
      getTopBangdan() {
        let that = this;
        that.$axios.get('/api/ICO/icoRank?type=周榜&pageNo=0&pageSize=3').then(function (res) {
          that.topbangdan = res.data
        });
      },
      refreshPage() {
        window.location.reload();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

