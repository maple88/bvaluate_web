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
          <div class="information">
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
                v-show="completeSteps == 0"
              >
              <span v-show="completeSteps == 1">{{ project.projectName }}</span>
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
                v-show="completeSteps == 0"
              >
              <span v-show="completeSteps == 1">{{ project.officialAddress }}</span>
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
                v-show="completeSteps == 0"
              >
              <span v-show="completeSteps == 1">{{ project.tokenName }}</span>
            </div>
          </div>
          <!-- 上传白皮书 -->
          <div class="upload">
            <div class="upload_title">上传白皮书</div>
            <!-- 状态一显示的盒子 -->
            <div class="upload_box" v-show="completeSteps == 0">
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
            <!-- 状态二显示的盒子 -->
            <div class="upload_box_02" v-show="completeSteps ==1">
              <div class="upload_box_02_top">
                <img src="../../src/assets/addPage_01.png" alt="">  
                <span>{{ filename }}</span>
              </div>
              <div class="upload_box_02_main">
                <p class="upload_box_02_main_title">Bvaluate审核中</p>
                <p class="upload_box_02_main_text">审核需要<span class="upload_box_02_main_text_blue">5天</span>时间，预计<span class="upload_box_02_main_text_blue">2018-12-23审核结束</span></p>
                <p class="upload_box_02_main_text">敬请关注消息通知，评估结果会第一时间通知于您！</p>
              </div>
            </div>
            <!-- 文件上传的状态 -->
            <div class="upload_box_state" v-show="opemTimer">
              <div class="upload_box_state_box" v-show="completeSteps == 0" v-for="(item,index) in pushFileList" :key="index">
                <div class="upload_box_state_box_img">
                  <img
                    src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553767838400&di=6b333fbe8f9c8109226f904848f42ad1&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F00%2F89%2F22%2F1056ed4e083a8f6.jpg"
                    alt
                  >
                  <span>{{ item.name }}</span>
                </div>
                <div class="upload_box_state_box_state" v-show="opemTimer">
                  <div class="upload_box_state_box_state_success" :style="'width:'+uploadtime+'%'"></div>
                </div>
              </div>
            </div>
            <div class="upload_box_sure" v-show="completeSteps == 0">
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
      // 模拟静态数据
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
      // 文件上传列表
      pushFileList:[],
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
        // 向上传列表中添加元素 + 判断文件名是否相同
        this.pushFileList.forEach(_filename => {
         if(this.filename == _filename.name){
           return false
         }
        });
        this.pushFileList.push({
          name:e.target.files[0].name
        })
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
  },
};
</script>

<style scoped lang='scss'>
    @import '../styles/app/addPage.scss';
</style>