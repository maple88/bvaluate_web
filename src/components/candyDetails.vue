<template>
	<transition name="fade">
		<div class="login_fixed" id="candyDetails">
			<div @click="closeThis">close</div>
			<div class="content-box">
				<div class="close-box"><i></i></div>
				<h6 class="title">糖果明细</h6>
				
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
			
		}
	},
	methods: {
		closeThis: function(){
			this.$emit('closeCandyDetails',false)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

