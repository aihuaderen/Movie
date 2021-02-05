<template>
	<scroll-view class="carousel" v-if="banner[0]">
		<!-- 首页轮播图部分 -->
		<swiper class="navbar" autoplay="true" interval="3000" circular="true">
			<swiper-item v-for="(item,index) in banner" :key="item.vod_id">
				<view class="swiper-item">
					<image class="navbarImg" :src="item.vod_pic_slide" mode="">
								<view class="navbarText">{{item.vod_name}}</view>
					</image>
		
				</view>
			</swiper-item>
		</swiper>



		<!-- 电影列表 -->
		<view class="film">
			<view class="filmTop">
				<text class="iconfont icon-dianying"></text>
				<text class="tex1"> 最新电影</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>

			<view class="filmList"> 
				<view class="filmItem" v-for="(items,index) in filmList" :key="items.vod_id" @click="toDetal(items)">
					<image class="filmpic" :src="items.vod_pic"></image>
					<text class="tex3">{{items.vod_name}}</text>
					<view class="score">{{items.vod_score}}</view>
					<view class="status">{{items.vod_remarks}}</view>
				</view>

			</view>
			
			
			
			<view class="filmTop">
				<text class="iconfont icon-shenyejuchang"></text>
				<text class="tex1">同步剧场</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			
			<view class="filmList" >
				<view class="filmItem" v-for="(items,index) in filmLxj" :key="items.vod_id" @click="toDetal(items)">
					<image class="filmpic" :src="items.vod_pic"></image>
					<text class="tex3" >{{items.vod_name}}</text>
					<view class="score">{{items.vod_score}}</view>
					<view class="status">{{items.vod_remarks}}</view>
				</view>
				
			</view>
			
			
			
			<view class="filmTop">
				<text class="iconfont icon-zongyi"></text>
				<text class="tex1">热门综艺</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			
			<view class="filmList">
				<view class="filmItem" v-for="items in filmRmzy" :key="items.vod_id" @click="toDetal(items)">
					<image class="filmpic" :src="items.vod_pic" ></image>
					<text class="tex3" >{{items.vod_name}}</text>
					<view class="score">{{items.vod_score}}</view>
					<view class="status">{{items.vod_remarks}}</view>
				</view>
			</view>
			
			
			
			<view class="filmTop">
				<text class="iconfont icon-dongman"></text>
				<text class="tex1">动画动漫</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
			
			<view class="filmList">
				<view class="filmItem" v-for="item in filmDmdh" :key="item.vod_id"  @click="toDetal(item)">
					<image class="filmpic" :src="item.vod_pic" ></image>
					<text class="tex3" >{{item.vod_name}}</text>
					<view class="score">{{item.vod_score}}</view>
					<view class="status">{{item.vod_remarks}}</view>
				</view>
			</view>
		</view>
		<!-- 电影列表 end -->
		
	</scroll-view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				banner: [], //轮播图的数据
				filmList: [], //视频列表的数据
				filmLxj:[],//连续剧列表的数据
				filmRmzy:[],//热门综艺数据
				filmDmdh:[]//动漫动画
			}
		},
		mounted() {
			this.getInitData()
		},
		methods: {
			async getInitData() {
				let result = await request('/banner')
				// console.log(result.list)
				this.banner = result.list

				//视频列表的获取 电影
				result = await request('/vod', {t:1})
				let filmList =  result.list.slice(0,6)
				this.filmList = filmList
				
				result = await request('/vod/',{t:2})
				let filmLxj = result.list.slice(0,6)
				this.filmLxj = filmLxj
				
				result = await request('/vod/?ac=list&',{t:3})
				let filmRmzy = result.list.slice(0,6)
				this.filmRmzy = filmRmzy
				
				result = await request('/vod/?ac=list&',{t:4})
				let filmDmdh = result.list.slice(0,6)
				this.filmDmdh = filmDmdh
			},
			more(){
				uni.switchTab({
					url: '/pages/classify/classify'
				})
			},
			
			//跳转到详情页
			
			toDetal(item){
				wx.navigateTo({
						url: `/pages/detail/detail?id=${item.vod_id}&t=${item.type_id}`
				})
				
			}
		}
	}
</script>

<style lang="less">
	@import url("./iconfont.less");
	.carousel {
		height: 3700rpx;
		.navbar {
			width: 100%;
			height: 400rpx;
			margin-bottom: 20rpx;
			.swiper-item {
				position: relative;
				width: 100%;
				height: 100%;
				text-align: center;

				.navbarImg {
					width: 100%;
					height: 380rpx;
				}

				.navbarText {
					position: absolute;
					top: 328rpx;
					left: 0;
					// background: #DD524D;
					font-size: 40rpx;
					width: 100%;
					text-align: center;
					color: #F4D13A;
				}
			}

		}

		// 电影列表
		.film {
			padding-left: 15rpx;
			width: 100%;
			height: 100%;
			.filmTop{
				width: 100%;
				height: 60rpx;
				
				.iconfont{
					font-size: 36rpx;
					color: #333
				}
				.tex1 {
					color: #333;
					font-size: 36rpx;
					margin-left: 20rpx;
					font-weight: 700;
					line-height: 60rpx;
				}
				
				.tex2 {
					color: #333;
					font-size: 30rpx;
					float: right;
					margin-right: 20rpx;
					font-weight: 700;
					line-height: 60rpx;
					.icon-gengduo{
						font-size: 30rpx;
						color: #333;
					}
				}	
			}
		
			.filmList {
				display: flex;
				margin-top: 20rpx;
				flex-wrap: wrap;
				width: 100%;
				justify-content: space-around;
				.filmItem {
					width: 220rpx;
					height: 300rpx;
					margin-right: 20rpx;
					margin-bottom: 50rpx;
					border: 1px solid hsla(0,0%,100%,.5 );
					text-align: center;
					position: relative;
					border-radius: 10rpx;
					.filmpic {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
					.tex3{
						display: block;
						font-size: 20rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 150rpx;
						margin: 0 auto;
					}
					.score{
						position: absolute;
						top: 0;
						left: 0;
						width: 70rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						background: #F0AD4E;
						border-radius:10rpx 0 10rpx 0;
					}
					.status{
						position: absolute;
						width: 100%;
						height: 21rpx;
						left: -6rpx;
						bottom: 12rpx;
						font-size: 20rpx;
						color: #DD524D;
						text-align:right ;
						font-weight: 700;
					}
				}
			}
		}
	}
</style>
