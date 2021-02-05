<template>
	<scroll-view class="carousel">
		<!-- 首页轮播图部分 -->
		<swiper class="navbar" autoplay="true" interval="3000" circular="true">
			<swiper-item v-for="(item,index) in banner" :key="item.vod_id">
				<view class="swiper-item">
					<image class="navbarImg" :src="item.vod_pic_slide" mode=""></image>
					<view class="navbarText">{{item.vod_name}}</view>
				</view>
			</swiper-item>
		</swiper>



		<!-- 电影列表 -->
		<view class="film">
			<view class="filmTop">
				<text class="tex1">最新电影</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-xiaolian"></text>
				
				</view>
			</view>

			<view class="filmList" > 
				<view class="filmItem" v-for="(items,index) in filmList" :key="items.vod_id">
					<image class="filmpic" :src="items.vod_pic" ></image>
					<text class="tex3">{{items.vod_name}}</text>
					<view class="score">{{items.vod_score}}</view>
					<view class="status">{{items.vod_remarks}}</view>
				</view>

			</view>
			
			
			
			<view class="filmTop">
				<text class="tex1">同步剧场</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-xiaolian"></text>
				</view>
			</view>
			
			<view class="filmList" >
				<view class="filmItem" v-for="(items,index) in filmLxj" :key="items.vod_id">
					<image class="filmpic" :src="items.vod_pic" ></image>
					<text class="tex3">{{items.vod_name}}</text>
					<view class="score">{{items.vod_score}}</view>
					<view class="status">{{items.vod_remarks}}</view>
				</view>
				
			</view>
			
			
			
			<view class="filmTop">
				<text class="tex1">最新电影</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-xiaolian"></text>
				</view>
			</view>
			
			<view class="filmList">
				<view class="filmItem" v-for="items in filmRmzy" :key="items.vod_id">
					<image class="filmpic" :src="items.vod_pic" ></image>
					<text class="tex3">{{items.vod_name}}</text>
					<view class="score">{{items.vod_score}}</view>
					<view class="status">{{items.vod_remarks}}</view>
				</view>
			</view>
			
			
			
			<view class="filmTop">
				<text class="tex1">动画动漫</text>
				<view class="tex2" @click="more">
					<text>查看更多</text>
					<text class="iconfont icon-xiaolian"></text>
				</view>
			</view>
			
			<view class="filmList">
				<view class="filmItem" v-for="item in filmDmdh" :key="item.vod_id">
					<image class="filmpic" :src="item.vod_pic" ></image>
					<text class="tex3">{{item.vod_name}}</text>
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
				console.log(result.list)
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
				let filmDmdh = result.list.slice(0.6)
				this.filmDmdh = filmDmdh
			},
			more(){
				uni.switchTab({
					url: '/pages/classify/classify'
				})
			}

		}
	}
</script>

<style lang="less">
	.carousel {
		height: 3600rpx;
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
					height: 340rpx;
				}

				.navbarText {
					position: absolute;
					top: 334rpx;
					left: 0;
					background: #DD524D;
					font-size: 40rpx;
					width: 100%;
					text-align: center;
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
				
				.tex1 {
					display: block;
					color: #F0AD4E;
					font-size: 30rpx;
					float: left;
					margin-left: 20rpx;
					font-weight: 700;
					line-height: 60rpx;
				}
				
				.tex2 {
					color: #F0AD4E;
					font-size: 30rpx;
					float: right;
					margin-right: 20rpx;
					font-weight: 700;
					height: 100rpx;
					align-items: center;
					line-height: 60rpx;
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
					border: 1px solid red;
					text-align: center;
					position: relative;
					.filmpic {
						width: 100%;
						height: 100%;
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
						background: #F0AD4E;
						text-align: center;
					}
					.status{
						position: absolute;
						width: 100%;
						height: 16rpx;
						bottom: 12rpx;
						font-size: 20rpx;
						color: #DD524D;
						text-align:right ;
						font-weight: 700;
						// background: #F8F8F8;
						// opacity: .2;
					
					}
				}
			}
		}
	}
</style>
