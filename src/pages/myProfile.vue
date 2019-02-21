<template>
  <div class="page">
    <v2header :parantProfileUrl="user.profileUrl"/>
    <div class="v2maintainer">
      <div class="container">
        <div class="myProfile mt20">
          <div class="left">
            <div class="userbrand"
                 :style="(user.profileUrl !==null && user.profileUrl !== '' && user.profileUrl !== 'NULL' && user.profileUrl !== undefined)?'background-image: url('+ user.profileUrl +')':'background-image: url('+ default_header +')'">

              <div class="edit_bg">
                <span>点击修改头像</span>
              </div>
              <input name="no_content" id="input_change_headimg" type="file" accept="image/*" multiple="multiple" data="修改头像" @change="changeImg($event)"/>
              <!--<img src="../assets/user/default.png">-->
              <!--<img :src="user.profileUrl">-->
            </div>
            <p class="usertips">{{$t('Personal information')}}</p>
          </div>
          <div class="right">
            <div class="list-item item-head">
              <div class="showbox" v-show="editnicknamebox.show">
                <div class="tb-cell nickname">{{user.nickName}}</div>
                <div class="tb-cell edit" @click="edit(editnicknamebox)"><i class="fa fa-pencil"></i>{{$t('Modify')}}</div>
              </div>
              <div class="tb-cell nicknamedit editbox" v-show="!editnicknamebox.show">
                <input type="text" maxlength="8" name="no_content" id="input_nickName" v-model="user.nickName" data="输入新昵称" @keyup.enter="editnicknameok(editnicknamebox, $event)">
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">{{$t('Gender')}}：</div>
              <div class="showbox" v-show="editsexbox.show">
                <div class="tb-cell center">{{showSex}}</div>
                <div class="tb-cell edit" @click="edit(editsexbox)"><i class="fa fa-pencil"></i>{{$t('Modify')}}</div>
              </div>
              <div class="tb-cell editbox" v-show="!editsexbox.show">
                <div class="radiobox">
                  <label class="radio-inline">
                    <input data="男" type="radio" value="2" name="no_content" id="input_sex2" :checked="user.sex == 2" v-model="user.sex"> 男
                  </label>
                  <label class="radio-inline">
                    <input data="女" type="radio" value="3" name="no_content" id="input_sex3" :checked="user.sex == 3" v-model="user.sex"> 女
                  </label>
                </div>
                <div class="botoperate">
                  <button type="button" class="btn ok" data="确认修改性别" @click="editSex(editsexbox)">保存</button>
                  <button type="button" class="btn" data="取消修改性别" @click="editcancel(editsexbox)">{{$t('Cancel')}}</button>
                </div>
              </div>
            </div>
            <div class="list-item xs-sign">
              <div class="tb-cell leftips">{{$t('Personal statement')}}：</div>
              <div class="showbox" v-show="editsignbox.show">
                <div class="tb-cell center" v-html="showSynopsis"></div>
                <div class="tb-cell edit" @click="edit(editsignbox)"><i class="fa fa-pencil"></i>{{$t('Modify')}}</div>
              </div>
              <div class="tb-cell editbox" v-show="!editsignbox.show">
                <textarea v-model="user.synopsis" rows="8" data="输入个人说明"></textarea>
                <div class="botoperate">
                  <button type="button" data="确认修改个人说明" class="btn ok" @click="editSynopsis(editsignbox)">保存</button>
                  <button type="button" data="取消修改个人说明" class="btn" @click="editcancel(editsignbox)">{{$t('Cancel')}}</button>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">{{$t('Phone number')}}：</div>
              <div class="tb-cell center">{{user.phoneNumber | showPhone}}</div>
              <div class="tb-cell edit" data-toggle="modal" data-target="#phoneModal"><i class="fa fa-pencil"></i>{{$t('Modify')}}
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">{{$t('Email')}}：</div>
              <div class="tb-cell center emailstyle" v-html="showEmail"></div>
              <div class="tb-cell edit" data-toggle="modal" data-target="#emailModal"><i class="fa fa-pencil"></i>{{$t('Modify')}}
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">{{$t('Password')}}：</div>
              <div class="tb-cell center">*******</div>
              <div class="tb-cell edit" data-toggle="modal" data-target="#pwdModal"><i class="fa fa-pencil"></i>{{$t('Modify')}}</div>
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
            <h4 class="modal-title">绑定手机</h4>
          </div>
          <div class="modal-body phoneModal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label">{{$t('Phone number')}}</label>
                <div class="layui-form">
                  <select name="resetSelect" lay-filter="resetSelect">
                    <option value="+86" selected>+86</option>
                    <option value="+852">+852</option>
                    <option value="+853">+853</option>
                    <option value="+81">+81</option>
                    <option value="+82">+82</option>
                    <option value="+65">+65</option>
                    <option value="+886">+886</option>
                    <option value="+1">+1</option>
                  </select>
                </div>
                <input type="tel" class="prefix-input" data="输入手机号码" name="no_content" id="input_phone">
              </div>
              <div class="form-group">
                <label class="control-label">验证码</label>
                <div class="coderow">
                  <input type="text" data="输入验证码" name="no_content" id="input_code_btn">
                  <button type="button" class="btn code-btn" data="获取验证码">{{$t('Send Message')}}</button>
                </div>
                <p class="help-block" v-if="moblieError_show">60s后重新获取</p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data="确认修改手机号码" data-dismiss="modal">{{$t('Confirm')}}</button>
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
            <h4 class="modal-title">绑定邮箱</h4>
          </div>
          <div class="modal-body phoneModal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label">{{$t('Email')}}</label>
                <div class="coderow">
                  <input type="email" data="输入邮箱" v-model="user.newEmail" @focus="emailError_msg=''" name="no_content" id="input_email">
                  <div type="button" class="btn rightips newStyle text-danger">{{emailError_msg}}</div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">验证码</label>
                <div class="coderow">
                  <input type="text" data="输入验证码" v-model="user.emailCode" @focus="emailCodeError_msg=''" name="no_content" id="input_emailCode">
                  <button type="button" :disabled="sendEmailBtn" class="btn code-btn" data="发送验证邮件" @click="sendEmail">{{$t('Send verification mail')}}
                  </button>
                  <div type="button" class="btn rightips newStyle text-danger">{{emailCodeError_msg}}</div>
                </div>
                <p v-if="emailError_show" class="help-block">{{email_time}}s后重新获取</p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data="确认修改邮箱" @click="editEmail">{{$t('Confirm')}}</button>
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
            <h4 class="modal-title">修改密码</h4>
          </div>
          <div class="modal-body phoneModal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label">{{$t('Old password')}}</label>
                <div class="coderow">
                  <input type="password" data="输入旧密码" v-model="user.oldPassword" @focus="oldPwdError=''" name="no_content" id="input_oldPassword">
                  <div type=" button" class="btn rightips newStyle  text-danger">
                    {{oldPwdError}}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">{{$t('New password')}}</label>
                <div class="coderow">
                  <input type="password" data="输入新密码" v-model="user.newPassword" @focus="newPwdError=''" name="no_content" id="input_newPassword">
                  <div type="button" class="btn rightips newStyle  text-danger">{{newPwdError}}</div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">{{$t('Confirm password')}}</label>
                <div class="coderow">
                  <input type="password" data="输入确认的新密码" v-model="user.ensurePwd" @focus="ensurePwdError=''" name="no_content" id="input_ensurePwd">
                  <div type="button" class="btn rightips newStyle  text-danger">{{ensurePwdError}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data="确认修改密码" @click="resetPwd()">{{$t('Confirm')}}</button>
          </div>
        </div>
      </div>
    </div><!-- /.modal -->
    <v2footer/>
  </div>
</template>

<script>
  import sensors from '../../static/sa-init.js'
  let loading = require('../assets/login/loading.gif');
  let default_header = require('../assets/user/default-header.png');
  export default {
    data() {
      return {
        shownicknamebox: true,
        showsexbox: true,
        user: {
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
          emailCode: ''
        },
        oldPwdError: '',
        newPwdError: '',
        sendEmailBtn: false,
        email_time: 60,
        emailError_show: false,
        emailError_msg: '',
        ensurePwdError: '',
        moblieError_show: false,
        editnicknamebox: {
          show: true
        },
        editsexbox: {
          show: true
        },
        editsignbox: {
          show: true
        },
        aplinkUser: {},
        loading: loading,
        default_header: default_header,
        emailCodeError_msg: '',
        resetPrefix:'+86'
      }
    },
    mounted() {
      let that = this;
      this.getMyProfile();
      layui.use('form', function () {
        let form = layui.form;
        form.render('select');
        form.on('select(resetSelect)', function(data){
          that.resetPrefix = data.value;
        });
      });
    },
    methods: {
      // 通用修改按钮
      edit(obj) {
        obj.show = !obj.show
      },
      // 回车确定昵称
      editnicknameok(obj, event) {
        sensors.quick('trackHeatMap', event.currentTarget);
        let json = {
          nickName: this.user.nickName
        };
        let that = this
        that.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_nickName', that.user.nickName);
            sensors.setProfile({nickname: that.user.nickName});
            obj.show = !obj.show
          } else {
            obj.show = !obj.show
          }
        })
      },
      //修改简介
      editSynopsis(obj) {
        let json = {
          synopsis: this.user.synopsis
        };
        let that = this
        that.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_synopsis', that.user.synopsis);
            obj.show = !obj.show
          } else {
          }
        })
      },
      //修改性别
      editSex(obj) {
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
            obj.show = !obj.show
          } else {
          }
        })
      },
      // 取消编辑
      editcancel(obj) {
        obj.show = !obj.show
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
      //修改密码
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
              $('#pwdModal').modal('hide')
            }
          }).catch(function (res) {
            that.oldPwdError = res.response.data.message
          })
        }
      },
      getMyProfile() {
        let token = localStorage.getItem('apelink_user_token');
        if (token !== null && token !== '' && token !== undefined) {
          let nickName = localStorage.getItem('apelink_user_nickName');
          let phoneNumber = localStorage.getItem('apelink_user_phoneNumber');
          let synopsis = localStorage.getItem('apelink_user_synopsis');
          let profileUrl = localStorage.getItem('apelink_user_profileUrl');
          let email = localStorage.getItem('apelink_user_email');
          let sex = localStorage.getItem('apelink_user_sex');
          let oldSex = localStorage.getItem('apelink_user_sex');
          this.user.phoneNumber = phoneNumber;
          this.user.nickName = nickName;
          this.user.synopsis = synopsis;
          this.user.profileUrl = profileUrl;
          this.user.email = email;
          this.user.sex = sex;
          this.user.oldSex = sex;
        } else {
          this.$router.push('/home')
        }
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
        }).catch(function (res) {
          thatError(res)
        })
      },
      changeImg(e) {
        let token = localStorage.getItem('token')
        let _this = this
        let oldUrl = _this.user.profileUrl
        _this.user.profileUrl = _this.loading
        let imgLimit = 1024
        let files = e.target.files
        let image = new Image()
        if (files.length > 0) {
          let dd = 0
          let timer = setInterval(function () {
            if (files.item(dd).type !== 'image/png' && files.item(dd).type !== 'image/jpeg' && files.item(dd).type !== 'image/gif') {
              return false
            }
            if (files.item(dd).size > imgLimit * 102400) {
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
                let base64 = canvas.toDataURL('image/' + ext, quality)
                if (_this.user.profileUrl !== null || _this.user.profileUrl !== undefined || _this.user.profileUrl !== '') {
                  let json = {
                    profileBase64: base64
                  }
                  _this.editInfor(json, function (res) {
                    _this.user.profileUrl = res.data.profileUrl
                    localStorage.setItem('apelink_user_profileUrl', res.data.profileUrl)
                  }, function (res) {
                    _this.user.profileUrl = oldUrl
                  })
                }
              }
            }
            if (dd < files.length - 1) {
              dd++
            } else {
              clearInterval(timer)
            }
          }, 1000)
        }
      }
    },
    watch: {
      '$route': 'getMyProfile'
    },
    filters: {
      showPhone(obj) {
        let old = obj.substring(3, 8);
        return obj.replace(old, '******');
      },
      showSex(obj) {
        let str = '未知'
        if (obj === 2) {
          str = '男'
        } else if (obj === 3) {
          str = '女'
        }
        return str
      }
    },
    computed: {
      showSynopsis: function () {
        let obj = this.user.synopsis
        // let obj = '我是超人~~狠狠的超人'
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'null') {
          return obj
        } else {
          return '<font style="font-size: 12px">（此人很懒，什么都没留下）</font>'
        }
      },
      showEmail: function () {
        let obj = this.user.email
        if (obj !== null && obj !== '' && obj !== undefined && obj !== 'null') {
          return obj
        } else {
          return '<font style="font-size: 12px">（未绑定邮箱）</font>'
        }
      },
      showSex() {
        let obj = this.user.oldSex
        let str = '未知'
        if (obj === '2') {
          str = '男'
        } else if (obj === '3') {
          str = '女'
        }
        return str
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

