<template>
  <div id="v2header" class="v2header" :class="scroll">
    <div class="tophead">
      <div class="container v2container">
        <div class="flexbox">
          <ul>
            <li><span style="font-family: PingFangSC-Regular;">{{$t('Total projects')}}：</span><span>{{tophead.totalProject}}</span></li>
            <li><span style="font-family: '微软雅黑';">{{$t('Project personnel')}}：</span><span>{{tophead.totalRelatedProjectPerson}}</span></li>
            <li><span>{{$t('Total White papers')}}：</span><span>{{tophead.totalWhitePaper}}</span></li>
          </ul>
          <div class="appdownload">
            <div id="rookie" class="rookie" @click="isTourShow">{{$t('Feature Tour')}}</div>
            <a href="https://api.bvaluate.com.cn/apk/bvaluate.apk">
              <img src="../assets/tdownload.png">
              <span>{{$t('Download App')}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mainhead">
      <nav class="navbar navbar-default" :class="{ hasbg:hasbg }">
        <div class="container v2container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false" data="导航按钮" name="search_submit" id="navbar-toggle">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="navbar-toggle navbar-header-user" v-if="token">
              <div class="hicon" data-toggle="dropdown">
                <img src="../assets/usericon.png">
              </div>
              <ul class="dropdown-menu header-dropdown-menu">
                <li class="userflex">
                  <div class="left"><span class="username">{{userName}}</span></div>
                  <div class="right"><p class="candyNum">{{candy}}</p><p>{{$t('Number of candy')}}</p></div>
                </li>
                <router-link tag="li" to="/userCollect" active-class="active"><a data="个人中心">{{$t('My Account')}}</a></router-link>
                <li>
                  <a href="javascript:;" data="退出" @click="logout()">{{$t('Log out')}}</a>
                </li>
              </ul>
            </div>
            <div class="navbar-toggle navbar-header-remind" v-if="token">
              <img src="../assets/remind.png" @click="$store.state.messagePop = true">
              <!-- <span class="remind-num">10</span> --><!-- ··· -->
            </div>
            <div class="navbar-toggle open_search navbar-header-search" data-toggle="collapse" data-target="#out-search-box"><img src="../assets/hsearch.png"></div>
            <router-link to="/home" class="navbar-brand" data="logo"><img src="../assets/logo2.png"></router-link>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <router-link v-intro-step="1" v-intro="steps.content1" v-intro-disable-interaction="true" tag="li" to="/home" active-class="active"><a data="首页">{{$t('Home')}}</a></router-link>
              <router-link v-intro-step="2" v-intro="steps.content2" v-intro-disable-interaction="true" tag="li" to="/list" active-class="active"><a data="榜单">{{$t('List')}}</a></router-link>
              <router-link v-intro-step="3" v-intro="steps.content3" v-intro-disable-interaction="true" tag="li" to="/v2news" active-class="active"><a data="资讯">{{$t('headerNews')}}</a></router-link>
              <!-- 原有的弹出框形式的新增项目按钮 -->
              <li v-show="token" v-intro-step="4" v-intro="steps.content4"><a href="javascript:;" data="新增项目" @click="analysis()">{{$t('New Projects')}}</a></li>

              <!-- 新增的新增项目跳转按钮 -->
              <!-- <router-link v-intro-step="4" v-intro="steps.content4" v-intro-disable-interaction="true" tag="li" to="/addPage"><a data='新增项目'>新增项目</a></router-link>
              <li v-show="!token" v-intro-step="4" v-intro="steps.content4" v-intro-disable-interaction="true" @click="isLogin('新增项目')"><a data="新增项目">{{$t('New Projects')}}</a></li> -->
              
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <router-link tag="li" to="/myfollow" active-class="active" v-show="token" v-intro-step="5" v-intro="steps.content5"><a data="我的关注">{{$t('Attention')}}</a></router-link>
              <li v-show="!token" v-intro-step="5" v-intro="steps.content5" v-intro-disable-interaction="true" @click="isLogin('我的关注')"><a data="我的关注">{{$t('Attention')}}</a></li>
              <li class="header-token hsearch">
                <div class="open_search">
                  <img src="../assets/hsearch.png">
                </div>
              </li>
              <li class="header-token hidden-xs dropbox2" v-if="token" style="width: 70px;height: 80px;display: flex;align-items: center;justify-content: center">
                <div class="hicon" @click="showNotice=!showNotice">
                  <img src="../assets/remind.png">
                  <!-- <span class="remind-num">10</span> --><!-- ··· -->
                </div>
                <!--小铃铛消息提示 -->
                <div class="notice">
                  <div class="notice-title">
                    <div :class="showIndex ===0?'active':''" class="item" @click="showList(0)">全部</div>
                    <div :class="showIndex ===1?'active':''" class="item" @click="showList(1)">未读</div>
                  </div>
                  <div class="notice-content">
                    <div class="content-box" v-for="(item, index) in messageList" :key="item.id" :class="open === index?'open':''">
                      <div class="content-top">
                        <div class="box-left">
                          <div class="left">
                            <img :src="item.readFlag?read:unRead" alt="未读">
                          </div>
                          <div class="center">
                            <h4>{{$t('notice')}} | {{item.title}}</h4>
                            <p>{{item.createdTime}}</p>
                          </div>
                        </div>
                        <div class="right">
                          <div class="copy_a" @click="openMessage(item.id,index ,item.readFlag)">{{open ===index?$t('Fold'):$t('Unfold')}}<i class="layui-icon" :class="open === index?' layui-icon-up':'layui-icon-down'"></i></div>
                        </div>
                      </div>
                      <div class="content-bottom" v-if="showContent">
                        <p>
                          {{item.content}}
                        </p>
                      </div>
                    </div>
                    <!-- 无未读消息 -->
                    <div class="notmore" v-if="showMessage">
                      <div class="not-box">
                        <img src="../assets/user/message.png" alt="">
                        <p>暂无消息</p>
                      </div>
                    </div>
                  </div>
                  <div class="notice-bottom" @click="goUserNotice">查看全部<img src="../assets/more.png" alt=""></div>
                </div>
              </li>
              <li class="header-token hidden-xs dropbox1" v-if="token" style="width: 70px;height: 80px;display: flex;align-items: center;justify-content: center;margin: 0">
                <div class="hicon" >
                  <img src="../assets/usericon.png">
                </div>

                <div class="htips icon-htips" @click="invitation">{{$t('gift')}}</div>
                <ul class="dropdown-menu header-dropdown-menu">
                  <!-- <router-link tag="li" to="/my" active-class="active"><a data="设置">{{$t('Set up')}}</a></router-link> -->
                  <li class="userflex">
                    <div class="left"><span class="username">{{userName}}</span></div>
                    <div class="right"><p class="candyNum">{{candy}}</p><p>{{$t('Number of candy')}}</p></div>
                  </li>
                  <router-link tag="li" to="/userCollect" active-class="active"><a data="个人中心">{{$t('My Account')}}</a></router-link>
                  <li>
                    <a href="javascript:;" data="退出" @click="logout()">{{$t('Log out')}}</a>
                  </li>
                </ul>
              </li>
              <li class="hidden-xs" v-if="!token">
                <!-- <router-link to="/login" class="header-btn" data="登录" @click="salogin($event)">登录</router-link> -->
                <a href="javascript:;" class="header-btn" data="登录" @click="isLogin('登录按钮')">{{$t('login')}}</a>
              </li>
              <li class="hidden-xs" v-if="!token">
                <!-- <router-link to="/login?page=register" class="header-btn blue" data="注册" @click="saregister($event)">注册</router-link> -->
                <a href="javascript:;" class="header-btn blue" data="注册" @click="isLogin('注册按钮')">{{$t('Sign')}}</a>
                <div class="htips" @click="registerTip">{{$t('Candy')}}</div>
              </li>
              <li class="sbs-btn visible-xs" v-if="!token">
                <!-- <router-link to="/login" class="header-btn" data="登录" @click="salogin($event)">登录</router-link>
                <router-link to="/login?page=register" class="header-btn blue" data="注册" @click="saregister($event)">注册</router-link> -->
                <a href="javascript:;" class="header-btn" data="登录" @click="isLogin('登录按钮')">{{$t('login')}}</a>
                <a href="javascript:;" class="header-btn blue" data="注册" @click="isLogin('注册按钮')">{{$t('Sign')}}</a>
              </li>
              <li class="language">
                <div class="layui-form">
                  <select name="language" lay-filter="language">
                    <option value="简体" :selected="$i18n.locale === 'cn' ? true : false">简体</option>
                    <option value="繁体" :selected="$i18n.locale === 'hk' ? true : false">繁體</option>
                    <option value="English" :selected="$i18n.locale === 'en' ? true : false">English</option>
                  </select>
                </div>
              </li>
            </ul>
            <transition name="fade">
              <div class="search-box" ref="innerSearch" v-show="showSearch">
                <div :class="centerClass">
                  <input type="text" @focus="changeClassFocus" @blur="changeClassBlur" autocomplete="off" :placeholder="$t('Enter Keywords')" v-model="search" ref="search_input" class="search_input" data="输入搜素内容" name="no_content" id="input_search_input" @keyup.enter="goSearch($event)">
                </div>
                <div :class="rightClass">
                  <button class="search_submit" @click="goSearch($event), trackSearch(searchType, search)" name="no_content" id="search_submit" data="搜索按钮">
                    <img src="../assets/search.png" alt="search"/>
                  </button>
                </div>
              </div>
            </transition>
          </div>
          <div class="collapse out-search-box" id="out-search-box">
            <div class="container v2container">
              <div class="search-box">
                <div class="right">
                  <button class="search_submit" @click="goSearch($event), trackSearch(searchType, search)" name="no_content" id="search_submit" data="搜索按钮">
                    <img src="../assets/search.png" alt="search"/>
                  </button>
                </div>
                <div class="center">
                  <input type="text" autocomplete="off" :placeholder="$t('Enter Keywords')" v-model="search" class="search_input" data="输入搜素内容" name="no_content" id="out_search_input" @keyup.enter="goSearch($event)">
                </div>
              </div>
              <div class="close-search">{{$t('Cancel')}}</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <v-login :initUser="initUser"></v-login>
    <v-analysis></v-analysis>
    <v-message></v-message>
    <v-register-tip></v-register-tip>
    <v-invitation-tip></v-invitation-tip>
    <v-signIn-tips></v-signIn-tips>
    <v-wechatLogin :initUser="initUser"></v-wechatLogin>
    <v-bindWechat></v-bindWechat>
    <v-bindPhone></v-bindPhone>

    <!-- <v-tour name="headerTour" :steps="steps" :callbacks="myCallbacks"></v-tour> -->


  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import login from '@/components/login';
  import message from '@/components/message';
  import analysis from '@/components/analysis';
  import wechatLogin from '@/components/wechatLogin';
  import bindWechat from '@/components/bindWechat';
  import registerTip from '@/components/registerTip';
  import invitationTip from '@/components/invitationTip';
  import signInTips from '@/components/signInTips';
  import bindPhone from '@/components/bindPhone';
  import Bus from '../bus.js'
  import Popup from '../popup.js'
  let read = require('../assets/message/read.png');
  let unRead = require('../assets/message/unread.png');
  let default_header = require('../assets/user/default-header.png');
  require('intro.js/intro.js');
  export default {
    components: {
      'v-login': login,
      'v-analysis': analysis,
      'v-message': message,
      'v-wechatLogin': wechatLogin,
      'v-register-tip': registerTip,
      'v-invitation-tip': invitationTip,
      'v-signIn-tips': signInTips,
      'v-bindPhone': bindPhone,
      'v-bindWechat': bindWechat
    },
    props: {
      parantProfileUrl: String
    },
    data() {
      return {
        tophead: [],
        userName: '',
        candy: 0,
        profileUrl: '',
        token: '',
        default_header: default_header,
        scroll: '',
        searchType: '文章',
        search: '',
        isShow: false,
        successGo: '',
        isWhitePaper: false,
        path: '',
        showSearch: false,
        hasbg: false,
        centerClass:'center',
        rightClass:"right",
        steps: {
          content1: `
            <p class="mgb15">首页，包括搜索功能和各类排行榜以及新闻头条</p>
            <p class="mgb15"><strong>1、搜索：</strong>输入关键词搜索项目、新闻、微博、推文、微信</p>
            <p><strong>2、各类排行榜</strong></p>
            <p><strong>黑马榜：</strong>根据每日总评榜各项目排名升降情况筛选黑马项目</p>
            <p><strong>明星项目榜：</strong>系统定期根据各项目市值及项目总评分综合评估明星项目</p>
            <p class="mgb15"><strong>媒体声量榜：</strong>系统根据算法计算近期各项目相关文章总量占比及增幅情况，依据各自权重得出评分</p>
            <p class="mgb15"><strong>3、新闻头条：</strong>热门新闻信息</p>
          `,
          content2: `
            <p class="mgb15"><strong>项目榜单</strong>，提供项目周榜、月榜，展现项目排名、趋势等动态，更全面的透视项目情况。</p>
            <p class="mgb15">包括总评榜、STO榜、涨幅榜、跌幅榜。</p>
          `,
          content3: `
            <p class="mgb15"><strong>资讯</strong>，重磅新闻、每日快讯、大V动态，实时把握</p>
          `,
          content4: `
            <p class="mgb15"><strong>新增项目，若您从现有数据未能获取所需项目可进行新增。</strong></p>
            <p class="mgb15 sm">填写项目信息上传白皮书，Bvaluate自动分析评估该项目。</p>
          `,
          content5: `
            <p class="mgb15">便捷查看关注信息，实时推送您最关注的信息，更好地洞察并控制投资风险。</p>
          `
        },
        showNotice:false,
        messageList:[],
        open:-1,
         read: read,
        unRead: unRead,
        showIndex:0,
        showMessage:false,
        showContent:false
      }
    },
    mounted() {
      let that = this;
      that.path = that.$router.history.current.path;
      $(".nav.navbar-nav li a").on('click', function () {
        $('.collapse').removeClass('in');
      });
      that.is_header_scroll();
      that.initUser();
      that.getTophead();
      this.$nextTick(() => {
        let _this = this;
        this.popupMessage = new Popup({
            zIndex: 98,
            onClose() {
              _this.showNotice = false;
            }
        });
        if (this.showNotice) {
          this.popupMessage.show();
        }
      });
      $(".open_search").on("click", function(){
        $(".out-search-box").collapse('show');
        $(".out-search-box input").focus();
        $(".out-search-box").css('top', '0');
      })
      $(".close-search").on("click", function(){
        $(".out-search-box").collapse('hide');
        $(".out-search-box").css('top', '-100%');
      })

      layui.use('form', function(){
        var form = layui.form;
        form.render('select');
        form.on('select(language)', function(data){
          // console.log(data.value);
          if (data.value === '简体') {
            // that.$i18n.locale = 'cn';
            localStorage.setItem('bvaluate-lang', 'cn');
          }else if (data.value === 'English') {
            // that.$i18n.locale = 'en';
            localStorage.setItem('bvaluate-lang', 'en');
          }
          else if (data.value === '繁体') {
            // that.$i18n.locale = 'hk';
            localStorage.setItem('bvaluate-lang', 'hk');
          }
          window.location.reload();
        });
      });

      that.$refs.search_input.onfocus = function () {
        that.$refs.innerSearch.style.background = '#fff';
        // that.$refs.innerSearch.style.background = '#e0e1e2';
      }
      that.$refs.search_input.onblur = function () {
        that.$refs.innerSearch.style.background = '#d3d4d6';
      }

      if (document.body.clientWidth > 767) {
        let isTour = localStorage.getItem('isTour');
        if (!isTour) {
          that.isTourShow();
        }
      }
    },
    created(){
        this.initMessage()
    },
    watch: {
      '$route': function () {
        this.initUser();
        this.is_header_scroll();
      },
      showNotice(val){
        if(this.popupMessage){
          if(val){
            this.popupMessage.show();
          }else{
            this.popupMessage.hide();
          }
        }
      }
    },
    computed: {
      sugarNum() {
        return this.$store.state.sugar;
      }
    },
    methods: {
      changeClassFocus(){
        this.centerClass='center2';
        this.rightClass='right2';
      },
      changeClassBlur(){
        this.centerClass='center';
        this.rightClass='right';
      },
      goUserNotice () {
        this.$router.push('/userNotice');
      },
      isTourShow () {
        let that = this;
        let booleanShowSignin = true;
        document.body.style.overflow = 'hidden';
        that.$router.push('/home');
        window.scrollTo(0,0);
        document.getElementById('v2header').classList.remove('unpinned');
        that.$nextTick().then(()=> {
          that.$intro().setOptions({
            prevLabel: '上一步',
            nextLabel: '下一步', 
            doneLabel: '下一步',
            skipLabel: '跳过',
            showStepNumbers: false,
            showBullets: false,
            hidePrev: true,
            hideNext: true,
            disableInteraction: true,
           }).start().oncomplete(function() {
            booleanShowSignin = false;
            that.$router.push({
              path: '/list',
              query: {
                multipage: true
              }
            })
          }).onexit(function() {
            localStorage.setItem('isTour', true);
            document.body.style.overflow = 'inherit';
            // 没有签到的话再弹出签到框或者邀请框
            let clearTime = setTimeout(() => {
              let token = localStorage.getItem('apelink_user_token');
              let signedIn = localStorage.getItem('apelink_user_signedIn');
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
        })
      },
      // 头部数量
      getTophead() {
        let that = this;
        that.$axios.get('/api/ICO/icoRank?type=周榜&pageNo=0&pageSize=3').then(function (res) {
          that.tophead = res.data;
          Bus.$emit('val', res.data.topProject);
        });
      },
      invitation() {
        let token = this.token;
        if (token) {
          this.$store.state.invitationTip = true;
        } else {
          this.$store.state.loginPop = true;
        }
      },
      registerTip () {
        this.$store.state.registerTip = true;
      },
      trackSearch(category, content) {
        // 榜单，项目详情页，我的关注，个人中心，白皮书分析，行业国家资讯，文章详情，作者, 搜索页面
        let that = this
        let path = [
          {name: '/list', val: '榜单'},
          {name: '/project', val: '项目详情页'},
          {name: '/userCenter', val: '个人中心'},
          {name: '/newsList', val: '行业国家资讯'},
          {name: '/article', val: '文章详情'},
          {name: '/author', val: '作者'},
          {name: '/search', val: '搜索页面'}
        ]
        let index = path.findIndex(function (x) {
          return x.name === that.path;
        })
        let entrance;
        if (index !== -1) {
          entrance = path[index].val
        } else {
          entrance = '找不到入口位置'
        }
        sensors.track('Search', {
          entrance: path[index].val,
          category: category,
          content: content
        });
      },
      refreshPage() {
        window.location.reload();
      },
      analysis() {
        this.$store.state.analysisPop = true
      },
      goSearch(event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        let pageTitle
        if (this.search == '') {
          layui.use('layer', function(){
            var layer = layui.layer;
            layer.msg('关键词不能为空！');
          });
          return false;
        }
        if (this.searchType === '文章') {
          pageTitle = '文章搜索结果'
        }
        if (this.searchType === '项目') {
          pageTitle = '项目搜索结果'
        }
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.search,
            searchType: this.searchType,
            pageTitle: pageTitle
          }
        })
      },
      salogin(event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        sensors.track("Registerstart", {
          entrance: '列表页',
          operate: '登录button'
        });
      },
      saregister(event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        sensors.track("Registerstart", {
          entrance: '列表页',
          operate: '注册button'
        });
      },
      isLogin(name) {
        if(name === '注册按钮'){
          this.$store.commit('register');
        }else if(name === '我的关注'){
          this.$router.push("/myfollow");
        }else{
          this.$store.state.loginPop = true;
        }
        if (name === '我的关注') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '我的关注'
          });
        } else if (name === '个人中心') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '个人中心'
          });
        } else if (name === '白书皮分析') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '白书皮分析'
          });
        } else if (name === '新增项目') {
          sensors.track("Loginstart", {
            entrance: '列表页',
            operate: '新增项目'
          });
        }
      },
      logout() {
        let that = this;
        localStorage.removeItem('apelink_user_candies');
        localStorage.removeItem('apelink_user_email');
        localStorage.removeItem('apelink_user_expirationDate');
        localStorage.removeItem('apelink_user_nickName');
        localStorage.removeItem('apelink_user_phoneNumber');
        localStorage.removeItem('apelink_user_profileUrl');
        localStorage.removeItem('apelink_user_sex');
        localStorage.removeItem('apelink_user_signedIn');
        localStorage.removeItem('apelink_user_signedInNum');
        localStorage.removeItem('apelink_user_synopsis');
        localStorage.removeItem('apelink_user_token');
        localStorage.removeItem('apelink_user_uid');
        localStorage.removeItem('apelink_user_unionid');
        localStorage.removeItem('apelink_user_passwd');
        that.$store.commit('loginOut');
        that.showNotice = false;
        sensors.registerPage({
          platform_type: 'web',
          is_login: false,
          is_register: true
        });
        // sensors.logout();
        layui.use('layer', function(){
          var layer = layui.layer;
          let load = layer.load(2);
          setTimeout(() => {
            layer.close(load);
            if (that.path === '/home' || that.path === '/list' || that.path === '/v2news' || that.path === '/project' || that.path === '/article' || that.path === '/myfollow') {
              // window.location.reload();
              that.initUser();
              layer.msg('用户已退出');
            }else{
              that.$router.push('/home');
              layer.msg('用户已退出');
            }
          }, 1000);
        });
      },
      initUser() {
        this.profileUrl = localStorage.getItem('apelink_user_profileUrl');
        this.token = localStorage.getItem('apelink_user_token');
        this.userName = localStorage.getItem('apelink_user_nickName');
        this.candy = localStorage.getItem('apelink_user_candies');
        if (this.parantProfileUrl) {
          this.profileUrl = this.parantProfileUrl
        }
      },
      is_header_scroll () {
        this.$nextTick(() => {
          window.addEventListener('scroll', this.handleScroll);
        });
        let router = this.$router.history.current;
        if (!router.meta.headerNobg) {
          this.hasbg = true;
        }else{
          this.hasbg = false;
        }
        if (router.name === 'home') {
          this.showSearch = false;
        }else{
          this.showSearch = true;
        }
      },
      handleScroll(e) {
        let router = this.$router.history.current;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 50) {
          this.hasbg = true;
        } else {
          if (router.meta.headerNobg) {
            this.hasbg = false;
          }
        }
        // if (scrollTop > 100) {
        //   this.scroll = 'scroll';
        // } else {
        //   this.scroll = '';
        // }
        if (router.name == 'home') {
          if (scrollTop > 360) {
            this.showSearch = true;
          } else {
            this.showSearch = false;
          }
        }
      },
      //信息提示
      initMessage() {
        this.showMessage = true;
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let headers = {'uid': uid, 'Authorization': token};
          let url = '/api/notify/getUserNotify';
          this.$axios({
            method: 'get',
            url: url,
            headers: headers
          }).then(res => {
            // console.log(res);
            if(res.data.length === 0){
              this.showMessage = true;
            }else {
              this.showMessage = false;
              this.messageList = res.data;
            }
          });
        }
      },
      //信息展开
      openMessage(notifyId,index,readFlag){
          if(index === this.open){
            //表示数据收起，同时将数据内容显示出来
            this.open = -1
            this.showContent = false;
          }else {
            this.open = index;
            this.showContent = true;
          }
          if(!readFlag){
            this.readMessage(notifyId,readFlag);
          }
      },
      //查看用户是否登录 并查看
      readMessage(notifyId, index) {
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let headers = {'uid': uid, 'Authorization': token};
          let url = `/api/notify/readUserNotify?notifyId=${notifyId}`;
          this.$axios({
            method: 'put',
            url: url,
            headers: headers
          }).then(res => {
            if (res.data) {
              this.messageList[index].readFlag = true;
            }
          });
        }
      },
      showList(type){
        if (type===0) {
          if(this.showIndex !== type){
            this.showIndex = 0;
            this.initMessage();
          }
        } else {
          if(this.showIndex !== type){
            let uid = localStorage.getItem('apelink_user_uid');
            let token = localStorage.getItem('apelink_user_token');
            if (token) {
              let headers = {'uid': uid, 'Authorization': token};
              let url = '/api/notify/getUserNotify?readFlag=unread';
              this.$axios({
                method: 'get',
                url: url,
                headers: headers
              }).then(res => {
                this.unReadList = res.data;
                this.messageList = this.unReadList;
                this.showIndex = 1;
                // console.log(res);
                if(res.data.length === 0){
                    this.showMessage = true;
                }else {
                  this.showMessage = false;
                }
              }).catch(res => {
                this.messageList = []
                this.showIndex = 1;
              });
            }
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .dropbox1:hover .dropdown-menu {
    display: block;
  }
  .dropbox2:hover .notice{
    display: flex!important;
  }
</style>
