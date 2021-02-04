<template>
	<view class="playContainer">
		<!-- 导航栏 -->
		<view class="bar">
			<text class="iconfont icon-fanhui backbtn" @tap="backbtn"></text>
			<text class="vname">{{videoInfo.vod_name.length > 10 ? videoInfo.vod_name.slice(0,10) + '...' : videoInfo.vod_name}}</text>
		</view>
		<view class="videoWrap">
			<video id="myVideo" src="https://vd2.bdstatic.com/mda-ke9s31k9fwjvvuac/v1-cae/sc/mda-ke9s31k9fwjvvuac.mp4?v_from_s=tc_videoui_4135&auth_key=1612432562-0-0-c258d702221add774d5ce041c914c9cf&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=8_2"
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
				<scroll-view class="videoScroll" scroll-x enable-flex>
					<view v-for="(item,index) in playArr" :key="index">{{item.pname}}</view>
				</scroll-view>
			</view>
			<view class="desc">
				<view class="title"><text style="font-size:26rpx;text-indent: 20rpx;" class="iconfont icon-shoucang"><text style="margin-left: 15rpx;">影片简介</text></text></view>
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
		<Share :videoData="playArr" :popupState="popupState" @changePopupState="changePopupState"></Share>
	</view>
</template>

<script>
	import Share from '../../components/Share/Share.vue'
	export default {
		data() {
			return {
				popupState: false,
				isFload: true,
				speed: 1.0,
				speedArr: [1.0, 1.5, 2.0, 0.5, 0.8],
				videoInfo: {
					"vod_id": 140,
					"vod_name": "手枪大屠杀",
					"vod_en": "shouqiangdatusha",
					"vod_class": "剧情",
					"vod_pic": "https://images.cnblogsc.com/pic/upload/vod/2021-02/1612338739.jpg",
					"vod_blurb": "日活暴力粉紅導演長谷部安春1967年的作品，並以藤井鷹史之名參與撰寫劇本。宍戶錠、藤竜也和岡崎二朗飾演的黑田家三兄弟反抗殘酷黑幫組織的，最後的決戰由長男單槍匹馬大戰敵人，更是硬派的動作場面中的經典場面",
					"vod_remarks": "BD",
					"vod_content": " 日活暴力粉紅導演長谷部安春1967年的作品，並以藤井鷹史之名參與撰寫劇本。宍戶錠、藤竜也和岡崎二朗飾演的黑田家三兄弟反抗殘酷黑幫組織的，最後的決戰由長男單槍匹馬大戰敵人，更是硬派的動作場面中的經典場面。</p>",
					"type_name": "动漫",
					"play_url": "第01集$https://iqiyi.cdn9-okzy.com/share/4c8f406722770fc2d19f15a4fa6738ff#第02集$https://iqiyi.cdn9-okzy.com/share/bcc226682d1d98b133661163114ba831#第03集$https://iqiyi.cdn9-okzy.com/share/92876ef2d2fb0dc247ca63781726025c#第04集$https://iqiyi.cdn9-okzy.com/share/b6bcdc5176f139f9c4c0036b123ee12d#第05集$https://iqiyi.cdn9-okzy.com/share/4a91a2632259bfeb28c052069c558843#第06集$https://iqiyi.cdn9-okzy.com/share/0ceed3b289e76c7f6ac4cdd6083a0966#第07集$https://iqiyi.cdn9-okzy.com/share/b99c61acedb54c5253819b7b4f2d88c6#第08集$https://iqiyi.cdn9-okzy.com/share/cdf8cce6a4faee958d05df52054add74#第09集$https://iqiyi.cdn9-okzy.com/share/ed1dac006b5ef6170e646d7eb9ee2d1a$$$第01集$https://iqiyi.cdn9-okzy.com/20210102/20341_a727de7b/index.m3u8#第02集$https://iqiyi.cdn9-okzy.com/20210102/20340_c3eca773/index.m3u8#第03集$https://iqiyi.cdn9-okzy.com/20210108/20593_8d006ca9/index.m3u8#第04集$https://iqiyi.cdn9-okzy.com/20210109/20638_c023b69f/index.m3u8#第05集$https://iqiyi.cdn9-okzy.com/20210115/20880_263b8925/index.m3u8#第06集$https://iqiyi.cdn9-okzy.com/20210117/20994_f8c05079/index.m3u8#第07集$https://iqiyi.cdn9-okzy.com/20210122/21252_6bd335ed/index.m3u8#第08集$https://iqiyi.cdn9-okzy.com/20210124/21358_a5a3a1c0/index.m3u8#第09集$https://iqiyi.cdn9-okzy.com/20210130/21701_5a9e737a/index.m3u8",
				}
			};
		},
		computed: {
			//播放速度
			speedStr() {
				return this.speed.toString().length === 1 ? this.speed.toString() + '.0' : this.speed;
			},
			//播放集数
			playArr(){
				return this.videoInfo.play_url.split("$$$")[0].split('#').map(item => {
					let infoArr = item.split('$');
					return {
						pname: infoArr[0],
						purl: infoArr[1]
					}
				});
			},
			//简介展开
			arrowShow(){
				return this.videoInfo.vod_blurb &&  this.videoInfo.vod_blurb.length > 85
			}
		},
		created(res) {
			console.log(this.videoInfo.play_url)
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			//返回按钮
			backbtn() {
				console.log('返回上一层')
			},
			fload() {
				//改变isFload的状态
				this.isFload = !this.isFload;
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
					data: 'hello world',
					success: function() {
						console.log('success');
					}
				});
			},
			//微信分享
			wxShare() {
				console.log(111)
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
				title: `前往观看 ${this.videoInfo.type_name}   ${this.videoInfo.vod_name}`, // 默认是小程序的名称(可以写slogan等)
				path: '/pages/share/share', // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: this.videoInfo.vod_pic, //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
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

	page {
		background: #ffffff;
	}

	.videoWrap video {
		width: 100%;
	}

	//search
	.bar {
		position: relative;
		width: 100%;
		height: 140rpx;
		background-color: #2F2F2F;
		color: #fff;
		margin: 0 auto;

		.backbtn {
			position: absolute;
			width: 80rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			top: 33%;
		}

		.vname {
			position: absolute;
			top: 50%;
			left: 40%;
			transform: translate(-50%, -20%);
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
					flex: 0 0 120rpx;
					margin-right: 20rpx;
					line-height: 70rpx;
					text-align: center;
					font-size: 26rpx;
					background-color: #FFD04E;
					border-radius: 5rpx;

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
