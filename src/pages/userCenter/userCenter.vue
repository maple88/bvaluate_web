<template>
	<div class="page">
		<vheader/>
		<div class="maintainer">
			<div class="user-center">
				<div class="usertainer">
					<div class="userimg"><img src="../../assets/logo_brand.png"></div>
					<p class="nickname">才不可以吃辣椒酱<span><img src="../../assets/authen.png">个人</span></p>
					<p class="sign">后海有树的院子，夏代有工的玉，此时此刻的云，二十来岁的你--可遇不可求的事。</p>
					<ul class="datalist">
						<li>
							<p>46</p>
							<p>糖果数</p>
						</li>
						<li>
							<p>120万</p>
							<p>粉丝</p>
						</li>
						<li>
							<p>6000人</p>
							<p>关注</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="usernav">
				<div class="container">
					<ul>
						<li 
							v-for="(item, $index) in usertab"
							:key="item.id"
							:class="{active : item.isActive}"
							@click=""
						>{{item.title}}<span>{{item.num}}</span></li>
					</ul>
				</div>
			</div>
			<collection v-if="tabcontent === 'isCollection'"/>
		</div>
	</div>
</template>

<script>
import vheader from '@/components/header.vue'
import collection from '@/pages/userCenter/collection'

export default {
	components: {
    	vheader,
    	collection
  	},
  	data () {
  		return {
  			usertab: [
  				{ title: '投稿', num: '25', isActive: false},
  				{ title: '阅读', num: '122', isActive: false},
  				{ title: '收藏', num: '120', isActive: true}
  			],
	  		tabcontent: 'isCollection'
	  	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

