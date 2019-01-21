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
                <div class="tabtn on">总评榜</div>
                <div class="tabtn">STO榜</div>
              </div>
              <div class="table-filter">
                <div class="layui-form">
                  <select name="hot-industry" lay-filter="hot-industry">
                    <option value="">热门行业</option>
                    <option value="行业1">行业1</option>
                    <option value="行业2">行业2</option>
                    <option value="行业3行业3行业3行业3">行业3行业3行业3行业3</option>
                    <option value="行业4">行业4</option>
                    <option value="行业5">行业5</option>
                  </select>
                  <select name="hot-country" lay-filter="hot-country">
                    <option value="">热门国家</option>
                    <option value="国家1">国家1</option>
                    <option value="国家2">国家2</option>
                    <option value="国家3国家3国家3国家3">国家3国家3国家3国家3</option>
                    <option value="国家4">国家4</option>
                    <option value="国家5">国家5</option>
                  </select>
                </div>
                <div class="weekmonth-group">
                  <div class="wmbtn on">周榜</div>
                  <div class="wmbtn">月榜</div>
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
        type: '周榜',
        name: 'GLOBAL',
        pageSize: 50,
      }
    },
    mounted() {
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
    methods: {
      getMainTable () {
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#main-list-table'
            ,url:'../../static/table.json'
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
            {field: 'ranking', title: '排名', width: 50, minWidth: 50, fixed: true, templet: '#list-table-ranking', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'project', title: '项目', minWidth: 190, fixed: true, templet: '#list-table-project', style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'githubActivity', title: '价格', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'teamIntegrity', title: '流通市值', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'mediaAttention', title: '基本面', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'negativeImpact', title: '市场', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'teamAuthenticity', title: '技术', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'teamIntegrity', title: '团队', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'teamSocialActivity', title: '资金监管', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'rankingTotalScore', title: '总评分', width: 70, sort: true, style: 'height:64px; padding: 0; line-height: inherit'}
            ,{field:'updown', title: '排名升降', width: 70, sort: true, templet: '#list-table-updown', style: 'height:64px; padding: 0; line-height: inherit'}
            ]]
          });
        });
      },
      getRiseTable () {
        layui.use('table', function(){
          var table = layui.table;
          table.render({
            elem: '#rise-list-table'
            ,url:'../../static/rise.json'
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
            ,url:'../../static/fall.json'
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

