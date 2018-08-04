<template>
  <div class="page">
    <vheader/>
    <div class="maintainer">
      <div class="container">
        <div class="myProfile mt20">
          <div class="left">
            <div class="userbrand"><img src="../assets/logo_brand.png"></div>
            <p class="usertips">个人资料</p>
          </div>
          <div class="right">
            <div class="list-item item-head">
              <div class="showbox" v-show="editnicknamebox.show">
                <div class="tb-cell nickname">{{user.nickName}}</div>
                <div class="tb-cell edit" @click="edit(editnicknamebox)"><i class="fa fa-pencil"></i>修改</div>
              </div>
              <div class="tb-cell nicknamedit editbox" v-show="!editnicknamebox.show">
                <input type="text" maxlength="8" v-model="user.nickName" @keyup.enter="editnicknameok(editnicknamebox)">
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">性别：</div>
              <div class="showbox" v-show="editsexbox.show">
                <div class="tb-cell center">女</div>
                <div class="tb-cell edit" @click="edit(editsexbox)"><i class="fa fa-pencil"></i>修改</div>
              </div>
              <div class="tb-cell editbox" v-show="!editsexbox.show">
                <div class="radiobox">
                  <label class="radio-inline">
                    <input type="radio" name="sex" value="male"> 男
                  </label>
                  <label class="radio-inline">
                    <input type="radio" name="sex" value="female" checked> 女
                  </label>
                </div>
                <div class="botoperate">
                  <button type="button" class="btn ok">保存</button>
                  <button type="button" class="btn" @click="editcancel(editsexbox)">取消</button>
                </div>
              </div>
            </div>
            <div class="list-item xs-sign">
              <div class="tb-cell leftips">个人说明：</div>
              <div class="showbox" v-show="editsignbox.show">
                <div class="tb-cell center" v-html="showSynopsis"></div>
                <div class="tb-cell edit" @click="edit(editsignbox)"><i class="fa fa-pencil"></i>修改</div>
              </div>
              <div class="tb-cell editbox" v-show="!editsignbox.show">
                <textarea v-model="user.synopsis" rows="8"></textarea>
                <div class="botoperate">
                  <button type="button" class="btn ok" @click="editSynopsis(editsignbox)">保存</button>
                  <button type="button" class="btn" @click="editcancel(editsignbox)">取消</button>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">手机：</div>
              <div class="tb-cell center">{{user.phoneNumber | showPhone}}</div>
              <div class="tb-cell edit" data-toggle="modal" data-target="#phoneModal"><i class="fa fa-pencil"></i>修改
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">邮箱：</div>
              <div class="tb-cell center emailstyle">1032458611@qq.com</div>
              <div class="tb-cell edit" data-toggle="modal" data-target="#emailModal"><i class="fa fa-pencil"></i>修改
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">密码：</div>
              <div class="tb-cell center">*******</div>
              <div class="tb-cell edit" data-toggle="modal" data-target="#pwdModal"><i class="fa fa-pencil"></i>修改</div>
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
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">绑定手机</h4>
          </div>
          <div class="modal-body phoneModal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label">手机号码</label>
                <input type="tel">
              </div>
              <div class="form-group">
                <label class="control-label">验证码</label>
                <div class="coderow">
                  <input type="text">
                  <button type="button" class="btn code-btn">获取验证码</button>
                </div>
                <p class="help-block">60s后重新获取</p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
          </div>
        </div>
      </div>
    </div><!-- /.modal -->

    <!-- 绑定邮箱模态框 -->
    <div class="modal fade collection-modal" id="emailModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">绑定邮箱</h4>
          </div>
          <div class="modal-body phoneModal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label">邮箱</label>
                <input type="email">
              </div>
              <div class="form-group">
                <label class="control-label">验证码</label>
                <div class="coderow">
                  <input type="text">
                  <button type="button" class="btn code-btn">获取验证码</button>
                </div>
                <p class="help-block">60s后重新获取</p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
          </div>
        </div>
      </div>
    </div><!-- /.modal -->

    <!-- 修改密码模态框 -->
    <div class="modal fade collection-modal" id="pwdModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">修改密码</h4>
          </div>
          <div class="modal-body phoneModal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label">旧的密码</label>
                <div class="coderow">
                  <input type="password" v-model="user.oldPassword">
                  <div type="button" class="btn rightips"></div>
                  <!--<div type="button" class="btn rightips text-success">验证成功</div>-->
                  <!-- <div type="button" class="btn code-btn text-danger">密码错误</div> -->
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">新密码</label>
                <div class="coderow">
                  <input type="password" v-model="user.newPassword">
                  <div type="button" class="btn rightips"></div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">确认密码</label>
                <div class="coderow" v-model="user.newPassword">
                  <input type="password">
                  <div type="button" class="btn rightips text-danger">{{showErrow?'':'密码不一致'}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="">确定</button>
          </div>
        </div>
      </div>
    </div><!-- /.modal -->
  </div>
</template>

<script>
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
          sex: ''
        },
        showErrow: true,
        editnicknamebox: {
          show: true
        },
        editsexbox: {
          show: true
        },
        editsignbox: {
          show: true
        },
        aplinkUser: {}
      }
    },
    methods: {
      // 通用修改按钮
      edit(obj) {
        obj.show = !obj.show
      },
      // 回车确定昵称
      editnicknameok(obj) {
        let json = {
          nickName: this.user.nickName
        };
        let that = this
        that.editInfor(json, function (res) {
          if (res.data) {
            localStorage.setItem('apelink_user_nickName', that.user.nickName);
            obj.show = !obj.show
          } else {
            obj.show = !obj.show
          }
        })
      },
      editPassword(obj) {
        let json = {
          oldPassword: this.user.oldPassword,
          newPassword: this.user.newPassword
        };
        let that = this;
        that.editInfor(json, function (res) {
          if (res.data) {
            obj.show = !obj.show
          }
        })
      },
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
      // 取消编辑
      editcancel(obj) {
        obj.show = !obj.show
      },
      loginInfo(uid, token) {

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
          this.user.phoneNumber = phoneNumber;
          this.user.nickName = nickName;
          this.user.synopsis = synopsis;
          this.user.profileUrl = profileUrl;
          this.user.email = email;
          this.user.sex = sex;
        } else {
          this.$router.push('/login')
        }
      },
      editInfor(json, callback) {
        let that = this;
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        let url = '/api/user/modify';
        let headers = {'uid': uid, 'Authorization': token};
        let thatCallback = callback;
        that.$axios({
          method: 'put',
          url: url,
          headers: headers,
          data: json
        }).then(function (res) {
          thatCallback(res)
        })
      }
    },
    mounted() {
      this.getMyProfile()
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

