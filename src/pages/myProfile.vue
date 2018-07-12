<template>
	<div class="page">
		<vheader/>
		<div class="maintainer">
			<div class="container">
				<div class="myProfile mt20">
					<div class="left">
						<div class="userbrand"><img src="../assets/logo_brand.png"></div>
						<p class="usertips">个人资料</p>
					</div>
					<div class="right">
						<div class="list-item item-head">
							<div class="tb-cell nickname">才不可以吃辣椒酱</div>
							<!-- <div class="tb-cell editbox"><input type="text" value="才不可以吃辣椒酱"></div> -->
							<div class="tb-cell edit"><i class="fa fa-pencil"></i>修改</div>
						</div>
						<div class="list-item">
							<div class="tb-cell leftips">性别：</div>
							<div class="tb-cell center">女</div>
							<div class="tb-cell edit"><i class="fa fa-pencil"></i>修改</div>
							<!-- <div class="tb-cell editbox">
								<div class="radiobox">
									<label class="radio-inline">
									  <input type="radio" name="sex" value="male"> 男
									</label>
									<label class="radio-inline">
									  <input type="radio" name="sex" value="female"> 女
									</label>
								</div>
								<div class="botoperate">
									<button type="button" class="btn ok">保存</button>
									<button type="button" class="btn">取消</button>
								</div>
							</div> -->
						</div>
						<div class="list-item">
							<div class="tb-cell leftips">个人说明：</div>
							<div class="tb-cell center">后海有树的院子，夏代有工的玉，此时此刻的云，二十来岁的你--可遇不可求的事。</div>
							<div class="tb-cell edit"><i class="fa fa-pencil"></i>修改</div>
							<!-- <div class="tb-cell editbox">
								<textarea value="后海有树的院子，夏代有工的玉，此时此刻的云，二十来岁的你--可遇不可求的事。" rows="8"></textarea>
								<div class="botoperate">
									<button type="button" class="btn ok">保存</button>
									<button type="button" class="btn">取消</button>
								</div>
							</div> -->
						</div>
						<div class="list-item">
							<div class="tb-cell leftips">手机：</div>
							<div class="tb-cell center">137****462</div>
							<div class="tb-cell edit" data-toggle="modal" data-target="#phoneModal"><i class="fa fa-pencil"></i>修改</div>
						</div>
						<div class="list-item">
							<div class="tb-cell leftips">邮箱：</div>
							<div class="tb-cell center">1032458611@qq.com</div>
							<div class="tb-cell edit" data-toggle="modal" data-target="#emailModal"><i class="fa fa-pencil"></i>修改</div>
						</div>
						<div class="list-item">
							<div class="tb-cell leftips">密码：</div>
							<div class="tb-cell center">*******</div>
							<div class="tb-cell edit" data-toggle="modal" data-target="#pwdModal"><i class="fa fa-pencil"></i>修改</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade collection-modal" id="phoneModal" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title">绑定手机</h4>
		      </div>
		      <div class="modal-body phoneModal-body">
				<form class="form-horizontal">
				  <div class="form-group">
				    <label class="control-label">手机号码</label>
				    <input type="tel">
				  </div>
				  <div class="form-group">
				    <label for="inputPassword" class="control-label">验证码</label>
					<div class="coderow">
					  <input type="text">
					  <button type="button" class="btn code-btn">获取验证码</button>
					</div>
					<p class="help-block">60s后重新获取</p>
				  </div>
				</form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary">确定</button>
		      </div>
		    </div>
		  </div>
		</div><!-- /.modal -->
	</div>
</template>

<script>
import vheader from '@/components/header.vue'

export default {
	components: {
    	vheader
  	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

