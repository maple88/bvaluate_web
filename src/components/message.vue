<template>
  <transition name="fade">
    <div class="login_fixed message_page" v-if="messagePop">
      <div class="login_bg" @click="fn2"></div>
      <div class="loginbox">
        <div class="close_box" @click="fn2">
          <i class="icon_close"></i>
        </div>
        <div class="bd">
          <div class="message_title">
            <h4>{{$t('Message center')}}</h4>
          </div>
          <div class="message_content">
            <div class="message_tab">
              <div class="tab_item" :class="showBox === 0?'active':''" @click="showList(0)">
                <h4>{{$t('All')}}</h4>
              </div>
              <div class="tab_item" :class="showBox === 1?'active':''" @click="showList(1)">
                <h4>{{$t('Unread news')}}</h4>
              </div>
            </div>
            <div class="message_tab_content">
              <div class="message_item" v-for="(item,index) in messageList" :class="open === index?'open':''">
                <div class="message_top">
                  <div class="message_left">
                    <img :src="item.readFlag?read:unRead" alt="未读">
                  </div>
                  <div class="message_center">
                    <h4>{{$t('notice')}} | {{item.title}}</h4>
                    <p>{{item.createdTime}}</p>
                  </div>
                  <div class="message_right">
                    <!--<div class="copy_a">删除</div>-->
                    <div class="copy_a" @click="openMessage(item.id,index,item.readFlag)">{{open === index?$t('Fold'):$t('Unfold')}}<i
                      class="icon_down"></i>
                    </div>
                  </div>
                </div>
                <div class="message_bottom">
                  <p>
                    {{item.content}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import sensors from '../../static/sa-init.js'

  let read = require('../assets/message/read.png');
  let unRead = require('../assets/message/unread.png');

  export default {
    data() {
      return {
        read: read,
        unRead: unRead,
        messageList: [],
        open: -1,
        unReadList: [],
        allList: [],
        showBox: 0
      }
    },
    mounted() {
      this.initMessage();
    },
    computed: {
      messagePop() {
        if (this.$store.state.messagePop) {
          this.initMessage();
        }
        return this.$store.state.messagePop;
      }
    },
    methods: {
      fn2() {
        this.$store.state.messagePop = false;
      },
      openMessage(notifyId, index, readFlag) {
        if (index === this.open) {
          this.open = -1;
        } else {
          this.open = index;
        }
        if (!readFlag) {
          this.readMessage(notifyId, index);
        }
      },
      readMessage(notifyId, index) {
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let headers = {'uid': uid, 'Authorization': token};
          let url = `/api/notify/readUserNotify?notifyId=${notifyId}`;
          this.$axios({
            method: 'put',
            url: url,
            headers: headers
          }).then(res => {
            if (res.data) {
              this.messageList[index].readFlag = true;
            }
          });
        }
      },
      initMessage() {
        let uid = localStorage.getItem('apelink_user_uid');
        let token = localStorage.getItem('apelink_user_token');
        if (token) {
          let headers = {'uid': uid, 'Authorization': token};
          let url = '/api/notify/getUserNotify';
          this.$axios({
            method: 'get',
            url: url,
            headers: headers
          }).then(res => {
            this.messageList = res.data;
            this.allList = res.data;
          });
        }
      },
      showList(type) {
        if (type===0) {
          if(this.showBox !== type){
            this.showBox = 0;
            this.initMessage();
          }
        } else {
          if(this.showBox !== type){
            let uid = localStorage.getItem('apelink_user_uid');
            let token = localStorage.getItem('apelink_user_token');
            if (token) {
              let headers = {'uid': uid, 'Authorization': token};
              let url = '/api/notify/getUserNotify?readFlag=unread';
              this.$axios({
                method: 'get',
                url: url,
                headers: headers
              }).then(res => {
                this.unReadList = res.data;
                this.messageList = this.unReadList;
                this.showBox = 1;
              }).catch(res => {
                this.messageList = []
                this.showBox = 1;
              });
            }
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

