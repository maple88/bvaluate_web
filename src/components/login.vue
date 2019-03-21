<template>
  <transition name="fade">
    <div class="login_fixed v2login" v-show="loginPop">
      <div class="login_bg" @click="fn2"></div>
      <div class="loginbox">
        <!-- <i class="fa fa-arrow-circle-o-left backicon" v-show="resetpwd_head" @click="login()"></i> -->
        <div class="close_box" @click="fn2">
          <i class="icon_close2"></i>
        </div>
        <div class="hd">
          <div class="loginlogo"><img src="../assets/loginlogo.png"></div>
          <ul v-show="login_head">
            <!-- <li :class="{ active : isLogin }" @click="login()">{{$t('login')}}</li>
            <li :class="{ active : isRegister }" @click="register()">{{$t('Sign_Submit')}}</li> -->
            <li :class="{ active : isPhoneLogin }" @click="phoneLogin">短信登录</li>
            <li :class="{ active : isPasswordLogin }" @click="passwordLogin">密码登录</li>
          </ul>
          <ul v-show="resetpwd_head">
            <li>{{$t('Reset passwords')}}</li>
            <div class="back" @click="phoneLogin"><img src="../assets/login/back.png">登录</div>
          </ul>
          <ul v-show="register_head">
            <li class="active">{{$t('Sign_Submit')}}</li>
            <div class="back" @click="phoneLogin"><img src="../assets/login/back.png">登录</div>
          </ul>
        </div>
        <div class="bd">
          <div class="inputInner phoneLoginForm" v-show="phoneLoginForm">
            <div class="input-group">
              <div class="input-group-addon" :class="inputclass6[2]"><img src="../assets/login/icon2-1.png"></div>
              <div class="select-input">
                <div class="layui-form">
                  <div class="layui-news-style layui-unselect layui-form-select">
                    <div class="layui-select-title" @click="openSelect($event)">
                      <input type="text" placeholder="请选择" :class="inputclass6[1]" v-model="phoneLoginUser.selectPrefix" readonly="" class="layui-input layui-unselect">
                      <i class="layui-edge"></i>
                    </div>
                    <dl class="layui-anim layui-anim-upbit">
                      <dd :class="phoneLoginUser.selectPrefix === item.code ?'layui-this':''" v-for="(item, index) in countryCode" :key="index" @click="phoneLoginUser.selectPrefix = item.code">
                        <span>{{item.country}}</span><span>{{item.code}}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <input type="tel" class="form-control" :class="inputclass6[0]" v-model="phoneLoginUser.phoneNumber" :placeholder="$t('phone number')" data="输入手机号"
                       @focus="errorMsg.phoneLoginUser.phoneNumber = '';inputclass6=['boderbeblue','boderbeblue2','boderbeblue3']"
                       @blur="checkLoginPhoneNumber"
                       name="no_content" id="input_login_phoneNumber1">
              </div>

              <span class="help-block" v-if="errorMsg.phoneLoginUser.phoneNumber">
                    {{errorMsg.phoneLoginUser.phoneNumber}}
                  </span>
            </div>
            <div class="input-group code">
              <div class="input-group-addon" :class="inputclass5[2]"><img src="../assets/login/icon2-3.png"></div>
              <input type="text" v-model="phoneLoginUser.code" :class="inputclass5[0]" autocomplete="off" :placeholder="$t('Input verification code')" data="输入验证码"
                     @focus="errorMsg.phoneLoginUser.code = '';inputclass5=['boderbeblue','boderbeblue2','boderbeblue3']"
                     @blur="inputclass5=''"
                     name="no_content" id="input_phoneLogin_code">
              <span class="help-block" v-if="errorMsg.phoneLoginUser.code">
                    {{errorMsg.phoneLoginUser.code}}
                  </span>
              <button class="code-btn" :disabled="phoneLoginSendBtn" name="phoneLogin_code-btn" id="phoneLogin_code-btn"
                      data="获取验证码" @click.stop="sendPhoneLoginCode">
                <img :src="loading" v-show="phoneLoginShowloading"/>
                {{phoneLoginSendBtnText}}
              </button>
            </div>
            <div class="input-group submit-group">
              <button type="button" class="btn ok-btn" :class="phoneLoginUser.code&&phoneLoginUser.phoneNumber?'beblue':''" data="登录" name="login_ok" id="login_ok" @click="phoneLoginSubmit">{{$t('login')}}</button>
            </div>
            <div class="other-group">
              <div class="wechatLogin" @click="weChatLogin">
                <img src="../assets/login/wechat2.png">微信登录
              </div>
              <div class="no_accounts">没有账号 <span @click="register">立即注册</span></div>
            </div>
            <p class="loginTips">登录注册即视为同意<a href="javascript:;" @click="goPrivacy">《Bvaluate用户协议和隐私策略》</a></p>
            <!-- <div class="other-login">
              <div class="head">第三方登录</div>
              <ul>
                <li @click="weChatLogin">
                  <img src="../assets/login/wechat2.png">
                </li>
                <li>
                  <img src="../assets/login/qq.png">
                  <p>QQ</p>
                </li>
              </ul>
            </div> -->
          </div>
          <div class="inputInner passwordLoginForm" v-show="passwordLoginForm">
            <div class="input-group">
              <div class="input-group-addon" :class="inputclass4[2]"><img src="../assets/login/icon2-1.png"></div>
              <div class="select-input">
                <input type="tel" class="form-control" :class="inputclass4[0]" v-model="loginUser.phoneNumber" :placeholder="$t('phone number')" data="输入手机号"
                       @focus="errorMsg.loginUser.phoneNumber = '';inputclass4=['boderbeblue','boderbeblue2','boderbeblue3']"
                       @blur="inputclass4=''"
                       name="no_content" id="input_login_phoneNumber2">
              </div>

              <span class="help-block" v-if="errorMsg.loginUser.phoneNumber">
										{{errorMsg.loginUser.phoneNumber}}
									</span>
            </div>
            <div class="input-group mg10">
              <div class="input-group-addon" :class="inputclass3[2]"><img src="../assets/login/icon2-2.png"></div>
              <input :type="pwdtype" class="form-control password" :class="inputclass3[0]" v-model="loginUser.password" :placeholder="$t('password')" data="输入密码"
                     @focus="errorMsg.loginUser.password = '';inputclass3=['boderbeblue','boderbeblue2','boderbeblue3']"
                     @blur="inputclass3=''"
                     @keyup.enter="loginSubmit"
                     name="no_content" id="input_login_password">
              <div class="showpwd" @click="changePwdtype"><img :src="eye"></div>
              <span class="help-block" v-if="errorMsg.loginUser.password">
										{{errorMsg.loginUser.password}}
									</span>
            </div>
            <div class="other-group mgb15">
              <label class="remember">
                <input type="checkbox" checked data="记住我" name="no_content" id="input_checkbox"> {{$t('Remember me')}}
              </label>
              <span @click="resetpwd()">{{$t('Forgot password')}}</span>
            </div>
            <div class="input-group submit-group">
              <button type="button" class="btn ok-btn" :class="loginUser.password&&loginUser.phoneNumber?'beblue':''" data="登录" name="login_ok" id="login_ok" @click="loginSubmit">{{$t('login')}}</button>
            </div>
            <div class="other-group">
              <div class="wechatLogin" @click="weChatLogin">
                <img src="../assets/login/wechat2.png">微信登录
              </div>
              <div class="no_accounts">没有账号 <span @click="register">立即注册</span></div>
            </div>
            <p class="loginTips">登录注册即视为同意<a href="javascript:;" @click="goPrivacy">《Bvaluate用户协议和隐私策略》</a></p>
            <!-- <div class="other-login">
              <div class="head">第三方登录</div>
              <ul>
                <li @click="weChatLogin">
                  <img src="../assets/login/wechat2.png">
                </li>
                <li>
                  <img src="../assets/login/qq.png">
                  <p>QQ</p>
                </li>
              </ul>
            </div> -->
          </div>
          <div class="inputInner registerForm" v-show="registerForm">
            <!-- <div class="input-group">
              <div class="input-group-addon"><img src="../assets/login/icon1.png"></div>
              <input type="text" class="form-control" v-model="registerUser.nickName"
                     maxlength="14"
                     placeholder="你的昵称"
                     @focus="errorMsg.registerUser.nickName = ''"
                     @blur="checkNickName()"
                     data="输入昵称"
                     name="no_content" id="input_login_nickName"
              >
              <span class="help-block" v-if="errorMsg.registerUser.nickName">
										{{errorMsg.registerUser.nickName}}
									</span>
            </div> -->
            <div class="input-group">
              <div class="input-group-addon" :class="[inputclass[2],errorMsg.registerUser.phoneNumber?'boderbeyellow3':'']"><img src="../assets/login/icon2-1.png"></div>

              <div class="select-input">
                <div class="layui-form">
                  <div class="layui-news-style layui-unselect layui-form-select">
                    <div class="layui-select-title" @click="openSelect($event)">
                      <input type="text" placeholder="请选择"  :class="[inputclass[1],errorMsg.registerUser.phoneNumber?'boderbeyellow2':'']" v-model="registerUser.selectPrefix" readonly="" class="layui-input layui-unselect">
                      <i class="layui-edge"></i>
                    </div>
                    <dl class="layui-anim layui-anim-upbit">
                      <dd :class="registerUser.selectPrefix === item.code ?'layui-this':''" v-for="(item, index) in countryCode" :key="index" @click="registerUser.selectPrefix = item.code">
                        <span>{{item.country}}</span><span>{{item.code}}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <input type="tel" class="form-control" :class="[inputclass[0],errorMsg.registerUser.phoneNumber?'boderbeyellow':'']" v-model="registerUser.phoneNumber" :placeholder="$t('phone number')"
                       @focus="errorMsg.registerUser.phoneNumber = '';inputclass=['boderbeblue','boderbeblue2','boderbeblue3']"
                       @blur="checkPhoneNumber()"
                       data="输入手机号"
                       name="no_content" id="input_login_phoneNumber3"
                >
              </div>
              <span class="help-block" v-if="errorMsg.registerUser.phoneNumber">
										{{errorMsg.registerUser.phoneNumber}}
									</span>
            </div>
            <div class="input-group">
              <div class="input-group-addon" :class="[inputclass1[2],errorMsg.registerUser.password?'boderbeyellow3':'']"><img src="../assets/login/icon2-2.png"></div>
              <input type="password" class="form-control" :class="[inputclass1[0],errorMsg.registerUser.password?'boderbeyellow':'']"  v-model="registerUser.password" :placeholder="$t('password')"
                     @focus="errorMsg.registerUser.password = '';inputclass1=['boderbeblue','boderbeblue2','boderbeblue3']"
                     @blur="checkPassword(true)"
                     data="输入密码"
                     name="no_content" id="input_login_password2"
              >
              <span class="help-block" v-if="errorMsg.registerUser.password">
										{{errorMsg.registerUser.password}}
									</span>
            </div>
            <!-- <div class="input-group">
              <div class="input-group-addon"><img src="../assets/login/icon2-2.png"></div>
              <input type="password" class="form-control" v-model="registerUser.confirmpsd" placeholder="确认密码"
                     @focus="errorMsg.registerUser.confirmpsd = ''"
                     @blur="checkPassword(false)"
                     data="输入确认的密码"
                     name="no_content" id="input_login_confirmpsd"
              >
              <span class="help-block" v-if="errorMsg.registerUser.confirmpsd">
										{{errorMsg.registerUser.confirmpsd}}
									</span>
            </div> -->
            <div class="input-group code">
              <div class="input-group-addon" :class="inputclass2[2]"><img src="../assets/login/icon2-3.png"></div>
              <input type="text" v-model="registerUser.code" :class="inputclass2[0]" :placeholder="$t('Input verification code')" data="输入验证码"
                     @focus="errorMsg.registerUser.code = '';inputclass2=['boderbeblue','boderbeblue2','boderbeblue3']"
                     @blur="inputclass2=''"
                     name="no_content" id="input_register_code">
              <span class="help-block" v-if="errorMsg.registerUser.code">
										{{errorMsg.registerUser.code}}
									</span>
              <button class="code-btn"  :disabled="registerSendBtn" name="login_code-btn" id="login_code-btn"
                      data="获取验证码" @click.stop="sendCode">
                <img :src="loading" v-show="registerShowloading"/>
                {{registerSendBtnText}}
              </button>
            </div>
            <p class="loginTips">点击注册即表示您同意 <a href="javascript:;" @click="goPrivacy">《Bvaluate用户协议和隐私策略》</a></p>
            <div class="input-group submit-group">
              <button type="button" class="btn ok-btn" :class="registerUser.phoneNumber&&registerUser.password&&registerUser.code?'beblue':''" data="注册" name="login_register" id="login_register" @click.stop="registerSubmit()">{{$t('Sign_Submit')}}</button>
            </div>
            <!-- <p class="register-tips">点击“注册”即表示您同意并愿意接收<br>BVALUATE<span>用户此协议</span>和<span>隐私政策</span></p> -->
          </div>
          <div class="inputInner" v-show="resetpwdForm">
            <div class="input-group">
              <div class="input-group-addon"><img src="../assets/login/icon2-1.png"></div>
              <div class="select-input">
                <div class="layui-form">
                  <div class="layui-news-style layui-unselect layui-form-select">
                    <div class="layui-select-title" @click="openSelect($event)">
                      <input type="text" placeholder="请选择" v-model="resetpwdUser.selectPrefix" readonly="" class="layui-input layui-unselect">
                      <i class="layui-edge"></i>
                    </div>
                    <dl class="layui-anim layui-anim-upbit">
                      <dd :class="resetpwdUser.selectPrefix === item.code ?'layui-this':''" v-for="(item, index) in countryCode" :key="index" @click="resetpwdUser.selectPrefix = item.code">
                        <span>{{item.country}}</span><span>{{item.code}}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <input type="tel" class="form-control" v-model="resetpwdUser.phoneNumber" :placeholder="$t('phone number')"
                       @focus="errorMsg.resetpwdUser.phoneNumber = ''"
                       @blur="checkResetPhoneNumber"
                       data="输入手机号"
                       name="no_content" id="input_login_phoneNumber4"
                >
              </div>

              <span class="help-block" v-if="errorMsg.resetpwdUser.phoneNumber">
										{{errorMsg.resetpwdUser.phoneNumber}}
									</span>
            </div>
            <div class="input-group">
              <div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
              <input type="password" class="form-control" v-model="resetpwdUser.password" :placeholder="$t('Reset passwords')"
                     @focus="errorMsg.resetpwdUser.password = ''"
                     @blur="checkResetPassword(true)"
                     data="输入重置的密码"
                     name="no_content" id="input_login_password3"
              >
              <span class="help-block" v-if="errorMsg.resetpwdUser.password">
										{{errorMsg.resetpwdUser.password}}
									</span>
            </div>
            <div class="input-group">
              <div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
              <input type="password" class="form-control" v-model="resetpwdUser.confirmpsd" :placeholder="$t('Confirm password')"
                     @focus="errorMsg.resetpwdUser.confirmpsd = ''"
                     @blur="checkResetPassword(false)"
                     data="输入确认的密码"
                     name="no_content" id="input_login_confirmpsd2"
              >
              <span class="help-block" v-if="errorMsg.resetpwdUser.confirmpsd">
										{{errorMsg.resetpwdUser.confirmpsd}}
									</span>
            </div>
            <div class="input-group code">
              <div class="input-group-addon"><img src="../assets/login/icon2-3.png"></div>
              <input type="text" :placeholder="$t('Input verification code')" v-model="resetpwdUser.code"
                     @focus="errorMsg.resetpwdUser.code = ''"
                     data="输入验证码"
                     name="no_content" id="input_resetpwd_code2"
              >
              <span class="help-block" v-if="errorMsg.resetpwdUser.code">
										{{errorMsg.resetpwdUser.code}}
									</span>
              <button class="code-btn" :disabled="resetPwdSendBtn" name="login_code-btn2" id="login_code-btn2"
                      @click.stop="sendresetPwdCode" data="获取验证码">
                <img :src="loading" v-show="resetPwdShowloading"/>
                {{resetPwdSendBtnText}}
              </button>
            </div>
            <div class="input-group submit-group">
              <button type="button" class="btn ok-btn" name="login_ok2" id="login_ok2" data="重置密码" @click="resetpwdSubmit">{{$t('Reset passwords')}}</button>
            </div>
          </div>
        </div>
        <transition name="fade">
          <vtips :tipText="tipText" v-if="showTip"/>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import code from '../assets/json/prefix.json'

  let loading = require('../assets/login/loading.gif');
  let bg = require('../assets/login/login_bg.jpg');
  let eye = require('../assets/user/hide.png');
  let openeye = require('../assets/login/eye-on.png');
  export default {
    data() {
      return {
        inputclass:'',
        inputclass1:'',
        inputclass2:'',
        inputclass3:'',
        inputclass4:'',
        inputclass5:'',
        inputclass6:'',
        inputclass7:'',
        inputclass8:'',
        bg: bg,
        visiable: this.value,
        login_head: true,
        resetpwd_head: false,
        register_head: false,
        isPhoneLogin: true,
        isPasswordLogin: false,
        phoneLoginForm: true,
        passwordLoginForm: false,
        registerForm: false,
        resetpwdForm: false,
        // openSelect:false,
        registerUser: {
          nickName: '',
          code: '',
          phoneNumber: '',
          password: '',
          confirmpsd: '',
          prefix:'86',
          selectPrefix: '+86'
        },
        phoneLoginUser: {
          phoneNumber: '',
          code: '',
          password: '',
          prefix:'86',
          selectPrefix: '+86'
        },
        loginUser: {
          phoneNumber: '',
          password: '',
          prefix:'86'
        },
        resetpwdUser: {
          code: '',
          phoneNumber: '',
          password: '',
          confirmpsd: '',
          prefix:'86',
          selectPrefix: '+86'
        },
        errorMsg: {
          registerUser: {
            nickName: '',
            phoneNumber: '',
            code: '',
            confirmpsd: '',
            password: ''
          },
          resetpwdUser: {
            code: '',
            phoneNumber: '',
            password: '',
            confirmpsd: ''
          },
          loginUser: {
            phoneNumber: '',
            password: ''
          },
          phoneLoginUser: {
            code: '',
            phoneNumber: '',
            password: ''
          }
        },
        phoneLogin_time: 60,
        phoneLoginSendBtnText: this.$t('Send Message'),
        phoneLoginSendBtn: true,
        phoneLoginShowloading: false,
        register_time: 60,
        registerSendBtnText: this.$t('Send Message'),
        registerSendBtn: true,
        registerShowloading: false,
        resetPwd_time: 60,
        resetPwdSendBtnText: this.$t('Send Message'),
        resetPwdSendBtn: true,
        resetPwdShowloading: false,
        loading: loading,
        tipText: '',
        showTip: false,
        pwdtype: 'password',
        eye: eye,
        countryCode: code
      }
    },
    props: {
      initUser: {
        type: Function,
        default: null
      }
    },
    computed: {
      loginPop() {
        let isRegister = this.$store.state.registerPop;
        // console.log(isRegister);
        if (isRegister) {
          this.register();
        }
        return this.$store.state.loginPop;
      }
    },
    mounted() {
      let that = this;
      layui.use('form', function () {
        let form = layui.form;
        form.render('select');
        form.on('select(registerSelect)', function(data){
          that.registerUser.prefix = data.value;
        });
        form.on('select(resetpwdSelect)', function(data){
          that.resetpwdUser.prefix = data.value;
        });
        // form.on('select(loginSelect)', function(data){
        //   that.loginUser.prefix = data.value;
        // });
      });
    },
    methods: {
      goPrivacy () {
        this.$store.state.loginPop = false;
        this.$router.push('/privacy');
      },
      openSelect (e) {
        e.target.parentNode.parentNode.classList.add('layui-form-selected');
      },
      headerInitUser() {
        if (this.initUser) {
          this.initUser();
        }
      },
      changePwdtype() {
        if (this.pwdtype === 'password') {
          this.pwdtype = 'text';
          this.eye = openeye;
        } else {
          this.pwdtype = 'password';
          this.eye = eye;
        }
      },
      
      fn2() {
        this.$store.state.loginPop = false;
        this.$store.state.registerPop = false;
        this.phoneLogin();
      },
      weChatLogin() {
        this.$store.state.wechatPop = true;
        // let random = parseInt(Math.random() * 100000000);
        // window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx67252f94be009c71&redirect_uri=https://bvaluate.com.cn/user/passAuth&response_type=code&scope=snsapi_login&state=' + random + '#wechat_redirect';
      },
      phoneLoginSubmit() {
        let that = this;
        let pass = true;
        let phoneNumber = that.phoneLoginUser.phoneNumber;
        let code = that.phoneLoginUser.code;
        let selectPrefix = that.phoneLoginUser.selectPrefix;
        selectPrefix = selectPrefix.replace(/\+/g, '');
        let loginPhoneNumber = selectPrefix + '-' + phoneNumber;
        if (phoneNumber !== null && phoneNumber !== '' && phoneNumber !== undefined) {
          if (!(/^[0-9]*$/.test(phoneNumber))) {
            pass = false;
            that.errorMsg.phoneLoginUser.phoneNumber = '请输入正确格式的手机号码'
            sensors.track("Loginresult", {
              is_true: false,
              false_reason: that.errorMsg.phoneLoginUser.phoneNumber
            });
          }
        } else {
          pass = false;
          that.errorMsg.phoneLoginUser.phoneNumber = '手机号码不能为空'
          sensors.track("Loginresult", {
            is_true: false,
            false_reason: that.errorMsg.phoneLoginUser.phoneNumber
          });
        }
        if (!(code !== null && code !== '' && code !== undefined)) {
          pass = false;
          that.errorMsg.phoneLoginUser.code = '手机验证码不能为空'
          sensors.track("Loginresult", {
            is_true: false,
            false_reason: that.errorMsg.phoneLoginUser.code
          });
        }
        if (pass) {
          let load;
          layui.use('layer', function () {
            var layer = layui.layer;
            load = layer.load(2);
          });
          that.$axios.post('/api/login/phoneLogin?phoneNumber='+loginPhoneNumber+'&code='+code).then(function (res) {
            let data = res.data;
            let uid = data.uid;
            let token = data.token;
            let phoneNumber = data.phoneNumber;
            let expirationDate = data.expirationDate;
            localStorage.setItem('apelink_user_expirationDate', expirationDate);
            localStorage.setItem('apelink_user_uid', uid);
            localStorage.setItem('apelink_user_token', token);
            that.$store.state.token = token;
            that.$store.state.uid = uid;
            localStorage.setItem('apelink_user_phoneNumber', phoneNumber);
            sensors.setProfile({phone: phoneNumber});
            let url = '/api/user/info';
            let headers = {'uid': uid, 'Authorization': token};
            // console.log(headers);
            that.$axios({
              method: 'get',
              url: url,
              headers: headers
            }).then(function (res) {
              that.aplinkUser = res.data;
              localStorage.setItem('apelink_user_candies', res.data.candies);
              localStorage.setItem('apelink_user_nickName', res.data.nickName);
              sensors.setProfile({nickname: res.data.nickName});
              localStorage.setItem('apelink_user_signedIn', res.data.signedIn);
              localStorage.setItem('apelink_user_signedInNum', res.data.signedInNum);
              let synopsis = res.data.synopsis;
              let profileUrl = res.data.profileUrl;
              let email = res.data.email;
              let sex = res.data.sex;
              if (!(synopsis != null && synopsis !== undefined && synopsis !== '' && synopsis !== 'null')) {
                synopsis = ''
              }
              if (!(profileUrl != null && profileUrl !== undefined && profileUrl !== '' && profileUrl !== 'null')) {
                profileUrl = ''
              }
              if (!(email != null && email !== undefined && email !== '' && email !== 'null')) {
                email = ''
              }
              if (sex < 1) {
                sex = 1
              }
              localStorage.setItem('apelink_user_synopsis', synopsis);
              localStorage.setItem('apelink_user_profileUrl', profileUrl);
              localStorage.setItem('apelink_user_email', email);
              sensors.setProfile({Email: email});
              localStorage.setItem('apelink_user_sex', sex);
              localStorage.setItem('apelink_user_unionid', res.data.unionid);
              that.$store.state.unionid = res.data.unionid;
              localStorage.setItem('apelink_user_passwd', res.data.passwd);
              that.$store.state.passwd = res.data.passwd;
              if (sex === '2') {
                sensors.setProfile({gender: '男'});
              } else if (sex === '3') {
                sensors.setProfile({gender: '女'});
              }
              sensors.registerPage({
                platform_type: 'web',
                is_login: true,
                is_register: true
              });
              sensors.login(uid);
              sensors.track("Loginresult", {
                is_true: true,
                false_reason: '登录成功'
              });
              layer.close(load);
              // window.location.reload();
              that.headerInitUser();
              that.$store.state.loginPop = false;
              // if (that.$route.path === '/myfollow') {
              //   window.location.reload();
              // }
              layer.msg('登录成功');
              setTimeout(() => {
                that.showTip = false;
                // that.login();
                if (!res.data.signedIn) {
                  that.$store.state.signInTips = true;
                }
              }, 1000);
            }).catch(function (res) {
            })
          }).catch((res) => {
            layer.close(load);
            that.$toast(res.data.message);
          })
        }
      },
      loginSubmit() {
        let phoneNumber = this.loginUser.phoneNumber;
        let password = this.loginUser.password;
        if (phoneNumber == null || phoneNumber === undefined || phoneNumber === '') {
          this.errorMsg.loginUser.phoneNumber = '请输入手机号码/账号';
          sensors.track("Loginresult", {
            is_true: false,
            false_reason: this.errorMsg.loginUser.phoneNumber
          });
        } else if (password == null || password === undefined || password === '') {
          this.errorMsg.loginUser.password = '请输入密码';
          sensors.track("Loginresult", {
            is_true: false,
            false_reason: this.errorMsg.loginUser.password
          });
        } else {
          let that = this;
          let json = {
            phoneNumber: phoneNumber,
            password: password
          };
          let load;
          layui.use('layer', function () {
            var layer = layui.layer;
            load = layer.load(2);
          });
          that.$axios.post('/api/login', json).then(function (res) {
            let data = res.data;
            let uid = data.uid;
            let token = data.token;
            let phoneNumber = data.phoneNumber;
            let expirationDate = data.expirationDate;
            localStorage.setItem('apelink_user_expirationDate', expirationDate);
            localStorage.setItem('apelink_user_uid', uid);
            localStorage.setItem('apelink_user_token', token);
            that.$store.state.token = token;
            that.$store.state.uid = uid;
            localStorage.setItem('apelink_user_phoneNumber', phoneNumber);
            sensors.setProfile({phone: phoneNumber});
            let url = '/api/user/info';
            let headers = {'uid': uid, 'Authorization': token};
            // console.log(headers);
            that.$axios({
              method: 'get',
              url: url,
              headers: headers
            }).then(function (res) {
              that.aplinkUser = res.data;
              localStorage.setItem('apelink_user_candies', res.data.candies);
              localStorage.setItem('apelink_user_nickName', res.data.nickName);
              sensors.setProfile({nickname: res.data.nickName});
              localStorage.setItem('apelink_user_signedIn', res.data.signedIn);
              localStorage.setItem('apelink_user_signedInNum', res.data.signedInNum);
              let synopsis = res.data.synopsis;
              let profileUrl = res.data.profileUrl;
              let email = res.data.email;
              let sex = res.data.sex;
              if (!(synopsis != null && synopsis !== undefined && synopsis !== '' && synopsis !== 'null')) {
                synopsis = ''
              }
              if (!(profileUrl != null && profileUrl !== undefined && profileUrl !== '' && profileUrl !== 'null')) {
                profileUrl = ''
              }
              if (!(email != null && email !== undefined && email !== '' && email !== 'null')) {
                email = ''
              }
              if (sex < 1) {
                sex = 1
              }
              localStorage.setItem('apelink_user_synopsis', synopsis);
              localStorage.setItem('apelink_user_profileUrl', profileUrl);
              localStorage.setItem('apelink_user_email', email);
              sensors.setProfile({Email: email});
              localStorage.setItem('apelink_user_sex', sex);
              localStorage.setItem('apelink_user_unionid', res.data.unionid);
              that.$store.state.unionid = res.data.unionid;
              localStorage.setItem('apelink_user_passwd', res.data.passwd);
              that.$store.state.passwd = res.data.passwd;
              if (sex === '2') {
                sensors.setProfile({gender: '男'});
              } else if (sex === '3') {
                sensors.setProfile({gender: '女'});
              }
              sensors.registerPage({
                platform_type: 'web',
                is_login: true,
                is_register: true
              });
              sensors.login(uid);
              sensors.track("Loginresult", {
                is_true: true,
                false_reason: '登录成功'
              });
              layer.close(load);
              // window.location.reload();
              that.headerInitUser();
              that.$store.state.loginPop = false;
              // if (that.$route.path === '/myfollow') {
              //   window.location.reload();
              // }
              layer.msg('登录成功');
              setTimeout(() => {
                that.showTip = false;
                // that.login();
                if (!res.data.signedIn) {
                  that.$store.state.signInTips = true;
                }
              }, 1000);
            }).catch(function (res) {
            })
          }).catch((res) => {
            layer.close(load);
            that.$toast(res.data.message);
          })
        }
      },
      registerSubmit() {
        let pass = true;
        let phoneNumber = this.registerUser.phoneNumber;
        let password = this.registerUser.password;
        let code = this.registerUser.code;
        let confirmpsd = this.registerUser.confirmpsd;
        let selectPrefix = this.registerUser.selectPrefix;
        selectPrefix = selectPrefix.replace(/\+/g, '');
        // let nickName = this.registerUser.nickName;
        // if (nickName !== null && nickName !== '' && nickName !== undefined) {
        //   if (this.strLength(nickName) > 14) {
        //     pass = false;
        //     this.errorMsg.registerUser.nickName = '请输入为14个英文字符或7个汉字'
        //     sensors.track("Registerresult", {
        //       is_true: false,
        //       false_reason: this.errorMsg.registerUser.nickName
        //     });
        //   }
        // } else {
        //   pass = false;
        //   this.errorMsg.registerUser.nickName = '昵称不能为空'
        //   sensors.track("Registerresult", {
        //     is_true: false,
        //     false_reason: this.errorMsg.registerUser.nickName
        //   });
        // }
        if (phoneNumber !== null && phoneNumber !== '' && phoneNumber !== undefined) {
          if (!(/^[0-9]*$/.test(phoneNumber))) {
            pass = false;
            this.errorMsg.registerUser.phoneNumber = '请输入正确格式的手机号码'
            sensors.track("Registerresult", {
              is_true: false,
              false_reason: this.errorMsg.registerUser.phoneNumber
            });
          }
        } else {
          pass = false;
          this.errorMsg.registerUser.phoneNumber = '手机号码不能为空'
          sensors.track("Registerresult", {
            is_true: false,
            false_reason: this.errorMsg.registerUser.phoneNumber
          });
        }
        if (password !== null && password !== '' && password !== undefined) {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.registerUser.password)) {
            // if (this.registerUser.confirmpsd !== this.registerUser.password) {
            //   pass = false;
            //   this.errorMsg.registerUser.password = '两次输入不一致'
            //   sensors.track("Registerresult", {
            //     is_true: false,
            //     false_reason: this.errorMsg.registerUser.password
            //   });
            // }
          } else {
            pass = false;
            this.errorMsg.registerUser.password = '只允许输入6-14个英文大小写和数字'
            sensors.track("Registerresult", {
              is_true: false,
              false_reason: this.errorMsg.registerUser.password
            });
          }
        } else {
          pass = false;
          this.errorMsg.registerUser.password = '密码不能为空'
          sensors.track("Registerresult", {
            is_true: false,
            false_reason: this.errorMsg.registerUser.password
          });
        }
        // if (confirmpsd !== null && confirmpsd !== '' && confirmpsd !== undefined) {
        //   if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.registerUser.password)) {
        //     if (this.registerUser.confirmpsd !== this.registerUser.password) {
        //       pass = false;
        //       this.errorMsg.registerUser.confirmpsd = '两次输入不一致'
        //       sensors.track("Registerresult", {
        //         is_true: false,
        //         false_reason: this.errorMsg.registerUser.confirmpsd
        //       });
        //     }
        //   } else {
        //     pass = false;
        //     this.errorMsg.registerUser.confirmpsd = '只允许输入6-14个英文大小写和数字'
        //     sensors.track("Registerresult", {
        //       is_true: false,
        //       false_reason: this.errorMsg.registerUser.confirmpsd
        //     });
        //   }
        // } else {
        //   pass = false;
        //   this.errorMsg.registerUser.confirmpsd = '密码不能为空'
        //   sensors.track("Registerresult", {
        //     is_true: false,
        //     false_reason: this.errorMsg.registerUser.confirmpsd
        //   });
        // }
        if (!(code !== null && code !== '' && code !== undefined)) {
          pass = false;
          this.errorMsg.registerUser.code = '手机验证码不能为空'
          sensors.track("Registerresult", {
            is_true: false,
            false_reason: this.errorMsg.registerUser.code
          });
        }
        if (pass) {
          let that = this;
          let url = '/api/user/register';
          let json = {
            globallp: selectPrefix,
            code: code,
            phoneNumber: selectPrefix+'-'+phoneNumber,
            password: password
          };
          that.$axios.post(url, json).then(function (res) {
            that.showTip = true;
            that.tipText = '注册成功';
            localStorage.setItem('apelink_user_is_register', true);
            sensors.registerPage({
              platform_type: 'web',
              is_login: false,
              is_register: true
            });
            sensors.track("Registerresult", {
              is_true: true,
              false_reason: '注册成功'
            });
            let json2 = {
              phoneNumber: phoneNumber,
              password: password
            };
            that.$axios.post('/api/login', json2).then(function (res) {
              let data = res.data;
              let uid = data.uid;
              let token = data.token;
              let phoneNumber = data.phoneNumber;
              let expirationDate = data.expirationDate;
              localStorage.setItem('apelink_user_expirationDate', expirationDate);
              localStorage.setItem('apelink_user_uid', uid);
              localStorage.setItem('apelink_user_token', token);
              localStorage.setItem('apelink_user_phoneNumber', phoneNumber);
              let url = '/api/user/info';
              let headers = {'uid': uid, 'Authorization': token};
              that.$axios({
                method: 'get',
                url: url,
                headers: headers
              }).then(function (res) {
                that.aplinkUser = res.data;
                localStorage.setItem('apelink_user_candies', res.data.candies);
                localStorage.setItem('apelink_user_nickName', res.data.nickName);
                sensors.setProfile({nickname: res.data.nickName});
                localStorage.setItem('apelink_user_signedIn', res.data.signedIn);
                localStorage.setItem('apelink_user_signedInNum', res.data.signedInNum);
                let synopsis = res.data.synopsis;
                let profileUrl = res.data.profileUrl;
                let email = res.data.email;
                let sex = res.data.sex;
                if (!(synopsis != null && synopsis !== undefined && synopsis !== '' && synopsis !== 'null')) {
                  synopsis = ''
                }
                if (!(profileUrl != null && profileUrl !== undefined && profileUrl !== '' && profileUrl !== 'null')) {
                  profileUrl = ''
                }
                if (!(email != null && email !== undefined && email !== '' && email !== 'null')) {
                  email = ''
                }
                if (sex < 1) {
                  sex = 1
                }
                localStorage.setItem('apelink_user_synopsis', synopsis);
                localStorage.setItem('apelink_user_profileUrl', profileUrl);
                localStorage.setItem('apelink_user_email', email);
                sensors.setProfile({Email: email});
                localStorage.setItem('apelink_user_sex', sex);
                localStorage.setItem('apelink_user_unionid', res.data.unionid);
                localStorage.setItem('apelink_user_passwd', res.data.passwd);
                that.$store.state.passwd = res.data.passwd;
                if (sex === '2') {
                  sensors.setProfile({gender: '男'});
                } else if (sex === '3') {
                  sensors.setProfile({gender: '女'});
                }
                sensors.registerPage({
                  platform_type: 'web',
                  is_login: true,
                  is_register: true
                });
                sensors.login(uid);
                sensors.track("Loginresult", {
                  is_true: true,
                  false_reason: '登录成功'
                });
                // window.location.reload();
                that.headerInitUser();
                that.$store.state.loginPop = false;
                // if (that.$route.path === '/myfollow') {
                //   window.location.reload();
                // }
                layer.msg('登录成功');
              })
            });
          })
        }
      },
      resetpwdSubmit() {
        let pass = true;
        let phoneNumber = this.resetpwdUser.phoneNumber;
        let password = this.resetpwdUser.password;
        let code = this.resetpwdUser.code;
        let confirmpsd = this.resetpwdUser.confirmpsd;
        if (phoneNumber !== null && phoneNumber !== '' && phoneNumber !== undefined) {
          if (!(/^[0-9]*$/.test(phoneNumber))) {
            pass = false;
            this.errorMsg.resetpwdUser.phoneNumber = '请输入正确格式的手机号码'
          }
        } else {
          pass = false;
          this.errorMsg.resetpwdUser.phoneNumber = '手机号码不能为空'
        }
        if (password !== null && password !== '' && password !== undefined) {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.resetpwdUser.password)) {
            if (this.resetpwdUser.confirmpsd !== this.resetpwdUser.password) {
              pass = false;
              this.errorMsg.resetpwdUser.password = '两次输入不一致'
            }
          } else {
            pass = false;
            this.errorMsg.resetpwdUser.password = '只允许输入6-14个英文大小写和数字'
          }
        } else {
          pass = false;
          this.errorMsg.resetpwdUser.password = '密码不能为空'
        }
        if (confirmpsd !== null && confirmpsd !== '' && confirmpsd !== undefined) {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.resetpwdUser.password)) {
            if (this.resetpwdUser.confirmpsd !== this.resetpwdUser.password) {
              pass = false;
              this.errorMsg.resetpwdUser.confirmpsd = '两次输入不一致'
            }
          } else {
            pass = false;
            this.errorMsg.resetpwdUser.confirmpsd = '只允许输入6-14个英文大小写和数字'
          }
        } else {
          pass = false;
          this.errorMsg.resetpwdUser.confirmpsd = '密码不能为空'
        }
        if (!(code !== null && code !== '' && code !== undefined)) {
          pass = false;
          this.errorMsg.resetpwdUser.code = '手机验证码不能为空'
        }
        if (pass) {
          let url = '/api/user/retrievePassword?phoneNumber=' + phoneNumber + '&code=' + code + '&password=' + password;
          let that = this
          that.$axios.post(url).then(function (res) {
            if (res.data) {
              that.showTip = true;
              that.tipText = '重置成功';
              setTimeout(() => {
                that.showTip = false;
                that.login()
              }, 2000);
            }
          })
        } else {
        }
      },
      checkPassword(type) {
        this.inputclass1='';
        if (type) {
          if (this.registerUser.password != null && this.registerUser.password !== '' && this.registerUser.password !== undefined) {
            if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.registerUser.password)) {
              if (this.registerUser.confirmpsd != null && this.registerUser.confirmpsd !== '' && this.registerUser.confirmpsd !== undefined) {
                if (this.registerUser.confirmpsd !== this.registerUser.password) {
                  this.errorMsg.registerUser.password = '两次输入不一致'
                } else {
                  this.errorMsg.registerUser.confirmpsd = ''
                }
              }
            } else {
              this.errorMsg.registerUser.password = '只允许输入6-14个英文大小写和数字'
            }
          }
        } else {
          if (this.registerUser.confirmpsd !== this.registerUser.password) {
            this.errorMsg.registerUser.confirmpsd = '两次输入不一致'
          } else {
            this.errorMsg.registerUser.password = ''
          }
        }
      },
      checkLoginPhoneNumber() {
        this.inputclass6=''
        if (this.phoneLoginUser.phoneNumber != null && this.phoneLoginUser.phoneNumber !== '' && this.phoneLoginUser.phoneNumber !== undefined) {
          let phone = this.phoneLoginUser.phoneNumber;
          if (/^[0-9]*$/.test(phone)) {
            this.phoneLoginSendBtn = false;
            // let that = this;
            // let url = '/api/user/phoneCheck?phoneNumber=' + phone;
            // that.$axios.post(url).then(function (res) {
            //   if (!res.data) {
            //     that.errorMsg.phoneLoginUser.phoneNumber = '该手机号码未被注册，请重新输入'
            //   } else {
            //     that.phoneLoginSendBtn = false
            //   }
            // })
          } else {
            this.errorMsg.phoneLoginUser.phoneNumber = '请输入正确格式的手机号码'
          }
        }
      },
      checkPhoneNumber() {
        this.inputclass='';
        if (this.registerUser.phoneNumber != null && this.registerUser.phoneNumber !== '' && this.registerUser.phoneNumber !== undefined) {
          let phone = this.registerUser.phoneNumber;
          if (/^[0-9]*$/.test(phone)) {
            let that = this;
            let url = '/api/user/phoneCheck?phoneNumber=' + phone;
            that.$axios.post(url).then(function (res) {
              if (res.data) {
                that.errorMsg.registerUser.phoneNumber = '该手机号码已经注册'
              } else {
                that.registerSendBtn = false
              }
            }).catch(function (res) {
            })
          } else {
            this.errorMsg.registerUser.phoneNumber = '请输入正确格式的手机号码'
          }
        }
      },
      checkResetPassword(type) {
        if (type) {
          if (this.resetpwdUser.password != null && this.resetpwdUser.password !== '' && this.resetpwdUser.password !== undefined) {
            if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.resetpwdUser.password)) {
              if (this.resetpwdUser.confirmpsd != null && this.resetpwdUser.confirmpsd !== '' && this.resetpwdUser.confirmpsd !== undefined) {
                if (this.resetpwdUser.confirmpsd !== this.resetpwdUser.password) {
                  this.errorMsg.resetpwdUser.password = '两次输入不一致'
                } else {
                  this.errorMsg.resetpwdUser.confirmpsd = ''
                }
              }
            } else {
              this.errorMsg.resetpwdUser.password = '只允许输入6-14个英文大小写和数字'
            }
          }
        } else {
          if (this.resetpwdUser.confirmpsd !== this.resetpwdUser.password) {
            this.errorMsg.resetpwdUser.confirmpsd = '两次输入不一致'
          } else {
            this.errorMsg.resetpwdUser.password = ''
          }
        }
      },
      checkResetPhoneNumber() {
        if (this.resetpwdUser.phoneNumber != null && this.resetpwdUser.phoneNumber !== '' && this.resetpwdUser.phoneNumber !== undefined) {
          let phone = this.resetpwdUser.phoneNumber;
          if (/^[0-9]*$/.test(phone)) {
            let that = this;
            let url = '/api/user/phoneCheck?phoneNumber=' + phone;
            that.$axios.post(url).then(function (res) {
              if (!res.data) {
                that.errorMsg.resetpwdUser.phoneNumber = '该手机号码未被注册，请重新输入'
              } else {
                that.resetPwdSendBtn = false
              }
            })
          } else {
            this.errorMsg.resetpwdUser.phoneNumber = '请输入正确格式的手机号码'
          }
        }
      },
      checkNickName() {
        let nickName = this.registerUser.nickName;
        if (this.strLength(nickName) <= 14) {
          let that = this;
          let url = '/api/user/nickNameExist?nickName=' + nickName;
          that.$axios.post(url).then(function (res) {
            if (res.data) {
              that.errorMsg.registerUser.nickName = '该昵称已被注册'
            }
          }).catch(function (res) {
          })
        } else {
          this.errorMsg.registerUser.nickName = '请输入为14个英文字符或7个汉字'
        }
      },
      strLength(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
          let c = str.charCodeAt(i);
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
          }
          else {
            len += 2;
          }
        }
        return len;
      },
      sendCode() {
        this.registerSendBtn = true;
        let phone = this.registerUser.phoneNumber
        this.registerSendBtnText = '';
        this.registerShowloading = true;
        if (/^[0-9]*$/.test(phone)) {
          let that = this;
          let selectPrefix = this.registerUser.selectPrefix;
          selectPrefix = selectPrefix.replace(/\+/g, '');
          let lang = 'en';
          if(selectPrefix === '86'){
            lang = 'cn'
          }
          let url = '/api/login/code?phoneNumber='+selectPrefix+'-'+phone+'&codeType=1002&language=' + lang;
          that.$axios.post(url).then(function (res) {
            that.registerShowloading = false;
            if (res.status == 200) {
              if (res.data) {
                let auth_timetimer = setInterval(() => {
                  that.register_time--
                  that.registerSendBtnText = '重新发送(' + that.register_time + 's)'
                  if (that.register_time <= 0) {
                    that.register_time = 60
                    that.registerSendBtnText = '获取验证码'
                    that.registerSendBtn = false
                    clearInterval(auth_timetimer)
                  }
                }, 1000)
                that.register_time--
                that.registerSendBtnText = '重新发送(' + that.register_time + 's)'
              }
            }
          }).catch(function (res) {
            that.registerSendBtn = false;
            that.registerShowloading = false;
            that.registerSendBtnText = '获取验证码'
          })
        } else {
          this.errorMsg.registerUser.phoneNumber = '请输入正确格式的手机号'
          this.registerSendBtnText = '获取验证码'
          this.registerShowloading = false;
          this.registerSendBtn = false;
        }
      },
      sendresetPwdCode() {
        this.resetPwdSendBtn = true;
        let phone = this.resetpwdUser.phoneNumber
        this.resetPwdSendBtnText = '';
        this.resetPwdShowloading = true;
        if (/^[0-9]*$/.test(phone)) {
          let that = this;
          let selectPrefix = this.resetpwdUser.selectPrefix;
          selectPrefix = selectPrefix.replace(/\+/g, '');
          let lang = 'en';
          if(selectPrefix === '86'){
            lang = 'cn'
          }
          let url = '/api/login/code?phoneNumber='+selectPrefix+'-'+phone+'&codeType=1003&language=' + lang;
          that.$axios.post(url).then(function (res) {
            that.resetPwdShowloading = false;
            if (res.status == 200) {
              if (res.data) {
                let auth_timetimer = setInterval(() => {
                  that.resetPwd_time--
                  that.resetPwdSendBtnText = '重新发送(' + that.resetPwd_time + 's)'
                  if (that.resetPwd_time <= 0) {
                    that.resetPwd_time = 60
                    that.resetPwdSendBtnText = '获取验证码'
                    that.resetPwdSendBtn = false
                    clearInterval(auth_timetimer)
                  }
                }, 1000)
                that.resetPwd_time--
                that.resetPwdSendBtnText = '重新发送(' + that.resetPwd_time + 's)'
              }
            }
          }).catch(function (res) {
            that.resetPwdSendBtn = false;
            that.resetPwdShowloading = false;
            that.resetPwdSendBtnText = '获取验证码'
          })
        } else {
          this.errorMsg.resetpwdUser.phoneNumber = '请输入正确格式的手机号'
          this.resetPwdSendBtnText = '获取验证码'
          this.resetPwdShowloading = false;
          this.resetPwdSendBtn = false;
        }
      },
      sendPhoneLoginCode() {
        this.phoneLoginSendBtn = true;
        let phone = this.phoneLoginUser.phoneNumber
        this.phoneLoginSendBtnText = '';
        this.phoneLoginShowloading = true;
        if (/^[0-9]*$/.test(phone)) {
          let that = this;
          let selectPrefix = this.phoneLoginUser.selectPrefix;
          selectPrefix = selectPrefix.replace(/\+/g, '');
          let lang = 'en';
          if(selectPrefix === '86'){
            lang = 'cn'
          }
          let url = '/api/login/code?phoneNumber='+selectPrefix+'-'+phone+'&codeType=1001&language=' + lang;
          that.$axios.post(url).then(function (res) {
            that.phoneLoginShowloading = false;
            if (res.status == 200) {
              if (res.data) {
                let auth_timetimer = setInterval(() => {
                  that.phoneLogin_time--
                  that.phoneLoginSendBtnText = '重新发送(' + that.phoneLogin_time + 's)'
                  if (that.phoneLogin_time <= 0) {
                    that.phoneLogin_time = 60
                    that.phoneLoginSendBtnText = '获取验证码'
                    that.phoneLoginSendBtn = false
                    clearInterval(auth_timetimer)
                  }
                }, 1000)
                that.phoneLogin_time--
                that.phoneLoginSendBtnText = '重新发送(' + that.phoneLogin_time + 's)'
              }
            }
          }).catch(function (res) {
            that.phoneLoginSendBtn = false;
            that.phoneLoginShowloading = false;
            that.phoneLoginSendBtnText = '获取验证码'
          })
        } else {
          this.errorMsg.phoneLoginUser.phoneNumber = '请输入正确格式的手机号'
          this.phoneLoginSendBtnText = '获取验证码'
          this.phoneLoginShowloading = false;
          this.phoneLoginSendBtn = false;
        }
      },
      phoneLogin () {
        this.login_head = true;
        this.isPhoneLogin = true;
        this.isPasswordLogin = false;
        this.resetpwd_head = false;
        this.register_head = false;
        this.phoneLoginForm = true;
        this.passwordLoginForm = false;
        this.registerForm = false;
        this.resetpwdForm = false;
      },
      passwordLogin() {
        this.login_head = true;
        this.isPhoneLogin = false;
        this.isPasswordLogin = true;
        this.resetpwd_head = false;
        this.register_head = false;
        this.phoneLoginForm = false;
        this.passwordLoginForm = true;
        this.registerForm = false;
        this.resetpwdForm = false;
      },
      register() {
        this.login_head = false;
        this.isPhoneLogin = false;
        this.isPasswordLogin = false;
        this.resetpwd_head = false;
        this.register_head = true;
        this.phoneLoginForm = false;
        this.passwordLoginForm = false;
        this.registerForm = true;
        this.resetpwdForm = false;
        sensors.track("Registerstart", {
          entrance: '列表页',
          operate: '注册button'
        });
      },
      resetpwd() {
        this.login_head = false;
        this.isPhoneLogin = false;
        this.isPasswordLogin = false;
        this.resetpwd_head = true;
        this.register_head = false;
        this.phoneLoginForm = false;
        this.passwordLoginForm = false;
        this.registerForm = false;
        this.resetpwdForm = true;
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        let query = vm.$route.query.page
        if (query === 'register') {
          vm.register()
        } else {
          vm.login()
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .beblue{
    background-color: #3555da !important;
  }
  .boderbeblue{
    border: #3555da 1px solid !important;
    border-left:0 !important;
  }
  .boderbeblue2{
    border: #3555da 1px solid !important;
    border-left:none !important;
    border-right: none !important;
  }
  .boderbeblue3{
    border: #3555da 1px solid !important;
    border-right: none !important;
  }
  .boderbeyellow{
    border: #e8964d 1px solid !important;
    border-left:0 !important;
  }
  .boderbeyellow2{
    border: #e8964d 1px solid !important;
    border-left:none !important;
    border-right: none !important;
  }
  .boderbeyellow3{
    border: #e8964d 1px solid !important;
    border-right: none !important;
  }
  .boderbegreen{
    border: #74c31f 1px solid !important;
    border-left:0 !important;
  }
  .boderbegreen2{
    border: #74c31f 1px solid !important;
    border-left:none !important;
    border-right: none !important;
  }
  .boderbegreen3{
    border: #74c31f 1px solid !important;
    border-right: none !important;
  }
</style>

