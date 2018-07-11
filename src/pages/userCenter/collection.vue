<template>
	<div class="container">
		<div class="medialist">
			<div class="media">
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
							<li data-toggle="modal" data-target="#deleteModal" class="love"><i class="fa fa-heart"></i>已收藏</li>
						</ul>
						<div class="tips">新闻</div>
					</div>
				</div>
			</div>
			<div class="media">
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
							<li class="love"><i class="fa fa-heart"></i>已收藏</li>
						</ul>
						<div class="tips">新闻</div>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade collection-modal" id="deleteModal" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">取消收藏</h4>
		      </div>
		      <div class="modal-body">
		        <i class="fa fa-question-circle"></i>确定要取消收藏吗？
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary">确定</button>
		      </div>
		    </div>
		  </div>
		</div><!-- /.modal -->
	</div>
</template>

<script>

export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

