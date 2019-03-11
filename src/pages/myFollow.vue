<template>
	<div class="page followPage" @click="">
		<v2header/>
		<div class="v2maintainer">
                <!-- content here -->
      <div class="fish_container container v2container">
        <div class="follow-content">
          <div class="left-box">
            <div class="innerbox">
              <!-- 有数据展示 -->
  						<div v-show="!showLogin"><table id="main-list-table" lay-filter="main-list-table"></table></div>
  						<!-- 数据加载 -->
  						<div class="table-loading" v-if="mainloading">
  							<img src="../assets/login/loading.gif"/>
  						</div>
  						<div class="loadmore" v-if="showLoadMore" @click="getListMore">{{$t('Load more')}}<i class="moreimg"></i></div>
              <!-- 没有数据加载样式 -->
              <div class="notmore" v-if="showFollow">
                <div class="not-box">
                  <img src="../assets/follow/follow_1.png" alt="">
                  <p>没有更多关注哦~</p>
                  <div class="follow" @click="tiaozhuan">
                    去关注
                  </div>
                </div>
              </div>
  						<!-- 需要登录才能出来 -->
              <div class="notmore" v-if="showLogin">
                <div class="not-box">
                  <img src="../assets/follow/login.no.jpg" alt="">
                  <p>登录才能使用此功能哦~</p>
                  <div class="follow" @click="loginBar">
                    登录
                  </div>
                </div>
              </div>
            </div>
          </div>
					<div class="right">
						<div class="right_item margin_top">
							<div class="hot_title">
								<!-- <div class="title_icon">
									<img src="../assets/follow/hot_text.png"/>
								</div> -->
								<h4 @click="initUser">{{$t('Latest News')}}</h4>
							</div>
							<div class="item_content">
								<ul class="item" v-if="newList.length !== 0">
									<li v-for="(item, index) in newList" :key="item.sid" :data="item.title"
											:name="'article_long_ul_li_'+index" :id="'article_long_ul_li_'+index">
										<!-- <div class="item_left" v-if="item.titlePicture">
											<img :src="item.titlePicture"/>
										</div> -->
										<div class="item_left" @click="goArticle('/article',{sid:item.sid}, $event),
                  trackArticle('我的关注最新资讯', item.title, '我的关注内文章没有项目名称', '我的关注内文章没有项目ID', '最新资讯', item.sid)">
											<img :src="(item.titlePicture ? item.titlePicture : defaultImg)"/>
										</div>
										<div class="item_info">
											<div class="list_item">
												<div class="item_body noPicture">
													<h4 @click="goArticle('/article',{sid:item.sid}, $event),
                  trackArticle('我的关注最新资讯', item.title, '我的关注内文章没有项目名称', '我的关注内文章没有项目ID', '最新资讯', item.sid)">{{item.title}}</h4>
													<p>{{item.content}}</p>
												</div>
											</div>
											<div class="item_bottom">
												<p><span>{{item.siteName}}</span><span  class="sitname">{{item.urlDate}}</span></p>
											</div>
										</div>
									</li>
								</ul>
								<div class="nothing" v-if="hotNews_nothing">
									<img src="../assets/nothing1.png">
									<p>暂无数据</p>
								</div>
								<div class="loading" v-if="hotNews_loading"><img src="../assets/login/loading.gif"></div>
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
let loading = require("../assets/login/loading.gif");
let defaultImg = require("../assets/search/news.png");
import { clearTimeout } from "timers";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      mainloading: false,
      showLoadMore: false,
      showFollow: false,
      newList: [],
      pageSize: 10,
      hotNews_nothing: false,
      hotNews_loading: false,
      defaultImg: defaultImg,
      showLogin: false
    };
  },
  activated() {
    this.getTable();
    this.getNews();
    // this.getFollow();
    let that = this;
    $(document).on("click", ".btn-guan", function() {
      // let token = localStorage.getItem("apelink_user_token");
      // let uid = localStorage.getItem("apelink_user_uid");
      let cid = $(this).attr("data-cid");
      if (this.$store.state.token) {
        // let uid = localStorage.getItem("apelink_user_uid");
        let uid = this.$store.state.uid;
        let headers = { uid: uid, Authorization: token };
        let deteleUrl = "/api/individual/delete?cid=" + cid;
        that
          .$axios({
            method: "DELETE",
            url: deteleUrl,
            headers: headers
          })
          .then(res => {
            let cancelSu = setTimeout(() => {
              alert("取消成功");
              clearTimeout(cancelSu);
            }, 1000);
            that.getTable();
            that.mainloading = false;
            that.showLoadMore = false;
          });
      } else {
        alert("请先登录。");
      }
    });
  },
  methods: {
    initUser() {
      this.showLogin = true;
      this.showFollow = false;
    },
    getTable() {
      let that = this;
      that.showLogin = false;
      that.mainloading = true;
      that.showLoadMore = false;
      that.showFollow = false;
      if (that.$store.state.token) {
        that.showLogin = false;
        layui.use("table", function() {
          var table = layui.table;
          table.render({
            elem: "#main-list-table",
            id: "main-list-table",
            method: "get",
            url: "/api/individual/list?type=ICO",
            headers: {
              Authorization: that.$store.state.token,
              uid: that.$store.state.uid
            },
            request: {
              pageName: "pageNo",
              limitName: "pageSize"
            },
            page: {
              curr: "0",
              limit: that.pageSize
            },
            parseData: function(res) {
              return {
                code: 0,
                data: res.content
              };
            },
            skin: "nob",
            size: "sm",
            cols: [
              [
                {
                  field: "rank",
                  title: that.$t("Ranking"),
                  width: 74,
                  fixed: true,
                  templet: "#follow-table-ranking",
                  style: "height:100px;padding:0; line-height: inherit"
                },
                {
                  field: "project",
                  title: that.$t("Project"),
                  minWidth: 190,
                  // fixed: true,
                  templet: "#follow-table-project",
                  style:
                    "height:100px;padding:0; line-height: inherit;text-align:left"
                },
                {
                  field: "price",
                  title: that.$t("Price") + "(￥)",
                  width: 80,
                  // sort: true,
                  templet: "#follow-table-price",
                  style: "height:100px;padding:0; line-height: inherit"
                },
                {
                  field: "famc",
                  title: that.$t("Current market value") + "(￥)",
                  width: 80,
                  // sort: true,
                  templet: "#follow-table-famc",
                  style: "height:100px;padding:0; line-height: inherit"
                },
                {
                  field: "totalScore ",
                  title: that.$t("overall score"),
                  width: 80,
                  // sort: true,
                  templet: "#follow-table-totalScore",
                  style: "height:100px;padding:0; line-height: inherit"
                },
                {
                  field: "start",
                  title: "",
                  width: 100,
                  // sort: true,
                  toolbar: "#barDemo",
                  style: "height:100px;padding:0; line-height: inherit;"
                }
              ]
            ],
            initSort: {
              field: "rank",
              type: "asc"
            },
            text: {
              none: "暂无相关数据"
            },
            done: (res, curr, count) => {
              that.mainloading = false;
              if (res.data.length === 0) {
                that.showFollow = true;
                that.showLoadMore = false;
                that.mainloading = false;
              } else {
                that.showLoadMore = false;
                that.showFollow = false;
                that.hotNews_nothing = false;
              }
            }
          });
        });
      } else {
        that.showLoadMore = false;
        that.mainloading = false;
        that.showLogin = true;
      }
    },
    goArticle(url, query, event) {
      let routeData = this.$router.resolve({ path: url, query: query });
      sensors.quick("trackHeatMap", event.currentTarget);
      window.open(routeData.href, "_blank");
    },
    trackArticle(
      entrance,
      article_title,
      name,
      project_id,
      category,
      article_id
    ) {
      sensors.track("Article", {
        entrance: entrance,
        article_title: article_title,
        name: name,
        project_id: project_id,
        category: category,
        article_id: article_id,
        collect_count: "接口没有返回文章收藏量"
      });
    },
    //相关资讯
    getNews() {
      let that = this;
      that.$axios
        .get(
          `/api/traditional/information?newsType=NEWS&pageSize=${
            that.pageSize
          }&pageNo=0`
        )
        .then(function(res) {
          that.newList = res.data.content;
        });
    },
    // 去关注
    tiaozhuan() {
      this.$router.push("/home");
    },
    loginBar() {
      //去登录
      // this.$router.push("/login")
      this.$store.state.loginPop = false;
      this.$store.state.registerPop = false;
      this.$store.state.loginPop = true;
    }
  },
  watch: {
    booleanLogin(val){
      if (val) {
        this.getTable();
      }else{
        setTimeout(() => {
          this.initUser();
        },1000);
      }
    }
  },
  computed: {
    booleanLogin () {
      return this.$store.state.token;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
