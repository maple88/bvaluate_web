<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <v-register-tip></v-register-tip>
    <v-invitation-tip></v-invitation-tip>
    <v-signIn-tips></v-signIn-tips>
  </div>
</template>

<script>
  import registerTip from '@/components/registerTip';
  import invitationTip from '@/components/invitationTip';
  import signInTips from '@/components/signInTips';

  export default {
    name: 'App',
    components: {
      'v-register-tip': registerTip,
      'v-invitation-tip': invitationTip,
      'v-signIn-tips': signInTips
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
