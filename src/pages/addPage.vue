<template>
  <div id="addPage">
    <v2header/>
    <!-- 外部居中盒子 -->
      <div id="con">
        <!-- 上传步骤 -->
        <div id="step">
          <!-- 项目步骤顶部盒子 -->
          <div class="step_top">
            <div class="step_top_01">
              <div class="step_top_box">
                <span class="step_top_box_num">1</span>
                <span class="step_top_box_stepNum">步骤一</span>
                <p class="step_top_box_content">填写项目信息，上传白皮书</p>
                <div class="triangle-left"></div>
              </div>
            </div>
            <div :class=" completeSteps == 1 ? 'step_top_02' : 'step_top_02 noActive'">
              <div class="step_top_box">
                <div class="triangle-left_op"></div>
                <span class="step_top_box_num">2</span>
                <span class="step_top_box_stepNum">步骤二</span>
                <p class="step_top_box_content">Bvaluate审核，自动化评估项目</p>
                <div class="triangle-left"></div>
              </div>
            </div>
            <div class="step_top_03 noActive">
              <div class="step_top_box">
                <div class="triangle-left_op"></div>
                <span class="step_top_box_num">3</span>
                <span class="step_top_box_stepNum">步骤三</span>
                <p class="step_top_box_content">
                  通知项目评估结果，审核通过可查看项目并赠送
                  <span class="step_top_box_content_num">166</span> 糖果
                </p>
                <div class="triangle-left triangle-left_03"></div>
              </div>
            </div>
          </div>
          <!-- 项目信息栏目 -->
          <div class="information" v-show="completeSteps == 0">
            <div class="information_title">项目信息</div>
            <div class="information_content">
              <span class="information_must">*</span>
              <span>{{$t('Project name')}}：</span>
              <input
                type="text"
                class="information_input"
                v-model="project.projectName"
                name="no_content"
                @focus="project.projectNameErr=''"
              >
              <span class="information_name">{{project.projectNameErr}}</span>
            </div>
            <div class="information_content">
              <span class="information_must">*</span>
              <span>{{$t('Official website address')}}：</span>
              <input
                type="text"
                class="information_input"
                v-model="project.officialAddress"
                name="no_content"
                @focus="project.officialAddressErr=''"
              >
              <span class="information_name">{{project.officialAddressErr}}</span>
            </div>
            <div class="information_content">
              <span class="information_must information_must03">*</span>
              <span>{{$t('Token name')}}：</span>
              <input
                type="text"
                class="information_input"
                name="no_content"
                v-model="project.tokenName"
              >
            </div>
          </div>
          <!-- 上传白皮书 -->
          <div class="upload" v-show="completeSteps == 0">
            <div class="upload_title">上传白皮书</div>
            <div class="upload_box">
              <!-- 上传文件功能盒子 使用v-on:change时间判断触发-->

              <div class="rightBtn">
                <div class="chooseFile">
                  <input
                    type="file"
                    data="选择文件"
                    name="no_content"
                    id="input_analysis_chooseFile"
                    @change="selectPDF($event)"
                    class="inputFile"
                  >
                  <!-- <button data="选择文件">{{$t('Select the file')}}</button> -->
                  <span style="color:red;font-size:16px">{{ tipContent1 }}</span>
                </div>
                <!-- <button
                class="uploadBtn"
                data="上传白皮书"
                name="analysis_uploadBtn"
                id="analysis_uploadBtn"
                :class="{ disabled: uploadBtn }"
                :disabled="uploadBtn"
                @click="uploadPDF"
                >{{$t('Upload')}}</button>-->
              </div>

              <div class="upload_box_img">
                <img src="../../src/assets/addPage_01.png" alt>
              </div>
              <div class="upload_box_Tips">{{tipContent}}</div>
              <div class="upload_box_content">
                <p>
                  <span class="upload_box_content_must">*</span> 暂只支持PDF格式文件，文件大小不能超过50M
                </p>
                <p>
                  <span class="upload_box_content_must">*</span>文件名称格式为 项目名称-版本号-语言.pdf
                </p>
                <p>
                  <span class="upload_box_content_must upload_box_content_must03">*</span>（举例：300cubits TEU-02.00.00-cn.pdf）
                </p>
              </div>
            </div>
            <!-- 文件上传的状态 -->
            <div class="upload_box_state" v-show="opemTimer">
              <div class="upload_box_state_box">
                <div class="upload_box_state_box_img">
                  <img
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553767838400&di=6b333fbe8f9c8109226f904848f42ad1&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F89%2F22%2F1056ed4e083a8f6.jpg"
                    alt
                  >
                  <span>{{ filename }}</span>
                </div>
                <div class="upload_box_state_box_state" v-show="opemTimer">
                  <div class="upload_box_state_box_state_success" :style="'width:'+uploadtime+'%'"></div>
                </div>
              </div>
            </div>
            <div class="upload_box_sure">
              <div class="upload_box_ok" @click="uploadPDF">确定</div>
              <div class="upload_box_cancel">取消</div>
            </div>
          </div>
          <!-- 项目权限设置 -->
          <div class="jurisdiction" v-show="completeSteps == 0">
            <div class="jurisdiction_title">项目权限设置</div>
            <div class="jurisdiction_main">
              <div class="jurisdiction_main_btn">
                <input type="radio" name="list" :value="true" checked="checked" v-model="isPublic">
                <span class="jurisdiction_main_01">公开</span>
                <span class="jurisdiction_main_02">*</span>
                <span class="jurisdiction_main_03">公开，则所有人均可查看此项目分析结果</span>
              </div>
              <div class="jurisdiction_main_btn">
                <input type="radio" name="list" :value="false" v-model="isPublic">
                <span class="jurisdiction_main_01">保密</span>
                <span class="jurisdiction_main_02">*</span>
                <span class="jurisdiction_main_03">保密，则仅自己可查看此项目分析结果</span>
              </div>
            </div>
          </div>
          <!-- 提交按钮 -->
          <div class="sumit" v-show="completeSteps == 0" @click="addStep">提交</div>
        </div>
        <!-- 上传记录通用 -->
        <div id="record">
          <div class="record_title">上传记录</div>
          <div class="record_content">
            <div class="record_content_title">
              <ul>
                <li>序号</li>
                <li>项目名称</li>
                <li>提交时间</li>
                <li>评估状态</li>
              </ul>
            </div>
          </div>
          <div class="record_content_list" v-for="(item,index) in list" :key="index">
            <ul>
              <li>{{ index + 1}}</li>
              <li>{{ item.name }}</li>
              <li>{{ item.time }}</li>
              <li v-if="item.state == '审核中'" style="color:#3557da">{{ item.state }}</li>
              <li v-else-if="item.state == '审核未通过'" style="color:#ec984f">{{ item.state }}</li>
              <li v-else style="color:#37d152">{{ item.state }}</li>
            </ul>
          </div>
          <div class="addBtn">+新增</div>
        </div>
        <!-- 推荐项目通用 -->
        <div id="recommend">
          <div class="recommend_title">推荐项目</div>
          <div class="recommend_list">
            <ul>
              <li v-for="(item,index) in recommendProjects" :key="index">
                <div class="recommend_list_headImg">
                  <img :src="item.logoSrc" alt>
                </div>
                <div class="recommend_list_describe">
                  <p class="recommend_list_describe_name01">{{ item.project }}</p>
                  <p class="recommend_list_describe_name02">({{ item.tokenCoin }})</p>
                </div>
                <div class="recommend_list_fraction">{{ item.totalScore }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    <v2footer/>
  </div>
</template>

<script>
export default {
  name: "addPage",
  data() {
    return {
      list: [
        {
          name: "CKM",
          time: "2019-01-01",
          state: "审核中"
        },
        {
          name: "CKM",
          time: "2019-01-01",
          state: "审核未通过"
        },
        {
          name: "CKM",
          time: "2019-01-01",
          state: "查看评估结果"
        },
        {
          name: "CKM",
          time: "2019-01-01",
          state: "审核中"
        },
        {
          name: "CKM",
          time: "2019-01-01",
          state: "审核未通过"
        }
      ],
      //   推荐项目
      recommendProjects: [],
      filename: "",
      tipText: "",
      showTip: false,
      fileTips: "",
      uploadBtn: true,
      pdf: "",
      uploadstate: false,
      uploadword: "",
      tipContent: "点击或将文件拖拽到这里上传",
      tipContent1: "",
      // 默认不显示模拟上传进度
      opemTimer: false,
      // 模拟上传进度的数据
      uploadtime: 0,
      // 下面字符控制用户完成的步骤  条件渲染组件即可
      completeSteps: 0,
      // 储存公开/保密的字符
      isPublic: true,
      // 储存是否上传成功的字符
      isSuccess: false,
      project: {
        projectName: "",
        projectNameErr: "",
        officialAddress: "",
        officialAddressErr: "",
        tokenName: ""
      }
    };
  },
  activated() {
    this.getRecommendProjects();
  },
  methods: {
    // 获取数据的接口
    getRecommendProjects() {
      this.$axios
        .get("/api/projectList/list?type=周榜&pageNo=0&pageSize=3")
        .then(res => {
          this.recommendProjects = res.data;
        });
    },
    // 文件类型的检测
    selectPDF(e) {
      console.log(e);
      this.fileTips = "";
      this.filename = "";
      let token = localStorage.getItem("apelink_user_token");
      let uid = localStorage.getItem("apelink_user_uid");
      let file = e.target.files[0];
      this.pdf = file;
      let f = file.name.replace(/\.pdf/g, "");
      let filename = f.split("-");
      let j = 0;
      for (let i = 0; i < filename.length; i++) {
        if (filename[i] === "") {
          j++;
        }
      }
      let suffix = file.name.split(".");
      if (file.type !== "application/pdf") {
        this.tipContent1 = "文件类型错误";
        this.uploadBtn = true;
      } else if (file.size >= 52428800) {
        this.tipContent1 = "文件过大，请修改后重新选择";
        this.uploadBtn = true;
      } else if (filename.length !== 3 || j > 0) {
        this.tipContent1 = "文件名格式不符合要求，请修改文件名并以 “-” 分隔";
        this.uploadBtn = true;
      } else {
        this.filename = e.target.files[0].name;
        this.uploadBtn = false;
        this.opemTimer = true;
        console.log(this.filename);
      }
    },
    // 调用上传文件接口的方法
    uploadPDF() {
      let that = this;
      let project = this.project.projectName;
      let projectUrl = this.project.officialAddress;
      if (!project) {
        this.project.projectNameErr = "请输入项目名称";
        return false;
      }

      if (!projectUrl) {
        this.project.officialAddressErr = "请输入官方地址";
        return false;
      }
      let tokenCoin = this.project.projectName;
      let token = localStorage.getItem("apelink_user_token");
      let uid = localStorage.getItem("apelink_user_uid");
      let url = `/api/individual/uploadProjectPDF?project=${project}&url=${projectUrl}`;
      if (tokenCoin) {
        url += `&tokenCoin=${tokenCoin}`;
      }
      let headers = {
        uid: uid,
        Authorization: token,
        "Content-Type": "multipart/form-data"
      };
      let data = new FormData();
      let time = setInterval(function() {
        that.uploadtime = parseInt(that.uploadtime) + 1;
        console.log(that.uploadtime);
        if (that.uploadtime === 99) {
          clearInterval(time);
        }
      }, 50);
      that.uploadstate = true;
      data.append("multipartFile", that.pdf);
      that
        .$axios({
          method: "post",
          url: url,
          headers: headers,
          data: data
        })
        .then(res => {
          if (res.data) {
            that.uploadword = "上传成功，我们会尽快反馈分析结果";
            console.log(that.uploadword);
            // 清楚模拟上传效果的定时器
            clearInterval(time);
            that.uploadtime = 100;
            // 修改是否上传成功的状态
            that.isSuccess = true;
          } else {
            that.uploadword = "上传失败，" + res.data;
          }
        });
    },
    addStep() {
      // 在跳转组件之前需要判断是否上传成功
      if (this.isSuccess) {
        console.log("成功");
        return this.completeSteps++;
      } else {
        console.log("失败");
      }
    }
  }
  // 监听当前跳转的组件的状态
};
</script>

<style scoped lang='scss'>
  #addPage {
    background-color: #f5f5f5;
    .v2footer {
      width: 100%;
    }
    // 上传步骤
    #con {
      width: 1300px;
      margin: 150px auto 150px;
      border-radius: 2px;
      #step {
        background-color: #fff;
        height: 100%;
        width: 900px;
        float: left;
        .step_top {
          width: 758px;
          margin: 20px auto 0;
          height: 90px;
          display: flex;
          border-bottom: 1px solid #ccc;
          .step_top_01,
          .step_top_02,
          .step_top_03 {
            flex: 1;
            transition: 0.5s all;
            .step_top_box {
              width: 85%;
              height: 25px;
              background-color: #1e6ddf;
              padding: 3px;
              position: relative;
              .step_top_box_num {
                height: 18px;
                width: 18px;
                border-radius: 50%;
                background-color: #fff;
                text-align: center;
                line-height: 20px;
                color: #1e6ddf;
                display: inline-block;
              }
              .step_top_box_stepNum {
                color: #fff;
              }
              .step_top_box_content {
                font-size: 12px;
                margin: 15px 0 0 20px;
                .step_top_box_content_num {
                  color: #ec984f;
                  font-size: 16px;
                }
              }
              .triangle-left {
                width: 0;
                height: 0;
                border-top: 11px solid transparent;
                border-left: 16px solid #1e6ddf;
                border-bottom: 14px solid transparent;
                position: relative;
                left: 211px;
                top: -55px;
              }
              .triangle-left_op {
                width: 0;
                height: 0;
                background-color: #1e6ddf;
                border-top: 11px solid transparent;
                border-left: 16px solid #fff;
                border-bottom: 14px solid transparent;
                position: absolute;
                left: -16px;
                top: 0px;
              }
              .triangle-left_03 {
                top: -77px;
              }
              .bgc_gray {
                background-color: #eee;
              }
            }
          }
          // 未选中状态的样式
          .noActive {
            .step_top_box {
              background-color: #eee !important;
            }
            .triangle-left {
              border-left: 16px solid #eee !important;
            }
            .triangle-left_op {
              background-color: #eee !important;
            }
            .step_top_box_num,
            .step_top_box_stepNum,
            .step_top_box_content {
              color: #666 !important;
            }
          }
        }
        .information {
          width: 758px;
          margin: 50px auto 0;
          .information_title {
            font-size: 16px;
            font-weight: 900;
          }
          .information_content {
            margin: 33px 0 0 15px;
            .information_must {
              color: #ec984f;
            }
            .information_must03 {
              color: #fff;
            }
          }
          .information_input {
            width: 418px;
            height: 34px;
            border: 1px solid #ccc;
          }
          .information_name {
            margin-left: 20px;
            color: #ec984f;
            font-size: 12px;
          }
        }
        .upload {
          width: 758px;
          margin: 50px auto 0;
          .upload_title {
            font-size: 16px;
            font-weight: 900;
          }
          .upload_box {
            height: 225px;
            width: 420px;
            border: 1px dashed #1e6ddf;
            border-radius: 10px;
            margin: 20px 92px;
            padding: 16px;
            text-align: center;
            position: relative;
            .inputFile {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
            }
            .upload_box_img {
              width: 50px;
              height: 50px;
              margin: 0 auto;
            }
            .upload_box_Tips {
              color: #3557da;
              text-align: center;
              font-size: 16px;
              line-height: 40px;
            }
            .upload_box_content {
              font-size: 12px;
              margin-top: 10px;
              text-align: left;
              margin-left: 77px;
              .upload_box_content_must {
                color: #ec984f;
              }
              .upload_box_content_must03 {
                color: #fff;
              }
            }
          }
          .upload_box_state {
            width: 420px;
            margin-top: 30px;
            .upload_box_state_box {
              margin-left: 92px;
              margin-top: 15px;
              .upload_box_state_box_img {
                img {
                  width: 25px;
                  height: 25px;
                }
              }
            }
            .upload_box_state_box_state {
              width: 400px;
              height: 4px;
              border-radius: 2px;
              background-color: #ececec;
              margin: 2px 25px;
              .upload_box_state_box_state_success {
                height: 100%;
                background-color: #3557da;
                border-radius: 4px;
              }
            }
          }
          .upload_box_sure {
            width: 195px;
            height: 35px;
            display: flex;
            justify-content: space-between;
            margin-left: 92px;
            margin-top: 36px;
            .upload_box_ok {
              width: 75px;
              height: 35px;
              background-color: #3557da;
              border-radius: 10px;
              color: #fff;
              text-align: center;
              line-height: 35px;
            }
            .upload_box_cancel {
              width: 75px;
              height: 35px;
              background-color: #d3d3d3;
              border-radius: 10px;
              color: #fff;
              text-align: center;
              line-height: 35px;
            }
          }
        }
        .jurisdiction {
          width: 758px;
          margin: 50px auto 0;
          .jurisdiction_title {
            font-size: 16px;
            font-weight: 900;
          }
          .jurisdiction_main {
            margin-left: 90px;
            .jurisdiction_main_btn {
              margin-top: 21px;
              .jurisdiction_main_01 {
                color: #000;
              }
              .jurisdiction_main_02 {
                color: #ec984f;
              }
              .jurisdiction_main_03 {
                color: #666;
                font-size: 12px;
              }
              // 自定义按钮样式模块
              input[type="radio"] + label::before {
                content: " ";
                display: inline-block;
                vertical-align: middle;
                font-size: 18px;
                width: 20px;
                height: 20px;
                margin-right: 4px;
                border-radius: 50%;
                border: 1px solid #01cd78;
                text-indent: 3px;
                line-height: 1;
              }
            }
          }
        }
        .sumit {
          width: 160px;
          height: 33px;
          background-color: #3557da;
          text-align: center;
          line-height: 33px;
          color: #fff;
          border-radius: 10px;
          margin: 50px auto;
        }
      }
      //上传记录通用
      #record {
        width: 370px;
        float: left;
        padding: 20px 15px;
        background-color: #fff;
        margin-left: 30px;
        .record_title {
          font-size: 18px;
          font-weight: 900;
        }
        .record_content {
          margin-top: 20px;
          border-bottom: 1px solid #ccc;
          .record_content_title {
            > ul {
              display: flex;
              justify-content: space-between;
              text-align: center;
              > li {
                color: #737373;
                flex: 1;
              }
            }
          }
        }
        .record_content_list {
          margin-top: 40px;
          > ul {
            display: flex;
            justify-content: space-between;
            > li {
              flex: 1;
              font-size: 12px;
              text-align: center;
            }
          }
        }
        .addBtn {
          width: 111px;
          height: 40px;
          border-radius: 3px;
          font-size: 20px;
          background-color: #3557da;
          line-height: 40px;
          text-align: center;
          color: #fff;
          margin: 50px auto;
        }
      }
      // 推荐项目通用
      #recommend {
        height: 590px;
        width: 370px;
        float: left;
        padding: 20px 15px;
        background-color: #fff;
        margin: 30px 0 30px 30px;
        .recommend_title {
          font-size: 18px;
          font-weight: 900;
        }
        .recommend_list {
          ul {
            li {
              margin: 20px auto;
              width: 344px;
              height: 151px;
              background: url(../assets/project/recommend-banner1.jpg) center /
                cover no-repeat;
              border-radius: 5px;
              padding: 40px 10px;
              display: flex;
              justify-content: space-between;
              .recommend_list_headImg {
                width: 72px;
                height: 72px;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                  margin-left: 10px;
                }
              }
              .recommend_list_describe {
                p {
                  margin: 0 0 5px;
                  color: #fff;
                }
                .recommend_list_describe_name01 {
                  font-size: 16px;
                }
                .recommend_list_describe_name02 {
                  font-size: 12px;
                }
                .recommend_list_describe_name03 {
                  font-size: 12px;
                }
              }
              .recommend_list_fraction {
                line-height: 72px;
                font-size: 16px;
                color: #fff;
                width: 50px;
                font-size: 22px;
              }
            }
          }
        }
      }
    }
  }
</style>