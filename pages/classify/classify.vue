<template>
	<view class="classifyContainer">

		<view class="mp-header">
			<view class="sys-head"  :style="{ height: statusBarHeight }"></view>
			<view class="serch-box" style="height: 43px;">
				<view class="serch-wrapper flex">
					<view class="logo">
						<!-- <image @tap="onreturn" class="logo_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAzCAYAAACE92h3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUZJREFUeNq82EsKwjAQBuD2mrrTrTdw4cKFINKmrSVK9QZexpsIrnQTp6IgtZk0zfwZmFDQ8DFlaB6pMSYBx4JyRnmjXCctCMzSdAKJVaYnUFhhLBHlNf6EjlYZxfndoDExSVANwaRArrJT9//Iypq+OajKGtu8aJWFgFxlR9f8qJgvWIZiPiBX2cHnLYVi2rcHQrpRj+lw7sdcGuNADqtDvk5RsT4QinVBrkH2Uuvm90EzWCW5K2iHiQV6Uu6k9zztcLGAV8Qmqx3mFvBBuUWAyefja4sCAbq6tECALlQhQNfqoBCgC80RIKzSkMU3R4DilUrsaRQCtJ5ofVGRY7QPKnZ2H9pIiGN1hgBdlWYIcFSlsPsYGyq1ztVDUcnVfBAqvWdxooibKA7doO7a6ph3bSyKvi/929GnEW6El5RTyjvl6iXAACUHYeTCFiIMAAAAAElFTkSuQmCC"></image>
						<text class="logo_title">我的客户</text>
						<image src="data:image/png;base64,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" 
						class="customer_add" mode=""></image> -->
						<view class="input">
							<view class="circular"></view>
							<view class="icon">
								<view class="iconfont icon-dingbu2"></view>
								<span>顶部</span>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mp-header_">
			<view  :style="{ height: statusBarHeight }"></view>
			<view class="serch-box" style="height: 43px;">
			</view>
		</view>
		<view class="contentContainer">
			<view class="navContainer">
				<view class="totalCategory">
					<view class="category active">连续剧</view>
					<view class="category">电影</view>
					<view class="category">综艺</view>
					<view class="category">动漫</view>
				</view>
				
				<view class="detailCategoryContainer">
					<view class="detailCategory">
						<view class="category active">全部</view>
						<view class="category">言情</view>
						<view class="category">喜剧</view>
						<view class="category">悬疑</view>
						<view class="category">都市</view>
						<view class="category">偶像</view>
						<view class="category">古装</view>
					</view>
					<view class="detailCategory">
						<view class="category active">全部</view>
						<view class="category">大陆</view>
						<view class="category">美国</view>
						<view class="category">香港</view>
						<view class="category">台湾</view>
						<view class="category">韩国</view>
						<view class="category">泰国</view>
					</view>
					<view class="detailCategory">
						<view class="category active">全部</view>
						<view class="category">2020</view>
						<view class="category">2019</view>
						<view class="category">2018</view>
						<view class="category">2017</view>
						<view class="category">2016</view>
						<view class="category">2015</view>
					</view>
				</view>
			</view>
			<view class="detailContainer">
				<view class="screenContainer">
					<view class="screenLift">
						<text class="iconfont icon-caidanzhankai"></text>
						<text>筛选</text>
					</view>
					<view class="screenRight">
						<view class="screen active">
							<text class="text active">新</text>
						</view>
						<view class="screen">
							<text class="text">新</text>
						</view>
						<view class="screen">
							<text class="text">评</text>
						</view>
					</view>
				</view>
				<view class="videoContainer">
					<view class="videoInfo">
						<text class="score">5.0</text>
						<image src="./bg.jpg" mode=""></image>
						<view class="info">
							<text class="videoName">筑梦情缘</text>
							<text class="videoDesc">曾江，风雷，杨幂</text>
						</view>
					</view>
					<view class="videoInfo">
						<image src="./bg.jpg" mode=""></image>
						<view class="info">
							<text class="videoName">筑梦情缘</text>
							<text class="videoDesc">曾江，风雷，杨幂</text>
						</view>
					</view>
					<view class="videoInfo">
						<image src="./bg.jpg" mode=""></image>
						<view class="info">
							<text class="videoName">筑梦情缘</text>
							<text class="videoDesc">曾江，风雷，杨幂</text>
						</view>
					</view>
					<view class="videoInfo">
						<image src="./bg.jpg" mode=""></image>
						<view class="info">
							<text class="videoName">筑梦情缘</text>
							<text class="videoDesc">曾江，风雷，杨幂</text>
						</view>
					</view>
					<view class="videoInfo">
						<image src="./bg.jpg" mode=""></image>
						<view class="info">
							<text class="videoName">筑梦情缘</text>
							<text class="videoDesc">曾江，风雷，杨幂</text>
						</view>
					</view>
					<view class="videoInfo">
						<image src="./bg.jpg" mode=""></image>
						<view class="info">
							<text class="videoName">筑梦情缘</text>
							<text class="videoDesc">曾江，风雷，杨幂</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
