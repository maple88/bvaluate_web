<template>
	<transition name="fade">
		<div class="login_fixed" id="candyDetails">
			<div class="content-box">
				<div class="close-box" @click="closeThis"><i></i></div>
				<h6 class="title">{{$t('Candy Details')}}</h6>
				<div class="type-sel">
					<span :class="isObtain ? 'curItem' : '' " @click="showObtainList">{{$t('Candy Obtain')}}</span>
					<span :class="isObtain ? '' : 'curItem' " @click="showExpendList">{{$t('Candy Expend')}}</span>
				</div>
				<div class="list-box">
					<ul class="candy-list" v-if="isObtain">
						<li>
							<div class="list-left">
								<span class="detail">新用户注册</span>
								<span class="date">2019/01/01  10:00</span>
							</div>
							<span class="list-right">+888</span>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">新用户注册</span>
								<span class="date">2019/01/01  10:00</span>
							</div>
							<span class="list-right">+888</span>
						</li>
					</ul>
					<ul class="candy-list" v-if="!isObtain">
						<li>
							<div class="list-left">
								<span class="detail">下载**项目白皮书</span>
								<span class="date">2019/01/01  10:00</span>
							</div>
							<span class="list-right">-333</span>
						</li>
						<li>
							<div class="list-left">
								<span class="detail">下载**项目白皮书</span>
								<span class="date">2019/01/01  10:00</span>
							</div>
							<span class="list-right">-33</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'candyDetails',
	props: {
		closeCandyDetails: {
			type: Function
		}
	},
	data(){
		return{
			isObtain: true
		}
	},
	methods: {
		closeThis: function(){
			this.$emit('closeCandyDetails',false)
		},
		showObtainList: function(){
			if(!this.isObtain){
				this.isObtain = true;
			}
		},
		showExpendList: function(){
			if(this.isObtain){
				this.isObtain = false;
			}
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

