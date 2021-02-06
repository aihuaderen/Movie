
<template>
	<view class="searchContainer">
		<!-- 输入框 -->
		<view class="bar">
			<view class="sys-head" :style="{ height: statusBarHeight }"></view>
			<view class="serch-box">
				<view class="serch-wrapper">
					<input class="barInput" v-model="test" type="text" value="" placeholder="输入搜索关键词" @confirm="getSearchInfo"/>
					<text class="iconfont icon-10" @click="deleteInfo"></text>
				</view>
			</view>
		</view>
		<!-- 电影列表 -->
		<scroll-view scroll-y="true"  class="navScoll" enable-flex >
			<view class="ScollItem" v-for="(item,index) in searchInfo" :key='item.vod_id' >
				<image  class="ScollImg" :src="item.vod_pic" mode=""></image>
				<view class="ScrollRight" >
					<text class="ScollName">{{item.vod_name}}</text>
					<span>更新至40集111111111111111111111</span>
					<p class='address'>{{item.vod_year}}</p>
				  <p class='actorName'>{{item.vod_actor}}</p>
					<p >{{item.type.type_name}} -{{item.vod_name}}</p>
					<button class="iconfont icon-bofang" type="default" @click="toDetail(item)">立即播放</button>
				</view>
				
				
			</view>
			

		</scroll-view>
	</view>
</template>
<script>
	import request from '../../utils/request.js'
	import searchInput from '../../components/searchInput/searchInput.vue'
	export default {
		data() {
			return {
				test:'',
				searchInfo:{}
			};
		},
		onLoad(options) {
			
			this.getSearchInfo()
		},
		components:{
			searchInput
		},
		methods:{
			// 删除信息
			deleteInfo(){
					 let {test} = this.$data
					 if(!test){
						wx.reLaunch({
							url:'../search/search'
						}) 
					 }else{
						 this.test = ''
					 }
		},
	  // 获取搜索信息
		async getSearchInfo(a){
			// console.log(a.detail)
			let {test} = this.$data
			let result = await request('/search',{wd:test})
			this.searchInfo = result.list
		},
		toDetail(item){
			wx.navigateTo({
				url:`/pages/detail/detail?id=${item.vod_id}&t=${item.type_id}`
			})
		}
		}
	}
</script>

<style lang="stylus">
	@import url('./iconfont/iconfont.styl')
			.searchContainer
					width 100%
					height 100%
					background: -webkit-linear-gradient(top,rgba(104, 130, 253, 1.0),rgba(104, 130, 253, 0.7), rgba(85, 170, 255, 0.05));
					.bar
							width 100%
							height 140rpx
							.serch-box
									height 100%
									font-size 26rpx
									position relative
									.serch-wrapper
											height 100%
											font-size 26rpx
											position relative
											padding 10rpx
											.barInput
													background-color: #fff;
													border-radius: 30rpx;
													margin-top: 10rpx;
													width: 420rpx;
													height: 65rpx;
													line-height: 65rpx;
													padding-left: 20rpx;
													margin-top 41rpx
											.iconfont
													position absolute
													top 63rpx
													left 390rpx
													color red
													font-size 40rpx
													z-index 2
							
					
				.navScoll
						width 100%
						height 100%
						background-color white
						border-radius 10rpx
						.ScollItem
								width 100%rpx
								display flex
								border-radius  20rpx
								padding 20rpx 10rpx
								background-color #F7F7F7
								margin-top 50rpx 
								.ScollImg
										width 250rpx
										height 350rpx
										border-radius 20rpx
								.ScollName
										display block
										margin-left 40rpx
										color black
										font-size 35rpx
										width 200rpx
										// 单行文本溢出省略号代替
										white-space nowrap
										text-overflow ellipsis
										overflow hidden
										// 多行
								.ScrollRight
										position relative
										span
												position absolute
												top 0rpx
												left 297rpx
												font-size 26rpx
												color #CF8835
												white-space nowrap
												width 157rpx
												display block
												text-overflow ellipsis
												overflow hidden
												
										.ScrollRight .address
												font-size 30rpx
												color gray
												display flex
										p
												color gray
												margin-left 40rpx
												font-size 23rpx
												margin-top 20rpx
										
										.icon-bofang
												width 300rpx
												height 80rpx
												line-height 80rpx
												text-align center
												margin 65rpx 0 0 170rpx
												background-color #F4D13A
										.actorName
												width 200rpx
												white-space nowrap
												text-overflow ellipsis
												overflow hidden
</style>
