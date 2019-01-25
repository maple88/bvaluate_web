<template>
	<div class="page dynamicList-page">
		<v2header/>
		<div class="v2maintainer">
			<!-- content here -->
			<div class="container v2container">
				<div class="dynamicList-box">
					<p class="head">公司动态</p>
					<div class="news-list">
						<div class="item" v-for="(item, index) in list" :key="index">
							<div class="left" @click="goArticle('/dynamicView',{sid:item.sid})"><img :src="item.logoSrc?item.logoSrc:defaultImg"/></div>
							<div class="right">
								<p class="tit" @click="goArticle('/dynamicView',{sid:item.sid})">{{item.title}}</p>
								<p class="des">{{item.content}}</p>
								<p class="time">{{item.urlTime}}</p>
							</div>
						</div>
						<div class="listLoading" v-if="showloading">
							<img src="../assets/login/loading.gif"/>
						</div>
						<div class="loadmore" v-if="showLoadMore" @click="getData">加载更多<i class="moreimg"></i></div>
					</div>
				</div>
			</div>
			<v2footer/>
		</div>

	</div>
</template>

<script>
	let defaultImg = require('../assets/search/news.png');
	let loading = require('../assets/login/loading.gif');

	export default {
		data () {
			return {
				defaultImg: defaultImg,
				list: [],
				pageNo: 0,
				showLoadMore: false,
				showloading: false
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			goArticle(url, query) {
        let routeData = this.$router.resolve({path: url, query: query});
        window.open(routeData.href, '_blank');
      },
			getData () {
				this.showloading = true;
				this.showLoadMore = false;
				this.$axios.get('/api/traditional/bvaluate?pageNo='+this.pageNo+'&pageSize=10')
				.then(res=>{
					this.showloading = false;
					this.showLoadMore = true;
					this.list = this.list.concat(res.data.content);
					if (res.data.totalElements === 0) {
						alert('没数据');
					}else if (res.data.totalPages == (res.data.pageNo+1)) {
						this.showLoadMore = false;
					}else{
						this.pageNo++;
					}
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

