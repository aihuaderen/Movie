<template>
	<view class="search">
		<!-- 导航栏 -->
		<view class="bar">
			<view class="sys-head" :style="{ height: statusBarHeight }"></view>
			<view class="serch-box">
				<view class="serch-wrapper">
					<input class="barInput" type="text" value="" v-model="searchValue" placeholder="输入搜索关键词" @input='handleInputChange' @confirm='keyEnter(searchValue)'/>
					<text class="iconfont icon-shanchu" @click="delValue"></text>
				</view>
			</view>
		</view>

		<!-- 内容展示 -->
		<view class="contation" v-if="!keyList.length">

			<!-- 历史搜索 -->
			<view class="searchHis" v-show="isHis">
				<!-- 标题 -->
				<view class="titleHis">
					<view class="iconfont icon-compass">
						<text>历史搜素</text>
					</view>
				</view>
				<!-- 内容 -->
				<view class="contentHis">
					<view class="movieHis" v-for="item in historyList" :key='item' @click="toInfo(item)">{{item}}</view>
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
					<view class="movieHot" v-for="item in hotList" :key='item.vod_id' @click="toInfo(item.vod_name)">
						{{item.vod_name}}
					</view>
				</view>
			</view>

		</view>
		
		
		<!-- 搜索关键字内容列表 -->
		<view class="keyList" v-else>
			<view class="keyConent">
				<view class="keyItem" @click="toInfo(item.vod_name)" v-for="item in keyList" :key='item.vod_id'>{{item.vod_name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	
	let isSend = false //函数节流使用
	export default {
		data() {
			return {
				statusBarHeight: statusBarHeight, //当前导航栏的获取的高度
				hotList: {},  //热门搜索数据
				searchValue: '', //搜索框查询值
				keyList: [],  //搜索关键字列表
				historyList: [], //搜索历史记录
				isHis: false, //控制历史记录的显示
			};
		},
		onLoad(options) {
			//调用热门数据
			this.getHotList()
			//获取搜索历史记录
			this.historyList = wx.getStorageSync('historyList') || []
		},
		methods:{
			//发送请求获取热门搜索数据
			async getHotList(){
				const result = await request('/hotSearch')
				this.hotList = result.list
			},
			
			//获取input框输入内容
			handleInputChange(event){
				//显示历史记录
				this.isHis = true
				//获取输入框的信息
				this.searchValue = event.detail.value.trim()
				//判断是否节流
				if(isSend){
					return
				}
				isSend = true
				//调用发送请求获取关键字数据
				this.getKeyList()
				//函数节流
				setTimeout( () => {
					isSend = false
				}, 500)
			},
			
			//点击删除按钮的回调
			delValue(){
				//清空输入框
				this.searchValue = '',
				//清空索索关键字
				this.keyList = []
			},
			
			//发送请求获取关键字数据
			async getKeyList(){
				console.log(1)
				
				if(!this.searchValue){
					this.keyList = []
					return
				}
				console.log(2)
				// // 发送请求获取数据,存入data
				const result = await request('/search?', {wd: this.searchValue})
				this.keyList = result.list 
				// console.log(this.historyList)
				
				// this.historyList.unshift(this.searchValue)
				// // console.log(this.historyList)
				
				// //存入本地
			// 	wx.setStorageSync('historyList', this.historyList)
			},
			
			//点击跳转达详情页面
			toInfo(keyValue){
				console.log(keyValue)
				//跳转页面传递关键字数据到详情页
				wx.navigateTo({
					url: '/pages/searchInfo/searchInfo?keyValue=' + keyValue
				})
				//点击跳转的关键字存入历史记录
				let his = this.historyList
				//判断关键字历史是否重复
				if(his.indexOf(keyValue) !== -1){
				   his.splice(his.indexOf(keyValue), 1)
				}
				//存入历史记录
				his.unshift(keyValue)
				this.historyList = his
				wx.setStorageSync('historyList', this.historyList)
			},
			
			// 回车事件
			keyEnter(keyValue){
				console.log(23333)
				console.log('2',keyValue)
				wx.navigateTo({
						url: '/pages/searchInfo/searchInfo?keyValue=' + keyValue
				})
				//存入历史记录
				this.historyList.unshift(this.searchValue)
				wx.setStorageSync('historyList', this.historyList)
			}
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
				z-index: 999;
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
				font-size: 25rpx;
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
		
		
		.keyList {
			background: #fff;
			border-radius: 30rpx;
			height: 100%;
			padding: 20rpx;
			.keyConent {
				margin-top: 50rpx;
				.keyItem{
					border-bottom: 1rpx solid #333333;
					font-size: 27rpx;
					padding: 25rpx 0;
					color: #8c8c8c;
				}
			}
		}
	
</style>
