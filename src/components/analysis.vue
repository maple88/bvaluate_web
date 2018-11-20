<template>
  <transition name="fade">
    <div class="login_fixed" v-if="value">
      <div class="login_bg" @click="fn2"></div>
      <div class="loginbox whitePaper">
        <div class="whitehead"><img src="../assets/white-head.png"></div>
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="hd whitePaperTitle">
          <p>白皮书上传</p>
        </div>
        <div class="bd">
          <p class="uploadtips">注：暂只支持pdf格式文件，文件名称格式为项目名称-版本号-语言.pdf<br>(例如300cubits TEU-2.0.00-cn.pdf)</p>
          <div class="uploadWhitePaper">
            <div class="filename">
              <input type="text" data="点击了只读状态的输入框" readonly="readonly" v-model="filename">
              <span class="help-block" v-if="fileTips">
                <img src="../assets/login/iclose.png">
                {{fileTips}}
              </span>
            </div>
            <div class="rightBtn">
              <div class="chooseFile">
                <input type="file" data="选择文件" @change="selectPDF($event)">
                <button data="选择文件">选择文件</button>
              </div>
              <button class="uploadBtn" data="上传白皮书" :class="{ disabled: uploadBtn }" :disabled="uploadBtn" @click="uploadPDF">上传</button>
            </div>
          </div>
          <div class="uploadstate" v-show="uploadstate">
            <div class="progress">
              <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="'width:'+uploadtime+'%'">
                {{uploadtime}}%
              </div>
            </div>
            <p class="uploadsuccess">{{uploadword}}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      goUrl: {
        type: String,
        default: ''
      },
      success: {
        type: Function
      }
    },
    data() {
      return {
        filename: '',
        tipText: '',
        showTip: false,
        fileTips: '',
        uploadBtn: true,
        pdf: '',
        uploadstate: false,
        uploadword: '',
        uploadtime: 0
      }
    },
    mounted() {
      
    },
    methods: {
      fn2() {
        this.value = false;
        this.$emit('input', this.value);
      },
      selectPDF(e) {
        this.fileTips = ''
        this.filename = ''
        let token = localStorage.getItem('apelink_user_token');
        let uid = localStorage.getItem('apelink_user_uid');
        let file = e.target.files[0]
        this.pdf = file
        let f = file.name.replace(/\.pdf/g,'')
        let filename = f.split('-')
        let j = 0
        for (let i = 0; i < filename.length; i++) {
          if (filename[i] == "") {
            j++
          }
        }
        let suffix = file.name.split('.')
        if (file.type != 'application/pdf') {
          this.fileTips = '文件类型错误'
          this.uploadBtn = true
        }else if (file.size >= 10485760) {
          this.fileTips = '文件过大，请修改后重新选择'
          this.uploadBtn = true
        }else if (filename.length != 3 || j>0) {
          this.fileTips = '文件名格式不符合要求，请修改文件名并以 “-” 分隔'
          this.uploadBtn = true
        }
        else{
          this.filename = e.target.files[0].name
          this.uploadBtn = false
        }
      },
      uploadPDF() {
        let that = this
        let token = localStorage.getItem('apelink_user_token');
        let uid = localStorage.getItem('apelink_user_uid');
        let url = '/api/individual/uploadPDF';
        let headers = {'uid': uid, 'Authorization': token, 'Content-Type': 'multipart/form-data'};
        let data = new FormData()
        let time = setInterval(function(){
          that.uploadtime = parseInt(that.uploadtime) + 1
          console.log(that.uploadtime)
          if (that.uploadtime == 99) {
            clearInterval(time);
          }
        },50)
        that.uploadstate = true
        data.append('multipartFile', that.pdf)
        that.$axios({
          method: 'post',
          url: url,
          headers: headers,
          data: data,
        }).then(res => {
          if (res.data) {
            that.uploadword = '上传成功，我们会尽快反馈分析结果'
            clearInterval(time);
            that.uploadtime = 100
          }else{
            that.uploadword = '上传失败，'+res.data
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

