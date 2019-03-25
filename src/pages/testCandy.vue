<template>
	<transition name="fade">
        <div>
            <div class="testC" @click="showDetails">show</div>
            <candyDetails v-show="detailsPop" @closeCandyDetails='closeCandyDetails'></candyDetails>
        </div>
	</transition>
</template>

<script>
import candyDetails from '@/components/candyDetails'
export default {
    components: {
        candyDetails
    },
	props: {

	},
	data(){
		return{
			detailsPop: false
		}
    },
    methods: {
        showDetails: function(){
            this.detailsPop = true;
        },
        closeCandyDetails: function(val){
            this.detailsPop = val;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.testC{
    font-size: 24px;
    text-align: center;
}
</style>