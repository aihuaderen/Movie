<template>
	<view style="height: 100%;">
		<!-- 自定义导航栏 -->
		<NavigationBar></NavigationBar>
		<view class="container">
			<view class="header">
				<view class="historyCollect">
					<button class="common iconfont icon-lishi" :class="{active:show}" @click="toggle">历史</button>
					<button class="common iconfont icon-shoucang" :class="{active:!show}" @click="toggle">收藏</button>
				</view>
			</view>
			<view class="content" v-show="pageShow">
				<scroll-view class="scroll" scroll-y="true" >
					<view class="scrollItem">
						<image class="leftImage" src="../../static/images/hadeng.jpg" mode=""></image>
						<view class="rightText">
							<text class="movieName">哆啦A梦:大雄daxiongsdasdas</text>
							<p class="lastSee">上次播放至 : 第1集</p>
							<text class="lastSee">观影时间 : 2021-02-06 09:20:52</text>
							<button class="continuePlay iconfont icon-bofang">继续播放</button>
						</view>
					</view>
					
					<view class="scrollItem">
						<image class="leftImage" src="../../static/images/hadeng.jpg" mode=""></image>
						<view class="rightText">
							<text class="movieName">哆啦A梦:大雄daxiongsdasdas</text>
							<p class="lastSee">上次播放至 : 第1集</p>
							<text class="lastSee">观影时间 : 2021-02-06 09:20:52</text>
							<button class="continuePlay iconfont icon-bofang">继续播放</button>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="collect" v-show="!pageShow">
				空空如也,快去添加吧!
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				show:true,//切换导航
				pageShow:true
			};
		},
		mounted(){
			let value = uni.getStorageSync('collect')
			console.log(value)
		},
		methods:{
			// 切换
			 toggle(){
				this.show = !this.show
				this.pageShow = !this.pageShow
			 }
		}
	}
</script>

<style lang="less">
	@import url("./iconfont/iconfont.less");
	.container{
		width: 100%;
		height: 100%;
		background: #fff;
		border-top-left-radius:20rpx;
		border-top-right-radius:20rpx;
		.header{
			height: 140rpx;
			width: 100%;
			overflow: hidden;
			.historyCollect{
				margin: 0 auto;
				margin-top: 20rpx;
				display: flex;
				width: 500rpx;
				line-height: 50rpx;
				border-radius: 50rpx;
				text-align: center;
				font-size: 30rpx;
				box-sizing: border-box;
				.common{
					width: 250rpx;
					border-right: 1rpx solid #a3a3a3;
				}
				.icon-lishi{
					border: 1rpx solid #a3a3a3;
					border-right: none;
					border-radius: 50rpx 0 0 50rpx;
				}
				.icon-shoucang{
					border: 1rpx solid #a3a3a3;
					border-left: none;
					border-radius: 0 50rpx 50rpx 0;
				}
				.active{
					background: #df600c;
					color: #FFF;
				}
			}
		}
		.content{
			.scroll{
				.scrollItem{
					display: flex;
					height: 320rpx;
					width: 96%;
					background: #f0efeff1;
					margin: 10rpx auto;
					border-radius: 20rpx;
					.leftImage{
						height: 280rpx;
						width: 180rpx;
						margin:auto 0;
						margin-left: 10rpx;
						border-radius: 20rpx;
					}
					.rightText{
						margin-left: 40rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						.movieName{
							width: 300rpx;
							color: #808080;
							font-size: 36rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.lastSee{
							font-size: 24rpx;
							color: #999999;
						}
						.continuePlay{
							background: #f3d05be7;
							width: 250rpx;
							font-size: 22rpx;
							text-align: center;
							line-height: 70rpx;
							margin-right: 50rpx;
						}
					}
				}
			}
		}
	}
	.collect{
		line-height: 600rpx;
		text-align: center;
	}
</style>
