<template>
	<transition name="fade">
		<div class="login_fixed" id="candyGuide">
			<div class="content-box">
				<div class="close-box" @click="closeThis"><i></i></div>
				<h6 class="title">{{$t('Candy Guide')}}</h6>
				<div class="list-box">
					<ul class="candy-list">
						<li>
							<div class="list-left">
								<span class="detail">邀请好友注册</span>
								<span class="amount">可获得 <b>288</b> 糖果</span>
							</div>
							<span class="list-right">
								<div class="link-btn" @click="showInvitation">立即邀请</div>
							</span>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">邀请的好友再次邀请其他用户注册成功</span>
								<span class="amount">可获得 <b>188</b> 糖果</span>
							</div>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">每日签到</span>
								<span class="amount">可获得 <b>5</b> 糖果</span>
							</div>
							<span class="list-right">
								<div class="link-btn" v-if="!signIned" @click="showSingIn">立即签到</div>
								<div class="link-btn link-btn-disabled" v-else>已签到</div>
							</span>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">连续签到7天</span>
								<span class="amount">可获得 <b>66</b> 糖果</span>
							</div>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">绑定微信</span>
								<span class="amount">可获得 <b>200</b> 糖果</span>
							</div>
							<span class="list-right">
								<div class="link-btn" v-if="!boundWX" @click="showBindWX">去绑定</div>
								<div class="link-btn link-btn-disabled" v-else>已绑定</div>
							</span>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">绑定手机号码</span>
								<span class="amount">可获得 <b>200</b> 糖果</span>
							</div>
							<span class="list-right">
								<!-- <div class="link-btn" v-if="!boundPhone" @click="showBindPhone">去绑定</div> -->
								<div class="link-btn" @click="thisShowBindPhone">去绑定</div>
								<!-- <div class="link-btn link-btn-disabled" v-else>已绑定</div> -->
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'candyGuide',
	props: {
		closeCandyGuide: {
			type: Function
		},
		showBindPhone: {
			type: Function
		},
		firstOpenGuide: {
			type: Boolean
		}
	},
	data(){
		return{
			signIned: '',
			boundWX: localStorage.getItem('apelink_user_unionid') == 'null' ? false : true,
			boundPhone: localStorage.getItem('apelink_user_phoneNumber') == 'null' ? false : true,
			awaitTime: 400		//弹窗跳转等待时间
		}
	},
	methods: {
		closeThis: function(){
			this.$emit('closeCandyGuide',false);
		},
		//跳转邀请
		showInvitation: function(){
			let that = this;
			this.$emit('closeCandyGuide',false);
			setTimeout(function(){
				that.$store.state.invitationTip = true;
			},that.awaitTime);
		},
		//跳转签到
		showSingIn: function(){
			let that = this;
			this.$emit('closeCandyGuide',false);
			setTimeout(function(){
				that.$store.state.signInTips = true;
			},that.awaitTime);
		},
		//跳转绑定微信
		showBindWX: function(){
			let that = this;
			this.$emit('closeCandyGuide',false);
			setTimeout(function(){
				that.$store.state.bindWechatPop = true;
			},that.awaitTime);
		},
		//跳转绑定手机
		thisShowBindPhone: function(){
			let that = this;
			this.$emit('closeCandyGuide',false);
			// setTimeout(function(){
				that.$emit('showBindPhone');
			// },that.awaitTime);
			
		},
	},
	mounted(){
		if(this.firstOpenGuide){
			//刷新是否签到状态
			let that = this;
			let token = localStorage.getItem('apelink_user_token');
			let uid = localStorage.getItem('apelink_user_uid');
			let headers = {'uid': uid, 'Authorization': token};
			if (token !== null && token !== '' && token !== undefined) {
				that.$axios({
				method: 'get',
				url: '/api/user/info',
				headers: headers
				}).then(function(res){
					that.signIned = res.data.signedIn;
					localStorage.setItem('apelink_user_signedIn',res.data.signedIn);
				})

			}
		}else{
			that.signIned = localStorage.getItem('apelink_user_signedIn');
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

