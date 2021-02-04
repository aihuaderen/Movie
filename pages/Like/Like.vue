<template>
	<view style="height: 100%;">
		<view class="container">
			<view class="header">
				<view class="historyCollect">
					<view class="history iconfont iconlishi">历史</view>
					<view class="collect active iconfont iconshoucang">收藏</view>
				</view>
			</view>
			<view class="content">
				<scroll-view class="scroll" scroll-y="true" >
					<view class="scrollItem">
						<image class="leftImage" src="../../static/images/hadeng.jpg" mode=""></image>
						<view class="rightText">
							<text class="movieName">哆啦A梦:大雄daxiongsdasdas</text>
							<p class="lastSee">上次播放至:第1集</p>
							<button class="continuePlay iconfont iconbofang">继续播放</button>
						</view>
					</view>
					
					<view class="scrollItem">
						<image class="leftImage" src="../../static/images/hadeng.jpg" mode=""></image>
						<view class="rightText">
							<text class="movieName">哆啦A梦:大雄daxiongsdasdas</text>
							<p class="lastSee">上次播放至:第1集</p>
							<button class="continuePlay iconfont iconbofang">继续播放</button>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	@import url("./iconfont/iconfont.less");
	
	.container{
		margin-top: 150rpx;
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
				width: 400rpx;
				height: 70rpx;
				line-height: 70rpx;
				border: 1rpx solid #a3a3a3;
				border-radius: 50rpx;
				text-align: center;
				font-size: 30rpx;
				box-sizing: border-box;
				.history{
					width: 200rpx;
					border-right: 1rpx solid #a3a3a3;
				}
				.collect{
					width: 200rpx;
				}
				.active{
					background: #df600c;
					border-top-right-radius: 50rpx;
					border-bottom-right-radius: 50rpx;
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
							width: 300rpx;
						}
						.continuePlay{
							background: #f3d05be7;
							height: 70rpx;
							width: 250rpx;
							font-size: 26rpx;
							text-align: center;
							line-height: 70rpx;
							margin-right: 50rpx;
						}
					}
				}
			}
		}
	}
</style>
