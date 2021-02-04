<template>
	<view class="detailContainer" v-if="videoInfo.vod_name">
		<!-- 自定义导航栏 -->
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
		<!-- 头部 -->
		<view class="header">
			<view class="leftContent">
				<image class="cover" :src="videoInfo.vod_pic" mode=""></image>
			</view>
			<view class="rightContent">
				<view class="title">{{videoInfo.vod_name}}</view>
				<view class="type">类型 : {{videoInfo.vod_class}}</view>
				<view class="actor">演员 : {{videoInfo.vod_actor}}</view>
				<view class="year">{{videoInfo.vod_year}} / {{videoInfo.vod_area}} / {{videoInfo.vod_director}}</view>
				<view class="button">
					<button class="iconfont icon-fenx share">分享</button>
					<button class="iconfont icon-pengyouquan poster">海报</button>
				</view>
			</view>
		</view>
		<!-- 豆瓣评分 -->
		<view class="score">
			<view class="star">
				<text class="douban">豆瓣:8.0</text>
				<text class="iconfont icon-start-copy1"></text>
				<text class="iconfont icon-start-copy1"></text>
				<text class="iconfont icon-start-copy1"></text>
				<text class="iconfont icon-start-copy1"></text>
				<text class="iconfont icon-start2"></text>
			</view>
			<view class="play">
				<text class="iconfont icon-bofang"></text>
				<text class="start">开始播放</text>
			</view>
		</view>
		<!-- 影片简介 -->
		<view class="introduction">
			<text class="iconfont icon-jianjie"></text>
			<text class="title">影片简介</text>
			<view class="fload" :class="isFload ? 'hide' : 'show'">
				{{videoInfo.vod_blurb}}
			</view>
			<view class="expansion">
				<text v-if="isFload" class="iconfont icon-xiangshangjiantouarrowup1" @click="fload">展开</text>
				<text v-if="!isFload" class="iconfont icon-xiangshangjiantouarrowup" @click="fload">收起</text>
			</view>
		</view>
		<!-- 精彩推荐 -->
		<view class="recommend">
			<view class="header">
				<text class="iconfont icon-huo"></text>
				<text class="title">精彩推荐</text>
			</view>
			<view class="content">
				<scroll-view scroll-x="true" enable-flex>
					<view class="movieItem">
						<image class="smallImg" src="/static/images/detail/cover.webp" mode=""></image>
						<view class="movieName">木兰妈妈木兰妈妈木兰妈妈木兰妈妈</view>
						<view class="actor">胡歌,王俊杰,杨紫,刘诗诗</view>
					</view>
					<view class="movieItem">
						<image class="smallImg" src="/static/images/detail/cover.webp" mode=""></image>
						<view class="movieName">木兰妈妈木兰妈妈木兰妈妈木兰妈妈</view>
						<view class="actor">胡歌,王俊杰,杨紫,刘诗诗</view>
					</view>
					<view class="movieItem">
						<image class="smallImg" src="/static/images/detail/cover.webp" mode=""></image>
						<view class="movieName">木兰妈妈木兰妈妈木兰妈妈木兰妈妈</view>
						<view class="actor">胡歌,王俊杰,杨紫,刘诗诗</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		data() {
			return {
				isFload: true,
				videoInfo: {},
				statusBarHeight: statusBarHeight
			};
		},
		mounted() {
			this.getVideoDetail();
		},
		methods: {
			// 文字的展开和收起
			fload() {
				//改变isFload的状态
				this.isFload = !this.isFload;
			},
			// 获取视频详情数据
			async getVideoDetail() {
				let result = await request('/vod', {
					ac: 'detail',
					ids: 107
				})
				this.videoInfo = result.list[0]
			},
			// 自定义导航栏返回上一页
			onreturn(){
							uni.navigateBack();
			},
			// 自定义导航栏返回首页
			onhome(){
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("./iconfont/iconfont.less");
	// 自义定导航栏
	.mp-header {
			background-size: 100% 100%;
			background-repeat: no-repeat;
			z-index: 999;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			.serch-box{
				width: 100%;
				height: 120rpx;
				background-size: 100% 100%;
				padding-left: 20rpx;
			}
			.serch-wrapper {
				height: 100%;
				display: flex;
				align-items: center;
					.logo{
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
						background-color: rgba(0,0,0,.1);
						.middle{
							width: 2rpx;
							height: 40rpx;
							background-color: rgba(0,0,0,.2);
						}
					}
			}	
		}
		//详情页样式
	.detailContainer {
		padding: 0 30rpx;

		.header {
			display: flex;

			.leftContent {
				margin: 40rpx 60rpx 20rpx 40rpx;

				.cover {
					width: 220rpx;
					height: 300rpx;
					border-radius: 10rpx;
				}
			}

			.rightContent {
				width: 350rpx;
				float: right;
				margin: 60rpx 0 30rpx 0;
			}

			.title,
			.update,
			.type,
			.actor,
			.year {
				line-height: 50rpx;
				font-size: 28rpx;
			}

			.title {
				font-size: 38rpx;
				font-weight: bold;
			}

			.title,
			.actor,
			.year {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.button {
				display: flex;

				.iconfont {
					margin: 20rpx 10rpx;
					width: 150rpx;
					line-height: 56rpx;
					font-size: 28rpx;
					background-color: #F69D39;
				}
			}
		}

		.score {
			width: 700rpx;
			line-height: 130rpx;
			text-align: center;
			background-color: #94A8C1;
			border-radius: 20rpx;
			margin: 0 auto;
			display: flex;

			.star {
				margin: 0 80rpx 0 40rpx;

				.douban {
					color: #EBD155;
					font-size: 26rpx;
					font-weight: bold;
					margin-right: 30rpx;
				}

				.iconfont {
					vertical-align: middle;
					color: #EFD141;
					font-size: 40rpx;
				}

				.icon-start2 {
					color: #DCD9DB;
				}
			}

			.play {
				.iconfont {
					vertical-align: middle;
					color: #F6FDF5;
					font-size: 42rpx;
					margin-right: 20rpx;
				}

				.start {
					color: #FEFEFC;
					font-size: 36rpx;
					font-weight: bolder;
				}
			}
		}

		.introduction {
			.iconfont {
				font-size: 32rpx;
			}

			.title {
				font-size: 32rpx;
				font-weight: bold;
				margin-left: 20rpx;
				line-height: 100rpx;
			}

			.fload {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				font-size: 26rpx;
				color: #94A8C1;
			}

			.hide {
				display: -webkit-box;
			}

			.show {
				display: block;
			}

			.expansion {
				text-align: center;

				.iconfont {
					font-size: 28rpx;
					line-height: 60rpx;
					color: gray;
				}
			}
		}

		.recommend {
			.header {
				.iconfont {
					line-height: 100rpx;
				}

				.title {
					font-size: 32rpx;
					font-weight: bold;
					line-height: 100rpx;
					margin-left: 20rpx
				}
			}

			.content {
				.movieItem {
					width: 33.333%;
					display: inline-block;

					.smallImg {
						width: 180rpx;
						height: 230rpx;
						border-radius: 10rpx;
					}

					.movieName,
					.actor {
						width: 200rpx;
						line-height: 38rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.movieName {
						font-size: 26rpx;
					}

					.actor {
						font-size: 20rpx;
						color: gray;
					}
				}
			}
		}
	}
</style>
