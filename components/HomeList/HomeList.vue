<template>
	<!-- 内容 -->
	<view>
		<view class="classifyList" >
			<view class="list">
				<view class="newMv">{{name}}</view>
				<view class="more">查看更多  > </view>
			</view>
			
			<view class="bigImgList" >
				<view class="imgList" v-for="(item,index) in filmList || synchronization || latestMv || cartoon" :key="item.type_id">
					<image class="img2" :src="item.vod_pic"></image>
					<view class="number">{{item.vod_score}}</view>
					<text class="mvName2">{{item.vod_name}}</text>
				  <text class="actor">{{item.vod_actor}}</text> 
				</view>
			</view>
		</view>
		
		
		
	
		
	</view>
</template>

<script>
	
	export default {
		props:["name","filmList",'synchronization',"latestMv","cartoon"],
		data() {
			return {
				
				
			}
		}
		
	}
</script>

<style lang="less">
	.classifyList{
		margin-top: 20rpx;
		width: 100%;
		.list{
			display: flex;
			position: relative;
			padding: 0 10rpx;
			.newMv{
				font-size: 35rpx;
				
				
			}
			.more{
				font-size: 28rpx;
				position: absolute;
				right: 0;
				padding-right: 20rpx;
			}
		}
		.bigImgList{
			display: flex;
			width: 100%;
			height: 100%;
			flex-wrap: wrap;
			
			.imgList{
				position: relative;
				padding: 20rpx;
				justify-content: space-around;
				text-align: center;
				
				
				.img2{
					// display: flex;
					width: 220rpx;
					height: 300rpx;
					border-radius:5% 5% ;
					margin-right: -15rpx;
					margin-top: -5rpx;
				}
				.number{
					width: 45rpx;
					height: 40rpx;
					border-radius:30% 0 ;
					position: absolute;
					background: #F0AD4E;
					top: 16rpx;
					left: 20rpx;
					text-align: center;
					font-size: 25rpx;
				}
				.mvName2{
					width: 200rpx;
					display: block;
					margin-top: 5rpx;
					font-size: 25rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.actor{
					width: 200rpx;
					display: block;
					font-size: 20rpx;
					text-align: center;
					margin-top: 10rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					color: #808080;
				}
		}
		
		}
	}
		
</style>
