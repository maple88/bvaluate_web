<template>
  <div class="page pdfshow" @click="shareButton = false">
    <vheader/>
    <div class="maintainer">
      <!-- content here -->
        <div class="main-content">
          <div class="top-h">
            <div class="tit">项目名称白皮书pdf</div>
            <button class="down-btn">下载</button>
          </div>
          <div class="pdf-box">
            <div class="pdf-tool">
              <div class="page" @click="(pageNum !== 1) ? pageNum-- : ''">上一页</div>
              <div class="page-num">{{`${currentPage}/${pageCount}`}}</div>
              <div class="page" @click="(pageNum !== pageCount) ? pageNum++ : ''">下一页</div>
            </div>
            <div class="pdf-tool2">
              <div @click="pdfWidth = oWidth"><img src="../assets/project/icon1.png"></div>
              <div @click="pdfWidth = (parseInt(pdfWidth)+100 > 1200) ? 1200 : parseInt(pdfWidth)+100"><img src="../assets/project/icon2.png"></div>
              <div @click="pdfWidth = (parseInt(pdfWidth)-100 > 1200) ? 1200 : parseInt(pdfWidth)-100"><img src="../assets/project/icon3.png"></div>
            </div>
            <div class="pdf-wrap" ref="bigBox">
              <div class="pdf" :style="{'width': pdfWidth + 'px'}" >
                <pdf :src="src"
                :page="pageNum" 
                @num-pages="pageCount = $event"
                @page-loaded="currentPage = $event"
                ></pdf>
              </div>
            </div>
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
      <vfooter/>
    </div>
  </div>
</template>
<script>
  import pdf from 'vue-pdf'
  export default {
    data() {
      return {
        src: '',
        numPages: '',
        currentPage: 0,
        pageCount: 0,
        popShow: false,
        pageNum: 1,
        oWidth: '',
        pdfWidth: ''
      }
    },
    mounted() {
      this.src = pdf.createLoadingTask('https://pdfobject.com/pdf/sample-3pp.pdf');
      this.src.then(pdf => {
        this.numPages = pdf.numPages;
        this.oWidth = this.$refs.bigBox.offsetWidth;
        this.pdfWidth = this.$refs.bigBox.offsetWidth;
      });
      window.addEventListener('resize', res =>  {
        this.pdfWidth = this.$refs.bigBox.offsetWidth;

      });
    },
    methods: {
      
    },
    components: {
      pdf
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

