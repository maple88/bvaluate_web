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
                <div class="tb-cell nickname">{{user.nickname}}</div>
                <div class="tb-cell edit" @click="edit(editnicknamebox)"><i class="fa fa-pencil"></i>修改</div>
              </div>
              <div class="tb-cell nicknamedit editbox" v-show="!editnicknamebox.show">
                <input type="text" maxlength="8" v-model="user.nickname" @keyup.enter="editnicknameok(editnicknamebox)">
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
                <div class="tb-cell center">{{user.sign}}</div>
                <div class="tb-cell edit" @click="edit(editsignbox)"><i class="fa fa-pencil"></i>修改</div>
              </div>
              <div class="tb-cell editbox" v-show="!editsignbox.show">
                <textarea v-model="user.sign" rows="8"></textarea>
                <div class="botoperate">
                  <button type="button" class="btn ok">保存</button>
                  <button type="button" class="btn" @click="editcancel(editsignbox)">取消</button>
                </div>
              </div>
            </div>
            <div class="list-item">
              <div class="tb-cell leftips">手机：</div>
              <div class="tb-cell center">137****462</div>
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
                  <input type="password">
                  <div type="button" class="btn rightips text-success">验证成功</div>
                  <!-- <div type="button" class="btn code-btn text-danger">密码错误</div> -->
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="control-label">新密码</label>
                <div class="coderow">
                  <input type="password">
                  <div type="button" class="btn rightips"></div>
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword" class="control-label">确认密码</label>
                <div class="coderow">
                  <input type="password">
                  <div type="button" class="btn rightips text-danger">密码不一致</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
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
          nickname: '才不可以吃辣椒酱',
          sign: '后海有树的院子，夏代有工的玉，此时此刻的云，二十来岁的你--可遇不可求的事。'
        },
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
        obj.show = !obj.show
      },
      // 取消编辑
      editcancel(obj) {
        obj.show = !obj.show
      },
      loginInfo(uid, token) {

      },
      getMyProfile() {
        let token = localStorage.getItem('apelink_user_token')
        if (token !== null && token !== '' && token !== undefined) {

        } else {
          this.$router.push('/login')
        }
      }
    },
    mounted() {
      this.getMyProfile()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

