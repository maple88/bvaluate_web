<template>
  <div class="page pdfshow" @click="shareButton = false">
    <v2header/>
    <div class="v2maintainer">
      <!-- content here -->
        <div class="main-content">
          <div class="top-h">
            <div class="tit">{{projectName}} 白皮书pdf</div>
            <!-- <button class="down-btn" @click="downloadPDF">下载</button> -->
          </div>
          <div class="pdf-box">
            <div class="pdfloading" v-if="pdfloading">
              <img :src="loading"/>
            </div>
            <div class="pdfnothing" v-if="pdfnothing">暂无白皮书</div>
            <!-- <div class="pdf-tool">
              <div class="page" @click="(pageNum !== 1) ? pageNum-- : ''">上一页</div>
              <div class="page-num">{{`${currentPage}/${pageCount}`}}</div>
              <div class="page" @click="(pageNum !== pageCount) ? pageNum++ : ''">下一页</div>
            </div> -->
            <div class="pdf-tool2">
              <div @click="pdfWidth = oWidth"><img src="../assets/project/icon1.png"></div>
              <div @click="pdfWidth = (parseInt(pdfWidth)+100 > 1200) ? 1200 : parseInt(pdfWidth)+100"><img src="../assets/project/icon2.png"></div>
              <div @click="pdfWidth = (parseInt(pdfWidth)-100 > 1200) ? 1200 : parseInt(pdfWidth)-100"><img src="../assets/project/icon3.png"></div>
            </div>
            <div class="pdf-wrap" ref="bigBox">
              <div class="pdf" :style="{'width': pdfWidth + 'px'}">
                <pdf :src="src"
                v-for="(item, index) in numPages"
                :key="index"
                :page="item"
                ></pdf>
              </div>
            </div>
            <!-- <div class="pdf-tool">
              <div class="page" @click="(pageNum !== 1) ? pageNum-- : ''">上一页</div>
              <div class="page-num">{{`${currentPage}/${pageCount}`}}</div>
              <div class="page" @click="(pageNum !== pageCount) ? pageNum++ : ''">下一页</div>
            </div> -->
          </div>
        </div>
        <div class="pop-box" v-show="popShow">
          <div class="tips-box">
            <div class="dt">抱歉！您只剩<span>30</span>糖果，无法下载白皮书</div>
            <div class="dt">下载白皮书需消耗您<span>30</span>糖果</div>
            <div class="ds">赶紧去邀请新朋友，赚取糖果吧！</div>
            <div class="close-btn" @click="popShow = false"><img src="../assets/project/clone.png"></div>
          </div>
          <div class="tips-mask" @click="popShow = false"></div>
        </div>
      <v2footer/>
    </div>
  </div>
</template>
<script>
  import pdf from 'vue-pdf'
  let loading = require('../assets/login/loading.gif');

  export default {
    data() {
      return {
        loading: loading,
        pdfloading: true,
        src: '',
        numPages: '',
        currentPage: 0,
        pageCount: 0,
        popShow: false,
        pageNum: 1,
        oWidth: '',
        pdfWidth: '',
        projectName: '',
        pdfnothing: false
      }
    },
    mounted() {
      this.projectName = this.$route.query.project;
      this.$axios.get('/api/file/review/bps?project=' + this.$route.query.project).then(res => {
        if (res.data.length === 0) {
          this.pdfloading = false;
          this.pdfnothing = true
          return false;
        }

        let obj = '';
        res.data.forEach(item=> {
          if(Object.keys(item)[0] == 'en') {
            obj = item;
            return false;
          } else if(Object.keys(item)[0] == 'cn'){
            obj = item;
            return false;
          }
        })
        if (obj) {
          for(let key in obj){
            this.src = pdf.createLoadingTask(obj[key]);
            this.src.then(pdf => {
              this.pdfloading = false;
              this.numPages = pdf.numPages;
              this.oWidth = this.$refs.bigBox.offsetWidth;
              this.pdfWidth = this.$refs.bigBox.offsetWidth;
            });
          }
        }
      })

      window.addEventListener('resize', res =>  {
        this.pdfWidth = this.$refs.bigBox.offsetWidth;
      });
    },
    methods: {
      isLogin(url) {
        this.$store.state.loginPop = true;
      },
      downloadPDF() {
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          if (localStorage.getItem('apelink_user_candies') >= 30) {
            // download
          }else{
            this.popShow = true;
          }
        } else {
          this.isLogin(null);
        }
      }
    },
    components: {
      pdf
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

