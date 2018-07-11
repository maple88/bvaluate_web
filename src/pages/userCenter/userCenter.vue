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
						<li :class="{active : isContribute}" @click="contribute">投稿<span>25</span></li>
						<li :class="{active : isRead}" @click="read">阅读<span>122</span></li>
						<li :class="{active : isCollection}" @click="collection">收藏<span>120</span></li>
					</ul>
				</div>
			</div>
			<contribute v-if="tabcontent === 'isContribute'"/>
			<read v-if="tabcontent === 'isRead'"/>
			<collection v-if="tabcontent === 'isCollection'"/>
		</div>
	</div>
</template>

<script>
import vheader from '@/components/header.vue'
import contribute from '@/pages/userCenter/contribute'
import read from '@/pages/userCenter/read'
import collection from '@/pages/userCenter/collection'

export default {
	components: {
    	vheader,
    	contribute,
    	read,
    	collection
  	},
  	data () {
  		return {
  			isContribute: true,
  			isRead: false,
  			isCollection: false,
	  		tabcontent: 'isContribute'
	  	}
  	},
  	methods: {
  		contribute () {
  			this.isContribute = true,
  			this.isRead = false,
  			this.isCollection = false,
  			this.tabcontent = 'isContribute'
  		},
  		read () {
  			this.isContribute = false,
  			this.isRead = true,
  			this.isCollection = false,
  			this.tabcontent = 'isRead'
  		},
  		collection () {
  			this.isContribute = false,
  			this.isRead = false,
  			this.isCollection = true,
  			this.tabcontent = 'isCollection'
  		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

