<template>
	<view class="classifyContainer">

		<view class="mp-header">
			<view class="sys-head"  :style="{ height: statusBarHeight }"></view>
			<view class="serch-box" style="height: 43px;">
				<view class="serch-wrapper flex">
					<view class="logo">
						<view class="input">
							<view class="circular"></view>
							<view class="icon" @click="gageScroll">
								<view class="iconfont icon-dingbu2"></view>
								<span>顶部</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="height: 120rpx;">
		</view>
		<view class="contentContainer">
			<view class="navContainer">
				<scroll-view class="totalCategory" scroll-x="true" enable-flex>
					<view class="category" :class="{active : category1 == index}"
					v-for="(videoData,index) in videoDataList" :key="videoData.type_id" @click="changeCategory1(index)">
						{{videoData.type_name}}
					</view>
				</scroll-view>
				
				<view class="detailCategoryContainer" v-show="isShowNav && category1 < 2">
					<scroll-view class="detailCategory" scroll-x="true" enable-flex>
						<view class="category" :class="{active : category2 == -1}" @click="changeCategory2(-1)">全部</view>
						<view class="category" :class="{active : category2 == index}" v-for="(getCategory2,index) in getCategory2List" 
						:key="getCategory2.type_id" @click="changeCategory2(index)">
							{{getCategory2.type_name}}
						</view>
					</scroll-view>
					<scroll-view class="detailCategory" scroll-x="true" enable-flex>
						<view class="category" :class="{active : areaIndex == -1}" @click="changeArea(-1)">全部</view>
						<view class="category" v-for="(area,index) in areaList" :key="area"
						:class="{active : areaIndex == index}" @click="changeArea(index)">
							{{area}}
						</view>
					</scroll-view>
					<scroll-view class="detailCategory" scroll-x="true" enable-flex>
						<view class="category" :class="{active : yearIndex == -1}" @click="changeYear(-1)">全部</view>
						<view class="category" v-for="(year,index) in yearList" :key="year"
						:class="{active : yearIndex == index}" @click="changeYear(index)">
							{{year}}
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="detailContainer" v-if="videoTotalList.length">
				<view class="screenContainer">
					<view class="screenLift" @click="showNavChange">
						<text class="iconfont icon-caidanzhankai"></text>
						<text>筛选</text>
					</view>
					<view class="screenRight">
						<view class="screen" :class="{active : chooseType == 'hits'}">
							<!-- sort=hits/time/scores -->
							<text class="text" :class="{active : chooseType == 'hits'}" @click="changeHot('hits')">热</text>
						</view>
						<view class="screen" :class="{active : chooseType == 'time'}">
							<text class="text" :class="{active : chooseType == 'time'}" @click="changeTime('time')">新</text>
						</view>
						<view class="screen" :class="{active : chooseType == 'scores'}">
							<text class="text" :class="{active : chooseType == 'scores'}" @click="changeScores('scores')">评</text>
						</view>
					</view>
				</view>
				<view class="videoContainer">
					<view class="videoInfo" v-for="video in videoTotalList" :key="video.id" @click="toDetail" :data-id="video.vod_id" :data-type_id="video.type_id">
						<text class="score">{{video.vod_score}}</text>
						<fr-image :src="video.vod_pic" class="fr_img " mode="" lazy-load="true" loading-ing-img="two-balls"></fr-image>
						<view class="info">
							<text class="videoName">{{video.vod_name}}</text>
							<text class="videoDesc">{{video.vod_actor}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="noDateContainer" :class="{active : isShowNav,noActive : !isShowNav}" v-else>
				<view class="screenContainer">
					<view class="screenLift" @click="showNavChange">
						<text class="iconfont icon-caidanzhankai"></text>
						<text>筛选</text>
					</view>
					<view class="screenRight">
						<view class="screen" :class="{active : chooseType == 'hits'}">
							<!-- sort=hits/time/scores -->
							<text class="text" :class="{active : chooseType == 'hits'}" @click="changeHot('hits')">热</text>
						</view>
						<view class="screen" :class="{active : chooseType == 'time'}">
							<text class="text" :class="{active : chooseType == 'time'}" @click="changeTime('time')">新</text>
						</view>
						<view class="screen" :class="{active : chooseType == 'scores'}">
							<text class="text" :class="{active : chooseType == 'scores'}" @click="changeScores('scores')">评</text>
						</view>
					</view>
				</view>
				<view class="noDateDesc" v-if="isHaveDate">暂无资源，请联系站长</view>				
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js';
	import videoDta from './classify.json';
	import FrImage from '@/components/fr-image/fr-image.vue';
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
export default {
	data() {
		return {
			statusBarHeight:statusBarHeight,
			videoDataList : videoDta,
			category1 : 0,
			category2 : -1,
			chooseType : 'time',
			areaIndex : -1,
			yearIndex : -1,
			yearList : [],
			areaList : [],
			t_id : '',
			videoTotalList : [],//电影数据,
			page : 1,
			isShowNav : true,
			isHaveDate : false
		}
	},
	components:{
		FrImage
	},
	onLoad(options){
		this.category1 = uni.getStorageSync('categoryId') || '0'
	},
	methods: {
		//返回
		onreturn(){
			uni.navigateBack()
		},
		onPageScroll(res){
			this.pageScrollTo = res.scrollTop//距离页面顶部距离
		},
		gageScroll(){
			// 一秒 走 10m 速度为 10m/1s
			this.mius = 10;
			this.speed = 10;
			let times = this.pageScrollTo/this.mius/this.speed;
			// console.log(this.pageScrollTo/this.mius/this.speed);
			uni.pageScrollTo({
			    scrollTop: 0,  //距离页面顶部的距离
			    // duration: times * 1000
				duration : 500
			});
		},
		changeCategory1(index){
			this.category1 = index;
			this.category2 = -1,
			this.areaIndex = -1,
			this.yearIndex = -1,
			this.chooseType = 'time',
			this.isShowNav = true,
			this.videoTotalList = [],
			this.getVideoData();
		},
		changeCategory2(index){
			this.isShowNav = true,
			this.category2 = index;
			this.videoTotalList = [],
			this.getVideoData();
		},
		changeArea(index){
			this.areaIndex = index;
			this.videoTotalList = [],
			this.getVideoData();
		},
		changeYear(index){
			this.yearIndex = index;
			this.videoTotalList = [],
			this.getVideoData();   
		},
		changeHot(index){
			this.chooseType = 'hits';
			this.videoTotalList = [],
			this.getVideoData();   
		},
		changeTime(index){
			this.chooseType = 'time';
			this.videoTotalList = [],
			this.getVideoData();   
		},
		changeScores(index){
			this.chooseType = 'scores';
			this.videoTotalList = [],
			this.getVideoData();   
		},
		// 请求数据
		async getVideoData(){
			(this.category2 != -1) && (this.t_id = this.videoDataList[this.category1].category[this.category2].type_id);
			(this.category2 == -1) && (this.t_id = this.videoDataList[this.category1].type_id);
			let data = {
				t : this.t_id,
				sort : this.chooseType,
				pg : this.page
			};
			(this.areaIndex != -1) && (data.area = this.videoDataList[this.category1].area[this.areaIndex]);
			(this.yearIndex != -1) && (data.year = this.videoDataList[this.category1].year[this.yearIndex]);
			uni.showLoading({  
			    title: '加载中'  
			});
			this.isHaveDate = false;
			let result = await request('/vod',data);
			uni.hideLoading();  
			if(result.code == 1){
				(result.list.length == 0) && (this.isHaveDate = true);
				let arr = result.list.slice(0,9);
				this.videoTotalList.push(...arr);
			}
		},
		onReachBottom: function() {
					// 下拉懒加载
					++this.page;
					this.getVideoData();
					// console.log(2314);
				},
		showNavChange(){
			this.isShowNav = !this.isShowNav
		},
		toDetail(event){
			
			let {id,type_id} = event.currentTarget.dataset;
			wx.navigateTo({
				url:`/pages/detail/detail?id=${id}&t=${type_id}`
			})
		}
	},
	mounted() {
		this.getVideoData();
	},
	computed:{
		getCategory2List(){
			let {category,area,year} = this.videoDataList[this.category1];
			// this.videoCategory2List = category;
			this.areaList = area;
			this.yearList = year;
			return category
		}
	}
}
</script>

<style lang="less" scoped>
@import url("./iconfont/classify.less");
.classifyContainer{
	height: 100%;
	.mp-header_ {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 100%;
		position: fixed;
	}
	.mp-header {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: 999;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		padding: 0 20rpx;
		// background: red;
		// background: #2C7FFB;
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
				height: 44rpx; 
				border-radius: 30rpx; 
				padding: 0; 
				border: 0rpx solid #94A8C1; 
				background-color: transparent;
				.input{
					position: relative;
					background: rgba(109,129,224,.5);
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
						background: rgba(109,129,224,1);
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
		}
		
	}
	.contentContainer{
		// margin-top: 170rpx;
		.navContainer{
			// display: flex;
			// align-content: center;
			margin-top: 20rpx;
			padding: 0rpx 30rpx;
			.totalCategory{
				white-space : nowrap;
				line-height: 90rpx;
				.category{
					color: #FFFFFF;
					font-size: 40rpx;
					display: inline-block;
					margin-right: 100rpx;
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
					white-space: nowrap;
					.category{
						// flex: 1;
						text-align: center;
						display: inline-block;
						margin-right: 100rpx;
						&.active{
							color: #EF9B3D;
							border-bottom: 1rpx solid #EF9B3D;
						}
					}
				}
			}
		}
		// .detailContainer{
		// 	height: calc(100vh - 530rpx);
		// 	&.active{
		// 		height: calc(100vh - 320rpx);
		// 	}
		// }
	}
	.detailContainer{
		margin-top: 50rpx;
		padding: 20rpx 30rpx;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		background: #FFFFFF;
		&.active{
			height: calc(100vh - 530rpx);
		}
		&.noActive{
			height: calc(100vh - 320rpx);
		}
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
					border-top-left-radius: 15rpx;
					border-bottom-right-radius: 15rpx;
					font-size: 30rpx;
					line-height: 50rpx;
					font-weight: bold;
					background: #F49C36;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 5;
				}
				/deep/ .fr_img{
					width: 200rpx !important;
					height: 290rpx !important;
					// background: #4CD964;
					border-radius: 15rpx !important;
				}
				/deep/ .fr_img .fr_img_content {
					border-radius: 15rpx !important;
					width: 100%;
					height: 100%;
					left: 0;
					position: absolute;
					top: 0;
				}
				.info{
					display: flex;
					flex-direction: column;
					.videoName{
						line-height: 70rpx;
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
	.noDateContainer{
		margin-top: 50rpx;
		padding: 20rpx 30rpx;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		background: #FFFFFF;
		&.active{
			height: calc(100vh - 530rpx);
		}
		&.noActive{
			height: calc(100vh - 320rpx);
		}
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
		.noDateDesc{
			margin-top: 50rpx;
			background: #EEEEEE;
			text-align: center;
			line-height: 100rpx;
		}
	}
}

// .noDateContainer{
// 			margin-top: 50rpx;
// 			background: #EEEEEE;
// 			text-align: center;
// 			line-height: 100rpx;
// 		}
</style>