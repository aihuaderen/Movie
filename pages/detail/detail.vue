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
				<view class="update">{{videoInfo.vod_remarks}}</view>
				<view class="type">类型 : {{videoInfo.vod_class}}</view>
				<view class="actor">演员 : {{videoInfo.vod_actor}}</view>
				<view class="year">{{videoInfo.vod_year}} / {{videoInfo.vod_area}} / {{videoInfo.vod_director}}</view>
				<view class="button">
					<button class="iconfont icon-fenx share" open-type="share">分享</button>
					<button class="iconfont icon-pengyouquan poster">海报</button>
				</view>
			</view>
		</view>
		<!-- 豆瓣评分 -->
		<view class="score">
			<view class="star">
				<text class="douban">豆瓣:{{videoInfo.vod_score}}</text>
				<text class="iconfont icon-shixinxingxing" v-for="(item,index) in xinxinObj.wholeNum" :key="index"></text>
				<image class="halfStar" src="/static/images/detail/half.svg" mode=""></image>
				<text class="iconfont icon-shixinxingxing1" v-for="(item,index) in xinxinObj.whiteNum" :key="index"></text>
			</view>
			<view class="play" @click="toPlay">
				<text class="iconfont icon-bofang"></text>
				<text class="start">开始播放</text>
			</view>
		</view>

		<!-- 影片简介 -->
		<view class="introduction">
			<text class="iconfont icon-jianjie"></text>
			<text class="title">影片简介</text>
			<view class="fload" :class="isFload ? 'hide' : 'show'">
				{{videoInfo.vod_content | filterHtmlTag}}
			</view>
			<view class="expansion" v-if="arrowShow">
				<text v-if="isFload" class="iconfont icon-xiangshangjiantouarrowup1" @click="fload"></text>
				<text v-if="!isFload" class="iconfont icon-xiangshangjiantouarrowup" @click="fload"></text>
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
					<view class="movieItem" v-for="video in videoList" :key="video.vod_id" @click="toCurrent(video.vod_id)">
						<view class="top">{{video.vod_score}}</view>
						<image class="smallImg" :src="video.vod_pic" mode=""></image>
						<view class="movieName">{{video.vod_name}}</view>
						<view class="actor">{{video.vod_actor}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	// import halfStar from '../../static/'
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		data() {
			return {
				isFload: true,
				vid: '',
				vtypeId: '',
				videoInfo: {}, //视频详情数据
				videoList: [], //精彩推荐数据
				statusBarHeight: statusBarHeight
			};
		},
		onLoad(options) {
			this.vtypeId = options.t;
			this.vid = options.id;
			this.getVideoDetail(options.id);
			this.getHotRecommended(options.t);
		},
		// 转发
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				return {
					title: '快来和朋友一起看电影啦!',
					path: '/pages/index/index',
					imageUrl: this.videoInfo.vod_pic
				}
			} else if (res.from === 'menu') {
				// 来自右上角转发菜单
				return {
					title: '快来和朋友一起看电影啦!',
					path: '/pages/index/index',
					imageUrl: this.videoInfo.vod_pic
				}
			}
		},
		// 分享到朋友圈
		onShareTimeline: function() {
			return {
				title: '我分享了一个好看的电影,快来看看吧!',
				path: '/pages/detail/detail',
				imageUrl: this.videoInfo.vod_pic
			}
		},
		//过滤简介中的html标签
		filters:{
			filterHtmlTag(str) {
				return str.replace(/<[^<>]+>/g,'')
			}
		},
		computed: {
			// 星星
			xinxinObj() {
				if (!this.videoInfo.vod_score) return {
					wholeNum: 0,
					isHalf: 0,
					whiteNum: 5
				}
				let wholeNum = Math.floor(this.videoInfo.vod_score / 2);
				let isHalf = this.videoInfo.vod_score % 2 >= 1 ? true : false;
				let whiteNum = 5 - wholeNum - isHalf;
				return {
					wholeNum,
					isHalf,
					whiteNum
				}
			},
			//简介展开
			arrowShow() {
				return this.videoInfo.vod_content && this.videoInfo.vod_content.trim().length > 75
			}
		},
		methods: {
			// 文字的展开和收起
			fload() {
				//改变isFload的状态
				this.isFload = !this.isFload;
			},
			// 获取视频详情数据
			async getVideoDetail(id) {
				let result = await request('/vod', {
					ac: 'detail',
					ids: id
				})
				this.videoInfo = result.list[0]
			},
			// 获取精彩推荐数据
			async getHotRecommended(t) {
				let result = await request('/vod', {
					ac: 'detail',
					sort: 'hits',
					t: t
				})
				this.videoList = result.list
			},
			// 自定义导航栏返回上一页
			onreturn() {
				uni.navigateBack();
			},
			// 自定义导航栏返回首页
			onhome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 跳转到播放页面
			toPlay() {
				wx.navigateTo({
					url: '/pages/Play/Play?id=' + this.vid
				})
			},
			//跳转到当前页面
			async toCurrent(id) {
				let result = await request('/vod', {
					ac: 'detail',
					ids: id
				})
				this.videoInfo = result.list[0]
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
				line-height: 42rpx;
				font-size: 26rpx;
			}

			.title {
				font-size: 34rpx;
				font-weight: bold;
			}

			.update {
				font-size: 22rpx;
				color: red;
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
					margin: 10rpx;
					width: 150rpx;
					line-height: 50rpx;
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
					position: relative;
					vertical-align: middle;
					color: #F7AF22;
					font-size: 40rpx;
				}

				.icon-shixinxingxing1 {
					color: #DCD9DB;
				}

				.halfStar {
					width: 43rpx;
					height: 43rpx;
					vertical-align: middle;
					display: inline-block;
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
				white-space: nowrap;

				.movieItem {
					position: relative;
					width: 33.333%;
					display: inline-block;

					.top {
						position: absolute;
						top: 0;
						left: 0;
						width: 70rpx;
						line-height: 40rpx;
						text-align: center;
						border-radius: 10rpx 0 10rpx 0;
						background-color: #FDA035;
						z-index: 1;
						font-size: 26rpx;
					}

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
