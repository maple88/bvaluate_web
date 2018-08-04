<template>
  <transition name="fade">
    <div class="container">
      <div class="medialist mt40">
        <div class="media" v-for="(item, index) in newsList" :key="item.sid">
          <div class="media-left media-middle">
            <img class="media-object" src="../../assets/media.jpg">
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{item.result.title}}</h4>
            <p class="media-words">{{item.result.content}}</p>
            <div class="media-bottom">
              <ul>
                <li>
                  <div class="userimg"
                       v-if="(item.result.author !== 'NULL' && item.result.author !== null && item.result.author !== '')">
                    <img src="../../assets/follow/user_head.png">
                  </div>
                  {{
                  (item.result.siteName !== 'NULL'
                  && item.result.siteName !== null
                  && item.result.siteName !== '')?item.result.siteName:item.result.author
                  }}
                </li>
                <li>{{item.result.urlDate | dataFormat}}</li>
                <li data-toggle="modal" data-target="#deleteModal" class="love" @click="deleteCid = item.cid">
                	<i class="fa fa-heart"></i>已收藏
                </li>
              </ul>
              <div class="tips">新闻</div>
            </div>
          </div>
        </div>
        <!-- <div class="media">
          <div class="media-left media-middle">
            <img class="media-object" src="../../assets/media.jpg">
          </div>
          <div class="media-body">
            <h4 class="media-heading">Whatever is worth doing is worth doing well Whatever is worth doing is worth</h4>
            <p class="media-words">Whatever is worth doing is worth doing well, Whatever isworth doing is worth
              doingwel,Whatever isworth doing is worth doing wel,Whatever is worth doing is worth doing well, Whatever
              isworth doingis worth doing wel,</p>
            <div class="media-bottom">
              <ul>
                <li>
                  <div class="userimg"><img src="../../assets/logo_brand.png"></div>
                  刘方平
                </li>
                <li>5个小时前</li>
                <li class="love"><i class="fa fa-heart"></i>已收藏</li>
              </ul>
              <div class="tips">新闻</div>
            </div>
          </div>
        </div> -->
      </div>

      <div class="modal fade collection-modal" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">取消收藏</h4>
            </div>
            <div class="modal-body collection-modal-text">
              <i class="fa fa-question-circle"></i>确定要取消收藏吗？
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="setUnfollow(deleteCid)">确定</button>
            </div>
          </div>
        </div>
      </div><!-- /.modal -->
    </div>
  </transition>
</template>

<script>

  export default {
    data() {
      return {
      	deleteCid: '',
        newsList: []
      }
    },
    mounted () {
    	this.getFollowList()
    },
    methods: {
      getFollowList() {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/api/individual/list?type=NEWS';
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'get',
          url: url,
          headers: headers
        }).then(function (res) {
        	that.newsList = res.data.content
        })
      },
      setUnfollow(cid) {
        let that = this
        let token = localStorage.getItem('apelink_user_token')
        let uid = localStorage.getItem('apelink_user_uid')
        let url = '/api/individual/delete?cid=' + cid;
        let headers = {'uid': uid, 'Authorization': token};
        that.$axios({
          method: 'DELETE',
          url: url,
          headers: headers
        }).then(function (res) {
        	$('#deleteModal').modal('hide')
        	if(res.data){
        		that.getFollowList()
        	}
        })
      }
    },
    filters: {
    	dataFormat(obj) {
        let myDate = new Date(obj);
        let mydata = myDate.getDate();
        let nowDate = new Date();
        let nowdata = nowDate.getDate();
        let myhour = myDate.getHours();
        let nowhour = nowDate.getHours();
        let myMin = myDate.getMinutes()
        let nowMin = nowDate.getMinutes()
        if (nowdata - mydata < 7 && nowdata - mydata > 1) {
          return nowdata - mydata + '天前'
        } else if (nowdata - mydata <= 1 && Math.abs(myhour - nowhour) > 1 && Math.abs(myhour - nowhour) < 24) {
          return Math.abs(myhour - nowhour) + '小时前'
        } else if (Math.abs(myhour - nowhour) <= 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) > 1 && Math.abs(myDate.getMinutes() - nowDate.getMinutes()) < 60) {
          return Math.abs(myDate.getMinutes() - nowDate.getMinutes()) + '分钟前'
        } else if (Math.abs(myDate.getMinutes() - nowDate.getMinutes()) <= 1) {
          return Math.abs(myDate.getSeconds() - nowDate.getSeconds()) + '秒前'
        } else {
          let month = myDate.getMonth()
          if (month < 9) {
            month = '0' + month
          }
          return month + '-' + mydata
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

