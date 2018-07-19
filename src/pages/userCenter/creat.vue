<template>
  <transition name="fade">
    <div class="container">
      <div class="edit_box">
        <div class="edit_title">
          <h4>投稿</h4>
        </div>
        <div class="edit_input">
          <span class="title">标题：</span>
          <input type="text" v-model="article.title"/>
        </div>
        <div class="edit_input posi_top">
          <span class="title">简介：</span>
          <textarea type="text" v-model="article.synopsis"/>
        </div>
        <div class="edit_input">
          <span class="title">标签：</span>
          <div class="btn-group">
            <button type="button"
                    class="btn btn-default dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
              {{labelName}}
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li @click="checkLabel(1,'标签1')"><a href="javascript:;">标签1</a></li>
              <li @click="checkLabel(2,'标签2')"><a href="javascript:;">标签2</a></li>
              <li @click="checkLabel(3,'标签3')"><a href="javascript:;">标签3</a></li>
            </ul>
          </div>
        </div>
        <div class="tinymce">
          <p class="title">正文：</p>
          <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
        </div>
        <div class="edit_input posi_top">
          <span class="title">封面：</span>
          <div class="radio_box">
            <label @click="cover = true"><input type="radio" name="cover_type" class="radio_style">从本地选择</label>
            <label @click="cover = false"><input type="radio" name="cover_type" class="radio_style">从正文中选择</label>
            <label @click="cover = false"><input type="radio" name="cover_type" class="radio_style"
                                                 checked>默认日期为图片</label>
          </div>
        </div>
        <transition name="fade">
          <div class="upload_box" v-show="cover">
            <p class="title">请选择本地图片：</p>
            <div class="upload_cover">
              <img src="../../assets/userCenter/plus.png">
              <img id="upload_img" src="../../assets/logo_brand3.png" alt="" class="id">
              <div class="upload_bg">选择图片</div>
              <input type="file" id="upload_file">
            </div>
          </div>
        </transition>
        <div class="control_box">
          <button class="submit">提交</button>
          <button class="cancel">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/modern/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'

  export default {
    data() {
      return {
        tinymceHtml: '请输入内容',
        article: {
          title: '',
          synopsis: '',
        },
        cover: false,
        init: {
          language_url: '/static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        },
        labelName: '请选择标签',
        labelId: 0
      }
    },
    mounted() {
      tinymce.init({})
    }
    ,
    methods: {
      checkLabel(id, name) {
        this.labelName = name;
        this.labelId = id;
      }
    },
    components: {Editor}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

