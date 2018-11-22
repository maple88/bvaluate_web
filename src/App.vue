<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <v-register-tip></v-register-tip>
  </div>
</template>

<script>
  import registerTip from '@/components/registerTip';

  export default {
    name: 'App',
    components: {
      'v-register-tip': registerTip
    },
    mounted() {
      let clearTime = setTimeout(() => {
        let token = localStorage.getItem('apelink_user_token');
        if (!token) {
          let isCloseRegisterTip = sessionStorage.getItem('apelink_user_close_register_tip');
          if (!isCloseRegisterTip) {
            this.$store.state.registerTip = true;
          }
        }
        clearTimeout(clearTime);
      }, 1000);
    }
  }
</script>

<!--<style lang="scss" src="./styles/main.scss"></style>-->
