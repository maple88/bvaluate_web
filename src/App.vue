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
      'v-signIn-tips': signInTips,
    },
    mounted() {
      let clearTime = setTimeout(() => {
        let token = localStorage.getItem('apelink_user_token');
        if (!token) {
          let path = this.$route.path;
          if (path !== '/login' && path !== '/download') {
            let isCloseRegisterTip = sessionStorage.getItem('apelink_user_close_register_tip');
            if (!isCloseRegisterTip) {
              this.$store.state.registerTip = true;
            }
          }
        } else {

          let uid = localStorage.getItem('apelink_user_uid');
          let token = localStorage.getItem('apelink_user_token');
          if (!token) {
            return false;
          }
          let url = '/api/user/info';
          let headers = {'uid': uid, 'Authorization': token};
          // console.log(headers);
          this.$axios({
            method: 'get',
            url: url,
            headers: headers
          }).then(res => {
            let {signedIn, candies} = res.data;
            this.$store.state.sugar = candies;
            localStorage.setItem('apelink_user_signedIn', signedIn);
            if (!signedIn) {
              if (path !== '/download') {
                this.$store.state.signInTips = true;
              }
            }
          });
        }
        clearTimeout(clearTime);
      }, 800);
    }
  }
</script>

<!--<style lang="scss" src="./styles/main.scss"></style>-->
