<template>
    <div class="top-box" @click="toTop" v-if="isShow">
      <i class="layui-icon layui-icon-up" ></i>
    </div>
</template>

<script>
    export default {
        name: "topbox",
        data(){
          return {
            isShow:false
          }
        },
        mounted () {
          window.addEventListener('scroll', this.handleScroll)
        },
        methods:{
          toTop:function () {
            let scrollToptimer = setInterval(function () {
              // console.log("定时循环回到顶部")
              var top = document.body.scrollTop || document.documentElement.scrollTop;
              var speed = top / 4;
              if (document.body.scrollTop!=0) {
                document.body.scrollTop -= speed;
              }else {
                document.documentElement.scrollTop -= speed;
              }
              if (top == 0) {
                clearInterval(scrollToptimer);
              }
            }, 30);

          },
          handleScroll:function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop<100){
                this.isShow=false;
            }else {
              this.isShow=true;
            }
          }
        }
    }
</script>

<style scoped>
  .top-box{
    position: fixed;
    bottom: 70px;
    right: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dddddd;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    font-weight: bold;
  }
  .top-box:hover{
    color: #a8a8a8;
  }
</style>
