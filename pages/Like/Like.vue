<template>
	<view style="height: 100%;">
		<!-- 自定义导航栏 -->
		<NavigationBar></NavigationBar>
		<view class="container">
			<view class="header">
				<view class="historyCollect">
					<button plain class="common iconfont icon-lishi" :class="{active:activeTab === 'history'}" @click="toggle('history')">历史</button>
					<button plain class="common iconfont icon-shoucang" :class="{active:activeTab === 'star'}" @click="toggle('star')">收藏</button>
				</view>
			</view>
			<view class="content" v-if="activeTab === 'history'">
				<scroll-view v-if="historyList.length" v-for="item in historyList" :key="item.vod_id" class="scroll" scroll-y="true">
					<view class="scrollItem">
						<image class="leftImage" :src="item.vod_pic" mode=""></image>
						<view class="rightText">
							<text class="movieName">{{item.vod_name}}</text>
							<p class="lastSee">类型 : {{item.type_name}} <text style="margin-left: 50rpx;">评分: <text style="color: orange;padding-left: 15rpx;">{{item.vod_score}}</text></text>
							</p>
							<text class="lastSee">演员 : {{item.vod_actor}}</text>
							<p class="lastSee">上次观看至 : {{item.localInfo.pname}} {{item.localInfo.time ? Math.floor(item.localInfo.time) + 's': ''}} </p>
							<p class="lastSee">观看时间 : {{item.localInfo.watchTime}}</p>
							<button @tap="continuePlay(item)" class="continuePlay"><text class="iconfont icon-bofang" style="margin-right: 10rpx;"></text><text style="font-size: 30rpx;">继续播放</text></button>
							
						</view>
					</view>
				</scroll-view>
				<view v-else>空空如也,快去添加吧!</view>
			</view>
			<view class="content" v-show="activeTab === 'star'">
				<scroll-view v-if="collectList.length" v-for="item in collectList" :key="item.vod_id" class="scroll" scroll-y="true">
					<view class="scrollItem">
						<image class="leftImage" :src="item.vod_pic" mode=""></image>
						<view class="rightText">
							<text class="movieName">{{item.vod_name}}</text>
							<p class="lastSee">更新时间 : {{item.vod_time}}</p>
							<p class="lastSee">类型 : {{item.type_name}} <text style="margin-left: 50rpx;">评分: <text style="color: orange;padding-left: 15rpx;">{{item.vod_score}}</text></text>
							</p>
							<text class="lastSee">演员 : {{item.vod_actor}}</text>
							<button @tap="continuePlay(item)" class="continuePlay"><text class="iconfont icon-bofang" style="margin-right: 10rpx;"></text><text style="font-size: 30rpx;">前往播放</text></button>
						</view>
					</view>
				</scroll-view>
				<view v-else>空空如也,快去添加吧!</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				activeTab: 'history', //切换导航
				collect: uni.getStorageSync('collect') || [],
				collectList: [],
				history: uni.getStorageSync('videoHistory') || [],
				historyList: []
			};
		},
		onLoad(options) {
			this.activeTab = options.tab;
			this.getVideoList(this.collect.join(), 'star');
			
			let historyIds = this.history.map(item => item.videoId);
			this.getVideoList(historyIds.join(), 'history');
		},
		methods: {
			//继续播放
			continuePlay(videoInfo){
				console.log(111)
				const {vod_id, pname, ptime} = videoInfo;
				uni.navigateTo({
					url:`/pages/Play/Play?id=${vod_id}&pname=${pname}&ptime=${ptime}`
				})
			},
			// 切换
			toggle(tab) {
				this.activeTab = tab
			},
			//获取收藏信息
			async getVideoList(ids, tab) {
				if(!ids) return
				let result = await request(`/vod?ids=${ids}`)
				if(tab === 'star') {
					this.collectList = result.list
				} else {
					result.list.forEach(item => {
						item.localInfo = this.history.find(litem => litem.videoId == item.vod_id)
					})
					this.historyList = result.list
				}
			}
		}
	}
</script>

<style lang="less">
	@import url("./iconfont/iconfont.less");
	page {
		height: 100%;
	}
	.container {
		width: 100%;
		background: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.header {
			height: 110rpx;
			width: 100%;
			overflow: hidden;

			.historyCollect {
				margin: 0 auto;
				margin-top: 20rpx;
				display: flex;
				width: 500rpx;
				line-height: 50rpx;
				border-radius: 50rpx;
				text-align: center;
				font-size: 30rpx;
				box-sizing: border-box;
				
				.common {
					width: 250rpx;
					border-right: 1rpx solid #a3a3a3;
				}

				.icon-lishi {
					border: 1rpx solid #a3a3a3;
					border-right: none;
					border-radius: 50rpx 0 0 50rpx;
				}

				.icon-shoucang {
					border: 1rpx solid #a3a3a3;
					border-left: none;
					border-radius: 0 50rpx 50rpx 0;
				}

				.active {
					background: #df600c;
					color: #FFF;
				}
			}
		}

		.content {
			.scroll {
				.scrollItem {
					display: flex;
					height: 320rpx;
					width: 96%;
					background: #f0efeff1;
					margin: 10rpx auto;
					border-radius: 20rpx;

					.leftImage {
						height: 280rpx;
						width: 180rpx;
						margin: auto 0;
						margin-left: 10rpx;
						border-radius: 20rpx;
					}

					.rightText {
						width: 450rpx;
						margin-left: 40rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;

						.movieName {
							width: 300rpx;
							color: #808080;
							font-size: 36rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}

						.lastSee {
							font-size: 24rpx;
							color: #999999;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}

						.continuePlay {
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
</style>
