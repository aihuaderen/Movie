
<template>
	<view class="searchContainer">
		<!-- 输入框 -->
		<searchInput ></searchInput>
		<!-- 电影列表 -->
		<scroll-view scroll-y="true"  class="navScoll" enable-flex>
			<view class="ScollItem">
				<image  class="ScollImg" src="../../static/nvxia.jpg" mode=""></image>
				<view class="ScrollRight">
					<text class="ScollName">神奇女侠1111111111</text>
					<span>更新至40集111111111111111111111</span>
					<p class='address'>2020/中国大陆</p>
				  <p>林更新,零工薪,林庚烯</p>
					<p>电视剧 -最初的相遇,最后的别离</p>
					<button class="iconfont icon-bofang" type="default">立即播放</button>
				</view>
				
				
			</view>
			
			<view class="ScollItem">
				<image  class="ScollImg" src="../../static/nvxia.jpg" mode=""></image>
				<view class="ScrollRight">
					<text class="ScollName">神奇女侠</text>
					<span>更新至40集</span>
					<p class='address'>2020/中国大陆</p>
				  <p>林更新,零工薪,林庚烯</p>
					<p>电视剧 -最初的相遇,最后的别离</p>
					<button class="iconfont icon-bofang" type="default">立即播放</button>
				</view>
				
				
			</view>
			
		</scroll-view>
	</view>
</template>
<script>
	import searchInput from '../../components/searchInput/searchInput.vue'
	export default {
		data() {
			return {
				
			};
		},
		
		components:{
			searchInput
		},
		
		}
	
</script>

<style lang="stylus">
			.searchContainer
					width 100%
					height 100%
					background: -webkit-linear-gradient(top,rgba(104, 130, 253, 1.0),rgba(104, 130, 253, 0.7), rgba(85, 170, 255, 0.05));
					
					
				.navScoll
						width 100%
						height 100%
						background-color white
						border-radius 10rpx
						.ScollItem
								width 100%rpx
								display flex
								border-radius  20rpx
								padding 20rpx 0
								background-color #F7F7F7
								margin-top 50rpx 
								.ScollImg
										width 250rpx
										height 350rpx
										margin 10rpx 0 8rpx 30rpx
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
												margin 30rpx 0 0 130rpx
												background-color #F4D13A
</style>
