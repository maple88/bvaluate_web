<template>
  <div id="app" :class="$i18n.locale === 'en'?'language_en':''">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

  export default {
    name: 'App',
    mounted() {
      let clearTime = setTimeout(() => {
        let token = localStorage.getItem('apelink_user_token');
        let path = this.$route.path;
        if (!token) {
          if (localStorage.getItem('isTour')) {
            if (path !== '/login' && path !== '/download') {
              let isCloseRegisterTip = sessionStorage.getItem('apelink_user_close_register_tip');
              if (!isCloseRegisterTip) {
                this.$store.state.registerTip = true;
              }
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
              if (localStorage.getItem('isTour')) {
                if (path !== '/download') {
                  let isCloseSignTip = sessionStorage.getItem('apelink_user_close_sign_tip');
                  if (!isCloseSignTip) {
                    this.$store.state.signInTips = true;
                  }
                }
              }
            }
          });
        }
        clearTimeout(clearTime);
      }, 800);
    },
    data(){
      return {
        
      }
    },
    methods:{
    }
  }
</script>

<!--<style lang="scss" src="./styles/main.scss"></style>-->
<style scoped>
.layui-layer-shade{
  opacity: 1 !important;
}
</style>
