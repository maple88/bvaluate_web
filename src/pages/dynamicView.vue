<template>
	<div class="page dynamicView-page">
		<v2header/>
		<div class="v2maintainer">
			<!-- content here -->
			<div class="container v2container">
				<div class="dynamicView-box">
					<h3 v-if="data.title">{{data.title}}</h3>
					<p v-if="data.urlDate" class="time">发布于：{{data.urlDate}}</p>
					<div class="des" v-if="data.content" v-html="contentFormat(data.content)"></div>
					<!-- <div class="img-box">
						<img src="../assets/cimg2.jpg" alt="">
					</div> -->
					<div class="listLoading" v-if="showloading">
						<img src="../assets/login/loading.gif"/>
					</div>
				</div>
			</div>
			<v2footer/>
		</div>

	</div>
</template>

<script>
	let loading = require('../assets/login/loading.gif');

	export default {
		data () {
			return {
				data: '',
				showloading: false
			}
		},
		mounted () {
			this.getData();
		},
		methods: {
			contentFormat(val) {
        if (val != null && val.indexOf("\n") !== -1) {
          val = val.replace(/\n/g, "</p><p>");
        }
        return `<p>${val}</p>`;
      },
			getData () {
				this.showloading = true;
				let uid = localStorage.getItem('apelink_user_uid');
				let url = '/traditional/bvaluatedetail?sid=' + this.$route.query.sid;
				let headers = {'uid': uid};
				this.$axios({
					method: 'get',
					url: url,
					headers: headers
				}).then(res=>{
					this.data = res.data;
					this.showloading = false;
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

