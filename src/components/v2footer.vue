<template>
  <div class="v2footer">
    <div class="container v2container">
      <div class="top">
        <div class="flexbox">
          <div class="box-row">
            <div class="box-col">
              <div class="flogo">
                <a href="#"><img src="../assets/logo2.png"></a>
              </div>
<<<<<<< HEAD
              <p class="flogodes">{{$t('Global largest blockchain projects automatic evaluate platform')}}</p>
=======
              <p class="flogodes">{{$t('Global blockchain projects automatic evaluate platform')}}</p>
>>>>>>> 439cfa5950876db38516210e8429a14031593ea1
            </div>
            <div class="box-col">
              <ul class="links">
                <li><router-link to="/about">{{$t('About Us')}}</router-link></li>
                <li><router-link to="/dynamicList">{{$t('Company News')}}</router-link></li>
                <li><router-link to="/cooperation">{{$t('Strategic cooperation')}}</router-link></li>
                <li><router-link to="/privacy">{{$t('Privacy policy')}}</router-link></li>
                <li><router-link to="/api">API</router-link></li>
              </ul>
            </div>
            <div class="box-col">
              <p class="ftitle">{{$t('Contact us')}}</p>
              <p class="femail">
                <img src="../assets/email.png"><span>ru.haiyan@bvaluate.com</span>
              </p>
            </div>
            <div class="box-col">
              <div class="eweima-row">
                <div class="item">
                  <p>{{$t('Wechat applet')}}</p>
                  <div class="img-div"><img src="../assets/feweima3.jpg"></div>
                </div>
                <div class="item">
                  <p>{{$t('Download App')}}</p>
                  <div class="img-div"><img src="../assets/feweima1.jpg"></div>
                </div>
                <div class="item">
                  <p>{{$t('WeChat official account')}}</p>
                  <div class="img-div"><img src="../assets/feweima2.jpg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action">ICP备案号：京ICP备18058682号-1</a></p>
        <p>Copyright &copy; 2018 - 2019 Bvaluate. All Rights Reserved</p>
      </div>
    </div>
<<<<<<< HEAD
=======
    <topbox></topbox>
>>>>>>> 439cfa5950876db38516210e8429a14031593ea1
  </div>
</template>

<script>
<<<<<<< HEAD
  export default {}
=======
  import topbox from '../components/topbox'
  export default {
    components: {
      topbox,
    },
  }
>>>>>>> 439cfa5950876db38516210e8429a14031593ea1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

