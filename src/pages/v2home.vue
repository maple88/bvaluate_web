<template>
	<div class="page v2home-page">
		<v2header/>
		<div class="v2maintainer pd0">
			<!-- content here -->
			<div class="banner-search-section">
				<div class="banner-container">
					<p class="b1">{{$t('Global blockchain projects automatic evaluate platform')}}</p>
					<p class="b2">{{$t('Global decentralized dynamic data  Big data + AI algorithm+knoledge map  Individual project portrait  Investment insight & risk control tool')}}</p>
					<div class="banner-search-box">
						<div class="search-box">
							<div class="center">
								<input type="text" :placeholder="$t('Enter Keywords')" autocomplete="off" v-model="search" class="search_input" data="输入搜素内容" name="no_content" id="banner_search_input" @keyup.enter="goSearch($event)">
							</div>
							<div class="right" >
								<button class="search_submit" @click="goSearch($event)" name="no_content" id="search_submit" data="搜索按钮">
									<img src="../assets/search.png" alt="search"/>
								</button>
							</div>
						</div>
						<ul class="hotsearch">
							<li>{{$t('Top search')}}：</li>
							<li><a href="javascript:;" @click="goSearch($event, 'BTC')">BTC</a></li>
							<li><a href="javascript:;" @click="goSearch($event, 'ETH')">ETH</a></li>
							<li><a href="javascript:;" @click="goSearch($event, 'EOS')">EOS</a></li>
							<li><a href="javascript:;" @click="goSearch($event, 'TRON')">TRON</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="billboard">
				<div class="container v2container">
					<div class="top-list">
						<div class="box-row">
							<div class="box-col" v-for="(item, index) in topProject" :key="index">
								<div class="item" :class="'top'+(index+1)">
									<a href="javascript:;" @click="goArticle('/project',{sid: item.sid}, $event)">
										<!--<img src="../assets/billboard-logo.png" class="tlogo">-->
										<div class="img-box"><img :src="item.logoSrc"></div>
										<p class="tit">{{item.project}}</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="bottom-flexbox">
						<div class="box-row">
							<div class="box-col">
								<div class="list-header">
									<span class="tit">{{$t('Overall list')}}</span>
									<a href="javascript:;" class="more" @click="goList('总评榜')">
										<div class="word"><div>{{$t('View all')}}</div></div> 
										<i class="more-icon"></i>
									</a>
								</div>
								<div class="table-list">
									<div class="table-header">
										<div class="left">{{$t('Ranking')}}</div>
										<div class="center">{{$t('project name')}}</div>
										<div class="right">{{$t('overall score')}}</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item, index) in zongpingList" :key="index" @click="goArticle('/project',{sid: item.sid}, $event)">
											<div class="item_left">
												<div class="ranking_box">
													<div class="ranking_number" v-if="index>2">
														{{index+1}}
													</div>
													<div class="ranking_img" v-else>
														<span class="icon_first" v-if="index === 0"></span>
														<span class="icon_second" v-else-if="index === 1"></span>
														<span class="icon_thire" v-else></span>
													</div>
												</div>
											</div>
											<div class="item_center">
												<div class="center_left" :class="item.logoSrc?'hasPic':''">
													<img :src="item.logoSrc" alt="default" v-show="item.logoSrc">
												</div>
												<div class="center_right">
													<h4 class="center_right_title">{{item.project}}</h4>
													<h4 class="center_right_info">{{item.tokenCoin}}</h4>
												</div>
											</div>
											<div class="item_right">
												<h4>{{item.totalScore | formatToFixed }}</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="box-col">
								<div class="list-header">
									<span class="tit">{{$t('STO list')}}</span>
									<a href="javascript:;" class="more" @click="goList('sto榜')">
										<div class="word"><div>{{$t('View all')}}</div></div> 
										<i class="more-icon"></i>
									</a>
								</div>
								<div class="table-list">
									<div class="table-header">
										<div class="left">{{$t('Ranking')}}</div>
										<div class="center">{{$t('project name')}}</div>
										<div class="right">{{$t('overall score')}}</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item, index) in stoList" :key="index" @click="goArticle('/project',{sid: item.sid}, $event)">
											<div class="item_left">
												<div class="ranking_box">
													<div class="ranking_number" v-if="index>2">
														{{index+1}}
													</div>
													<div class="ranking_img" v-else>
														<span class="icon_first" v-if="index === 0"></span>
														<span class="icon_second" v-else-if="index === 1"></span>
														<span class="icon_thire" v-else></span>
													</div>
												</div>
											</div>
											<div class="item_center">
												<div class="center_left" :class="item.logoSrc?'hasPic':''">
													<img :src="item.logoSrc" alt="default" v-show="item.logoSrc">
												</div>
												<div class="center_right">
													<h4 class="center_right_title">{{item.project}}</h4>
													<h4 class="center_right_info">{{item.tokenCoin}}</h4>
												</div>
											</div>
											<div class="item_right">
												<h4>{{item.totalScore | formatToFixed }}</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="starproject">
				<div class="container v2container">
					<div class="head">
						<p class="tit">{{$t('Star project')}}</p>
						<router-link to="/list" class="more">
							<div class="word"><div>{{$t('View all')}}</div></div> 
							<i class="more-icon"></i>
						</router-link>
					</div>
					<div class="flexbox">
						<div class="box-row">
							<div class="box-col" v-for="(item, index) in starProject" :key="index">
								<div class="item">
									<a href="javascript:;" @click="goArticle('/project',{sid: item.sid}, $event)">
										<div class="top">
											<div class="img-box">
												<img :src="item.logoSrc">
											</div>
											<img src="../assets/list/crown.png" class="crown">
										</div>
										<p class="tit">{{item.project}}<span>{{item.tokenCoin | formatName}}</span></p>
										<p class="num">{{item.totalScore}}</p>
										<p class="des">{{item.abstracts}}</p>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="hotindustry">
				<div class="container v2container">
					<div class="head">
						<p class="tit">{{$t('Hot industry')}}</p>
						<!-- <a href="#" class="more">
							<div class="word"><div>{{$t('View all')}}</div></div> 
							<i class="more-icon"></i>
						</a> -->
					</div>
					<div class="flexbox">
						<div class="box-row">
							<div class="box-col" v-for="(item, index) in hostIndustries" :key="index">
								<div class="item" @click="goListForIndustry(item.categoryName)">
									<p class="tit"><a href="javascript:;" >{{item.categoryName}}</a></p>
									<p class="num">{{$t('Project volume')}}：{{item.projectNum}}</p>
									<ul class="pro">
										<li>{{$t('Project')}}：</li>
										<li v-for="(project, pindex) in item.relatedICODTOs" :key="pindex">
											<a href="javascript:;" @click.stop="goArticle('/project',{sid:project.sid})">{{project.project}}</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="listainer">
				<div class="container v2container">
					<div class="flexbox">
						<div class="box-row">
							<div class="box-col heima-col">
								<div class="list-header">
									<span class="tit">{{$t('Dark horse list')}}</span>
								</div>
								<div class="table-list heima-list">
									<div class="table-header">
										<div class="left">{{$t('Ranking')}}</div>
										<div class="center">{{$t('Project')}}</div>
										<div class="right1">{{$t('overall score')}}</div>
										<div class="right2">{{$t('Overall ranking')}}</div>
										<div class="right3">{{$t('Ranking fluctuation')}}</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item, index) in heimaList" :key="index" @click="goArticle('/project',{sid: item.sid}, $event)">
											<div class="item_left">
												<div class="ranking_box">
													<div class="ranking_number" v-if="index>2">
														{{index+1}}
													</div>
													<div class="ranking_img" v-else>
														<span class="icon_first" v-if="index === 0"></span>
														<span class="icon_second" v-else-if="index === 1"></span>
														<span class="icon_thire" v-else></span>
													</div>
												</div>
											</div>
											<div class="item_center">
												<div class="center_left" :class="item.logoSrc?'hasPic':''">
													<img :src="item.logoSrc" alt="default" v-show="item.logoSrc">
												</div>
												<div class="center_right">
													<h4 class="center_right_title">{{item.project}}</h4>
													<h4 class="center_right_info">{{item.tokenCoin}}</h4>
												</div>
											</div>
											<div class="item_right1">
												<h4>{{item.totalScore | formatToFixed }}</h4>
											</div>
											<div class="item_right2">
												<h4>{{item.rank}}</h4>
											</div>
											<div class="item_right3">
												<div class="item_right3_box">
													<div class="contrast_box up" v-if="item.amountIncrease>0">
														<span class="contrast_num">{{item.amountIncrease | formatAbs}}</span>
														<span class="icon_style"></span>
													</div>
													<div class="contrast_box" v-else-if="item.amountIncrease === 0">
														<!--<span class="icon_style"></span>-->
														<span class="contrast_num"> -- </span>
													</div>
													<div class="contrast_box down" v-else>
														<span class="contrast_num">{{item.amountIncrease | formatAbs}}</span>
														<span class="icon_style"></span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="box-col">
								<div class="list-header">
									<span class="tit">{{$t('National rankings')}}</span>
								</div>
								<div class="table-list guojia-list">
									<div class="table-header">
										<div class="left">{{$t('Ranking')}}</div>
										<div class="center">{{$t('Nation')}}</div>
										<div class="right">{{$t('Project volume')}}</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item, index) in guojiaList" :key="index" @click="goListForCountry(item.countName)">
											<div class="item_left">
												<div class="ranking_box">
													<div class="ranking_number" v-if="index>2">
														{{index+1}}
													</div>
													<div class="ranking_img" v-else>
														<span class="icon_first" v-if="index === 0"></span>
														<span class="icon_second" v-else-if="index === 1"></span>
														<span class="icon_thire" v-else></span>
													</div>
												</div>
											</div>
											<div class="item_center">
												<div class="center_right">
													<h4 class="center_right_title">{{item.countName}}</h4>
												</div>
											</div>
											<div class="item_right">
												<h4>{{item.num}}</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="box-col">
								<div class="list-header">
									<span class="tit">{{$t('Media volume list')}}</span>
								</div>
								<div class="table-list">
									<div class="table-header">
										<div class="left">{{$t('Ranking')}}</div>
										<div class="center">{{$t('Project')}}</div>
										<div class="right">{{$t('Index of the volume')}}</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item, index) in meitiList" :key="index" @click="goArticle('/project',{sid: item.sid}, $event)">
											<div class="item_left">
												<div class="ranking_box">
													<div class="ranking_number" v-if="index>2">
														{{index+1}}
													</div>
													<div class="ranking_img" v-else>
														<span class="icon_first" v-if="index === 0"></span>
														<span class="icon_second" v-else-if="index === 1"></span>
														<span class="icon_thire" v-else></span>
													</div>
												</div>
											</div>
											<div class="item_center">
												<div class="center_left" :class="item.logoSrc?'hasPic':''">
													<img :src="item.logoSrc" alt="default" v-show="item.logoSrc">
												</div>
												<div class="center_right">
													<h4 class="center_right_title">{{item.project}}</h4>
													<h4 class="center_right_info">{{item.tokenCoin}}</h4>
												</div>
											</div>
											<div class="item_right">
												<h4>{{item.totalScore | formatToFixed }}</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="newsheadlines">
				<div class="container v2container">
					<div class="head">
						<p class="tit">{{$t('Headline')}}</p>
						<router-link to="/v2news" class="more">
							<div class="word"><div>{{$t('View all')}}</div></div> 
							<i class="more-icon"></i>
						</router-link>
					</div>
					<div class="flexbox">
						<div class="box-row">
							<div class="box-col" v-for="(item, index) in hotNews">
								<div class="item">
									<div class="img-box">
										<a href="javascript:;" @click="goArticle('/article',{sid:item.sid})">
											<img :src="item.titlePicture===''||item.titlePicture===null?newsimg:item.titlePicture">
										</a>
									</div>
									<div class="info">
										<p class="tit">
											<span class="projectname" 
											@click="goProjectByName(item.projectCategory)">{{item.projectCategory | labelFormat}}</span>
											<span class="time">{{item.urlDate}}</span>
										</p>
										<p class="name"><a href="javascript:;" @click="goArticle('/article',{sid:item.sid})">{{item.title}}</a></p>
										<p class="des">{{item.content}}</p>
										<div class="line"></div>
										<div class="itemuser">
											<a href="javascript:;">
												<!-- <div class="userimg"><img src="../assets/logo_brand3.png"></div> -->
												<span>{{item.siteName}}</span>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="partner">
				<div class="container v2container">
					<div class="head">
						<p class="tit">{{$t('Cooperative partner')}}</p>
					</div>
					<div class="institution">
						<div class="list-header">
							<span class="tit">{{$t('Institutional Investor')}}</span>
						</div>
						<div class="flexbox">
							<div class="box-row">
								<div class="box-col">
									<div class="item">
										<a><div><img src="../assets/p1.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a><div><img src="../assets/p2.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a><div><img src="../assets/p3.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a><div><img src="../assets/p4.png"></div></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mediabox">
						<div class="list-header">
							<span class="tit">{{$t('Strategic cooperative media')}}</span>
						</div>
						<div class="flexbox">
							<div class="box-row">
								<div class="box-col">
									<div class="item">
										<a><div><img src="../assets/p5.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a><div><img src="../assets/p6.png"></div></a>
									</div>
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
	import Bus from '../bus.js'
  import topbox from '../components/topbox'
	let newsimg = require('../assets/search/news.png');

	export default {
		data () {
			return {
				search: '',
				searchType: '文章',
				topProject: [],
				zongpingList: [],
				stoList: [],
				heimaList: [],
				guojiaList: [],
				meitiList: [],
				starProject: [],
				hotNews: [],
				hostIndustries: [],
				newsimg: newsimg
			}
		},
    components: {
      topbox,
    },
		mounted () {
			var that = this
      Bus.$on('val', (data) => {
        that.topProject = data;
      });
      
			that.getHotindustry();
			that.getZongpingList();
			that.getSTOList();
			that.getHeimaList();
			that.getGuojiaList();
			that.getMeitiList();
			that.getstarProject();
			that.getHotNews();
		},
		methods: {
			goList (val) {
				this.$router.push({
					path: '/list',
					query: {
						listNameType: val
					}
				})
			},
			goListForIndustry (val) {
				this.$router.push({
					path: '/list',
					query: {
						industry: val
					}
				})
			},
			goListForCountry (val) {
				this.$router.push({
					path: '/list',
					query: {
						country: val
					}
				})
			},
			goSearch(event, searchKeyword) {
				let pageTitle
				if (this.searchType === '文章') {
					pageTitle = '文章搜索结果'
				}
				if (this.searchType === '项目') {
					pageTitle = '项目搜索结果'
				}
				if (searchKeyword) {
					this.$router.push({
						path: '/search',
						query: {
							keyword: searchKeyword,
							searchType: this.searchType,
							pageTitle: pageTitle
						}
					})
				}else{
					if (this.search == '') {
						layui.use('layer', function(){
							var layer = layui.layer;
							layer.msg('关键词不能为空！');
						});
						return false;
					}
					this.$router.push({
						path: '/search',
						query: {
							keyword: this.search,
							searchType: this.searchType,
							pageTitle: pageTitle
						}
					})
				}
			},
			// 热门行业
			getHotindustry () {
				this.$axios.get('/api/ICO/hotFourIndustries')
				.then(res => {
					this.hostIndustries = res.data.slice(0, 4);;
				})
			},
      // 总评榜
      getZongpingList () {
      	this.$axios.get('/api/hotICO/listForApp?pageNo=0&pageSize=10')
      	.then(res => {
      		this.zongpingList = res.data.slice(0, 5);
      	})
      },
      // STO榜单
      getSTOList () {
      	this.$axios.get('/api/hotICO/stolistForApp?pageNo=0&pageSize=10')
      	.then(res => {
      		this.stoList = res.data.slice(0, 5);
      	})
      },
      // 黑马榜
      getHeimaList () {
      	this.$axios.get('/api/hotICO/blackHouselistForApp?pageNo=0&pageSize=10')
      	.then(res => {
      		this.heimaList = res.data
      	})
      },
      // 国家排行榜
      getGuojiaList () {
      	this.$axios.get('/api/hotICO/countrylistForApp?pageNo=0&pageSize=10')
      	.then(res => {
      		this.guojiaList = res.data
      	})
      },
      // 媒体声量榜
      getMeitiList () {
      	this.$axios.get('/api/hotICO/medialistForApp?pageNo=0&pageSize=10')
      	.then(res => {
      		this.meitiList = res.data
      	})
      },
      // 明星项目
      getstarProject () {
      	this.$axios.get('/api/hotICO/startlistForApp')
      	.then(res => {
      		this.starProject = res.data.slice(0, 4);
      	})
      },
      // 新闻头条
      getHotNews () {
        let categoryName = '首页-新闻列表';
        this.$axios.get('/api/traditional/list?pageSize=4&categoryName=' + categoryName)
        .then(res => {
          this.hotNews = res.data.content;
        })
      },
      goArticle(url, query, event) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');
      },
      //根据项目名称进行跳转到项目页面 主要用于新闻列表中标签跳转
      goProjectByName(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        //这种写法是将路由转为正常的url然后进行跳转
        let routeData = this.$router.resolve({path: '/project', query: {project: obj}});
        window.open(routeData.href, '_blank');
      },
      //根据行业名称进行跳转新闻列表页面 主要用于新闻列表中标签跳转
      goIndustryByIndustry(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {industry: obj}});
        window.open(routeData.href, '_blank');
      },
      goIndustryByCountry(obj, event) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            obj = arr[0];
          }
        }
        let routeData = this.$router.resolve({path: '/newsList', query: {country: obj, pageTitle: '国家文章列表'}});
        window.open(routeData.href, '_blank');
      }
    },
    filters: {
    	formatToFixed: val => {
    		if (val === 0) {
    			return `0.00`
    		} else {
    			return val ? val.toFixed(2) : val
    		}
    	},
    	formatAbs: val => Math.abs(val),
    	formatName: val => {
    		if (val !== null && val !== '' && val !== undefined && val !== 'NULL') {
    			return '('+val+')';
    		}else{
    			return '';
    		}
    	},
    	labelFormat(obj) {
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'NULL') {
          if (obj.indexOf(';') > 0) {
            let arr = obj.split(';')
            return arr[0];
          }
          return obj;
        }else{
        	return '';
        }
        return obj;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

