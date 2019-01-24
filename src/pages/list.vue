<template>
  <div class="page v2list">
    <v2header/>
    <div class="v2maintainer v2home-v2maintainer">
      <div class="swiper-container" id="list-banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../assets/list/banner1.jpg"></div>
          <div class="swiper-slide"><img src="../assets/list/banner1.jpg"></div>
          <div class="swiper-slide"><img src="../assets/list/banner1.jpg"></div>
        </div>
        <div class="swiper-pagination list-banner-pagination"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
        <div class="swiper-button-next swiper-button-white"></div>
      </div>
      <div class="container v2container">
        <div class="list-container">
          <div class="left">
            <div class="main-table">
              <div class="list-tab">
                <div class="tabtn" :class="listNameType==='总评榜'?'on':''" @click="changeListName('总评榜')">总评榜</div>
                <div class="tabtn" :class="listNameType==='STO榜'?'on':''" @click="changeListName('STO榜')">STO榜</div>
              </div>
              <div class="table-filter">
                <div class="layui-form">
                  <select name="hot-industry" lay-filter="hot-industry">
                    <option value="">热门行业</option>
                    <option :value="item.categoryName" v-for="(item, index) in hostIndustries" :key="index">{{item.categoryName}}</option>
                  </select>
                  <select name="hot-country" lay-filter="hot-country">
                    <option value="">热门国家</option>
                    <option :value="item.countName" v-for="(item, index) in guojiaList" :key="index">{{item.countName}}</option>
                  </select>
                </div>
                <div class="layui-form month-week">
                  <select name="month-week" v-model="listDateType" lay-filter="month-week">
                    <option value="周榜">周榜</option>
                    <option value="月榜">月榜</option>
                  </select>
                </div>
                <div class="weekmonth-group">
                  <div class="wmbtn" :class="listDateType==='周榜'?'on':''" @click="changeListDate('周榜')">周榜</div>
                  <div class="wmbtn" :class="listDateType==='月榜'?'on':''" @click="changeListDate('月榜')">月榜</div>
                </div>
              </div>
              <table id="main-list-table" lay-filter="main-list-table"></table>
            </div>
          </div>
          <div class="right">
            <div class="rise-table">
              <div class="table-header">
                <span class="tl">涨幅排行</span>
                <span class="tr">CNY</span>
              </div>
              <table id="rise-list-table" lay-filter="rise-list-table"></table>
            </div>
            <div class="fall-table">
              <div class="table-header">
                <span class="tl">跌幅排行</span>
                <span class="tr">CNY</span>
              </div>
              <table id="fall-list-table" lay-filter="fall-list-table"></table>
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
        hostIndustries: []
      }
    },
    mounted () {
      new Swiper('#list-banner-swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.list-banner-pagination',
          clickable :true
        },
      });

      this.getMainTable();
      this.getRiseTable();
      this.getFallTable();
      this.getHotindustry();
      this.getGuojiaList();

      layui.use('form', function(){
        var form = layui.form;
        // 监听下拉菜单事件
        form.on('select(hot-industry)', function(data){
          console.log(data);
        });
        form.on('select(hot-country)', function(data){
          console.log(data);
        });
      });
    },
    activated () {
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
    },
    updated () {
      layui.use('form', function(){
        var form = layui.form;
        form.render('select');
      });
    },
    methods: {
      getMainTable () {
        let that = this;
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#main-list-table'
            ,url:'http://119.254.68.8:10020/projectList/list?type='+that.listDateType+'&pageNo=0&pageSize='+that.pageSize+'&country'+that.country+'&industry'+that.industry
            ,parseData: function(res){
              return {
                "code": 0,
                "data": res
              };
            }
            ,skin: 'nob'
            ,size: 'sm'
            ,cellMinWidth: 60
            ,cols: [[
            {field: 'rank', title: '排名', width: 50, minWidth: 50, fixed: true, templet: '#list-table-ranking', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'project', title: '项目', minWidth: 190, fixed: true, templet: '#list-table-project', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'price', title: '价格', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'famc', title: '流通市值', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'fundamentalsanalysis', title: '基本面', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'marketanalysis', title: '市场', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'technicalanalysis', title: '技术', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'teamanalysis', title: '团队', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'fundsupervision', title: '资金监管', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'totalScore', title: '总评分', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'amountIncrease', title: '排名升降', width: 70, sort: true, templet: '#list-table-updown', style: 'height:64px; padding: 0; line-height: inherit'}
            ]]
          });
        });
      },
      getRiseTable () {
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#rise-list-table'
            ,url:'/api/hotICO/priceList?type=inc&pageSize=15'
            ,parseData: function(res){
              return {
                "code": 0,
                "data": res
              };
            }
            ,skin: 'nob'
            ,size: 'sm'
            ,cols: [[
            {field: 'ranking', title: '排名', width: 50, fixed: true, templet: '#list-table-ranking'}
            ,{field:'name', title: '货币名称', fixed: true, style: 'font-weight: bold; font-size: 12px; color: #000;'}
            ,{field:'turnover1day', title: '成交额'}
            ,{field:'price', title: '价格'}
            ,{field:'increase', title: '涨幅', style: 'color: #4eb772;', templet: '#list-table-increase'}
            ]]
          });
        });
      },
      getFallTable () {
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#fall-list-table'
            ,url:'/api/hotICO/priceList?type=dec&pageSize=15'
            ,parseData: function(res){
              return {
                "code": 0,
                "data": res
              };
            }
            ,skin: 'nob'
            ,size: 'sm'
            ,cols: [[
            {field: 'ranking', title: '排名', width: 50, fixed: true, templet: '#list-table-ranking'}
            ,{field:'name', title: '货币名称', fixed: true, style: 'font-weight: bold; font-size: 12px; color: #000;'}
            ,{field:'turnover1day', title: '成交额'}
            ,{field:'price', title: '价格'}
            ,{field:'increase', title: '跌幅', style: 'color: #ee6560;', templet: '#list-table-increase'}
            ]]
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
      },
      changeListDate (val) {
        this.listDateType = val;
        layui.use('form', function(){
          var form = layui.form;
          form.render('select'); 
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

