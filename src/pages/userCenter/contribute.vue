<template>
	<transition name="fade">
		<div class="container">
			<div class="newmedia mt20"><button class="btn btn-primary">新建</button></div>
			<div class="medialist mt20">
				<div class="media">
					<div class="dropdown">
					  <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
					    <i class="fa fa-angle-down"></i>
					  </button>
					  <ul class="dropdown-menu dropdown-menu-right">
					    <li><a href="#">删除</a></li>
					    <li><a href="#">置顶</a></li>
					    <li><a href="#">转为仅自己可见</a></li>
					  </ul>
					</div>
					<div class="media-left media-middle">
						<img class="media-object" src="../../assets/media.jpg">
					</div>
					<div class="media-body">
						<h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth doing is worth</h4>
						<p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing is worth doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is worth doing well, Whatever isworth doingis worth doing wel,</p>
						<div class="media-bottom">
							<ul>
								<li><div class="userimg"><img src="../../assets/logo_brand.png"></div>刘方平</li>
								<li>5个小时前</li>
							</ul>
							<div class="tips">新闻</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>

export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

