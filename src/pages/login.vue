<template>
	<div id="login">
		<div class="container main">
			<div class="row">
				<div class="col-md-6 col-xs-12 left">
					<p class="p1">welcome！</p>
					<p class="p2">APELINk</p>
					<p class="p3">搜索全球资讯，掌握最新动态</p>
				</div>
				<div class="col-md-6 col-xs-12">
					<div class="loginbox">
						<div class="hd">
							<i class="fa fa-arrow-circle-o-left back-btn" v-show="resetpwd_head" @click="login()"></i>
							<ul v-show="login_register_head">
								<li :class="{ active : isLogin }" @click="login()">登录</li>
								<li :class="{ active : isRegister }" @click="register()">注册</li>
							</ul>
							<ul v-show="resetpwd_head">
								<li class="active">重置密码</li>
							</ul>
						</div>
						<div class="bd">
							<div class="inputInner" v-if="loginForm">
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon1.png"></div>
									<input type="text" class="form-control" placeholder="手机号/账号">
									<span class="help-block">
										<img src="../assets/login/iclose.png">
										请输入正确的手机号码格式！
									</span>
								</div>
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
									<input type="password" class="form-control" placeholder="密码">
									<span class="help-block">
										<img src="../assets/login/iclose.png">
										密码错误！
									</span>
								</div>
								<div class="input-group submit-group">
									<button type="button" class="btn ok-btn">登录</button>
								</div>
								<div class="other-group">
									<label class="remember">
										<input type="checkbox"> 记住我
									</label>
									<span @click="resetpwd()">忘记密码</span>
								</div>
								<div class="other-login">
									<div class="head">第三方登录</div>
									<ul>
										<li><img src="../assets/login/wechat.png"><p>微信</p></li>
										<li><img src="../assets/login/qq.png"><p>QQ</p></li>
									</ul>
								</div>
							</div>
							<div class="inputInner" v-if="registerForm">
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon1.png"></div>
									<input type="text" class="form-control" placeholder="你的昵称">
									<span class="help-block">
										<img src="../assets/login/iclose.png">
										昵称已被注册，换一个吧!
									</span>
								</div>
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon3.png"></div>
									<input type="text" class="form-control" placeholder="手机号">
									<span class="help-block">
										<img src="../assets/login/iclose.png">
										请输入正确的手机号码格式!
									</span>
								</div>
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
									<input type="password" class="form-control" placeholder="密码">
								</div>
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
									<input type="password" class="form-control" placeholder="确认密码">
								</div>
								<div class="code">
									<input type="text" placeholder="输入验证码">
									<div class="code-btn">获取验证码</div>
								</div>
								<div class="input-group submit-group">
									<button type="button" class="btn ok-btn">注册</button>
								</div>
								<p class="register-tips">点击“注册”即表示您同意并愿意接收<br>APELINE<span>用户此协议</span>和<span>隐私政策</span></p>
							</div>
							<div class="inputInner" v-if="resetpwdForm">
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon1.png"></div>
									<input type="text" class="form-control" placeholder="手机号">
									<span class="help-block">
										<img src="../assets/login/iclose.png">
										请输入正确的手机号码格式！
									</span>
								</div>
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
									<input type="password" class="form-control" placeholder="重置密码">
								</div>
								<div class="input-group">
									<div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
									<input type="password" class="form-control" placeholder="确认密码">
								</div>
								<div class="code">
									<input type="text" placeholder="输入验证码">
									<div class="code-btn">获取验证码</div>
								</div>
								<div class="input-group submit-group">
									<button type="button" class="btn ok-btn">重置密码</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<p class="footer">备案号</p>
	</div>
</template>

<script>
export default {
	data () {
		return {
			login_register_head: true,
			resetpwd_head: false,
			isLogin: true,
			isRegister: false,
			loginForm: true,
			registerForm: false,
			resetpwdForm: false
		}
	},
	methods: {
		login () {
			this.login_register_head = true
			this.isLogin = true
			this.isRegister = false
			this.resetpwd_head = false
			this.loginForm = true
			this.registerForm = false
			this.resetpwdForm = false
		},
		register () {
			this.login_register_head = true
			this.resetpwd_head = false
			this.isLogin = false
			this.isRegister = true
			this.resetpwd_head = false
			this.loginForm = false
			this.registerForm = true
			this.resetpwdForm = false
		},
		resetpwd () {
			this.login_register_head = false
			this.resetpwd_head = true
			this.isLogin = false
			this.isRegister = false
			this.resetpwd_head = true
			this.loginForm = false
			this.registerForm = false
			this.resetpwdForm = true
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>