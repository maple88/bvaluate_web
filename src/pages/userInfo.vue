<template>
  <div class="page project userCenter userInfo">
    <v2header/>
    <div class="v2maintainer">
      <div class="container v2container">
        <div class="user-banner">
          <div class="info">
            <div class="userimg"><img :src="user.profileUrl"></div>
            <p class="name">{{user.nickName}}</p>
            <p class="des">{{user.synopsis}}</p>
            <p class="candy">{{$t('candies')}} <span>{{user.candy}}</span></p>
          </div>
          <a href="javascript:;" class="signin" @click="$store.state.signInTips = true">{{$t('Check in')}}</a>
        </div>
        <div class="user-main">
          <div class="leftnav">
            <ul>
              <li>
                <router-link to="/userCollect">
                  <div class="navicon"><img src="../assets/userCenter/l1.png"><img class="on" src="../assets/userCenter/l1-on.png"></div>
                  {{$t('My collection')}}
                </router-link>
              </li>
              <!-- <li>
                <router-link to="">
                  <div class="navicon"><img src="../assets/userCenter/l2.png"><img class="on" src="../assets/userCenter/l2-on.png"></div>
                  {{$t('My project')}}
                </router-link>
              </li> -->
              <li class="active">
                <router-link to="/userInfo">
                  <div class="navicon"><img src="../assets/userCenter/l3.png"><img class="on" src="../assets/userCenter/l3-on.png"></div>
                  {{$t('Account information')}}
                </router-link>
              </li>
              <li>
                <router-link to="/userNotice">
                  <div class="navicon"><img src="../assets/userCenter/l4.png"><img class="on" src="../assets/userCenter/l4-on.png"></div>
                  {{$t('notification')}}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="rightcontent">
            <div class="userBox">
              <div class="user-header">{{$t('Account information')}}</div>
              <div class="user-flexbox">
                <div class="leftinfo">
                  <div class="inforow">
                    <div class="left">{{$t('Nickname')}}<span></span></div>
                    <div class="center">
                      <div v-show="!editName" class="nickname">{{user.nickName}}</div>
                      <div v-show="editName" class="editName">
                        <input type="text" maxlength="15" name="no_content" id="input_nickName" v-model="user.nickName" data="输入新昵称" @keyup.enter="editUserNickname(editName, $event)">
                      </div>
                    </div>
                    <div class="right">
                      <div v-show="!editName" @click="editName = true" class="editbtn">{{$t('modify')}}</div>
                      <div v-show="editName" @click="editUserNickname(editName, $event)" class="editbtn ok">{{$t('done')}}</div>
                    </div>
                  </div>
                  <div class="inforow">
                    <div class="left">{{$t('Gender')}}<span></span></div>
                    <div class="center">
                      <div v-show="!editGender" class="nickname">{{user.sex | showSex}}</div>
                      <div v-show="editGender" class="editName layui-form">
                        <input lay-filter="gender" data="男" type="radio" value="2" name="no_content" id="input_sex2" v-model="user.sex" :title="$t('Male')">
                        <input lay-filter="gender" data="女" type="radio" value="3" name="no_content" id="input_sex3" v-model="user.sex" :title="$t('Female')">
                      </div>
                    </div>
                    <div class="right">
                      <div v-show="!editGender" @click="editGender = true" class="editbtn">{{$t('modify')}}</div>
                      <div v-show="editGender" @click="editUserGender()" class="editbtn ok">{{$t('done')}}</div>
                    </div>
                  </div>
                  <div class="inforow">
                    <div class="left">{{$t('Personal description')}}<span></span></div>
                    <div class="center">
                      <div v-show="!editSign" class="nickname">{{user.synopsis}}</div>
                      <div v-show="editSign" class="editName">
                        <textarea rows="3" data="输入个人说明" :placeholder="$t('Please enter a personal description ( Within 50 words)')" v-model="user.synopsis" maxlength="50"></textarea>
                      </div>
                    </div>
                    <div class="right">
                      <div v-show="!editSign" @click="editSign = true" class="editbtn">{{$t('modify')}}</div>
                      <div v-show="editSign" @click="editUserSign()" class="editbtn ok">{{$t('done')}}</div>
                    </div>
                  </div>
                  <div class="inforow">
                    <div class="left">{{$t('Phone number')}}<span></span></div>
                    <div class="center">
                      <div class="nickname">{{user.phoneNumber | formatPhone($t('Unbound'))}}</div>
                    </div>
                    <div class="right">
                      <div class="editbtn" data-toggle="modal" data-target="#phoneModal">{{$t('modify')}}</div>
                    </div>
                  </div>
                  <div class="inforow">
                    <div class="left">{{$t('Email')}}<span></span></div>
                    <div class="center">
                      <div class="nickname">{{user.email || $t('Unbound')}}</div>
                    </div>
                    <div class="right">
                      <div class="editbtn" data-toggle="modal" data-target="#emailModal">{{$t('modify')}}</div>
                    </div>
                  </div>
                  <div class="inforow">
                    <div class="left">{{$t('Password')}}<span></span></div>
                    <div class="center">
                      <div class="nickname" style="font-size: 12px;">●●●●●●</div>
                    </div>
                    <div class="right">
                      <div class="editbtn" data-toggle="modal" data-target="#pwdModal">{{$t('modify')}}</div>
                    </div>
                  </div>
                  <div class="inforow">
                    <div class="left">{{$t('WeChat')}}<span></span></div>
                    <div class="center">
                      <div class="nickname">{{unionid=='null'||unionid==null?$t('Unbound'):$t('Bind')}}</div>
                    </div>
                    <div class="right">
                      <div class="editbtn" data-toggle="modal" @click="$store.state.bindWechatPop = true">{{$t('modify')}}</div>
                    </div>
                  </div>
                </div>
                <div class="rightimg">
                  <div class="left">{{$t('Click to change')}}<span></span></div>
                  <div class="userimg" data-toggle="modal" data-target="#userImgModal"><img :src="user.profileUrl"></div>
                  <div class="changeBtn" data-toggle="modal" data-target="#userImgModal">{{$t('Change avatar')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 绑定手机模态框 -->
      <div class="modal fade collection-modal" id="phoneModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" data="关闭模态框"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">{{$t('Bind phone number')}}</h4>
            </div>
            <div class="modal-body phoneModal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label">{{$t('Phone number')}}</label>
                  <div class="layui-form">
                    <div class="layui-news-style layui-unselect layui-form-select">
                      <div class="layui-select-title" @click="openSelect($event)">
                        <input type="text" placeholder="请选择" v-model="bindPhoneNumber.selectPrefix" readonly="" class="layui-input layui-unselect">
                        <i class="layui-edge"></i>
                      </div>
                      <dl class="layui-anim layui-anim-upbit">
                        <dd :class="bindPhoneNumber.selectPrefix === item.code ?'layui-this':''" v-for="(item, index) in countryCode" :key="index" @click="bindPhoneNumber.selectPrefix = item.code">
                          <span>{{item.country}}</span><span>{{item.code}}</span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <input type="tel" class="prefix-input" data="输入手机号码" name="no_content" id="input_phone" v-model="bindPhoneNumber.phoneNumber" 
                  @focus="errorMsg.bindPhoneNumber.phoneNumber = ''"
                  @blur="checkPhoneNumber()">
                  <div class="rightTips">{{errorMsg.bindPhoneNumber.phoneNumber}}</div>
                </div>
                <div class="form-group">
                  <label class="control-label">{{$t('Verification code')}}</label>
                  <div class="coderow">
                    <input type="text" data="输入验证码" name="no_content" id="input_code_btn" v-model="bindPhoneNumber.code">
                    <button type="button" class="btn code-btn" data="获取验证码" :disabled="bindPhoneNumberSendBtn" @click.stop="sendBindPhoneNumberCode">{{bindPhoneNumberSendBtnText}}</button>
                  </div>
                  <p class="help-block" v-if="moblieError_show">60s后重新获取</p>
                  <div class="rightTips">{{errorMsg.bindPhoneNumber.code}}</div>
                </div>
                <div class="form-group">
                  <p class="model-tips"><span>*</span>{{$t('If the mobile number is registered, the system will merge the current account with the account is attention, collection and other content. The first time associated mobile phone number rewards 200 candy.')}}</p>
                </div>
              </form>
            </div>
            <div class="modal-footer text-center">
              <button type="button" class="btn btn-default cancel" data="取消修改手机号码" data-dismiss="modal">{{$t('Cancel')}}</button>
              <button type="button" class="btn btn-primary ok" data="确认修改手机号码" data-dismiss="modal" @click="bindPhone">{{$t('Confirm')}}</button>
            </div>
          </div>
        </div>
      </div><!-- /.modal -->

      <!-- 绑定邮箱模态框 -->
      <div class="modal fade collection-modal" id="emailModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" data="关闭模态框"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">{{$t('Bind Email')}}</h4>
            </div>
            <div class="modal-body phoneModal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label">{{$t('Email')}}</label>
                  <div class="coderow">
                    <input type="email" data="输入邮箱" v-model="user.newEmail" @focus="emailError_msg=''" name="no_content" id="input_email">
                    <div class="btn rightips newStyle"></div>
                  </div>
                  <div class="rightTips">{{emailError_msg}}</div>
                </div>
                <div class="form-group">
                  <label class="control-label">{{$t('Verification code')}}</label>
                  <div class="coderow">
                    <input type="text" data="输入验证码" v-model="user.emailCode" @focus="emailCodeError_msg=''" name="no_content" id="input_emailCode">
                    <button type="button" :disabled="sendEmailBtn" class="btn code-btn" data="发送验证邮件" @click="sendEmail">{{$t('Send verification mail')}}
                    </button>
                  </div>
                  <p v-show="emailError_show" class="help-block">{{email_time}}s后重新获取</p>
                  <div class="rightTips">{{emailCodeError_msg}}</div>
                </div>
              </form>
            </div>
            <div class="modal-footer text-center">
              <button type="button" class="btn btn-default cancel" data="取消修改邮箱" data-dismiss="modal">{{$t('Cancel')}}</button>
              <button type="button" class="btn btn-primary ok" data="确认修改邮箱" @click="editEmail">{{$t('Confirm')}}</button>
            </div>
          </div>
        </div>
      </div><!-- /.modal -->

      <!-- 修改密码模态框 -->
      <div class="modal fade collection-modal" id="pwdModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" data="关闭模态框"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">{{$t('Modify password')}}</h4>
            </div>
            <div class="modal-body phoneModal-body">
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="control-label">{{$t('Old password')}}</label>
                  <div class="coderow">
                    <div class="inputgroup">
                      <input type="password" data="输入旧密码" v-model="user.oldPassword" @focus="oldPwdError=''" name="no_content" id="input_oldPassword">
                      <div class="eye" @click="showPassword($event)"></div>
                    </div>
                    <div class="btn rightips newStyle">
                      {{oldPwdError}}
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">{{$t('New password')}}</label>
                  <div class="coderow">
                    <div class="inputgroup">
                      <input type="password" data="输入新密码" v-model="user.newPassword" @focus="newPwdError=''" name="no_content" id="input_newPassword">
                      <div class="eye" @click="showPassword($event)"></div>
                    </div>
                    <div class="btn rightips newStyle">{{newPwdError}}</div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">{{$t('Confirm password')}}</label>
                  <div class="coderow">
                    <div class="inputgroup">
                      <input type="password" data="输入确认的新密码" v-model="user.ensurePwd" @focus="ensurePwdError=''" name="no_content" id="input_ensurePwd">
                      <div class="eye" @click="showPassword($event)"></div>
                    </div>
                    <div class="btn rightips newStyle">{{ensurePwdError}}</div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer text-center">
              <button type="button" class="btn btn-default cancel" data="确认修改密码" data-dismiss="modal">{{$t('Cancel')}}</button>
              <button type="button" class="btn btn-primary ok" data="确认修改密码" @click="resetPwd()">{{$t('Confirm')}}</button>
            </div>
          </div>
        </div>
      </div><!-- /.modal -->

      <!-- 修改密码模态框 -->
      <div class="modal fade collection-modal in" id="userImgModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" data="关闭模态框"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">请选择图片</h4>
            </div>
            <div class="modal-body phoneModal-body">
              <div class="head">
                图片上传
                <div class="uploadImgBtn">
                  点击上传
                  <input name="no_content" id="input_change_headimg" type="file" accept="image/*" data="修改头像" @change="changeImg($event)"/>
                </div>
              </div>
              <div class="perviewImg">
                <img v-show="inputUserImg" :src="inputUserImg">
                <img v-show="showUploadloading" :src="loading" class="loading">
              </div>
              <p class="uploadTips">请保证图片在2M以内</p>
              <div class="text-center"><div class="okupload" @click="changeUserImg">保存修改</div></div>
            </div>
          </div>
        </div>
      </div><!-- /.modal -->

      <v2footer/>
    </div>
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  import code from '../assets/json/prefix.json'

  let newsimg = require('../assets/search/news.png');
  let loading = require('../assets/login/loading.gif');

  export default {
    data() {
      return {
        editName: false,
        editGender: false,
        editSign: false,
        user: {
          token: '',
          uid: '',
          sign: '',
          candy: '',
          nickName: '',
          synopsis: '',
          phoneNumber: '',
          oldPassword: '',
          newPassword: '',
          ensurePwd: '',
          profileUrl: '',
          email: '',
          newEmail: '',
          oldSex: '',
          sex: '',
          emailCode: '',
          unionid: ''
        },
        emailCodeError_msg: '',
        sendEmailBtn: false,
        email_time: 60,
        emailError_show: false,
        emailError_msg: '',
        emailCodeError_msg: '',
        resetPrefix:'+86',
        ensurePwdError: '',
        moblieError_show: false,
        oldPwdError: '',
        newPwdError: '',
        inputUserImg: '',
        loading: loading,
        showUploadloading: false,
        imgbase64: '',
        bindPhoneNumber: {
          phoneNumber: '',
          code: '',
          selectPrefix: '+86'
        },
        errorMsg: {
          bindPhoneNumber: {
            phoneNumber: '',
            code: '',
          }
        },
        bindPhoneNumber_time: 60,
        bindPhoneNumberSendBtnText: this.$t('Send Message'),
        bindPhoneNumberSendBtn: true,
        bindPhoneNumberShowloading: false,
        countryCode: code
      }
    },
    activated () {
      let that = this;
      that.getLocalStorageUserInfo();
      
      // 获取radio性别
      layui.use('form', function () {
        let form = layui.form;
        form.on('radio(gender)', function(data){
          that.user.sex = data.value;
        });
      });
    },
    mounted() {
       
    },
    updated () {
      layui.use('form', function () {
        let form = layui.form;
        form.render('radio'); 
      });
    },
    methods: {
      bindPhone () {
        let that = this;
        let selectPrefix = this.bindPhoneNumber.selectPrefix;
        selectPrefix = selectPrefix.replace(/\+/g, '');
        let phoneNumber = that.bindPhoneNumber.phoneNumber;
        let code = that.bindPhoneNumber.code;
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        let url = 'api/user/bindPhone?codeType=1002&phoneNumber='+selectPrefix+'-'+phoneNumber+'&code='+code;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'post',
          url: url,
          headers: headers
        })
        .then(function(res){
          localStorage.setItem('apelink_user_phoneNumber', phoneNumber);
          that.user.phoneNumber = phoneNumber;
        })
      },
      sendBindPhoneNumberCode () {
        this.bindPhoneNumberSendBtn = true;
        let phone = this.bindPhoneNumber.phoneNumber
        this.bindPhoneNumberSendBtnText = '';
        this.bindPhoneNumberShowloading = true;
        if (/^[0-9]*$/.test(phone)) {
          let that = this;
          let selectPrefix = this.bindPhoneNumber.selectPrefix;
          selectPrefix = selectPrefix.replace(/\+/g, '');
          let lang = 'en';
          if(selectPrefix === '86'){
            lang = 'cn'
          }
          let url = '/api/login/code?phoneNumber='+selectPrefix+'-'+phone+'&codeType=1002&language=' + lang;
          that.$axios.post(url).then(function (res) {
            that.bindPhoneNumberShowloading = false;
            if (res.status == 200) {
              if (res.data) {
                let auth_timetimer = setInterval(() => {
                  that.bindPhoneNumber_time--
                  that.bindPhoneNumberSendBtnText = '重新发送(' + that.bindPhoneNumber_time + 's)'
                  if (that.bindPhoneNumber_time <= 0) {
                    that.bindPhoneNumber_time = 60
                    that.bindPhoneNumberSendBtnText = '获取验证码'
                    that.bindPhoneNumberSendBtn = false
                    clearInterval(auth_timetimer)
                  }
                }, 1000)
                that.bindPhoneNumber_time--
                that.bindPhoneNumberSendBtnText = '重新发送(' + that.bindPhoneNumber_time + 's)'
              }
            }
          }).catch(function (res) {
            that.bindPhoneNumberSendBtn = false;
            that.bindPhoneNumberShowloading = false;
            that.bindPhoneNumberSendBtnText = '获取验证码'
          })
        } else {
          this.errorMsg.bindPhoneNumber.phoneNumber = '请输入正确格式的手机号'
          this.bindPhoneNumberSendBtnText = '获取验证码'
          this.bindPhoneNumberShowloading = false;
          this.bindPhoneNumberSendBtn = false;
        }
      },
      openSelect (e) {
        e.target.parentNode.parentNode.classList.add('layui-form-selected');
      },
      checkPhoneNumber() {
        if (this.bindPhoneNumber.phoneNumber != null && this.bindPhoneNumber.phoneNumber !== '' && this.bindPhoneNumber.phoneNumber !== undefined) {
          let phone = this.bindPhoneNumber.phoneNumber;
          if (/^[0-9]*$/.test(phone)) {
            this.bindPhoneNumberSendBtn = false;
          } else {
            this.errorMsg.bindPhoneNumber.phoneNumber = '请输入正确格式的手机号码'
          }
        }
      },
      getLocalStorageUserInfo () {
        let token = localStorage.getItem('apelink_user_token');
        if (token !== null && token !== '' && token !== undefined) {
          this.user.token = localStorage.getItem('apelink_user_token');
          this.user.uid = localStorage.getItem('apelink_user_uid');
          this.user.nickName = localStorage.getItem('apelink_user_nickName');
          this.user.candy = localStorage.getItem('apelink_user_candies');
          this.user.phoneNumber = localStorage.getItem('apelink_user_phoneNumber');
          this.user.synopsis = localStorage.getItem('apelink_user_synopsis');
          this.user.profileUrl = localStorage.getItem('apelink_user_profileUrl');
          this.user.email = localStorage.getItem('apelink_user_email');
          this.user.sex = localStorage.getItem('apelink_user_sex');
          this.user.oldSex = localStorage.getItem('apelink_user_sex');
          this.user.unionid = localStorage.getItem('apelink_user_unionid');
        } else {
          this.$router.push('/home')
        }
      },
      editUserNickname(obj, event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        let json = {
          nickName: this.user.nickName
        };
        let that = this
        that.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_nickName', that.user.nickName);
            sensors.setProfile({nickname: that.user.nickName});
            that.editName = false;
          } else {
            that.editName = false;
          }
        })
      },
      editUserGender () {
        let json = {
          sex: this.user.sex
        };
        let that = this;
        that.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_sex', that.user.sex);
            that.user.oldSex = that.user.sex;
            if (that.user.sex == '2') {
              sensors.setProfile({gender: '男'});
            }else if (that.user.sex == '3') {
              sensors.setProfile({gender: '女'});
            }
            that.editGender = false;
          } else {
            that.editGender = false;
          }
        })
      },
      editUserSign () {
        let json = {
          synopsis: this.user.synopsis
        };
        let that = this
        that.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_synopsis', that.user.synopsis);
            that.editSign = false;
          } else {
            that.editSign = false;
          }
        })
      },
      //提交修改邮件验证
      editEmail() {
        let email = this.user.newEmail;
        let code = this.user.emailCode;
        let json = {
          email: email,
          code: code
        }
        this.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_email', res.data.email);
            sensors.setProfile({Email: res.data.email});
            $('#emailModal').modal('hide')
          }
        }, res => {
          this.emailCodeError_msg = res.response.data.message;
        })
      },
      //发送邮件验证码
      sendEmail() {
        let eamil = this.user.newEmail;
        let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!(eamil !== null && eamil !== '' && eamil !== undefined)) {
          this.emailError_msg = '邮箱不能为空'
        } else if (!myreg.test(eamil)) {
          this.emailError_msg = '请输入正确格式的邮箱'
        } else {
          let that = this;
          let token = localStorage.getItem('apelink_user_token');
          let url = '/api/user/changePasswordCode?receiver=' + eamil;
          let headers = {'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers,
          }).then(function (res) {
            that.emailError_show = true;
            that.sendEmailBtn = true;
            alert('验证码已发送到邮箱，请注意查收');
            let clearTime = setInterval(() => {
              that.email_time--;
              if (that.email_time <= 0) {
                that.email_time = 60;
                that.emailError_show = false;
                that.sendEmailBtn = false;
                clearInterval(clearTime);
              }
            }, 1000);
          })
        }
      },
      resetPwd() {
        let pass = true;
        let newPassword = this.user.newPassword;
        let ensurePwd = this.user.ensurePwd;
        let oldPassword = this.user.oldPassword;
        if (oldPassword !== null && oldPassword !== '' && oldPassword !== undefined) {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(newPassword)) {
          } else {
            pass = false;
            this.oldPwdError = '只允许输入6-14个英文大小写和数字'
          }
        } else {
          pass = false;
          this.oldPwdError = '密码不能为空'
        }
        if (newPassword !== null && newPassword !== '' && newPassword !== undefined) {
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(newPassword)) {
            if (ensurePwd !== newPassword) {
              pass = false;
              this.newPwdError = '两次输入不一致'
            }
          } else {
            pass = false;
            this.newPwdError = '只允许输入6-14个英文大小写和数字'
          }
        } else {
          pass = false;
          this.newPwdError = '密码不能为空'
        }
        if (ensurePwd !== null && ensurePwd !== '' && ensurePwd !== undefined) {
          if (ensurePwd !== newPassword) {
            pass = false;
            this.ensurePwdError = '两次输入不一致'
          }
        } else {
          pass = false;
          this.ensurePwdError = '密码不能为空'
        }
        if (pass) {
          let that = this;
          let uid = localStorage.getItem('apelink_user_uid');
          let token = localStorage.getItem('apelink_user_token');
          let url = '/api/user/changePassword?newPassword=' + newPassword + '&oldPassword=' + oldPassword;
          let headers = {'uid': uid, 'Authorization': token};
          that.$axios({
            method: 'post',
            url: url,
            headers: headers
          }).then(function (res) {
            if (res.data) {
              $('#pwdModal').modal('hide');
              layer.msg('修改成功');
              that.user.newPassword = '';
              that.user.ensurePwd = '';
              that.user.oldPassword = '';
            }
          }).catch(function (res) {
            that.oldPwdError = res.response.data.message
          })
        }
      },
      showPassword (e) {
        let showPwd = 'password';
        let $this = e.target;
        let className = $this.classList.toString();
        if (className.indexOf('open') !== -1) {
          $this.classList.remove('open');
        }else{
          $this.classList.add('open');
          showPwd = 'text';
        }
        $this.previousElementSibling.type = showPwd;
      },
      editInfor(json, callback, error) {
        let that = this;
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        let url = '/api/user/modify';
        let headers = {'uid': uid, 'Authorization': token};
        let thatCallback = callback;
        let thatError = error;
        that.$axios({
          method: 'put',
          url: url,
          headers: headers,
          data: json
        }).then(function (res) {
          thatCallback(res)
        })
      },
      changeImg(e) {
        let token = localStorage.getItem('token')
        let _this = this
        let imgLimit = 2048
        let files = e.target.files
        let image = new Image()
        _this.showUploadloading = true;
        // console.warn(files);
        if (files.length > 0) {
          let dd = 0
          let timer = setInterval(function () {
            if (files.item(dd).type !== 'image/png' && files.item(dd).type !== 'image/jpeg' && files.item(dd).type !== 'image/gif') {
              return false
            }
            if (files.item(dd).size > imgLimit * 1024000) {
              layer.msg('图片过大');
            } else {
              image.src = window.URL.createObjectURL(files.item(dd))
              image.onload = function () {
                // 默认按比例压缩
                let w = image.width
                let h = image.height
                let scale = w / h
                w = 200
                h = w / scale
                // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
                let quality = 0.7
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                // 创建属性节点
                let anw = document.createAttribute('width')
                anw.nodeValue = w
                let anh = document.createAttribute('height')
                anh.nodeValue = h
                canvas.setAttributeNode(anw)
                canvas.setAttributeNode(anh)
                ctx.drawImage(image, 0, 0, w, h)
                let ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
                _this.imgbase64 = canvas.toDataURL('image/' + ext, quality);
                _this.showUploadloading = false;
                _this.inputUserImg = _this.imgbase64;
              }
            }
            if (dd < files.length - 1) {
              dd++
            } else {
              clearInterval(timer)
            }
          }, 1000)
        }
      },
      changeUserImg () {
        let _this = this
        let oldUrl = _this.user.profileUrl
        _this.user.profileUrl = _this.loading
        if (_this.user.profileUrl !== null || _this.user.profileUrl !== undefined || _this.user.profileUrl !== '') {
          let json = {
            profileBase64: _this.imgbase64
          }
          _this.editInfor(json, function (res) {
            $('#userImgModal').modal('hide');
            layer.msg('修改成功');
            _this.user.profileUrl = res.data.profileUrl
            localStorage.setItem('apelink_user_profileUrl', res.data.profileUrl)
          }, function (res) {
            _this.user.profileUrl = oldUrl
          })
        }
      }
    },
    filters: {
      showPhone(obj) {
        let old = obj.substring(3, 8);
        return obj.replace(old, '******');
      },
      showSex(obj) {
        let str = '未知'
        if (obj == 2) {
          str = '男'
        } else if (obj == 3) {
          str = '女'
        }
        return str
      },
      formatPhone(obj,nullVal) {
        if (obj) {
          obj = obj+'';
          obj = obj.split("").reverse().join("");
          obj = obj.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
          obj = obj.split("").reverse().join("");
          return obj;
        }else{
          return nullVal;
        }
      }
    },
    computed: {
      unionid () {
        return this.$store.state.unionid;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
// .follow-show {
//   width: 100%;
//   height: 100%;
//   background-color: #fff;
//   padding: 36px 0 240px 0;
//   img {
//     display: block;
//     margin: 0 auto;
//     padding-bottom: 26px;
//   }
//   p {
//     font-size: 16px;
//     height: 16px;
    
//     text-align: center;
//     color: #898989;
//   }
// }
</style>

