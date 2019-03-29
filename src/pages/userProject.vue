<template>
  <div class="page project userCenter userProject">
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
              <li class="active">
                <router-link to="/userProject">
                  <div class="navicon"><img src="../assets/userCenter/l2.png"><img class="on" src="../assets/userCenter/l2-on.png"></div>
                  {{$t('My project')}}
                </router-link>
              </li>
              <li>
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
            <div class="projectBox">
              <table class="projectTable">
                <thead>
                  <tr>
                    <th>{{$t('Sequence')}}</th>
                    <th class="projectNameCell">{{$t('Project name')}}</th>
                    <th>{{$t('Submission time')}}</th>
                    <th>{{$t('Project authority')}}</th>
                    <th>{{$t('Evaluation status')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in projectList" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.projectName}}</td>
                    <td>{{item.submitTime}}</td>
                    <td>{{item.projectAuthority}}</td>
                    <td :style="setStatusColor(item.status)" @click="goProject(item.status,item.projectName)">{{item.status}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <v2footer/>


      <candyDetails v-if="detailsPop" @closeCandyDetails='closeCandyDetails'></candyDetails>
      <candyGuide v-if="guidePop" @closeCandyGuide='closeCandyGuide' @showBindPhone='showBindPhone' :firstOpenGuide='firstOpenGuide'></candyGuide>
      <v2BindPhone v-if="bindPhonePop" @closeBindPhone='closeBindPhone'></v2BindPhone>
    </div>
  </div>
</template>

<script>
  let newsimg = require('../assets/search/news.png');
  let loading = require('../assets/login/loading.gif');

  export default {
    data() {
      return {
        detailsPop:true,
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
          emailCode: ''
        },
        showLoadMore: true,
        projectStatus: {
          verifying: '审核中',
          notPassed: '审核未通过',
          passed: '查看评估结果'
        },
        projectList: [
          {
            sequence: '1',
            projectName: 'CKM',
            submitTime: '2018-12-12',
            projectAuthority: '公开',
            status: '审核中'
          },
          {
            sequence: '1',
            projectName: 'CKM',
            submitTime: '2018-12-12',
            projectAuthority: '公开',
            status: '审核未通过'
          },
          {
            sequence: '1',
            projectName: 'Loopring',
            submitTime: '2018-12-12',
            projectAuthority: '公开',
            status: '查看评估结果'
          },
        ]
      }
    },
    activated () {
      this.getLocalStorageUserInfo();
    },
    mounted() {
    },
    methods: {
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
        } else {
          this.$router.push('/home')
        }
      },
      setStatusColor(status){
        switch(status){
          case this.projectStatus.verifying: 
            return {'color': '#3555da'};
            break;
          case this.projectStatus.notPassed: 
            return {'color': '#e3932c'};
            break;
          case this.projectStatus.passed: 
            return {'color': '#39d052','cursor':'pointer'};
            break;
        }
      },
      goProject(status,name){
        if(status == this.projectStatus.passed){
          let routeData = this.$router.resolve({path: '/project',query: {project: name}});console.log(routeData)
          window.open(routeData.href,'_blank');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>

</style>