export default {
	data() {
		return {
			statusBarHeight:statusBarHeight,
		}
	},
	methods: {
		//返回
		onreturn(){
			uni.navigateBack()
		}
	}
}
</script>

<style lang="less" scoped>
@import url("./iconfont/classify.less");
.customer_add{
	width: 40rpx;
	height: 48rpx;
	position: fixed;
	right: 48rpx;
}
.mp-header_ {
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: 100%;
	// background: red;
	// background: #2C7FFB;
	.serch-box{
		width: 100%;
		height: 120rpx;
		// background: #2C7FFB;
		background-size: 100% 100%;
		padding-left: 20rpx;
	}
}
.mp-header {
	background-size: 100% 100%;
	background-repeat: no-repeat;

	z-index: 999;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	// background: red;
	// background: #2C7FFB;
	.serch-box{
		width: 100%;
		height: 120rpx;
		// background: #2C7FFB;
		background-size: 100% 100%;
		padding-left: 20rpx;
	}
	.serch-wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		// margin-top: 20rpx;
		line-height: 86rpx;
		.logo{
			font-size: 33rpx;
			margin-right: 31rpx;
			color: #fff;
			display: flex;
			align-items: center;
			.input{
				position: relative;
				background: #6D81E0;
				width: 120rpx;
				height: 80rpx;
				border:0.5rpx solid #7888D0;
				border-radius: 50rpx;
				text-align: center;
				.circular{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					background: #FFFFFF;
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					top: 0;
					bottom: 0;
					z-index: 2;
				}
				.icon{
					background: #6D81E0;
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					position: absolute;
					z-index: 3;
					left: 0;
					right: 0;
					margin: auto;
					top: 0;
					bottom: 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					.iconfont{
						font-size: 22rpx;
						position: absolute;
						top: -26rpx;
					}
					span{
						position: absolute;
						top: -8rpx;
						font-size: 17rpx;
						font-weight: bold;
					}
				}
			}
			
		}
		.logo_img {
			width: 18rpx;
			height: 33rpx;
			position: fixed;
			left: 15rpx;
		}
	}
	
}
.contentContainer{
	.navContainer{
		// display: flex;
		// align-content: center;
		margin-top: 20rpx;
		padding: 0rpx 30rpx;
		.totalCategory{
			display: flex;
			// flex-direction: column;
			// align-content: space-between;
			justify-content: space-between;
			line-height: 90rpx;
			.category{
				color: #FFFFFF;
				font-size: 45rpx;
				&.active{
					color: #EF9B3D;
				}
			}
		}
		.detailCategoryContainer{
			.detailCategory{
				line-height: 70rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				.category{
					// flex: 1;
					text-align: center;
					&.active{
						color: #EF9B3D;
						border-bottom: 1rpx solid #EF9B3D;
					}
				}
			}
		}
	}
}
.detailContainer{
	margin-top: 50rpx;
	padding: 20rpx 30rpx;
	border-top-right-radius: 30rpx;
	border-top-left-radius: 30rpx;
	background: #FFFFFF;
	// height: 600rpx;
	.screenContainer{
		height: 100rpx;
		.screenLift{
			float: left;
			font-size: 40rpx;
			line-height: 80rpx;
			padding: 0 20rpx;
			.iconfont{
				font-size: 30rpx;
				position: relative;
				top: -10rpx;
			}
		}
		.screenRight{
			float: right;
			height: 100%;
			width: 40%;
			// background: #007AFF;
			display: flex;
			justify-content: space-between;
			align-content: center;
			.screen{
				width: 60rpx;
				height: 75rpx;
				position: relative;
				top: 50rpx;
				transform: translateY(-30rpx);
				text-align: center;
				color: #FFFFFF;
				&.active{
					border-bottom: 1rpx solid #F49C36;
					top: 40rpx;
				}
				text{
					left: 0;
					top: 0;
					width: 60rpx;
					height: 60rpx;
					background:#F4D13A;
					position: absolute;
					border-radius: 10rpx;
					line-height: 60rpx;
					&.active{
						background: #F49C36;
					}
				}
			}
			
		}
	}
	.videoContainer{
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.videoInfo{
			width: 200rpx;
			height: 385rpx;
			// background: #007AFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			text-align: center;
			position: relative;
			.score{
				width: 80rpx;
				height: 50rpx;
				border-top-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;
				font-size: 30rpx;
				line-height: 50rpx;
				font-weight: bold;
				background: #F49C36;
				position: absolute;
				top: 0;
				left: 0;
			}
			image{
				width: 200rpx;
				height: 280rpx;
				background: #4CD964;
				border-radius: 10rpx;
			}
			.info{
				display: flex;
				flex-direction: column;
				.videoName{
					line-height: 55rpx;
					font-size: 35rpx;
					color: #2B2B2B;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.videoDesc{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 22rpx;
					color: #B8B8B8;
				}
			}
			
		}
	}
}
</style>