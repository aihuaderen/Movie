<template>
	<view class="playContainer">
		<!-- 自定义导航栏 -->
		<view class="">
			<view class="mp-header">
				<view class="sys-head" :style="{ height: statusBarHeight }"></view>
				<view class="serch-box" style="height: 43px;">
					<view class="serch-wrapper flex">
						<view class="logo">
							<view class="iconfont icon-fanhuishangyiye" @tap="backbtn"></view>
							<view class="middle"></view>
							<view class="iconfont icon-fanhuishouye" @tap="onhome"></view>
						</view>
						<text style="margin-left: 15%; color: #fff;">硅谷影院</text>
					</view>
				</view>
			</view>
			<view style="height:63px"></view>
		</view>
		
		<!-- 视频容器 -->
		<view class="videoWrap">
			<video id="myVideo" :src="currentPlayUrl"
			 controls></video>
		</view>
		<view class="info">
			<view class="videOperate">
				<view class="topInfo">
					<text class="vname">{{videoInfo.vod_name}}</text>
					<text class="status">{{videoInfo.vod_remarks}}</text>
					<text class="collect iconfont icon-shoucang2" @tap="collect"></text>
				</view>
			</view>
			<view class="options">
				<view>
					<button open-type="share" class="shareBtn">按钮分享</button>
					<text class="iconfont icon-tubiaozhizuo-" style="color:#3fbe5d;"></text>
					<text>分享提速</text>
				</view>
				<view @tap="selectNum">
					<text class="iconfont icon-weimingmingwenjianjia_xunhuan" style="color:#5CB1FF;"></text>
					<text>选集列表</text>
				</view>
				<view class="speedWrap" @tap="changeSpeed">
					<text class="iconfont icon-iconfront-" style="color:#EE944B;"></text>
					<text class="speed">{{speedStr}}</text>
					<text>倍速播放</text>
				</view>
				<view @tap="copyLink">
					<text class="iconfont icon-lianjie" style="color:#9F0B7B;"></text>
					<text>复制链接</text>
				</view>
				<view>
					<text class="iconfont icon-10" style="color:##FF0084;"></text>
					<text>客服反馈</text>
				</view>
			</view>
			<view class="videoNum">
				<view class="select iconfont icon-ic_batch_default24px">选集</view>
				<scroll-view class="videoScroll" scroll-x enable-flex v-if="playArr.length">
					<view :class="{active: item.pname === currentPlayName}" v-for="(item,index) in playArr" :key="index" @tap="changePlayInfo(item)">{{item.pname}}</view>
				</scroll-view>
			</view>
			<view class="desc">
				<view class="title"><text style="font-size:26rpx;text-indent: 20rpx;color: gray;" class="iconfont icon-jianjie"><text style="margin-left: 15rpx;">影片简介</text></text></view>
				<view class="descWrap">
					<view class="fload" :class="isFload ? 'hide' : 'show'">
						{{videoInfo.vod_blurb}}
					</view>
					<!-- 此处用了iconfont图标，自行处理或换成自己的图标-->
					<view v-if="arrowShow">
						<view v-if="isFload" class="arrow iconfont icon-arrow-down-bold" @click="fload"></view>
						<view v-if="!isFload" class="arrow iconfont icon-arrow-down-bold" @click="fload"></view>
					</view>
				</view>
			</view>
		</view>

		<view class="share-item" :class="{'share-show': shareState}"></view>
		<Share :currentPlayName="currentPlayName" :currentPlayUrl="currentPlayUrl" :videoData="playArr" :popupState="popupState" @changePopupState="changePopupState" @changePlayInfo="changePlayInfo"></Share>
	</view>
</template>

