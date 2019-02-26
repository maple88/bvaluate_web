<template>
  <div class="page v2list">
    <v2header/>
    <div class="v2maintainer pd0">
      <div class="swiper-container" id="list-banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../assets/list/banner.jpg"></div>
          <!-- <div class="swiper-slide"><img src="../assets/list/banner.jpg"></div>
          <div class="swiper-slide"><img src="../assets/list/banner.jpg"></div> -->
        </div>
        <div class="swiper-pagination list-banner-pagination"></div>
        <!-- <div class="swiper-button-prev swiper-button-white"></div> -->
        <!-- <div class="swiper-button-next swiper-button-white"></div> -->
      </div>
      <div class="container v2container">
        <div class="list-container">
          <div class="left">
            <div class="main-table">
              <div class="list-tab">
                <div id="listStep1" v-intro-disable-interaction="true" class="tabtn" :class="listNameType==='总评榜'?'on':''" @click="changeListName('总评榜')">{{$t('Overall list')}}</div>
                <div id="listStep2" v-intro-disable-interaction="true" class="tabtn" :class="listNameType==='sto榜'?'on':''" @click="changeListName('sto榜')">{{$t('STO list')}}</div>
              </div>
              <div class="table-filter">
                <div>
                  <div class="layui-form" v-show="listNameType !== 'sto榜'" data-v-step="3">
                    <select name="hot-industry" v-model="industry" lay-filter="hot-industry">
                      <option value="">{{$t('Hot industry')}}</option>
                      <option :value="item.categoryName" v-for="(item, index) in hostIndustries" :key="index">{{item.categoryName}}</option>
                    </select> 
                    <select name="hot-country" v-model="country" lay-filter="hot-country">
                      <option value="">{{$t('Hot nation')}}</option>
                      <option :value="item.countName" v-for="(item, index) in guojiaList" :key="index">{{item.countName}}</option>
                    </select>
                  </div>
                </div>
                <div class="layui-form month-week">
                  <select name="month-week" v-model="listDateType" lay-filter="month-week">
                    <option value="周榜">{{$t('Weekly list')}}</option>
                    <option value="月榜">{{$t('Monthly list')}}</option>
                  </select>
                </div>
                <div class="weekmonth-group">
                  <div class="wmbtn" :class="listDateType==='周榜'?'on':''" @click="changeListDate('周榜')">{{$t('Weekly list')}}</div>
                  <div class="wmbtn" :class="listDateType==='月榜'?'on':''" @click="changeListDate('月榜')">{{$t('Monthly list')}}</div>
                </div>
              </div>
              <div class="table-box main-table-box">
                <table id="main-list-table" lay-filter="main-list-table"></table>
                <div class="table-loading" v-if="mainloading">
                  <img src="../assets/login/loading.gif"/>
                </div>
                <div class="loadmore" v-if="showLoadMore" @click="getListMore">{{$t('Load more')}}<i class="moreimg"></i></div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="rise-table">
              <div class="table-header">
                <span class="tl">{{$t('Growth ranking')}}</span>
                <span class="tr">CNY</span>
              </div>
              <div class="table-box rise-table-box">
                <table id="rise-list-table" lay-filter="rise-list-table"></table>
                <div class="table-loading" v-if="riseloading">
                  <img src="../assets/login/loading.gif"/>
                </div>
              </div>
            </div>
            <div class="fall-table">
              <div class="table-header">
                <span class="tl">{{$t('Decline ranking')}}</span>
                <span class="tr">CNY</span>
              </div>
              <div class="table-box fall-table-box">
                <table id="fall-list-table" lay-filter="fall-list-table"></table>
                <div class="table-loading" v-if="fallloading">
                  <img src="../assets/login/loading.gif"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v2footer/>
    </div>
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import Swiper from 'swiper';

  let loading = require('../assets/login/loading.gif');


  export default {
    data() {
      return {
        listNameType: '总评榜',
        listDateType: '周榜',
        pageSize: 50,
        country: '',
        industry: '',
        guojiaList: [],
        hostIndustries: [],
        mainloading: false,
        riseloading: false,
        fallloading: false,
        showLoadMore: false,
        steps: {
          content1: `
            <p class="mgb15"><strong>总评榜</strong>，通过大数据及AI技术，系统根据自动评估模型及算法，对每个项目进行综合评估。</p>
            <p class="mgb15 sm">提供项目周榜、月榜。也可以通过行业、国家进行筛选项目。</p>
          `,
          content2: `
            <p class="mgb15"><strong>STO榜单</strong>，对已公开发行的STO项目进行综合评估。</p>
            <p class="mgb15 sm">提供项目周榜、月榜。</p>
          `
        }
      }
    },
    mounted () {
      let that = this;
      new Swiper('#list-banner-swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        watchOverflow: true,
        pagination: {
          el: '.list-banner-pagination',
          clickable :true
        },
      });

      that.getRiseTable();
      that.getFallTable();
      that.getHotindustry();
      that.getGuojiaList();

      layui.use('form', function(){
        var form = layui.form;
        // 监听下拉菜单事件
        form.on('select(hot-industry)', function(data){
          that.industry = data.value;
          that.showLoadMore = false;
          that.getMainTable(that.country, that.industry);
        });
        form.on('select(hot-country)', function(data){
          that.country = data.value;
          that.showLoadMore = false;
          that.getMainTable(that.country, that.industry);
        });
        form.on('select(month-week)', function(data){
          that.listDateType = data.value;
          that.showLoadMore = false;
        });
      });

      // window.onresize = () => {
      //   return (() => {
      //     window.screenWidth = document.body.clientWidth
      //     if (window.screenWidth === 576) {

      //     }
      //   })()
      // }
    },
    activated () {
      let that = this;
      if (that.$route.query.listNameType) {that.listNameType = that.$route.query.listNameType;}
      if (that.$route.query.country) {
        that.country = that.$route.query.country;
        that.listNameType = '总评榜';
      }else{
        that.country = '';
      }
      if (that.$route.query.industry) {
        that.industry = that.$route.query.industry;
        that.listNameType = '总评榜';
      }else{
        that.industry = '';
      }

      layui.use('form', function(){
        var form = layui.form;
        form.render('select');
      });

      if (that.listNameType === '总评榜') {
        that.getMainTable(that.country, that.industry);
      }else if (that.listNameType === 'sto榜') {
        that.getStoTable();
      }else{
        that.getMainTable(that.country, that.industry);
      }

      if (that.$route.query.multipage) {
        let booleanShowSignin = true;
        document.getElementById('listStep1').classList.add('on');
        document.getElementById('listStep2').classList.remove('on');
        that.$intro().setOptions({
          prevLabel: '上一步',
          nextLabel: '下一步', 
          doneLabel: '下个流程',
          skipLabel: '跳过',
          showStepNumbers: false,
          showBullets: false,
          hidePrev: true,
          hideNext: true,
          disableInteraction: true,
          steps:[
            {
              element:'#listStep1',
              intro: that.steps.content1
            },
            {
              element:'#listStep2',
              intro: that.steps.content2
            },
          ]
         }).start().oncomplete(function() {
          booleanShowSignin = false;
          that.$router.push({
            path: '/project',
            query: {
              sid: '839b623c-6f49-467a-b2db-65c0ad5a50a2',
              multipage: true
            }
          })
        }).onchange(function(targetElement) {
          document.getElementById('listStep1').classList.remove('on');
          document.getElementById('listStep2').classList.add('on');
        }).onexit(function() {
          localStorage.setItem('isTour', true);
          document.body.style.overflow = 'inherit';
          if (that.listNameType === '总评榜') {
            document.getElementById('listStep1').classList.add('on');
            document.getElementById('listStep2').classList.remove('on');
          }else{
            document.getElementById('listStep1').classList.remove('on');
            document.getElementById('listStep2').classList.add('on');
          }
          // 没有签到的话再弹出签到框或者邀请框
          let clearTime = setTimeout(() => {
            let token = localStorage.getItem('apelink_user_token');
            let signedIn = sessionStorage.getItem('apelink_user_signedIn');
            let isCloseSignTip = sessionStorage.getItem('apelink_user_close_sign_tip');
            let isCloseRegisterTip = sessionStorage.getItem('apelink_user_close_register_tip');
            if (!token) {
              if (booleanShowSignin) {
                if (that.$route.path !== '/login' && that.$route.path !== '/download') {
                  if (!isCloseRegisterTip) {
                    that.$store.state.registerTip = true;
                  }
                }
              }
            }else{
              if (booleanShowSignin) {
                if (!signedIn) {
                  if (that.$route.path !== '/download') {
                    if (!isCloseSignTip) {
                      that.$store.state.signInTips = true;
                    }
                  }
                }
              }
            }
            clearTimeout(clearTime);
          }, 800);
        });
      }
    },
    updated () {
      layui.use('form', function(){
        var form = layui.form;
        form.render('select');
      });
    },
    methods: {
      getListMore () {
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          this.listLoadMore();
        } else {
          this.isLogin();
        }
      },
      isLogin() {
        this.$store.state.loginPop = true;
      },
      listLoadMore () {
        let that = this;
        that.showLoadMore = false;
        that.mainloading = true;
        layui.use('table', function(){
          var table = layui.table;
          table.reload('main-list-table', {
            page: {
              curr: '0'
              ,limit: 100
            }
            ,done: function(res, curr, count){
              that.mainloading = false;
            }
          })
        })
      },
      getMainTable (country, industry) {
        let that = this;
        that.mainloading = true;
        that.showLoadMore = false;
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            id: 'main-list-table'
            ,elem: '#main-list-table'
            ,method: 'get'
            ,url:'https://bvaluate.com.cn/api/projectList/list?type='+that.listDateType+'&country='+country+'&industry='+industry
            ,request: {
              pageName: 'pageNo'
              ,limitName: 'pageSize'
            }
            ,page: {
              curr: '0'
              ,limit: that.pageSize
            }
            ,parseData: function(res){
              return {
                "code": 0,
                "data": res
              };
            }
            ,skin: 'nob'
            ,size: 'sm'
            ,cols: [[
            {field: 'rank', title: that.$t("Ranking"), width: 45, fixed: true, templet: '#list-table-ranking', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'project', title: that.$t("Project"), minWidth: 110, fixed: true, templet: '#list-table-project', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'totalScore', title: that.$t("overall score"), width: 75, sort: true, templet: '#list-table-totalScore', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'amountIncrease', title: that.$t("Ranking fluctuation"), width: 75, sort: true, templet: '#list-table-updown', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'fundamentalsanalysis', title: that.$t("Fundamentals"), width: 75, sort: true, templet: '#fundamentalsanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'marketanalysis', title: that.$t("Market"), width: 75, sort: true, templet: '#marketanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'technicalanalysis', title: that.$t("Technology"), width: 75, sort: true, templet: '#technicalanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'teamanalysis', title: that.$t("Team"), width: 75, sort: true, templet: '#teamanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'fundsupervision', title: that.$t("Fund supervision"), width: 75, sort: true, templet: '#fundsupervision', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'price', title: that.$t("Price")+'(￥)', width: 75, sort: true, templet: '#list-table-price', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'famc', title: that.$t("Current market value")+'(￥)', width: 75, sort: true, templet: '#list-table-famc', style: 'height:64px; padding: 0; line-height: inherit'}
            ]]
            ,initSort: {
              field: 'rank'
              ,type: 'asc'
            }
            ,text: {
              none: '暂无相关数据'
            }
            ,done: function(res, curr, count){
              that.mainloading = false;
              if (res.data.length < that.pageSize) {
                that.showLoadMore = false;
              }else{
                that.showLoadMore = true;
              }
            }
          });
        });
      },
      getStoTable () {
        let that = this;
        that.mainloading = true;
        that.showLoadMore = false;
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#main-list-table'
            ,method: 'get'
            ,url:'https://bvaluate.com.cn/api/projectList/stolistForApp?type='+that.listDateType
            ,request: {
              pageName: 'pageNo'
              ,limitName: 'pageSize'
            }
            ,page: {
              curr: '0'
              ,limit: that.pageSize
            }
            ,parseData: function(res){
              return {
                "code": 0,
                "data": res
              };
            }
            ,skin: 'nob'
            ,size: 'sm'
            ,cols: [[
            {field: 'rank', title: that.$t("Ranking"), width: 45, fixed: true, templet: '#list-table-ranking', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'project', title: that.$t("Project"), minWidth: 110, fixed: true, templet: '#list-table-project', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'totalScore', title: that.$t("overall score"), width: 75, sort: true, templet: '#list-table-totalScore', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'amountIncrease', title: that.$t("Ranking fluctuation"), width: 75, sort: true, templet: '#list-table-updown', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'fundamentalsanalysis', title: that.$t("Fundamentals"), width: 75, sort: true, templet: '#fundamentalsanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'marketanalysis', title: that.$t("Market"), width: 75, sort: true, templet: '#marketanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'technicalanalysis', title: that.$t("Technology"), width: 75, sort: true, templet: '#technicalanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'teamanalysis', title: that.$t("Team"), width: 75, sort: true, templet: '#teamanalysis', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'fundsupervision', title: that.$t("Fund supervision"), width: 75, sort: true, templet: '#fundsupervision', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'price', title: that.$t("Price")+'(￥)', width: 75, sort: true, templet: '#list-table-price', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'famc', title: that.$t("Current market value")+'(￥)', width: 75, sort: true, templet: '#list-table-famc', style: 'height:64px; padding: 0; line-height: inherit'}
            ]]
            ,initSort: {
              field: 'rank'
              ,type: 'asc'
            }
            ,text: {
              none: '暂无相关数据'
            }
            ,done: function(res, curr, count){
              that.mainloading = false;
              if (res.data.length < that.pageSize) {
                that.showLoadMore = false;
              }else{
                that.showLoadMore = true;
              }
            }
          });
        });
      },
      getRiseTable () {
        let that = this;
        that.riseloading = true;
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#rise-list-table'
            ,method: 'get'
            ,url:'https://bvaluate.com.cn/api/hotICO/priceList?type=inc'
            ,request: {
              pageName: 'pageNo'
              ,limitName: 'pageSize'
            }
            ,page: {
              curr: '0'
              ,limit: 15
            }
            ,parseData: function(res){
              return {
                "code": 0,
                "data": res
              };
            }
            ,skin: 'nob'
            ,size: 'sm'
            ,cols: [[
            {field: 'ranking', title: that.$t("Ranking"), width: 50, fixed: true, templet: '#zdlist-table-ranking'}
            ,{field:'name', title: that.$t('Currency name'), fixed: true, style: 'font-weight: bold; font-size: 12px; color: #000;'}
            ,{field:'turnover1day', title: that.$t('Transaction amount')}
            ,{field:'price', title: that.$t("Price")}
            ,{field:'increase', title: that.$t('Growth'), style: 'color: #4eb772;', templet: '#list-table-increase'}
            ]]
            ,initSort: {
              field: 'ranking'
              ,type: 'asc'
            }
            ,text: {
              none: '暂无相关数据'
            }
            ,done: function(res, curr, count){
              that.riseloading = false;
            }
          });
        });
      },
      getFallTable () {
        let that = this;
        that.fallloading = true;
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#fall-list-table'
            ,method: 'get'
            ,url:'https://bvaluate.com.cn/api/hotICO/priceList?type=dec'
            ,request: {
              pageName: 'pageNo'
              ,limitName: 'pageSize'
            }
            ,page: {
              curr: '0'
              ,limit: 15
            }
            ,parseData: function(res){
              return {
                "code": 0,
                "data": res
              };
            }
            ,skin: 'nob'
            ,size: 'sm'
            ,cols: [[
            {field: 'ranking', title: that.$t("Ranking"), width: 50, fixed: true, templet: '#zdlist-table-ranking'}
            ,{field:'name', title: that.$t('Currency name'), fixed: true, style: 'font-weight: bold; font-size: 12px; color: #000;'}
            ,{field:'turnover1day', title: that.$t('Transaction amount')}
            ,{field:'price', title: that.$t("Price")}
            ,{field:'increase', title: that.$t('Decline'), style: 'color: #ee6560;', templet: '#list-table-increase'}
            ]]
            ,initSort: {
              field: 'ranking'
              ,type: 'asc'
            }
            ,text: {
              none: '暂无相关数据'
            }
            ,done: function(res, curr, count){
              that.fallloading = false;
            }
          });
        });
      },
      // 热门行业
      getHotindustry () {
        this.$axios.get('/api/ICO/hotFourIndustries')
        .then(res => {
          this.hostIndustries = res.data.slice(0, 4);
        })
      },
      // 国家排行榜
      getGuojiaList () {
        this.$axios.get('/api/hotICO/countrylistForApp?pageNo=0&pageSize=10')
        .then(res => {
          this.guojiaList = res.data;
        })
      },
      changeListName (val) {
        this.listNameType = val;
        this.showLoadMore = false;
        if (val === '总评榜') {
          this.getMainTable(this.country, this.industry);
        }else{
          this.getStoTable();
        }
      },
      changeListDate (val) {
        this.listDateType = val;
        this.showLoadMore = false;
        layui.use('form', function(){
          var form = layui.form;
          form.render('select');
        });
        if (this.listNameType === '总评榜') {
          this.getMainTable(this.country, this.industry);
        }else{
          this.getStoTable();
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        setTimeout(()=>{
          layui.use('table', function(){
            var table = layui.table;
            table.resize('main-list-table');
            table.resize('rise-list-table');
            table.resize('fall-list-table');
          })

          layui.use('form', function(){
            var form = layui.form;
            form.render('select');
          });
        }, 50)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

