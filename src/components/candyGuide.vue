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
								<div class="link-btn">立即邀请</div>
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
								<div class="link-btn">立即签到</div>
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
								<div class="link-btn">去绑定</div>
							</span>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">绑定手机号码</span>
								<span class="amount">可获得 <b>200</b> 糖果</span>
							</div>
							<span class="list-right">
								<div class="link-btn">去绑定</div>
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
		}
	},
	data(){
		return{
		}
	},
	methods: {
		closeThis: function(){
			this.$emit('closeCandyGuide',false)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

