<template>
  <div class="tips" id="tips_empl" ref="tips">
    <p>{{tipText}}</p>
  </div>
</template>

<script>
  export default {
    props: ['tipText'],
    mounted() {
      this.initPosition();
    },
    methods: {
      initPosition() {
        let $this = this.$refs.tips;
        let l = $this.offsetWidth;
        // let parentL = $this.parentNode.offsetWidth;
        let t = $this.offsetHeight;
        // let parentT = $this.parentNode.offsetHeight;
        let left = l / 2;
        let top = t / 2;
        $this.setAttribute('style', 'left:calc(50% - ' + left + 'px);' + 'top:calc(50% - ' + top + 'px)');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

