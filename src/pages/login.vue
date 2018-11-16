<template>
  <div id="login" :style="'background-image: url('+bg+')'">
    <div class="container main">
      <div class="row">
        <div class="col-md-6 col-xs-12 left">
          <p class="p1">welcome！</p>
          <p class="p2">
            <router-link to="/list">BVALUATE</router-link>
          </p>
          <p class="p3">搜索全球资讯，掌握最新动态</p>
        </div>
        <div class="col-md-6 col-xs-12">
          <div class="loginbox">
            <div class="hd">
              <i class="fa fa-arrow-circle-o-left back-btn" v-show="resetpwd_head" @click="login()"></i>
              <ul v-show="login_register_head">
                <li :class="{ active : isLogin }" @click="login()">登录</li>
                <li :class="{ active : isRegister }" @click="register()">注册</li>
              </ul>
              <ul v-show="resetpwd_head">
                <li class="active">重置密码</li>
              </ul>
            </div>
            <div class="bd">
              <div class="inputInner" v-if="loginForm">
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon1.png"></div>
                  <input type="text" class="form-control" v-model="loginUser.phoneNumber" placeholder="手机号"
                         @focus="errorMsg.loginUser.phoneNumber = ''">
                  <span class="help-block" v-if="errorMsg.loginUser.phoneNumber">
										<img src="../assets/login/iclose.png">
										{{errorMsg.loginUser.phoneNumber}}
									</span>
                </div>
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
                  <input type="password" class="form-control" v-model="loginUser.password" placeholder="密码"
                         @focus="errorMsg.loginUser.password = ''" @keyup.enter="loginSubmit">
                  <span class="help-block" v-if="errorMsg.loginUser.password">
										<img src="../assets/login/iclose.png">
										{{errorMsg.loginUser.password}}
									</span>
                </div>
                <div class="input-group submit-group">
                  <button type="button" class="btn ok-btn" @click="loginSubmit">登录</button>
                </div>
                <div class="other-group">
                  <label class="remember">
                    <input type="checkbox" checked> 记住我
                  </label>
                  <span @click="resetpwd()">忘记密码</span>
                </div>
                <div class="other-login">
                  <div class="head">第三方登录</div>
                  <ul>
                    <li>
                      <img src="../assets/login/wechat.png">
                      <p>微信</p>
                    </li>
                    <li>
                      <img src="../assets/login/qq.png">
                      <p>QQ</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="inputInner" v-if="registerForm">
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon1.png"></div>
                  <input type="text" class="form-control" v-model="registerUser.nickName"
                         maxlength="14"
                         placeholder="你的昵称"
                         @focus="errorMsg.registerUser.nickName = ''"
                         @blur="checkNickName()"
                  >
                  <span class="help-block" v-if="errorMsg.registerUser.nickName">
										<img src="../assets/login/iclose.png">
										{{errorMsg.registerUser.nickName}}
									</span>
                </div>
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon3.png"></div>
                  <input type="text" class="form-control" v-model="registerUser.phoneNumber" placeholder="手机号"
                         @focus="errorMsg.registerUser.phoneNumber = ''"
                         @blur="checkPhoneNumber()"
                  >
                  <span class="help-block" v-if="errorMsg.registerUser.phoneNumber">
										<img src="../assets/login/iclose.png">
										{{errorMsg.registerUser.phoneNumber}}
									</span>
                </div>
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
                  <input type="password" class="form-control" v-model="registerUser.password" placeholder="密码"
                         @focus="errorMsg.registerUser.password = ''"
                         @blur="checkPassword(true)"
                  >
                  <span class="help-block" v-if="errorMsg.registerUser.password">
										<img src="../assets/login/iclose.png">
										{{errorMsg.registerUser.password}}
									</span>
                </div>
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
                  <input type="password" class="form-control" v-model="registerUser.confirmpsd" placeholder="确认密码"
                         @focus="errorMsg.registerUser.confirmpsd = ''"
                         @blur="checkPassword(false)"
                  >
                  <span class="help-block" v-if="errorMsg.registerUser.confirmpsd">
										<img src="../assets/login/iclose.png">
										{{errorMsg.registerUser.confirmpsd}}
									</span>
                </div>
                <div class="input-group code">
                  <input type="text" v-model="registerUser.code" placeholder="输入验证码"
                         @focus="errorMsg.registerUser.code = ''">
                  <span class="help-block" v-if="errorMsg.registerUser.code">
										<img src="../assets/login/iclose.png">
										{{errorMsg.registerUser.code}}
									</span>
                  <button class="code-btn" :disabled="registerSendBtn" @click.stop="sendCode">
                    <img :src="loading" v-show="registerShowloading"/>
                    {{registerSendBtnText}}
                  </button>
                </div>
                <div class="input-group submit-group">
                  <button type="button" class="btn ok-btn" @click.stop="registerSubmit()">注册</button>
                </div>
                <p class="register-tips">点击“注册”即表示您同意并愿意接收<br>BVALUATE<span>用户此协议</span>和<span>隐私政策</span></p>
              </div>
              <div class="inputInner" v-if="resetpwdForm">
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon1.png"></div>
                  <input type="text" class="form-control" v-model="resetpwdUser.phoneNumber" placeholder="手机号"
                         @focus="errorMsg.resetpwdUser.phoneNumber = ''"
                         @blur="checkResetPhoneNumber"
                  >
                  <span class="help-block" v-if="errorMsg.resetpwdUser.phoneNumber">
										<img src="../assets/login/iclose.png">
										{{errorMsg.resetpwdUser.phoneNumber}}
									</span>
                </div>
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
                  <input type="password" class="form-control" v-model="resetpwdUser.password" placeholder="重置密码"
                         @focus="errorMsg.resetpwdUser.password = ''"
                         @blur="checkResetPassword(true)"
                  >
                  <span class="help-block" v-if="errorMsg.resetpwdUser.password">
										<img src="../assets/login/iclose.png">
										{{errorMsg.resetpwdUser.password}}
									</span>
                </div>
                <div class="input-group">
                  <div class="input-group-addon"><img src="../assets/login/icon2.png"></div>
                  <input type="password" class="form-control" v-model="resetpwdUser.confirmpsd" placeholder="确认密码"
                         @focus="errorMsg.resetpwdUser.confirmpsd = ''"
                         @blur="checkResetPassword(false)"
                  >
                  <span class="help-block" v-if="errorMsg.resetpwdUser.confirmpsd">
										<img src="../assets/login/iclose.png">
										{{errorMsg.resetpwdUser.confirmpsd}}
									</span>
                </div>
                <div class="code input-group">
                  <input type="text" placeholder="输入验证码" v-model="resetpwdUser.code"
                         @focus="errorMsg.resetpwdUser.code = ''"
                  >
                  <span class="help-block" v-if="errorMsg.resetpwdUser.code">
										<img src="../assets/login/iclose.png">
										{{errorMsg.resetpwdUser.code}}
									</span>
                  <button class="code-btn" :disabled="resetPwdSendBtn" @click.stop="sendresetPwdCode">
                    <img :src="loading" v-show="resetPwdShowloading"/>
                    {{resetPwdSendBtnText}}
                  </button>
                </div>
                <div class="input-group submit-group">
                  <button type="button" class="btn ok-btn" @click="resetpwdSubmit">重置密码</button>
                </div>
              </div>
            </div>
            <transition name="fade">
              <vtips :tipText="tipText" v-if="showTip"/>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <p class="login_footer">ALL right reserved by Bvaluate @2018</p>
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  let loading = require('../assets/login/loading.gif');
  let bg = require('../assets/login/login_bg.jpg');
  export default {
    data() {
      return {
        bg: bg,
        login_register_head: true,
        resetpwd_head: false,
        isLogin: true,
        isRegister: false,
        loginForm: true,
        registerForm: false,
        resetpwdForm: false,
        registerUser: {
          nickName: '',
          code: '',
          phoneNumber: '',
          password: '',
          confirmpsd: ''
        },
        loginUser: {
          phoneNumber: '',
          password: ''
        },
        resetpwdUser: {
          code: '',
          phoneNumber: '',
          password: '',
          confirmpsd: ''
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
          }
        },
        register_time: 60,
        registerSendBtnText: '获取验证码',
        registerSendBtn: true,
        registerShowloading: false,
        resetPwd_time: 60,
        resetPwdSendBtnText: '获取验证码',
        resetPwdSendBtn: true,
        resetPwdShowloading: false,
        loading: loading,
        tipText: '',
        showTip: false
      }
    },
    mounted() {
      var end_time = "";
      window.onload = function(){
        end_time = new Date();
        sensors.quick('autoTrack',{
          load_time: end_time.getTime() - start_time.getTime()
        })

        // 在页面加载完毕或者也不用加载完毕,定义一个初始时间
        var start = new Date();
        // 在页面关闭前,调用sa的track方法
        window.onunload = function() {
          var end = new Date();
          // 如果用户一直不关闭页面，可能出现超大值，可以根据业务需要处理，例如设置一个上限
          var duration = (end.getTime() - start_time.getTime()) / 1000;
          // 定义一个记录页面停留时间的事件pageView,并且保存需要的属性(停留时间和当前页面的地址)
          sensors.track('WebStay', {
            event_duration: duration
          });
        };
      }
    },
    methods: {
      loginSubmit() {
        let phoneNumber = this.loginUser.phoneNumber;
        let password = this.loginUser.password;
        if (phoneNumber == null || phoneNumber === undefined || phoneNumber === '') {
          this.errorMsg.loginUser.phoneNumber = '请输入手机号码/账号'
          sensors.track("Loginresult",{
            is_true: false,
            false_reason: this.errorMsg.loginUser.phoneNumber
          });
        } else if (password == null || password === undefined || password === '') {
          this.errorMsg.loginUser.password = '请输入密码'
          sensors.track("Loginresult",{
            is_true: false,
            false_reason: this.errorMsg.loginUser.password
          });
        } else {
          let that = this;
          let json = {
            phoneNumber: phoneNumber,
            password: password
          }
          that.$axios.post('/api/login', json).then(function (res) {
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
              localStorage.setItem('apelink_user_signedIn', res.data.signedIn);
              let synopsis = res.data.synopsis
              let profileUrl = res.data.profileUrl
              let email = res.data.email
              let sex = res.data.sex
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
              localStorage.setItem('apelink_user_sex', sex);
              sensors.registerPage({
                platform_type: 'web',
                is_login: true,
                is_register: true
              });
              sensors.login(uid);
              sensors.track("Loginresult",{
                is_true: true,
                false_reason: '登录成功'
              });
              if (res.data.signedIn) {
                that.$router.push('/list')
              } else {
                let url = '/api/user/signIn';
                that.$axios({
                  method: 'post',
                  url: url,
                  headers: headers
                }).then(function (res) {
                  if (res.data) {
                    that.showTip = true;
                    that.tipText = '登录成功';
                    setTimeout(() => {
                      that.showTip = false;
                      that.$router.push('/list')
                      that.login()
                    }, 1000);
                  }
                })
              }
            }).catch(function (res) {
            })
          }).catch(function (res) {
            let msgCode = res.response.data.message
            switch (msgCode) {
              case '9019':
                that.errorMsg.loginUser.phoneNumber = '账号不正确';
                sensors.track("Loginresult",{
                  is_true: false,
                  false_reason: that.errorMsg.loginUser.phoneNumber
                });
                break;
              case '9002':
                that.errorMsg.loginUser.password = '密码格式不正确';
                sensors.track("Loginresult",{
                  is_true: false,
                  false_reason: that.errorMsg.loginUser.password
                });
                break;
              case '9008':
                that.errorMsg.loginUser.password = '密码不正确';
                sensors.track("Loginresult",{
                  is_true: false,
                  false_reason: that.errorMsg.loginUser.password
                });
                break;
              default:
                that.errorMsg.loginUser.phoneNumber = msgCode;
                sensors.track("Loginresult",{
                  is_true: false,
                  false_reason: that.errorMsg.loginUser.phoneNumber
                });
            }
          })
        }
      },
      registerSubmit() {
        let pass = true;
        let phoneNumber = this.registerUser.phoneNumber;
        let password = this.registerUser.password;
        let code = this.registerUser.code;
        let confirmpsd = this.registerUser.confirmpsd;
        let nickName = this.registerUser.nickName;
        if (nickName !== null && nickName !== '' && nickName !== undefined) {
          if (this.strLength(nickName) > 14) {
            pass = false;
            this.errorMsg.registerUser.nickName = '请输入为14个英文字符或7个汉字'
            sensors.track("Registerresult",{
              is_true: false,
              false_reason: this.errorMsg.registerUser.nickName
            });
          }
        } else {
          pass = false;
          this.errorMsg.registerUser.nickName = '昵称不能为空'
          sensors.track("Registerresult",{
            is_true: false,
            false_reason: this.errorMsg.registerUser.nickName
          });
        }
        if (phoneNumber !== null && phoneNumber !== '' && phoneNumber !== undefined) {
          if (!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phoneNumber))) {
            pass = false;
            this.errorMsg.registerUser.phoneNumber = '请输入正确格式的手机号码'
            sensors.track("Registerresult",{
              is_true: false,
              false_reason: this.errorMsg.registerUser.phoneNumber
            });
          }
        } else {
          pass = false;
          this.errorMsg.registerUser.phoneNumber = '手机号码不能为空'
          sensors.track("Registerresult",{
            is_true: false,
            false_reason: this.errorMsg.registerUser.phoneNumber
          });
        }
        if (password !== null && password !== '' && password !== undefined) {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.registerUser.password)) {
            if (this.registerUser.confirmpsd !== this.registerUser.password) {
              pass = false;
              this.errorMsg.registerUser.password = '两次输入不一致'
              sensors.track("Registerresult",{
                is_true: false,
                false_reason: this.errorMsg.registerUser.password
              });
            }
          } else {
            pass = false;
            this.errorMsg.registerUser.password = '只允许输入6-14个英文大小写和数字'
            sensors.track("Registerresult",{
              is_true: false,
              false_reason: this.errorMsg.registerUser.password
              });
          }
        } else {
          pass = false;
          this.errorMsg.registerUser.password = '密码不能为空'
          sensors.track("Registerresult",{
            is_true: false,
            false_reason: this.errorMsg.registerUser.password
          });
        }
        if (confirmpsd !== null && confirmpsd !== '' && confirmpsd !== undefined) {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(this.registerUser.password)) {
            if (this.registerUser.confirmpsd !== this.registerUser.password) {
              pass = false;
              this.errorMsg.registerUser.confirmpsd = '两次输入不一致'
              sensors.track("Registerresult",{
                is_true: false,
                false_reason: this.errorMsg.registerUser.confirmpsd
              });
            }
          } else {
            pass = false;
            this.errorMsg.registerUser.confirmpsd = '只允许输入6-14个英文大小写和数字'
            sensors.track("Registerresult",{
              is_true: false,
              false_reason: this.errorMsg.registerUser.confirmpsd
            });
          }
        } else {
          pass = false;
          this.errorMsg.registerUser.confirmpsd = '密码不能为空'
          sensors.track("Registerresult",{
            is_true: false,
            false_reason: this.errorMsg.registerUser.confirmpsd
          });
        }
        if (!(code !== null && code !== '' && code !== undefined)) {
          pass = false;
          this.errorMsg.registerUser.code = '手机验证码不能为空'
          sensors.track("Registerresult",{
            is_true: false,
            false_reason: this.errorMsg.registerUser.code
          });
        }
        if (pass) {
          let that = this;
          let url = '/api/user/register';
          let json = {
            nickName: nickName,
            code: code,
            phoneNumber: phoneNumber,
            password: password
          }
          that.$axios.post(url, json).then(function (res) {
            that.showTip = true;
            that.tipText = '注册成功';
            localStorage.setItem('apelink_user_is_register', true);
            sensors.registerPage({
              platform_type: 'web',
              is_login: false,
              is_register: true
            });
            sensors.track("Registerresult",{
              is_true: true,
              false_reason: '注册成功'
            });
            setTimeout(() => {
              that.showTip = false;
              that.login()
            }, 2000);
          })
        }
        else {
        }
      },
      resetpwdSubmit() {
        let pass = true;
        let phoneNumber = this.resetpwdUser.phoneNumber;
        let password = this.resetpwdUser.password;
        let code = this.resetpwdUser.code;
        let confirmpsd = this.resetpwdUser.confirmpsd;
        if (phoneNumber !== null && phoneNumber !== '' && phoneNumber !== undefined) {
          if (!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phoneNumber))) {
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
      checkPhoneNumber() {
        if (this.registerUser.phoneNumber != null && this.registerUser.phoneNumber !== '' && this.registerUser.phoneNumber !== undefined) {
          let phone = this.registerUser.phoneNumber;
          if (/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone)) {
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
          if (/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone)) {
            let that = this;
            let url = '/api/user/phoneCheck?phoneNumber=' + phone;
            that.$axios.post(url).then(function (res) {
              if (!res.data) {
                that.errorMsg.resetpwdUser.phoneNumber = '该手机号码未被注册，请从新输入'
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
        if (/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone)) {
          let that = this;
          let url = '/api/login/code?phoneNumber=' + phone + '&codeType=1002'
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
        if (/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone)) {
          let that = this;
          let url = '/api/login/code?phoneNumber=' + phone + '&codeType=1003'
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
      login() {
        this.login_register_head = true
        this.isLogin = true
        this.isRegister = false
        this.resetpwd_head = false
        this.loginForm = true
        this.registerForm = false
        this.resetpwdForm = false
      },
      register() {
        this.login_register_head = true
        this.resetpwd_head = false
        this.isLogin = false
        this.isRegister = true
        this.resetpwd_head = false
        this.loginForm = false
        this.registerForm = true
        this.resetpwdForm = false
      },
      resetpwd() {
        this.login_register_head = false
        this.resetpwd_head = true
        this.isLogin = false
        this.isRegister = false
        this.resetpwd_head = true
        this.loginForm = false
        this.registerForm = false
        this.resetpwdForm = true
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
</style>
