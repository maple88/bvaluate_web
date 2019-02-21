<template>
  <transition name="fade">
    <div class="login_fixed invitation_tips" v-show="invitationTip">
      <div class="login_bg"></div>
      <div class="loginbox invitation_tips">
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="bd">
          <div class="tips_title">
            <h4>{{$t('Invited gift')}}</h4>
          </div>
          <div class="tips_content">
            <div class="content_default">
              <h4>{{$t('Invite friends to register to get')}}<span>288</span>{{$t('candy for free')}}</h4>
              <h4>{{$t('Friends invite other people to get more')}}<span>188</span>{{$t('candy')}}</h4>
            </div>
            <div class="invitation_wrapbox">
                <div class="invitation_info">
                    <h4>{{$t('have been invited')}}<span>{{people}}</span>{{$t('participants successfully')}}</h4>
                    <h4>{{$t('Accumulated candy')}}<span>{{sugar}}</span></h4>
                </div>
                <div class="erCode_box">
                    <div class="img_box">
                        <div id="qrCodeUrl"></div>
                        <!--<img src="../assets/invitation/test.png" alt="">-->
                    </div>
                    <div class="content_tips">
                        <p>{{$t('Screenshot the  two-dimensional code')}}</p>
                        <p>{{$t('for friend to registered users')}}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="invitation-bg-l">
            <img src="../assets/invitation/l_sbg.png" alt="">
        </div>
        <div class="invitation-bg-r">
            <img src="../assets/invitation/r_sbg.png" alt="">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import QRCode from 'qrcodejs2'

  export default {
    data() {
      return {
        erCode: '',
        hasQRCode: false,
        token: '',
        qrcode: null,
        people: 0,
        sugar: 0
      }
    },
    mounted() {
    },
    methods: {
      fn2() {
        this.$store.state.invitationTip = false;
      },
      initInvitationInfo() {
        let url = `/user/getInvitationCode`;
        let uid = localStorage.getItem('apelink_user_uid');
        this.token = localStorage.getItem('apelink_user_token');
        if (!this.token) {
          return false
        }
        let headers = {'uid': uid, 'Authorization': this.token};
        this.$axios({
          method: 'post',
          url: url,
          headers: headers,
        }).then(res => {
          let data = res.data;
          this.people = res.data.InvitationPeople;
          this.sugar = res.data.InvitationCandies;
          this.hasQRCode = true;
          if (this.qrcode) {
            this.qrcode.makeCode(`http://www.bvaluate.com/#/login?page=register&invite=${data.InvitationCode}`); // 生成另外一个二维码
          } else {
            this.qrcode = new QRCode(document.getElementById('qrCodeUrl'), {
              width: 125,
              height: 125, // 高度
              text: `http://www.bvaluate.com/#/login?page=register&invite=${data.InvitationCode}` // 二维码内容
            });
          }
        })
      }
    },
    computed: {
      invitationTip() {
        if (!this.hasQRCode) {
          this.initInvitationInfo();
        }
        let token = localStorage.getItem('apelink_user_token');
        if (token !== this.token) {
          this.initInvitationInfo();
        }
        return this.$store.state.invitationTip
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

