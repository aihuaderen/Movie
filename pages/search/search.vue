<template>
	<view class="search">
		<!-- 导航栏 -->
		<view class="bar">
			<view class="sys-head" :style="{ height: statusBarHeight }"></view>
			<view class="serch-box">
				<view class="serch-wrapper">
					<input class="barInput" type="text" value="" placeholder="输入搜索关键词" />
					<text class="iconfont icon-shanchu"></text>
				</view>
			</view>
		</view>

		<!-- 内容展示 -->
		<view class="contation">

			<!-- 历史搜索 -->
			<view class="searchHis">
				<!-- 标题 -->
				<view class="titleHis">
					<view class="iconfont icon-compass">
						<text>历史搜素</text>
					</view>
				</view>
				<!-- 内容 -->
				<view class="contentHis">
					<view class="movieHis">哈哈哈</view>
					<view class="movieHis">哈哈</view>
					<view class="movieHis">哈哈哈</view>
					<view class="movieHis">哈哈哈哈哈哈哈哈哈</view>
					<view class="movieHis">哈哈哈</view>
					<view class="movieHis">哈哈哈</view>
					<view class="movieHis">哈哈哈</view>
					<view class="movieHis">哈哈</view>
					<view class="movieHis">哈哈哈</view>
					<view class="movieHis">哈哈哈哈哈哈哈哈哈</view>
				</view>
			</view>

			<!-- 热门搜索 -->
			<view class="searchHot">
				<!-- 标题 -->
				<view class="titleHot">
					<view class="iconfont icon-remen">
						<text>热门搜索</text>
					</view>
				</view>
				<!-- 内容 -->
				<view class="contentHot">
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈</view>
					<view class="movieHot">哈哈哈</view>
					<view class="movieHot">哈哈哈哈哈哈哈哈哈</view>
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
				statusBarHeight: statusBarHeight
			};
		}
	}
</script>

<style lang="less">
	@import url("./iconfont/iconfont.less");

	.search {
		height: 100%;
	}

	.bar {
		// z-index: 999;
		// position: fixed;
		width: 100%;
		height: 140rpx;

		.serch-box {
			width: 100%;
			height: 100rpx;
			background-size: 100% 100%;
			padding-left: 20rpx;
		}

		.serch-wrapper {
			height: 100%;
			font-size: 26rpx;
			position: relative;

			.barInput {
				background-color: #fff;
				border-radius: 30rpx;
				margin-top: 10rpx;
				width: 420rpx;
				height: 65rpx;
				line-height: 65rpx;
				padding-left: 20rpx;
			}

			.iconfont {
				position: absolute;
				top: 15rpx;
				left: 390rpx;
				color: red;
				font-weight: 700;
			}
		}

	}

	// 内容展示
	.contation {
		background: #fff;
		border-radius: 30rpx;
		height: 100%;
		padding: 20rpx;
	}

	//历史搜索
	.searchHis {
		width: 100%;
		margin-top: 20rpx;

		.titleHis {
			font-size: 35rpx;
			border-bottom: 1rpx solid #333333;

			.iconfont {
				color: #EB8D97;
				text {
					color: #333333;
				}
			}
		}

		.contentHis {
			padding: 20rpx 10rpx 50rpx 10rpx;
			display: flex;
			flex-wrap: wrap;

			.movieHis {
				padding: 10rpx 10rpx 0 10rpx;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
				font-size: 22rpx;
				background: #F5F3F1;
				color: #8c8c8c;
				flex-direction: column;
				flex-wrap: wrap;
				justify-content: flex-start;
				margin-right: 15rpx;
				white-space: nowrap;
			}
		}
	}
	
	//热门搜索
	.searchHot {
			width: 100%;
			margin-top: 40rpx;
	
			.titleHot {
				font-size: 35rpx;
				border-bottom: 1rpx solid #333333;
	
				.iconfont {
					color: #EB8D97;
					text {
						color: #333333;
					}
				}
			}
	
			.contentHot {
				padding: 20rpx 10rpx 50rpx 10rpx;
				display: flex;
				flex-wrap: wrap;
	
				.movieHot {
				padding: 10rpx 10rpx 0 10rpx;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				font-size: 26rpx;
				background: #F5F3F1;
				color: #8c8c8c;
				flex-direction: column;
				flex-wrap: wrap;
				justify-content: flex-start;
				margin-right: 18rpx;
				white-space: nowrap;
				}
			}
		}
	
</style>
