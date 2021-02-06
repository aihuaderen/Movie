<template>
	<view>
		<scroll-view scroll-y>
			<!-- 登录 -->
			<view>
				<view class="header">
					<image class="userImg" :src="userInfo.avatarUrl?userInfo.avatarUrl:'../../static/images/personal/personal.png'"></image>
					<view class="userInfo" >
						<view class="user" >{{userInfo.nickName?userInfo.nickName:'未登录'}}</view>
						<view class="service" v-if="!userInfo.nickName">登录可以享用更多云服务</view>
					</view>
					<view class="login" v-if="!userInfo.nickName"  >
						<text class="login2" @click="toLogin" >立即登录</text>
						<text class="iconfont icon-more"></text>
					</view>
				</view>
			</view>
			
			<!-- 内容区域 -->
			<view >
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-bofangjilu"></text>
						<text class="videos">播放记录</text>
					</view>
					<view class="lookPlay">
						<text class="look">记录看过的精彩</text>
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-shoucang1"></text>
						<text class="videos">点赞记录</text>
					</view>
					<view class="lookPlay">
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-shoucang"></text>
						<text class="videos">收藏</text>
					</view>
					<view class="lookPlay">
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-wifi-o"></text>
						<text class="videos">关注</text>
					</view>
					<view class="lookPlay">
						<text class="look">记录看过的精彩</text>
						<text class="iconfont icon-more"></text>
					</view>
				</view>
			</view>
			
			<!-- 附加功能 -->
			<view class="functionList">
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-RectangleCopy"></text>
						<text class="videos">免流量追剧</text>
					</view>
					<view class="lookPlay">
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-qian"></text>
						<text class="videos">借钱</text>
					</view>
					<view class="lookPlay">
						<text class="look">额度高  易通过</text>
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-yunongtongqingshuruyinxingqia"></text>
						<text class="videos">办信用卡</text>
					</view>
					<view class="lookPlay">
						<text class="look">领三个月会员</text>
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-anquan"></text>
						<text class="videos">安全中心</text>
					</view>
					<view class="lookPlay">
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-yinsisuoding"></text>
						<text class="videos">隐私设置</text>
					</view>
					<view class="lookPlay">
						<text class="iconfont icon-more"></text>
					</view>
				</view>
			</view>
			
			<!-- 关于我们 -->
			<view class="we">
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-guanyuwomen"></text>
						<text class="videos">关于我们</text>
					</view>
					<view class="lookPlay">
						<text class="iconfont icon-more"></text>
					</view>
				</view>
			</view>
			
			<!-- 意见反馈 -->
			<view class="opinion">
				<view class="playlist">
					<view class="play">
						<text class="iconfont icon-bangzhuyufankui"></text>
						<text class="videos">意见反馈</text>
					</view>
					<view class="lookPlay">
						<text class="iconfont icon-more"></text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				userInfo:{},
			};
		},
		// 获取用户信息
		mounted() {
			wx.getUserInfo({
				success: (res) => {
					console.log(res)
					this.userInfo = res.userInfo
				},
				fail: (err) => {
					console.log('获取用户信息失败')
				}
			})
		},
		
		methods: {
			toLogin(){
				if(this.userInfo.nickName){
					return
				}
				wx.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
			
	}
</script>

<style lang="less">
	@import "./iconfont/iconfont.css";
	
	// 登录
.header{
	display: flex;
	width: 100%;
	height: 150rpx;
	margin-top: 150rpx;
}
.header .userImg {
  width: 100rpx;
  height: 100rpx;
  margin: 0 30rpx;
	background: #F1F1F1;
	border-radius: 50%;
}
.header .userInfo{
	margin-top:10rpx ;
}
.header .userInfo .user{
	font-size: 30rpx;
	
}
.header .userInfo .service{
	font-size: 25rpx;
	margin-top:10rpx ;
	color: #555555;
}
.header .login{
	margin:30rpx 0rpx 30rpx 120rpx;
	display: flex;
}
.header .login .login2{
	font-size: 30rpx;
	white-space: nowrap;
}

.header .login .iconfont{
	
	//width: 20rpx;
	margin: 0 10rpx;
	font-size:40rpx;
	
}

//内容区域
.playlist{
	position: relative;
	display: flex;
	width: 100%;
	height: 100rpx;
	background: #Fff;
	line-height: 100rpx;

	border-bottom: 1rpx solid #C0C0C0;
	
}
.playlist .iconfont{
	font-size: 40rpx;
	color: #00cc36;
	margin: 0 10rpx;
}
.playlist .play .videos{
	font-size: 30rpx;

}
.playlist .lookPlay{
	position: absolute;
	right: 0;
	
}
.playlist .lookPlay .look{
	color: #555555;
	font-size: 28rpx;
}

//附加功能
.functionList{
	margin-top: 10rpx;
}

//意见反馈
.opinion{
	margin-top: 10rpx;
}

//关于我们
.we{
	margin-top: 10rpx;
}
</style>
