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
          <div class="pdf">
            <div>{{`${currentPage}/${pageCount}`}}</div>
            <pdf src="src" v-for="i in 1"
            :key="i"
            :src="src"
            :page="2" 
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
            ></pdf>
          </div>
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
        numPages: undefined,
        currentPage: 0,
        pageCount: 0,
      }
    },
    mounted() {
      this.src = pdf.createLoadingTask('https://pdfobject.com/pdf/sample-3pp.pdf');
      this.src.then(pdf => {
        this.numPages = pdf.numPages;
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

