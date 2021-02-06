<template>
 <view class="loginContainer">
  <image class="logo" src="../../static/aiqiyi.jpg" mode=""></image>
  <p class='text'>云电影</p >
  <div class="loginMethods">
   <button class="login wechatLogin" open-type="getUserInfo" @getuserinfo='handleGetUserInfo'>
    微信登录
   </button>
   
  </div>
 </view>
</template>

<script>
 export default {
  data() {
   return {
    
   }
  },
     methods:{
    handleGetUserInfo(res){
     // 判断用户是否授权
     if(res.detail.userInfo){
      wx.setStorage({
            key:'userInfo',
            data:res.detail.userInfo
      })
      wx.reLaunch({
       url:'../personal/personal'
      })
     }
    }
   }
  }
 
</script>

<style lang="stylus">
 .loginContainer
  width 100%
  height 100%
  background #F8F8F8
  display flex
  align-items center
  flex-direction column
  .logo
   width 300upx
   height 100upx
   margin-top 200upx
  .text
   font-size 26upx
   color #666
  .loginMethods
   width 80%
   margin 150upx auto
   display flex
   justify-content space-around
   .login
    width 500upx
    height 80upx
    background #41A863
    color #FFFFFF
    text-align center
    line-height 80upx
    font-size 26upx
   

</style>