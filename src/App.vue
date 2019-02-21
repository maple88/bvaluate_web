<template>
  <div id="app" :class="$i18n.locale === 'en'?'langeuage_en':''">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <v-tour name="headerTour" :steps="steps" :callbacks="myCallbacks">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="tour.currentStep === index"
            v-for="(step, index) of tour.steps"
            :key="index"
            :step="step"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
          >
            <template v-if="tour.currentStep !== 4">
              <div slot="actions" class="v-step__buttons">
                <button @click="tour.previousStep" class="v-step-button prev">上一步</button>
                <button @click="tour.nextStep" class="v-step-button">下一步</button>
              </div>
            </template>
            <template v-if="tour.currentStep === 4">
              <div slot="actions" class="v-step__buttons">
                <button @click="tour.stop" class="v-step-button nostyle">跳过</button>
                <button @click="tour.previousStep" class="v-step-button prev">上一步</button>
                <button @click="tour.stop" class="v-step-button">完成</button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
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
          let url = '/user/info';
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
                let isCloseSignTip = sessionStorage.getItem('apelink_user_close_sign_tip');
                if (!isCloseSignTip) {
                  this.$store.state.signInTips = true;
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
        steps: [
          {
            target: '[data-v-step="1"]',
            content: `<h4>首页，包括搜索功能和各类排行榜以及新闻头条。</h4>
                      <p>1、 搜索：输入关键词搜索项目、新闻、微博、推文、微信。</p>
                      <p>2、各类排行榜</p>
                      <p>黑马榜：根据每日总评榜各项目排名升降情况筛选黑马项目</p>
                      <p>明星项目榜：系统定期根据各项目市值及项目总评分综合评估明星项目</p>
                      <p>媒体声量榜：系统根据算法计算近期各项目相关文章总量占比及增幅情况，依据各自权重得出评分</p>
                      <p>3、 新闻头条：热门新闻信息。</p>`
          },
          {
            target: '[data-v-step="2"]',
            content: `<h4>项目榜单，提供项目周榜、月榜，展现项目排名、趋势等动态，更全面的透视项目情况。</h4>
                      <h4>包括总评榜、STO榜、涨幅榜、跌幅榜。</h4>`
          },
          {
            target: '[data-v-step="3"]',
            content: `<h4>资讯，重磅新闻、每日快讯、大V动态，实时把握</h4>`
          },
          {
            target: '[data-v-step="4"]',
            content: `<h4>新增项目，若您从现有数据未能获取所需项目可进行新增。</h4>
                      <p>填写项目信息上传白皮书，Bvaluate自动分析评估该项目。</p>`
          },
          {
            target: '[data-v-step="5"]',
            content: `<h4>便捷查看关注信息，实时推送您最关注的信息，更好地洞察并控制投资风险。</h4>`
          },
        ],
        myCallbacks: {
          onNextStep: this.NextStepCallback
        }
      }
    },
    methods:{
      NextStepCallback (currentStep) {
        let isTour = JSON.parse(localStorage.getItem('isTour'));
        if(isTour) {
          isTour.header = true;
          localStorage.setItem('isTour', JSON.stringify(isTour));
        } else {
          isTour = {}
          isTour.header = true;
          localStorage.setItem('isTour', JSON.stringify(isTour));
        }
      },
    }
  }
</script>

<!--<style lang="scss" src="./styles/main.scss"></style>-->
<style scoped>
.layui-layer-shade{
  opacity: 1 !important;
}
</style>
