<template>
	<view class="">
		<view class="mp-header">
			<view class="sys-head" :style="{ height: statusBarHeight }"></view>
			<view class="serch-box" style="height: 43px;">
				<view class="serch-wrapper flex">
					<view class="logo">
						<view class="iconfont icon-fanhuishangyiye" @tap="onreturn"></view>
						<view class="middle"></view>
						<view class="iconfont icon-fanhuishouye" @tap="onhome"></view>
					</view>
				</view>
			</view>
		</view>
		<view style="height:63px"></view>
	</view>
</template>

<script>
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		data() {
			return {
				statusBarHeight: statusBarHeight
			};
		},
		methods:{
			// 自定义导航栏返回上一页
			onreturn() {
				uni.navigateBack();
			},
			// 自定义导航栏返回首页
			onhome() {
				uni.switchTab({
					url: '/pages/Home/Home'
				})
			},
		}
	}
</script>

<style lang="less">
	// 自义定导航栏
	.mp-header {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: 2;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
	
		.serch-box {
			width: 100%;
			height: 120rpx;
			background-size: 100% 100%;
			padding-left: 20rpx;
		}
	
		.serch-wrapper {
			height: 100%;
			display: flex;
			align-items: center;
	
			.logo {
				font-size: 33rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 130rpx;
				height: 40rpx;
				border-radius: 30rpx;
				padding: 10rpx 20rpx;
				border: 1rpx solid #94A8C1;
				background-color: rgba(0, 0, 0, .1);
	
				.middle {
					width: 2rpx;
					height: 40rpx;
					background-color: rgba(0, 0, 0, .2);
				}
			}
		}
	}
</style>