<script>
	import Share from '../../components/Share/Share.vue'
	import request from '../../utils/request.js'
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		data() {
			return {
				statusBarHeight: statusBarHeight,
				popupState: false,
				isFload: true,
				speed: 1.0,
				speedArr: [1.0, 1.5, 2.0, 0.5, 0.8],
				videoId: '',
				currentPlayName: '',
				currentPlayUrl: '',
				videoInfo: { }
			};
		},
		computed: {
			//播放速度
			speedStr() {
				return this.speed.toString().length === 1 ? this.speed.toString() + '.0' : this.speed;
			},
			//播放集数
			playArr(){
				if(!this.videoInfo.vod_play_url) return [];
				return this.videoInfo.vod_play_url.split('#').map(item => {
					let infoArr = item.split('$');
					return {
						pname: infoArr[0],
						purl: infoArr[1]
					}
				});
			},
			//简介展开
			arrowShow(){
				return this.videoInfo.vod_blurb &&  this.videoInfo.vod_blurb.trim().length > 85
			}
		},
		onLoad(options) {
			//根据id发请求获取视频详情
			this.getVideoDetail(options.id)
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			//根据id发请求获取视频详情
			async getVideoDetail(id){
				let result = await request('/vod', {ac: 'detail', ids: id});
				if(result.total === 0) {
					return uni.showToast({
						title: '数据获取失败',
						duration: 2000
					})
				}
				this.videoInfo = result.list[0]
				
				//设置播放名和播放链接
				this.currentPlayName = this.playArr[0].pname;
				this.currentPlayUrl = this.playArr[0].purl;
			},
			//返回按钮 返回到详情页
			backbtn() {
				wx.navigateBack();
			},
			// 自定义导航栏返回首页
			onhome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			fload() {
				//改变isFload的状态
				this.isFload = !this.isFload;
			},
			//更改播放集数
			changePlayInfo(playInfo){
				if(this.currentPlayName === playInfo.pname) return;
				this.currentPlayName = playInfo.pname;
				this.currentPlayUrl = playInfo.purl;
			},
			//收藏
			collect(){
				console.log('收藏')
			},

			selectNum() {
				this.popupState = true;
			},
			changePopupState() {
				this.popupState = false;
			},
			//更换请求速度
			changeSpeed() {
				let currentSpeedIndex = this.speedArr.indexOf(this.speed);
				if (currentSpeedIndex === this.speedArr.length - 1) {
					this.speed = this.speedArr[0]
				} else {
					this.speed = this.speedArr[++currentSpeedIndex]
				}
				this.videoContext.playbackRate(this.speed)
			},
			//复制播放地址
			copyLink() {
				uni.setClipboardData({
					data: 'techoo.com.cn',
					success: function() {
						console.log('success');
					}
				});
			},
			//微信分享
			wxShare() {
				uni.share({
					provider: 'weixin',
					type: 5,
					miniProgram: {
						id: 'wx2c32abba309a95a3',
						path: 'https://www.baidu.com',
						type: 1
					},

					scene: 'WXSceneSession'
				})
			},



		},
		components: {
			Share
		},

		onShareAppMessage: function(options) {
			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: `前往观看 ${this.videoInfo.type_name}   ${this.videoInfo.vod_name}`, 
				path: '/pages/index/index',
				imageUrl: this.videoInfo.vod_pic,
			};
			// 来自页面内的按钮的转发
			if (options.from == 'button') {
				var eData = options.target.dataset;
				console.log(eData.id); // shareBtn
				// 此处可以修改 shareObj 中的内容
				shareObj.path = '/pages/goods/goods?goodId=' + eData.id;
			}
			// 返回shareObj
			return shareObj;
		}

	}
</script>

<style lang="less">
	@import url("iconfont.css");
	@import url("../detail/iconfont/iconfont.less");
	page {
		background: #ffffff;
	}

	.videoWrap video {
		width: 100%;
	}

	//search
	// .bar {
	// 	position: relative;
	// 	width: 100%;
	// 	height: 140rpx;
	// 	background-color: #2F2F2F;
	// 	color: #fff;
	// 	margin: 0 auto;

	// 	.backbtn {
	// 		position: absolute;
	// 		width: 80rpx;
	// 		height: 80rpx;
	// 		text-align: center;
	// 		line-height: 80rpx;
	// 		top: 33%;
	// 	}

	// 	.vname {
	// 		position: absolute;
	// 		top: 52%;
	// 		left: 45%;
	// 		transform: translate(-50%, -20%);
	// 	}
	// }
	
	
	// 自义定导航栏
		.mp-header {
			background-color: #2F2F2F;
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
						background-color: rgba(255, 255, 255, 0.6);
					}
				}
			}
		}
		
		

	.info {
		padding: 0 20rpx;

		.topInfo {
			height: 60rpx;
			line-height: 60rpx;

			.status {
				vertical-align: 18rpx;
				margin-left: 15rpx;
				font-size: 23rpx;
				color: red;
			}

			.collect {
				color: #f49c36;
				float: right;
				margin-right: 30rpx;
			}
		}

		.options {
			display: flex;
			justify-content: space-between;
			margin: 40rpx 0;

			.shareBtn {
				position: absolute;
				height: 107rpx;
				width: 107rpx;
				opacity: 0;
			}

			.speedWrap {
				position: relative;

				.speed {
					color: red;
					font-size: 18rpx;
					position: absolute;
					top: 12%;
					left: 35%;
				}
			}

			.iconfont {
				font-size: 50rpx;
			}

			text {
				display: block;
				margin-bottom: 20rpx;
				text-align: center;
				font-size: 30rpx;

				&:last-child {
					color: grey;
					font-size: 25rpx;
				}
			}
		}

		.videoNum {
			.select {
				margin: 20rpx 0;
				color: red;
				font-size: 27rpx;
			}

			.videoScroll {
				display: flex;
				height: 70rpx;

				view {
					flex-shrink: 0;
					padding: 0 18rpx;
					margin-right: 20rpx;
					line-height: 70rpx;
					text-align: center;
					font-size: 26rpx;
					background-color: #E3E3E3;
					border-radius: 5rpx;
					&.active {
						background-color: #FFD04E;
					}
				}
			}
		}
	}

	// 进入分享动画
	.share-show {
		transition: all 0.3s ease;
		transform: translateY(0%) !important;
	}

	// 离开分享动画
	.share-item {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 1999;
	}

	.desc {
		margin-top: 20rpx;

		.title {
			font-weight: bold;
		}

		//简介的显示隐藏
		.descWrap {
			width: 100%;
			margin: 30rpx 0;
			font-size: 26rpx;
			color: grey;

			.fload {
				width: 100%;
				height: auto;
				display: -webkit-box;
				word-break: break-all;
				-webkit-box-orient: vertical;
				/* 要显示多少行就改变line-clamp的数据,此处折叠起来显示一行*/
				-webkit-line-clamp: 3;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.arrow {
				text-align: center;
			}
			.hide {
				display: -webkit-box;
			}

			.show {
				display: block;
			}
		}
	}
</style>
