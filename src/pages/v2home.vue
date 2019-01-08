<template>
	<div class="page v2home-page">
		<v2header/>
		<div class="v2maintainer v2home-v2maintainer">
			<!-- content here -->
			<div class="banner-search-section">
				<div class="banner-container">
					<p class="b1">全球最大的区块链项目自动评估平台</p>
					<p class="b2">通过去中心化动态数据，以大数据及AI技术为工具，构成项目全息画像，帮助您洞察并控制投资风险</p>
					<div class="banner-search-box">
						<div class="search-box">
							<div class="center">
								<input type="text" placeholder="请输入关键词" v-model="search" class="search_input" data="输入搜素内容" name="no_content" id="input_search_input" @keyup.enter="goSearch($event)">
							</div>
							<div class="right">
								<button class="search_submit" @click="goSearch($event), trackSearch(searchType, search)" name="no_content" id="search_submit" data="搜索按钮">
									<img src="../assets/search.png" alt="search"/>
								</button>
							</div>
						</div>
						<ul class="hotsearch">
							<li>热门搜索：</li>
							<li>BTC</li>
							<li>ETH</li>
							<li>EOS</li>
							<li>TRON</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="billboard">
				<div class="container v2container">
					<div class="top-list">
						<div class="box-row">
							<div class="box-col">
								<div class="item top1">
									<a href="#">
										<img src="../assets/billboard-logo.png" class="tlogo">
										<p class="tit">Zilliqailliqa</p>
										<p class="des">Cross-protocol for digital entertainm Cross-protocol for digital entertainm</p>
									</a>
								</div>
							</div>
							<div class="box-col">
								<div class="item top2">
									<a href="#">
										<img src="../assets/billboard-logo.png" class="tlogo">
										<p class="tit">Zilliqailliqa</p>
										<p class="des">Cross-protocol for digital entertainm Cross-protocol for digital entertainm</p>
									</a>
								</div>
							</div>
							<div class="box-col">
								<div class="item top3">
									<a href="#">
										<img src="../assets/billboard-logo.png" class="tlogo">
										<p class="tit">Zilliqailliqa</p>
										<p class="des">Cross-protocol for digital entertainm Cross-protocol for digital entertainm</p>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="bottom-flexbox">
						<div class="box-row">
							<div class="box-col">
								<div class="list-header">
									<span class="tit">总评榜</span>
									<a href="#" class="more">
										<div class="word"><div>查看全部</div></div> 
										<i class="more-icon"></i>
									</a>
								</div>
								<div class="table-list">
									<div class="table-header">
										<div class="left">排名</div>
										<div class="center">项目名称</div>
										<div class="right">总评分</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item,index) in list">
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
									<span class="tit">STO榜</span>
									<a href="#" class="more">
										<div class="word"><div>查看全部</div></div> 
										<i class="more-icon"></i>
									</a>
								</div>
								<div class="table-list">
									<div class="table-header">
										<div class="left">排名</div>
										<div class="center">项目名称</div>
										<div class="right">总评分</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item,index) in list">
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
						<p class="tit">明星项目</p>
						<a href="#" class="more">
							<div class="word"><div>查看全部</div></div> 
							<i class="more-icon"></i>
						</a>
					</div>
					<div class="flexbox">
						<div class="box-row">
							<div class="box-col">
								<div class="item">
									<a href="#">
										<div class="img-box">
											<img src="../assets/project/recommend.jpg">
										</div>
										<p class="tit">BTC<span>(BEC)</span></p>
										<p class="num">3.48</p>
										<p class="des">A worldwide cryptocurrency and digital payment system</p>
									</a>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<a href="#">
										<div class="img-box">
											<img src="../assets/project/recommend.jpg">
										</div>
										<p class="tit">BTC<span>(BEC)</span></p>
										<p class="num">3.48</p>
										<p class="des">A worldwide cryptocurrency and digital payment system</p>
									</a>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<a href="#">
										<div class="img-box">
											<img src="../assets/project/recommend.jpg">
										</div>
										<p class="tit">BTC<span>(BEC)</span></p>
										<p class="num">3.48</p>
										<p class="des">A worldwide cryptocurrency and digital payment systemA worldwide cryptocurrency and digital payment system</p>
									</a>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<a href="#">
										<div class="img-box">
											<img src="../assets/project/recommend.jpg">
										</div>
										<p class="tit">BTC<span>(BEC)</span></p>
										<p class="num">3.48</p>
										<p class="des">A worldwide cryptocurrency and digital payment system</p>
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
						<p class="tit">热门行业</p>
						<a href="#" class="more">
							<div class="word"><div>查看全部</div></div> 
							<i class="more-icon"></i>
						</a>
					</div>
					<div class="flexbox">
						<div class="box-row">
							<div class="box-col">
								<div class="item">
									<p class="tit"><a href="#">社交</a></p>
									<p class="num">项目量：36</p>
									<ul class="pro">
										<li>项目：</li>
										<li><a href="#">BTC</a></li>
										<li><a href="#">NON</a></li>
										<li><a href="#">TRON</a></li>
									</ul>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<p class="tit"><a href="#">社交</a></p>
									<p class="num">项目量：36</p>
									<ul class="pro">
										<li>项目：</li>
										<li><a href="#">BTC</a></li>
										<li><a href="#">NON</a></li>
										<li><a href="#">TRON</a></li>
									</ul>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<p class="tit"><a href="#">社交</a></p>
									<p class="num">项目量：36</p>
									<ul class="pro">
										<li>项目：</li>
										<li><a href="#">BTC</a></li>
										<li><a href="#">NON</a></li>
										<li><a href="#">TRON</a></li>
									</ul>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<p class="tit"><a href="#">社交</a></p>
									<p class="num">项目量：36</p>
									<ul class="pro">
										<li>项目：</li>
										<li><a href="#">BTC</a></li>
										<li><a href="#">NON</a></li>
										<li><a href="#">TRON</a></li>
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
									<span class="tit">黑马榜</span>
								</div>
								<div class="table-list heima-list">
									<div class="table-header">
										<div class="left">排名</div>
										<div class="center">项目</div>
										<div class="right1">总评分</div>
										<div class="right2">总榜排名</div>
										<div class="right3">排名升降</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item,index) in list">
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
												<h4>{{item.totalScore | formatToFixed }}</h4>
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
									<span class="tit">国家排行榜</span>
								</div>
								<div class="table-list guojia-list">
									<div class="table-header">
										<div class="left">排名</div>
										<div class="center">国家</div>
										<div class="right">项目量</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item,index) in list">
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
													<h4 class="center_right_title">{{item.project}}</h4>
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
									<span class="tit">媒体声量榜</span>
								</div>
								<div class="table-list">
									<div class="table-header">
										<div class="left">排名</div>
										<div class="center">项目</div>
										<div class="right">宣传力度</div>
									</div>
									<div class="table-content">
										<div class="list_item" slot="scrollList" v-for="(item,index) in list">
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
						<p class="tit">新闻头条</p>
						<a href="#" class="more">
							<div class="word"><div>查看全部</div></div> 
							<i class="more-icon"></i>
						</a>
					</div>
					<div class="flexbox">
						<div class="box-row">
							<div class="box-col">
								<div class="item">
									<div class="img-box">
										<a href="#"><img src="../assets/news.jpg"></a>
									</div>
									<div class="info">
										<p class="tit"><span class="projectname">项目</span><span class="time">2018-10-11</span></p>
										<p class="name"><a href="#">摆在 NEO 面前的首要问题，是如何实现真正的分布式</a></p>
										<p class="des">摆在 NEO 面前的首要问题，是如何实现真正的分布式摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在...</p>
										<div class="line"></div>
										<div class="itemuser">
											<a href="#">
												<div class="userimg"><img src="../assets/logo_brand3.png"></div>
												<span>寒含</span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<div class="img-box">
										<a href="#"><img src="../assets/news.jpg"></a>
									</div>
									<div class="info">
										<p class="tit"><span class="projectname">项目</span><span class="time">2018-10-11</span></p>
										<p class="name"><a href="#">摆在 NEO 面前的首要问题，是如何实现真正的分布式</a></p>
										<p class="des">摆在 NEO 面前的首要问题，是如何实现真正的分布式摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在...</p>
										<div class="line"></div>
										<div class="itemuser">
											<a href="#">
												<div class="userimg"><img src="../assets/logo_brand3.png"></div>
												<span>寒含</span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<div class="img-box">
										<a href="#"><img src="../assets/news.jpg"></a>
									</div>
									<div class="info">
										<p class="tit"><span class="projectname">项目</span><span class="time">2018-10-11</span></p>
										<p class="name"><a href="#">摆在 NEO 面前的首要问题，是如何实现真正的分布式</a></p>
										<p class="des">摆在 NEO 面前的首要问题，是如何实现真正的分布式摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在...</p>
										<div class="line"></div>
										<div class="itemuser">
											<a href="#">
												<div class="userimg"><img src="../assets/logo_brand3.png"></div>
												<span>寒含</span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="box-col">
								<div class="item">
									<div class="img-box">
										<a href="#"><img src="../assets/news.jpg"></a>
									</div>
									<div class="info">
										<p class="tit"><span class="projectname">项目</span><span class="time">2018-10-11</span></p>
										<p class="name"><a href="#">摆在 NEO 面前的首要问题，是如何实现真正的分布式</a></p>
										<p class="des">摆在 NEO 面前的首要问题，是如何实现真正的分布式摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在 NEO 面前的首要问题，是如何实现真正的分布式,摆在...</p>
										<div class="line"></div>
										<div class="itemuser">
											<a href="#">
												<div class="userimg"><img src="../assets/logo_brand3.png"></div>
												<span>寒含</span>
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
						<p class="tit">合作伙伴</p>
					</div>
					<div class="institution">
						<div class="list-header">
							<span class="tit">投资机构</span>
						</div>
						<div class="flexbox">
							<div class="box-row">
								<div class="box-col">
									<div class="item">
										<a href="#"><div><img src="../assets/p1.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a href="#"><div><img src="../assets/p2.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a href="#"><div><img src="../assets/p3.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a href="#"><div><img src="../assets/p4.png"></div></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="mediabox">
						<div class="list-header">
							<span class="tit">战略合作媒体</span>
						</div>
						<div class="flexbox">
							<div class="box-row">
								<div class="box-col">
									<div class="item">
										<a href="#"><div><img src="../assets/p5.png"></div></a>
									</div>
								</div>
								<div class="box-col">
									<div class="item">
										<a href="#"><div><img src="../assets/p6.png"></div></a>
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
	export default {
		data () {
			return {
				list: [
				{
					amountIncrease: 0,
					logoSrc: "https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/cf1cad8e-b1bd-4f50-ae15-163daad3b832.jpg",
					price: 100,
					project: "Zilliqa",
					rank: 0,
					sid: "839b623c-6f49-467a-b2db-65c0ad5a50a2",
					tokenCoin: "ZIL",
					totalScore: 3.84
				},
				{
					amountIncrease: 1,
					logoSrc: "https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/b5248b7b-4bc6-4efb-8c93-f78daea21f04.jpg",
					price: null,
					project: "0x",
					rank: 0,
					sid: "4a41590a-be8c-4c1e-808d-5eec640b6976",
					tokenCoin: "ZRX",
					totalScore: 3.82
				},
				{
					amountIncrease: -1,
					logoSrc: "https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/835f6a0d-566b-4e4f-b19a-0eaf7cb60c40.jpg",
					price: null,
					project: "Decentraland",
					rank: 0,
					sid: "64c9bf9b-a888-4aa4-98da-b4c2abbb46b3",
					tokenCoin: "MANA",
					totalScore: 3.81
				},
				{
					amountIncrease: 70,
					logoSrc: "https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/3014e1d8-6f77-4a53-bd8a-cad7469faf24.jpg",
					price: null,
					project: "TrustToken",
					rank: 0,
					sid: "5c4a8bfa-eaae-4ff0-9d3e-634c7ac0985a",
					tokenCoin: "TUSD",
					totalScore: 3.8
				},
				{
					amountIncrease: 960,
					logoSrc: "https://apelink-ico.oss-ap-southeast-1.aliyuncs.com/4bf4f54d-987e-4872-9ee4-f78c1f50f4ba.jpg",
					price: null,
					project: "DigixDAO",
					rank: 0,
					sid: "4985fe09-79a6-4700-8090-44c232d2429a",
					tokenCoin: "DGD",
					totalScore: 3.8
				}
				]
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

