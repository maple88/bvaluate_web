<template>
	<div class="wechatCode">
		
	</div>
</template>

<script>
export default {
	data () {
		return {
			load: ''
		}
	},
	created () {
		layui.use('layer', () => {
			var layer = layui.layer;
			this.load = layer.load(2);
		});
		let data = this.$route.query.code;
		if (data) {
			parent.postMessage(data, '*');
		}else{
			this.$router.push('/home');
		}
	},
	beforeRouteLeave (to, from, next) {
    layer.close(this.load);
    next();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wechatCode{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #fff;
}
</style>